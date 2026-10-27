/* wohlii-urlaub.de – Datenhaltung im Prototyp
 *
 * Der Prototyp läuft ohne Server: Konten, Favoriten, Anfragen und die
 * Änderungen der Vermieter liegen im localStorage des Browsers. Für den
 * Livebetrieb wird diese Datei durch Aufrufe einer echten API ersetzt
 * (siehe README, Abschnitt „Weg in den Livebetrieb“). Alle Seiten sprechen
 * nur über `Wohlii.store` mit den Daten – der Austausch betrifft nur diese Datei.
 */
(function () {
  const KEY = 'wohlii.v1.';
  const mem = {};

  function read(name, fallback) {
    try {
      const raw = localStorage.getItem(KEY + name);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      return name in mem ? mem[name] : fallback;
    }
  }
  function write(name, value) {
    mem[name] = value;
    try {
      localStorage.setItem(KEY + name, JSON.stringify(value));
      return true;
    } catch (e) {
      return false; // z. B. Speicher voll (große Fotos) oder privater Modus
    }
  }

  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // Deterministischer Zufall je Unterkunft, damit die Beispielbelegung stabil bleibt.
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  function sampleBookings(unitId) {
    const rnd = seeded(unitId);
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - 1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 14);
    const booked = [];
    const d = new Date(start);
    while (d < end) {
      const m = d.getMonth();
      const season = m >= 5 && m <= 8 ? 0.8 : m === 3 || m === 4 || m === 9 ? 0.6 : 0.35;
      if (rnd() < season) {
        const len = 3 + Math.floor(rnd() * 9);
        for (let i = 0; i < len; i++) {
          booked.push(iso(d));
          d.setDate(d.getDate() + 1);
        }
      } else {
        d.setDate(d.getDate() + 1 + Math.floor(rnd() * 5));
      }
    }
    return booked;
  }

  async function hash(text) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('wohlii:' + text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h = 0;
      for (const c of 'wohlii:' + text) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
      return 'x' + h;
    }
  }

  const seed = window.WOHLII_SEED;

  const store = {
    iso,

    /* ---------- Unterkünfte & Vermieter ---------- */
    hosts() {
      const over = read('hosts', {});
      const list = seed.hosts.map((h) => ({ ...h, ...(over[h.id] || {}) }));
      Object.values(over).forEach((h) => { if (!list.find((x) => x.id === h.id)) list.push(h); });
      return list;
    },
    host(id) {
      return this.hosts().find((h) => h.id === id) || null;
    },
    saveHost(host) {
      const over = read('hosts', {});
      over[host.id] = host;
      return write('hosts', over);
    },
    units({ includeHidden = false } = {}) {
      const over = read('units', {});
      const removed = read('unitsRemoved', []);
      const list = seed.units.filter((u) => !removed.includes(u.id)).map((u) => ({ ...u, ...(over[u.id] || {}) }));
      Object.values(over).forEach((u) => { if (!list.find((x) => x.id === u.id) && !removed.includes(u.id)) list.push(u); });
      return includeHidden ? list : list.filter((u) => u.visible !== false);
    },
    unit(id) {
      return this.units({ includeHidden: true }).find((u) => u.id === id) || null;
    },
    unitsOfHost(hostId, opts) {
      return this.units(opts).filter((u) => u.hostId === hostId);
    },
    saveUnit(unit) {
      const over = read('units', {});
      over[unit.id] = unit;
      return write('units', over);
    },
    removeUnit(id) {
      const over = read('units', {});
      delete over[id];
      write('units', over);
      const removed = read('unitsRemoved', []);
      if (!removed.includes(id)) removed.push(id);
      write('unitsRemoved', removed);
    },

    /* ---------- Belegung ---------- */
    booked(unitId) {
      const cal = read('calendar', {});
      return new Set(cal[unitId] || sampleBookings(unitId));
    },
    setBooked(unitId, set) {
      const cal = read('calendar', {});
      cal[unitId] = Array.from(set).sort();
      return write('calendar', cal);
    },
    freeNightsInMonth(unitId, year, month) {
      const booked = this.booked(unitId);
      const today = iso(new Date());
      const days = new Date(year, month + 1, 0).getDate();
      let free = 0;
      for (let d = 1; d <= days; d++) {
        const key = iso(new Date(year, month, d));
        if (key >= today && !booked.has(key)) free++;
      }
      return free;
    },

    /* ---------- Konten (Demo) ---------- */
    users() {
      return read('users', []);
    },
    async register({ role, name, email, password, houseName }) {
      email = email.trim().toLowerCase();
      const users = this.users();
      if (users.find((u) => u.email === email)) throw new Error('Für diese E-Mail-Adresse gibt es schon ein Konto. Bitte melden Sie sich an.');
      const user = { id: 'u' + Date.now(), role, name: name.trim(), email, pw: await hash(password), created: new Date().toISOString() };
      if (role === 'host') {
        const id = 'h' + Date.now().toString(36);
        this.saveHost({
          id, name: houseName || name, region: '', state: '', place: '', street: '', zip: '', lat: 51.1657, lng: 10.4515,
          website: '', email, phone: '', cover: 'assets/img/macro/leinen.jpg', intro: '', extras: [],
          team: { operator: { name, text: '' }, cleaning: { name: '', text: '' }, greeting: { name: '', text: '' } }, demo: false,
        });
        user.hostId = id;
      }
      users.push(user);
      write('users', users);
      write('session', user.id);
      this.mergeAnonFavorites(user);
      return user;
    },
    async login(email, password) {
      email = email.trim().toLowerCase();
      await this.ensureDemoUsers();
      const user = this.users().find((u) => u.email === email);
      if (!user || user.pw !== (await hash(password))) throw new Error('E-Mail-Adresse oder Passwort stimmen nicht.');
      write('session', user.id);
      this.mergeAnonFavorites(user);
      return user;
    },
    mergeAnonFavorites(user) {
      const anon = read('fav.anon', []);
      if (!anon.length) return;
      const mine = read('fav.' + user.id, []);
      write('fav.' + user.id, [...new Set([...mine, ...anon])]);
      write('fav.anon', []);
    },
    logout() {
      write('session', null);
    },
    currentUser() {
      const id = read('session', null);
      return id ? this.users().find((u) => u.id === id) || null : null;
    },
    async ensureDemoUsers() {
      const users = this.users();
      const demo = [
        { id: 'demo-guest', role: 'guest', name: 'Gast (Demo)', email: 'gast@demo.wohlii' },
        { id: 'demo-host', role: 'host', name: 'Apartmenthaus Saathoff (Demo)', email: 'vermieter@demo.wohlii', hostId: 'saathoff' },
      ];
      let changed = false;
      for (const d of demo) {
        if (!users.find((u) => u.id === d.id)) {
          users.push({ ...d, pw: await hash('wohlii'), created: new Date().toISOString() });
          changed = true;
        }
      }
      if (changed) write('users', users);
    },

    /* ---------- Gast: Favoriten & Anfragen ---------- */
    favorites() {
      const u = this.currentUser();
      return u ? read('fav.' + u.id, []) : read('fav.anon', []);
    },
    toggleFavorite(unitId) {
      const u = this.currentUser();
      const key = 'fav.' + (u ? u.id : 'anon');
      const list = read(key, []);
      const i = list.indexOf(unitId);
      if (i >= 0) list.splice(i, 1); else list.push(unitId);
      write(key, list);
      return i < 0;
    },
    inquiries() {
      const u = this.currentUser();
      return u ? read('inq.' + u.id, []) : [];
    },
    logInquiry(entry) {
      const u = this.currentUser();
      if (!u) return false;
      const list = read('inq.' + u.id, []);
      list.unshift({ id: 'q' + Date.now(), at: new Date().toISOString(), ...entry });
      return write('inq.' + u.id, list);
    },
    removeInquiry(id) {
      const u = this.currentUser();
      if (!u) return;
      write('inq.' + u.id, read('inq.' + u.id, []).filter((q) => q.id !== id));
    },

    /* ---------- Einwilligung ---------- */
    consent() {
      return read('consent', null);
    },
    setConsent(c) {
      write('consent', { ...c, at: new Date().toISOString() });
      document.dispatchEvent(new CustomEvent('wohlii:consent', { detail: c }));
    },

    /* ---------- Suche (merkt sich die letzte Eingabe) ---------- */
    lastSearch() {
      return read('search', null);
    },
    saveSearch(q) {
      write('search', q);
    },
  };

  window.Wohlii = window.Wohlii || {};
  window.Wohlii.store = store;
})();
