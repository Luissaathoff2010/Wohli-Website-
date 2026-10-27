/* wohlii-urlaub.de – gemeinsame Bausteine aller Seiten
 * Kopf- und Fußzeile, Cookie-Hinweis, Belegungskalender, Karte,
 * Unterkunfts-Karten und das Anfrage-Fenster.
 */
(function () {
  const W = window.Wohlii;
  const store = W.store;
  const CFG = window.WOHLII_CONFIG;

  /* ---------- Hilfsfunktionen ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const param = (name) => new URLSearchParams(location.search).get(name);
  const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const WD = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const telHref = (p) => 'tel:' + String(p || '').replace(/[^\d+]/g, '');
  const mapsLink = (lat, lng, q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q || lat + ',' + lng);
  const monthList = () => {
    const out = [];
    const d = new Date();
    d.setDate(1);
    for (let i = 0; i < CFG.monthsAhead; i++) {
      out.push({ y: d.getFullYear(), m: d.getMonth(), value: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'), label: MONTHS[d.getMonth()] + ' ' + d.getFullYear() });
      d.setMonth(d.getMonth() + 1);
    }
    return out;
  };
  const placeholderTag = (unit, field) =>
    unit.placeholderFields && unit.placeholderFields.includes(field) ? '<abbr class="ph" title="Platzhalter – echte Angabe folgt">PH</abbr>' : '';

  function toast(msg) {
    let t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------- Designvariante (klassisch / heimelig) ---------- */
  const STILE = ['klassisch', 'heimelig'];
  const stil = (() => {
    if (window.__STIL) return window.__STIL; // fest vorgegeben (Vorschau)
    let s = new URLSearchParams(location.search).get('stil');
    try {
      if (STILE.includes(s)) localStorage.setItem('wohlii.stil', s);
      else s = localStorage.getItem('wohlii.stil');
    } catch (e) { /* ohne Speicher: Standard */ }
    return STILE.includes(s) ? s : 'klassisch';
  })();
  document.documentElement.dataset.stil = stil;
  if (stil === 'heimelig' && !window.__STIL) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'css/wohlii-heimelig.css';
    document.head.appendChild(l);
  }

  /* ---------- Logo ---------- */
  const logo = (extra = '') =>
    `<a class="logo ${extra}" href="index.html" aria-label="wohlii-urlaub.de – zur Startseite"><img src="assets/img/logo-wohli-240.png" srcset="assets/img/logo-wohli-240.png 1x, assets/img/logo-wohli.png 2x" alt="wohli!" width="${extra ? 96 : 78}" height="${extra ? 96 : 78}"></a>`;

  /* ---------- Kopf & Fuß ---------- */
  function renderChrome() {
    const user = store.currentUser();
    const here = location.pathname.split('/').pop() || 'index.html';
    const nav = [
      ['index.html#brett', 'Unterkünfte'],
      ['gastgeber.html', 'Für Gastgeber'],
      ['konzept.html', 'Unser Konzept'],
    ];
    const account = user
      ? `<a class="btn btn-ghost btn-sm" href="${user.role === 'host' ? 'vermieter.html' : 'konto.html'}">${user.role === 'host' ? 'Mein Gastgeber-Bereich' : 'Mein Konto'}</a>`
      : `<a class="btn btn-ghost btn-sm" href="login.html">Anmelden</a>`;
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
      <div class="wrap header-inner">
        ${logo()}
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span class="sr">Menü</span></button>
        <nav id="site-nav" class="site-nav" aria-label="Hauptnavigation">
          ${nav.map(([href, label]) => `<a href="${href}"${here === href.split('#')[0] && !href.includes('#') ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
          <a class="nav-fav" href="konto.html#favoriten" aria-label="Favoriten">♡ <span class="fav-count">${store.favorites().length || ''}</span></a>
          ${account}
        </nav>
      </div>`;
    document.body.prepend(header);
    const toggle = $('.nav-toggle', header);
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap footer-grid">
        <div>
          ${logo('logo-light')}
          <p class="footer-claim">Das Wesentliche. Direkt beim Gastgeber.</p>
          <p class="small">wohlii-urlaub.de vermittelt nur den Kontakt. Anfrage, Buchung und Bezahlung laufen direkt zwischen Ihnen und Ihrem Gastgeber – ohne Buchungsprovision.</p>
        </div>
        <ul class="footer-values" aria-label="Unsere Werte">
          <li><b>herzlich</b> wohlfühlen</li>
          <li><b>heimelig</b> inne halten</li>
          <li><b>putzmunter</b> inspirieren</li>
        </ul>
        <nav class="footer-links" aria-label="Rechtliches und Service">
          <a href="konzept.html">Unser Konzept</a>
          <a href="gastgeber.html">Gastgeber werden</a>
          <a href="login.html">Anmelden</a>
          <a href="impressum.html">Impressum</a>
          <a href="datenschutz.html">Datenschutz</a>
          <button type="button" class="linklike" data-open-consent>Cookie-Einstellungen</button>
          ${window.__STIL ? '' : `<span class="stil-switch small">Design: ${STILE.map((x) => `<button type="button" class="linklike" data-stil="${x}" aria-pressed="${x === stil}">${x}</button>`).join(' · ')}</span>`}
        </nav>
      </div>
      <div class="wrap footer-base small">© ${new Date().getFullYear()} wohlii-urlaub.de · Prototyp – Inhalte teilweise Platzhalter</div>`;
    document.body.appendChild(footer);
    $$('[data-open-consent]').forEach((b) => b.addEventListener('click', () => consentBanner(true)));
    $$('button[data-stil]').forEach((b) => b.addEventListener('click', () => {
      try { localStorage.setItem('wohlii.stil', b.dataset.stil); } catch (e) { /* egal */ }
      location.reload();
    }));
  }

  function refreshFavCount() {
    const n = store.favorites().length;
    $$('.fav-count').forEach((el) => (el.textContent = n || ''));
  }

  /* ---------- Cookie-/Einwilligungs-Hinweis ---------- */
  function consentBanner(force) {
    if (!force && store.consent()) return;
    let box = $('#consent');
    if (box) box.remove();
    const current = store.consent() || { maps: false };
    box = document.createElement('section');
    box.id = 'consent';
    box.className = 'consent';
    box.setAttribute('aria-label', 'Cookie- und Datenschutz-Einstellungen');
    box.innerHTML = `
      <h2>Kurz zu Ihrer Privatsphäre</h2>
      <p>Wir verwenden nur technisch notwendige Speicherungen (z. B. für Login und Favoriten). Karten von Google Maps bzw. OpenStreetMap laden wir erst, wenn Sie zustimmen – dabei wird Ihre IP-Adresse an den Kartenanbieter übertragen, bei Google ggf. auch in die USA. <a href="datenschutz.html#karten">Mehr dazu</a></p>
      <label class="check"><input type="checkbox" checked disabled> Notwendig (Login, Favoriten, diese Auswahl)</label>
      <label class="check"><input type="checkbox" id="consent-maps" ${current.maps ? 'checked' : ''}> Karten anzeigen (Google Maps / OpenStreetMap)</label>
      <div class="consent-actions">
        <button type="button" class="btn btn-ghost" data-c="necessary">Nur notwendige</button>
        <button type="button" class="btn btn-ghost" data-c="save">Auswahl speichern</button>
        <button type="button" class="btn btn-primary" data-c="all">Alle akzeptieren</button>
      </div>`;
    document.body.appendChild(box);
    box.addEventListener('click', (e) => {
      const c = e.target.dataset.c;
      if (!c) return;
      const maps = c === 'all' ? true : c === 'necessary' ? false : $('#consent-maps', box).checked;
      store.setConsent({ necessary: true, maps });
      box.remove();
    });
  }

  /* ---------- Belegungskalender ---------- */
  function monthCalendar(unitId, y, m, { compact = false, editable = false, booked = null, onToggle = null } = {}) {
    const set = booked || store.booked(unitId);
    const todayKey = store.iso(new Date());
    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(y, m + 1, 0).getDate();
    const el = document.createElement('div');
    el.className = 'cal' + (compact ? ' cal-compact' : '') + (editable ? ' cal-edit' : '');
    let free = 0;
    let cells = '';
    for (let i = 0; i < offset; i++) cells += '<span class="cal-pad" aria-hidden="true"></span>';
    for (let d = 1; d <= days; d++) {
      const key = store.iso(new Date(y, m, d));
      const past = key < todayKey;
      const isBooked = set.has(key);
      if (!past && !isBooked) free++;
      const state = past ? 'vergangen' : isBooked ? 'belegt' : 'frei';
      const cls = ['cal-day', past ? 'past' : isBooked ? 'booked' : 'free', key === todayKey ? 'today' : ''].join(' ');
      const label = `${d}. ${MONTHS[m]}: ${state}`;
      cells += editable && !past
        ? `<button type="button" class="${cls}" data-day="${key}" aria-pressed="${isBooked}" aria-label="${label}">${d}</button>`
        : `<span class="${cls}" title="${label}" aria-label="${label}">${d}</span>`;
    }
    el.innerHTML = `
      <div class="cal-head"><span class="cal-title">${MONTHS[m]} ${y}</span><span class="cal-free">${free} ${free === 1 ? 'Nacht' : 'Nächte'} frei</span></div>
      <div class="cal-grid" role="grid">${WD.map((w) => `<span class="cal-wd" aria-hidden="true">${w}</span>`).join('')}${cells}</div>`;
    if (editable) {
      el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-day]');
        if (!b) return;
        const k = b.dataset.day;
        if (set.has(k)) set.delete(k); else set.add(k);
        onToggle && onToggle(set);
      });
    }
    return el;
  }
  const calLegend = () => '<div class="cal-legend small"><span><i class="lg free"></i>frei</span><span><i class="lg booked"></i>belegt</span><span><i class="lg past"></i>vergangen</span></div>';

  /* ---------- Karte ---------- */
  const mapState = { google: null, leaflet: null };
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = res;
      s.onerror = () => rej(new Error('Skript konnte nicht geladen werden: ' + src));
      document.head.appendChild(s);
    });
  }
  function loadGoogle() {
    if (!mapState.google) {
      mapState.google = new Promise((res, rej) => {
        window.__wohliiGmaps = () => res(window.google.maps);
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(CFG.maps.googleApiKey)}&callback=__wohliiGmaps&language=de&region=DE`).catch(rej);
      });
    }
    return mapState.google;
  }
  function loadLeaflet() {
    if (!mapState.leaflet) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'assets/vendor/leaflet/leaflet.css';
      document.head.appendChild(css);
      mapState.leaflet = loadScript('assets/vendor/leaflet/leaflet.js').then(() => window.L);
    }
    return mapState.leaflet;
  }
  const useGoogle = () => CFG.maps.provider === 'google' && CFG.maps.googleApiKey;

  /**
   * points: [{ id, lat, lng, label, title, html }]
   * Liefert { highlight(id) } zurück. Vor der Einwilligung wird eine
   * datensparsame Skizze der Standorte gezeigt.
   */
  function mountMap(el, points, { zoom = null, onSelect = null } = {}) {
    const ctrl = { markers: {}, highlight() {} };
    el.classList.add('map');

    function sketch() {
      const lats = points.map((p) => p.lat);
      const lngs = points.map((p) => p.lng);
      const pad = 0.15;
      let [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
      if (maxLat - minLat < 0.01) { minLat -= 0.01; maxLat += 0.01; }
      if (maxLng - minLng < 0.01) { minLng -= 0.01; maxLng += 0.01; }
      const x = (lng) => (pad + (1 - 2 * pad) * (lng - minLng) / (maxLng - minLng)) * 100;
      const y = (lat) => (pad + (1 - 2 * pad) * (maxLat - lat) / (maxLat - minLat)) * 100;
      const provider = useGoogle() ? 'Google Maps' : 'OpenStreetMap';
      el.innerHTML = `
        <div class="map-sketch" aria-hidden="true">
          ${points.map((p) => `<span class="pin" data-id="${esc(p.id)}" style="left:${x(p.lng)}%;top:${y(p.lat)}%"><b>${esc(p.label)}</b></span>`).join('')}
        </div>
        <div class="map-gate">
          <p><strong>Karte laden?</strong><br>Beim Laden überträgt Ihr Browser Daten (u. a. Ihre IP-Adresse) an ${provider}.</p>
          <button type="button" class="btn btn-primary btn-sm" data-load-map>Karte laden</button>
          <label class="check small"><input type="checkbox" data-remember> Karten immer laden</label>
          <a class="small" href="datenschutz.html#karten">Datenschutzhinweis</a>
        </div>`;
      $('[data-load-map]', el).addEventListener('click', () => {
        if ($('[data-remember]', el).checked) store.setConsent({ ...(store.consent() || {}), necessary: true, maps: true });
        live();
      });
      ctrl.highlight = (id) => $$('.pin', el).forEach((p) => p.classList.toggle('active', p.dataset.id === id));
    }

    async function live() {
      el.innerHTML = '<div class="map-loading small">Karte wird geladen …</div>';
      try {
        if (useGoogle()) await liveGoogle(); else await liveLeaflet();
      } catch (e) {
        el.innerHTML = `<div class="map-loading small">Die Karte ist gerade nicht erreichbar. <a href="${mapsLink(points[0].lat, points[0].lng)}" target="_blank" rel="noopener">In Google Maps öffnen</a></div>`;
      }
    }

    async function liveGoogle() {
      const gm = await loadGoogle();
      el.innerHTML = '';
      const map = new gm.Map(el, { center: points[0], zoom: zoom || 6, mapTypeControl: false, streetViewControl: false, styles: [{ featureType: 'poi.business', stylers: [{ visibility: 'off' }] }] });
      const bounds = new gm.LatLngBounds();
      const info = new gm.InfoWindow();
      const icon = (active) => ({ path: gm.SymbolPath.CIRCLE, scale: active ? 13 : 10, fillColor: active ? '#D9857A' : '#4E7F68', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 3 });
      points.forEach((p) => {
        const mk = new gm.Marker({ position: { lat: p.lat, lng: p.lng }, map, title: p.title, icon: icon(false), label: { text: String(p.label), color: '#fff', fontSize: '11px', fontWeight: '700' } });
        mk.addListener('click', () => { info.setContent(p.html); info.open({ map, anchor: mk }); onSelect && onSelect(p.id); });
        ctrl.markers[p.id] = mk;
        bounds.extend(mk.getPosition());
      });
      if (points.length > 1 && !zoom) map.fitBounds(bounds, 40);
      ctrl.highlight = (id) => Object.entries(ctrl.markers).forEach(([k, mk]) => { mk.setIcon(icon(k === id)); mk.setZIndex(k === id ? 999 : 1); });
    }

    async function liveLeaflet() {
      const L = await loadLeaflet();
      if (el._lmap) el._lmap.remove();
      el.innerHTML = '';
      const map = el._lmap = L.map(el, { scrollWheelZoom: false }).setView([points[0].lat, points[0].lng], zoom || 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      const icon = (p, active) => L.divIcon({ className: 'lf-pin' + (active ? ' active' : ''), html: `<b>${esc(p.label)}</b>`, iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] });
      points.forEach((p) => {
        const mk = L.marker([p.lat, p.lng], { icon: icon(p, false), title: p.title }).addTo(map).bindPopup(p.html);
        mk.on('click', () => onSelect && onSelect(p.id));
        ctrl.markers[p.id] = { mk, p };
      });
      if (points.length > 1 && !zoom) map.fitBounds(points.map((p) => [p.lat, p.lng]), { padding: [40, 40] });
      ctrl.highlight = (id) => Object.entries(ctrl.markers).forEach(([k, { mk, p }]) => { mk.setIcon(icon(p, k === id)); mk.setZIndexOffset(k === id ? 1000 : 0); });
      setTimeout(() => map.invalidateSize(), 60);
    }

    const consent = store.consent();
    el._live = live;
    if (!el._consentBound) {
      el._consentBound = true;
      document.addEventListener('wohlii:consent', (e) => { if (e.detail.maps && $('.map-gate', el)) el._live(); });
    }
    if (consent && consent.maps) live(); else sketch();
    return ctrl;
  }

  /* ---------- Anfrage per E-Mail / Anruf ---------- */
  function inquiryDialog(unit, host, monthValue) {
    let dlg = $('#inquiry');
    if (dlg) dlg.remove();
    const user = store.currentUser();
    const [y, m] = (monthValue || '').split('-').map(Number);
    const arrival = y ? store.iso(new Date(y, m - 1, Math.max(1, new Date().getMonth() === m - 1 && new Date().getFullYear() === y ? new Date().getDate() + 1 : 1))) : '';
    dlg = document.createElement('dialog');
    dlg.id = 'inquiry';
    dlg.className = 'dialog';
    dlg.innerHTML = `
      <form method="dialog" class="dialog-body" novalidate>
        <button class="dialog-close" value="cancel" aria-label="Schließen">×</button>
        <p class="eyebrow">Direkt beim Gastgeber anfragen</p>
        <h2>${esc(unit.name)} · ${esc(host.name)}</h2>
        <p class="small muted">Ihre Anfrage geht ohne Umweg an ${esc(host.team?.operator?.name || host.name)}. wohlii-urlaub.de liest nicht mit und berechnet Ihnen nichts.</p>
        <div class="form-grid">
          <label>Anreise<input type="date" id="q-from" value="${arrival}" required></label>
          <label>Abreise<input type="date" id="q-to" required></label>
          <label>Personen<input type="number" id="q-persons" min="1" max="${unit.persons || 10}" value="2"></label>
          <label>Ihr Name<input type="text" id="q-name" autocomplete="name" value="${esc(user && user.role === 'guest' && !user.name.includes('Demo') ? user.name : '')}"></label>
          <label class="span2">Nachricht<textarea id="q-msg" rows="3" placeholder="z. B. Wir reisen mit Hund und kommen mit der letzten Fähre an."></textarea></label>
        </div>
        <div class="dialog-actions">
          <a class="btn btn-primary" id="q-mail" href="#">E-Mail vorbereiten</a>
          <a class="btn btn-call" id="q-call" href="${telHref(host.phone)}">Anrufen: ${esc(host.phone)}</a>
        </div>
        <p class="small muted">E-Mail-Adresse: <span class="select-all">${esc(host.email)}</span> <button type="button" class="linklike" data-copy="${esc(host.email)}">kopieren</button></p>
        ${user ? '' : '<p class="small">Tipp: <a href="login.html">Mit Gast-Konto anmelden</a>, dann sehen Sie Ihre Anfragen später im Überblick.</p>'}
      </form>`;
    document.body.appendChild(dlg);
    const val = (id) => $('#' + id, dlg).value;
    const fmt = (s) => (s ? new Date(s + 'T12:00').toLocaleDateString('de-DE') : '…');
    $('#q-mail', dlg).addEventListener('click', (e) => {
      const subject = `Anfrage über wohlii-urlaub.de: ${unit.name}, ${fmt(val('q-from'))} – ${fmt(val('q-to'))}`;
      const body = [
        'Moin und guten Tag,',
        '',
        `ich interessiere mich für „${unit.name}“ (${host.name}).`,
        `Anreise: ${fmt(val('q-from'))}`,
        `Abreise: ${fmt(val('q-to'))}`,
        `Personen: ${val('q-persons')}`,
        val('q-msg') ? '\n' + val('q-msg') : '',
        '',
        'Herzliche Grüße',
        val('q-name'),
        '',
        '— gefunden auf www.wohlii-urlaub.de',
      ].join('\n');
      e.currentTarget.href = `mailto:${host.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      store.logInquiry({ unitId: unit.id, type: 'E-Mail', from: val('q-from'), to: val('q-to'), persons: val('q-persons') });
    });
    $('#q-call', dlg).addEventListener('click', () => store.logInquiry({ unitId: unit.id, type: 'Anruf', from: val('q-from'), to: val('q-to'), persons: val('q-persons') }));
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    bindCopy(dlg);
    dlg.showModal();
  }

  function bindCopy(root = document) {
    $$('[data-copy]', root).forEach((b) =>
      b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(b.dataset.copy); toast('Kopiert: ' + b.dataset.copy); } catch (e) { toast('Bitte Adresse markieren und kopieren.'); }
      }));
  }

  /* ---------- Unterkunfts-Bausteine ---------- */
  function favButton(unit) {
    const on = store.favorites().includes(unit.id);
    return `<button type="button" class="fav ${on ? 'on' : ''}" data-fav="${esc(unit.id)}" aria-pressed="${on}" aria-label="${on ? 'Aus Favoriten entfernen' : 'Als Favorit merken'}">${on ? '♥' : '♡'}</button>`;
  }
  function bindFavs(root = document) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-fav]');
      if (!b) return;
      e.preventDefault();
      const on = store.toggleFavorite(b.dataset.fav);
      $$(`[data-fav="${b.dataset.fav}"]`).forEach((x) => { x.classList.toggle('on', on); x.textContent = on ? '♥' : '♡'; x.setAttribute('aria-pressed', on); });
      refreshFavCount();
      toast(on ? 'Als Favorit gemerkt' : 'Aus Favoriten entfernt');
      document.dispatchEvent(new CustomEvent('wohlii:favs'));
    });
  }

  const photoOf = (unit, i = 0) => (unit.photos && unit.photos[i]) || { src: 'assets/img/macro/leinen.jpg', placeholder: true };
  const unitUrl = (u) => 'unterkunft.html?id=' + encodeURIComponent(u.id);
  const hostUrl = (h) => 'haus.html?id=' + encodeURIComponent(h.id);

  /** Kachel wie im Produkt-Raster (Apartmenthaus-Seite, Favoriten) */
  function unitTile(unit, host) {
    const ph = photoOf(unit);
    return `
      <article class="tile">
        <a class="tile-img" href="${unitUrl(unit)}">
          <img src="${esc(ph.src)}" alt="${esc(unit.name)} – Foto" loading="lazy">
          ${ph.placeholder ? '<span class="ph-badge">Platzhalter-Foto</span>' : ''}
        </a>
        ${favButton(unit)}
        <div class="tile-body">
          <h3><a href="${unitUrl(unit)}">${esc(unit.name)}</a></h3>
          <p class="tile-tag">${esc(unit.tagline || '')} ${placeholderTag(unit, 'tagline')}</p>
          <p class="facts">${esc(unit.persons)} Pers. ${placeholderTag(unit, 'persons')} · ${esc(unit.sqm)} m² ${placeholderTag(unit, 'sqm')} · ab ${esc(unit.priceFrom)} € ${placeholderTag(unit, 'priceFrom')}</p>
          ${host ? `<p class="small muted">${esc(host.name)}, ${esc(host.place)}</p>` : ''}
        </div>
      </article>`;
  }

  /** Eintrag am Schwarzen Brett: Foto, Eckdaten, Monatskalender, Kontakt */
  function boardEntry(unit, host, y, m) {
    const ph = photoOf(unit);
    const art = document.createElement('article');
    art.className = 'board-entry';
    art.dataset.host = host.id;
    art.dataset.unit = unit.id;
    art.innerHTML = `
      <a class="be-img" href="${unitUrl(unit)}">
        <img src="${esc(ph.src)}" alt="${esc(unit.name)} – Foto" loading="lazy">
        ${ph.placeholder ? '<span class="ph-badge">Platzhalter-Foto</span>' : ''}
      </a>
      <div class="be-info">
        <p class="eyebrow"><span class="chip chip-${unit.category === 'Hotel' ? 'hotel' : unit.category === 'Ferienwohnung' ? 'fewo' : 'zmf'}">${esc(unit.category)}</span> ${esc(host.place)} · ${esc(host.region)}${host.demo ? ' <span class="chip chip-demo" title="Frei erfundener Beispiel-Eintrag">Demo</span>' : ''}</p>
        <h3><a href="${unitUrl(unit)}">${esc(unit.name)}</a> <span class="be-house">· <a href="${hostUrl(host)}">${esc(host.name)}</a></span></h3>
        <p class="tile-tag">${esc(unit.tagline || '')} ${placeholderTag(unit, 'tagline')}</p>
        <p class="facts">${esc(unit.persons)} Pers. ${placeholderTag(unit, 'persons')} · ${esc(unit.sqm)} m² ${placeholderTag(unit, 'sqm')} · ab ${esc(unit.priceFrom)} € / Nacht ${placeholderTag(unit, 'priceFrom')}</p>
        <div class="be-actions">
          <button type="button" class="btn btn-primary btn-sm" data-inquire="${esc(unit.id)}">E-Mail-Anfrage</button>
          <a class="btn btn-call btn-sm" href="${telHref(host.phone)}" data-call="${esc(unit.id)}">Anrufen</a>
          <a class="btn btn-ghost btn-sm" href="${unitUrl(unit)}">Details</a>
        </div>
      </div>
      <div class="be-cal"></div>
      ${favButton(unit)}`;
    $('.be-cal', art).appendChild(monthCalendar(unit.id, y, m, { compact: true }));
    return art;
  }

  function bindContactButtons(root, monthValueFn) {
    root.addEventListener('click', (e) => {
      const q = e.target.closest('[data-inquire]');
      if (q) {
        const unit = store.unit(q.dataset.inquire);
        inquiryDialog(unit, store.host(unit.hostId), monthValueFn && monthValueFn());
      }
      const c = e.target.closest('[data-call]');
      if (c) store.logInquiry({ unitId: c.dataset.call, type: 'Anruf' });
    });
  }

  /* ---------- Auth-Wächter ---------- */
  function requireRole(role) {
    const u = store.currentUser();
    if (!u || u.role !== role) {
      location.replace('login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search + location.hash) + '&rolle=' + role);
      return null;
    }
    return u;
  }

  Object.assign(W, {
    esc, $, $$, param, MONTHS, monthList, telHref, mapsLink, toast, placeholderTag,
    monthCalendar, calLegend, mountMap, inquiryDialog, bindCopy,
    unitTile, boardEntry, bindFavs, bindContactButtons, favButton, photoOf, unitUrl, hostUrl,
    requireRole, refreshFavCount,
  });

  document.addEventListener('DOMContentLoaded', () => {
    store.ensureDemoUsers();
    renderChrome();
    consentBanner(false);
  });
})();
