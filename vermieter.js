/* Gastgeber-Bereich: Unterkünfte, Fotos, Belegung, Haus & Ansprechpartner, Google Maps */
(function () {
  const W = window.Wohlii;
  const { store, $, $$, esc } = W;
  const CATS = window.WOHLII_SEED.categories;
  const REGIONS = ['Nordsee', 'Ostsee', 'Allgäu', 'Alpen', 'Bayerischer Wald', 'Schwarzwald', 'Harz', 'Lüneburger Heide', 'Sächsische Schweiz', 'Eifel', 'Mosel', 'Bodensee', 'Spreewald', 'Mecklenburgische Seenplatte', 'Rhön', 'Sauerland', 'Thüringer Wald', 'Städtereise'];
  const STATES = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'];

  /** Foto verkleinern, damit es im Browser-Speicher Platz hat (Livebetrieb: Upload zum Server) */
  function resize(file, max = 1200, q = 0.72) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * s);
        c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(img.src);
        res(c.toDataURL('image/jpeg', q));
      };
      img.onerror = () => rej(new Error('Das Bild konnte nicht gelesen werden.'));
      img.src = URL.createObjectURL(file);
    });
  }

  const options = (list, sel) => list.map((x) => `<option ${x === sel ? 'selected' : ''}>${esc(x)}</option>`).join('');

  document.addEventListener('DOMContentLoaded', () => {
    const user = W.requireRole('host');
    if (!user) return;
    const app = $('#app');
    let host = store.host(user.hostId);
    const months = W.monthList();

    app.innerHTML = `
      <div class="wrap">
        <div class="dash-head">
          <div><p class="eyebrow">Gastgeber-Bereich</p><h1 id="dash-title">${esc(host.name)}</h1></div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            <a class="btn btn-ghost btn-sm" href="${W.hostUrl(host)}">Meine öffentliche Seite</a>
            <button type="button" class="btn btn-ghost btn-sm" id="logout">Abmelden</button>
          </div>
        </div>
        <div class="dash-tabs" role="tablist">
          <button type="button" role="tab" data-t="unterkuenfte">Unterkünfte</button>
          <button type="button" role="tab" data-t="belegung">Belegungskalender</button>
          <button type="button" role="tab" data-t="haus">Haus & Ansprechpartner</button>
          <button type="button" role="tab" data-t="sichtbarkeit">Google Maps & Verlinkung</button>
        </div>
        <section id="t-unterkuenfte"></section>
        <section id="t-belegung" hidden></section>
        <section id="t-haus" hidden></section>
        <section id="t-sichtbarkeit" hidden></section>
      </div>`;

    const tabs = ['unterkuenfte', 'belegung', 'haus', 'sichtbarkeit'];
    function tab(t) {
      if (!tabs.includes(t)) t = 'unterkuenfte';
      $$('[data-t]').forEach((b) => b.setAttribute('aria-selected', b.dataset.t === t));
      tabs.forEach((x) => ($('#t-' + x).hidden = x !== t));
      ({ unterkuenfte: renderUnits, belegung: renderCalendar, haus: renderHost, sichtbarkeit: renderVisibility })[t]();
      history.replaceState(null, '', '#' + t);
    }
    $$('[data-t]').forEach((b) => b.addEventListener('click', () => tab(b.dataset.t)));
    $('#logout').addEventListener('click', () => { store.logout(); location.href = 'index.html'; });

    /* ---------- Unterkünfte ---------- */
    function renderUnits() {
      const units = store.unitsOfHost(host.id, { includeHidden: true });
      const box = $('#t-unterkuenfte');
      box.innerHTML = `
        <div class="panel">
          <div class="board-head" style="margin-bottom:1rem">
            <div><h2 style="margin:0">Ihre Unterkünfte</h2><p class="small muted" style="margin:0">${units.length} angelegt · max. 4 Fotos je Unterkunft</p></div>
            <button type="button" class="btn btn-primary btn-sm" id="u-new">+ Neue Unterkunft</button>
          </div>
          <div class="unit-rows">
            ${units.length ? units.map((u) => `
              <div class="unit-row">
                <img src="${esc(W.photoOf(u).src)}" alt="">
                <div><h3>${esc(u.name)} ${u.visible === false ? '<span class="chip chip-demo">verborgen</span>' : ''}</h3>
                <p>${esc(u.category)} · ${esc(u.persons)} Pers. · ${esc(u.sqm)} m² · ab ${esc(u.priceFrom)} €</p></div>
                <div class="row-actions">
                  <button type="button" class="btn btn-ghost btn-sm" data-edit="${esc(u.id)}">Bearbeiten</button>
                  <button type="button" class="btn btn-ghost btn-sm" data-cal="${esc(u.id)}">Kalender</button>
                  <a class="btn btn-ghost btn-sm" href="${W.unitUrl(u)}">Ansehen</a>
                </div>
              </div>`).join('') : '<div class="empty">Noch keine Unterkunft angelegt. Los geht’s mit „Neue Unterkunft“.</div>'}
          </div>
        </div>`;
      $('#u-new').addEventListener('click', () => editUnit(null));
      $$('[data-edit]', box).forEach((b) => b.addEventListener('click', () => editUnit(b.dataset.edit)));
      $$('[data-cal]', box).forEach((b) => b.addEventListener('click', () => { calState.unitId = b.dataset.cal; tab('belegung'); }));
    }

    function editUnit(id) {
      const isNew = !id;
      const u = isNew
        ? { id: host.id + '-' + Date.now().toString(36), hostId: host.id, name: '', tagline: '', category: CATS[0], persons: 2, sqm: '', rooms: 1, priceFrom: '', description: '', features: [], photos: [], lat: host.lat, lng: host.lng, visible: true, placeholderFields: [] }
        : JSON.parse(JSON.stringify(store.unit(id)));
      const photos = (u.photos || []).slice(0, 4);
      const box = $('#t-unterkuenfte');
      box.innerHTML = `
        <form class="panel" id="u-form" novalidate>
          <p class="small"><button type="button" class="linklike" id="u-back">← zurück zur Übersicht</button></p>
          <h2>${isNew ? 'Neue Unterkunft anlegen' : esc(u.name) + ' bearbeiten'}</h2>
          <div class="form-grid">
            <label for="u-name">Name<input id="u-name" required value="${esc(u.name)}" placeholder="z. B. Wohnung 3 oder Zimmer Enzian"></label>
            <label for="u-cat">Kategorie<select id="u-cat">${options(CATS, u.category)}</select></label>
            <label class="span2" for="u-tag">Kurzbeschreibung (eine Zeile)<input id="u-tag" value="${esc(u.tagline)}" placeholder="z. B. In den Farben des Meers eingerichtet"></label>
            <label for="u-persons">Max. Personen<input id="u-persons" type="number" min="1" max="20" value="${esc(u.persons)}"></label>
            <label for="u-sqm">Wohnfläche (m²)<input id="u-sqm" type="number" min="5" value="${esc(u.sqm)}"></label>
            <label for="u-rooms">Räume<input id="u-rooms" type="number" min="1" value="${esc(u.rooms)}"></label>
            <label for="u-price">Preis ab (€ / Nacht)<input id="u-price" type="number" min="0" value="${esc(u.priceFrom)}"></label>
            <label class="span2" for="u-desc">Beschreibung<textarea id="u-desc" rows="5">${esc(u.description)}</textarea></label>
            <label class="span2" for="u-feat">Ausstattung <span class="hint">mit Komma trennen</span><input id="u-feat" value="${esc((u.features || []).join(', '))}" placeholder="Balkon, WLAN, Kinderbett"></label>
            <label for="u-lat">Breitengrad <span class="hint">für die Karte</span><input id="u-lat" type="number" step="0.00001" value="${esc(u.lat)}"></label>
            <label for="u-lng">Längengrad<input id="u-lng" type="number" step="0.00001" value="${esc(u.lng)}"></label>
            <label class="check span2"><input type="checkbox" id="u-visible" ${u.visible !== false ? 'checked' : ''}> Auf wohlii-urlaub.de anzeigen</label>
          </div>
          <h3 style="margin-top:1.4rem">Fotos <span class="hint">max. 4 · das erste ist das Titelbild · JPG/PNG</span></h3>
          <div class="photo-slots" id="u-photos"></div>
          <p class="error" id="u-err" role="alert"></p>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Speichern</button>
            <button type="button" class="btn btn-ghost" id="u-cancel">Abbrechen</button>
            ${isNew ? '' : '<button type="button" class="btn btn-ghost" id="u-del" style="margin-left:auto">Unterkunft löschen</button>'}
          </div>
          <div id="u-confirm" class="ph-note" hidden style="margin-top:1rem">
            <p><strong>Wirklich löschen?</strong> „${esc(u.name)}“ verschwindet mit Kalender und Fotos.</p>
            <button type="button" class="btn btn-call btn-sm" id="u-del-yes">Ja, löschen</button>
            <button type="button" class="btn btn-ghost btn-sm" id="u-del-no">Behalten</button>
          </div>
        </form>`;

      function renderSlots() {
        $('#u-photos').innerHTML = [0, 1, 2, 3].map((i) => photos[i]
          ? `<div class="photo-slot"><img src="${esc(photos[i].src)}" alt="Foto ${i + 1}"><button type="button" class="remove" data-rm="${i}" aria-label="Foto ${i + 1} entfernen">×</button></div>`
          : `<label class="photo-slot">+ Foto ${i + 1}<input type="file" accept="image/*" data-up="${i}" aria-label="Foto ${i + 1} hochladen"></label>`).join('');
        $$('[data-rm]').forEach((b) => b.addEventListener('click', () => { photos.splice(+b.dataset.rm, 1); renderSlots(); }));
        $$('[data-up]').forEach((inp) => inp.addEventListener('change', async () => {
          const f = inp.files[0];
          if (!f) return;
          try { photos.push({ src: await resize(f) }); renderSlots(); } catch (e) { $('#u-err').textContent = e.message; }
        }));
      }
      renderSlots();

      const back = () => renderUnits();
      $('#u-back').addEventListener('click', back);
      $('#u-cancel').addEventListener('click', back);
      if (!isNew) {
        $('#u-del').addEventListener('click', () => ($('#u-confirm').hidden = false));
        $('#u-del-no').addEventListener('click', () => ($('#u-confirm').hidden = true));
        $('#u-del-yes').addEventListener('click', () => { store.removeUnit(u.id); W.toast('Unterkunft gelöscht'); back(); });
      }
      $('#u-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = $('#u-name').value.trim();
        if (!name) { $('#u-err').textContent = 'Bitte geben Sie der Unterkunft einen Namen.'; $('#u-name').focus(); return; }
        const touched = { name, tagline: $('#u-tag').value.trim(), persons: +$('#u-persons').value || 1, sqm: +$('#u-sqm').value || '', rooms: +$('#u-rooms').value || 1, priceFrom: +$('#u-price').value || '', description: $('#u-desc').value.trim(), features: $('#u-feat').value.split(',').map((x) => x.trim()).filter(Boolean) };
        // Was der Gastgeber selbst eingetragen hat, ist kein Platzhalter mehr.
        const same = (a, b) => JSON.stringify(Array.isArray(a) ? a : String(a ?? '')) === JSON.stringify(Array.isArray(b) ? b : String(b ?? ''));
        const ph = (u.placeholderFields || []).filter((f) => !(f in touched) || same(touched[f], u[f]));
        const saved = { ...u, ...touched, category: $('#u-cat').value, lat: +$('#u-lat').value || host.lat, lng: +$('#u-lng').value || host.lng, visible: $('#u-visible').checked, photos, placeholderFields: ph };
        if (!store.saveUnit(saved)) { $('#u-err').textContent = 'Speichern nicht möglich – der Browser-Speicher ist voll. Bitte kleinere Fotos verwenden.'; return; }
        W.toast('Gespeichert');
        back();
      });
    }

    /* ---------- Belegung ---------- */
    const calState = { unitId: null, start: 0 };
    function renderCalendar() {
      const units = store.unitsOfHost(host.id, { includeHidden: true });
      const box = $('#t-belegung');
      if (!units.length) { box.innerHTML = '<div class="empty">Legen Sie zuerst eine Unterkunft an.</div>'; return; }
      if (!units.find((u) => u.id === calState.unitId)) calState.unitId = units[0].id;
      const booked = store.booked(calState.unitId);
      box.innerHTML = `
        <div class="panel">
          <div class="board-head">
            <label for="c-unit" style="min-width:220px">Unterkunft<select id="c-unit">${units.map((u) => `<option value="${esc(u.id)}" ${u.id === calState.unitId ? 'selected' : ''}>${esc(u.name)}</option>`).join('')}</select></label>
            <div class="month-nav"><button type="button" id="c-prev" aria-label="Frühere Monate">‹</button><strong>${months[calState.start].label} ff.</strong><button type="button" id="c-next" aria-label="Spätere Monate">›</button></div>
          </div>
          <p class="small muted">Tippen Sie auf einen Tag, um ihn zwischen <strong>frei</strong> und <strong>belegt</strong> umzuschalten. Änderungen werden sofort gespeichert und erscheinen am Schwarzen Brett.</p>
          <div class="cal-row" id="c-cals"></div>
          ${W.calLegend()}
        </div>
        <form class="panel" id="c-range">
          <h2>Zeitraum auf einmal eintragen</h2>
          <div class="form-grid" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
            <label for="r-from">Von (Anreise)<input type="date" id="r-from" required></label>
            <label for="r-to">Bis (Abreise)<input type="date" id="r-to" required></label>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-sm" data-mode="book">Als belegt markieren</button>
            <button type="submit" class="btn btn-ghost btn-sm" data-mode="free">Als frei markieren</button>
          </div>
          <p class="small muted">Die Abreisenacht bleibt frei – so kann am selben Tag der nächste Gast anreisen.</p>
        </form>`;
      const draw = () => {
        const c = $('#c-cals');
        c.innerHTML = '';
        months.slice(calState.start, calState.start + 3).forEach(({ y, m }) =>
          c.appendChild(W.monthCalendar(calState.unitId, y, m, { editable: true, booked, onToggle: (set) => { store.setBooked(calState.unitId, set); draw(); } })));
      };
      draw();
      $('#c-unit').addEventListener('change', (e) => { calState.unitId = e.target.value; renderCalendar(); });
      $('#c-prev').addEventListener('click', () => { calState.start = Math.max(0, calState.start - 3); renderCalendar(); });
      $('#c-next').addEventListener('click', () => { calState.start = Math.min(months.length - 3, calState.start + 3); renderCalendar(); });
      let mode = 'book';
      $$('[data-mode]', box).forEach((b) => b.addEventListener('click', () => (mode = b.dataset.mode)));
      $('#c-range').addEventListener('submit', (e) => {
        e.preventDefault();
        const from = $('#r-from').value;
        const to = $('#r-to').value;
        if (!from || !to || to <= from) { W.toast('Bitte gültigen Zeitraum wählen (Abreise nach Anreise).'); return; }
        const d = new Date(from + 'T12:00');
        let n = 0;
        while (store.iso(d) < to) {
          if (mode === 'book') booked.add(store.iso(d)); else booked.delete(store.iso(d));
          d.setDate(d.getDate() + 1);
          n++;
        }
        store.setBooked(calState.unitId, booked);
        W.toast(`${n} ${n === 1 ? 'Nacht' : 'Nächte'} als ${mode === 'book' ? 'belegt' : 'frei'} gespeichert`);
        draw();
      });
    }

    /* ---------- Haus & Ansprechpartner ---------- */
    function renderHost() {
      const t = host.team || {};
      const role = (k, label, hint) => `
        <fieldset class="panel" style="margin:0">
          <legend class="hand" style="font-size:1.5rem;padding:0 .3rem">${label}</legend>
          <div class="form-grid">
            <label for="t-${k}-name">Name<input id="t-${k}-name" value="${esc(t[k]?.name)}"></label>
            <label for="t-${k}-text">${hint}<input id="t-${k}-text" value="${esc(t[k]?.text)}"></label>
          </div>
        </fieldset>`;
      $('#t-haus').innerHTML = `
        <form class="panel" id="h-form" novalidate>
          <h2>Ihr Haus</h2>
          <div class="form-grid">
            <label class="span2" for="h-name">Name des Hauses<input id="h-name" value="${esc(host.name)}" required></label>
            <label for="h-region">Urlaubsregion<select id="h-region"><option value="">bitte wählen</option>${options([...new Set([host.region, ...REGIONS].filter(Boolean))], host.region)}</select></label>
            <label for="h-state">Bundesland<select id="h-state"><option value="">bitte wählen</option>${options(STATES, host.state)}</select></label>
            <label for="h-street">Straße & Hausnummer<input id="h-street" value="${esc(host.street)}" autocomplete="street-address"></label>
            <div class="form-grid" style="grid-template-columns:1fr 2fr;gap:.6rem">
              <label for="h-zip">PLZ<input id="h-zip" value="${esc(host.zip)}" inputmode="numeric" autocomplete="postal-code"></label>
              <label for="h-place">Ort<input id="h-place" value="${esc(host.place)}"></label>
            </div>
            <label for="h-email">E-Mail für Anfragen<input id="h-email" type="email" value="${esc(host.email)}"></label>
            <label for="h-phone">Telefon für Anrufe<input id="h-phone" type="tel" value="${esc(host.phone)}"></label>
            <label class="span2" for="h-web">Eigene Website <span class="hint">wird auf allen Ihren Seiten verlinkt</span><input id="h-web" type="url" value="${esc(host.website)}" placeholder="https://www.ihr-haus.de"></label>
            <label class="span2" for="h-intro">Begrüßungstext<textarea id="h-intro" rows="4">${esc(host.intro)}</textarea></label>
            <label class="span2" for="h-extras">Besonderheiten <span class="hint">mit Komma trennen</span><input id="h-extras" value="${esc((host.extras || []).join(', '))}"></label>
            <label class="span2">Titelbild des Hauses<input type="file" id="h-cover" accept="image/*"></label>
          </div>
          <h2 style="margin-top:1.6rem">Ansprechpartner vor Ort</h2>
          <p class="small muted">Das ist das Herz von wohlii: Gäste sehen, wer vermietet, wer reinigt und wer sie begrüßt.</p>
          <div class="stack">
            ${role('operator', 'Betreiber', 'Ein Satz über Sie')}
            ${role('cleaning', 'Reinigung', 'Wer reinigt und wie?')}
            ${role('greeting', 'Begrüßung', 'Wie läuft die Ankunft?')}
          </div>
          <p class="error" id="h-err" role="alert"></p>
          <div class="form-actions"><button type="submit" class="btn btn-primary">Speichern</button></div>
        </form>`;
      let cover = host.cover;
      $('#h-cover').addEventListener('change', async (e) => { if (e.target.files[0]) cover = await resize(e.target.files[0], 1600); });
      $('#h-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const v = (id) => $('#' + id).value.trim();
        if (!v('h-name')) { $('#h-err').textContent = 'Bitte geben Sie den Namen des Hauses ein.'; return; }
        if (v('h-web') && !/^https?:\/\//.test(v('h-web'))) { $('#h-err').textContent = 'Die Website muss mit https:// beginnen.'; return; }
        const team = {};
        ['operator', 'cleaning', 'greeting'].forEach((k) => { team[k] = { name: v(`t-${k}-name`), text: v(`t-${k}-text`) }; });
        host = { ...host, name: v('h-name'), region: v('h-region'), state: v('h-state'), street: v('h-street'), zip: v('h-zip'), place: v('h-place'), email: v('h-email'), phone: v('h-phone'), website: v('h-web'), intro: v('h-intro'), extras: v('h-extras').split(',').map((x) => x.trim()).filter(Boolean), cover, team };
        if (!store.saveHost(host)) { $('#h-err').textContent = 'Speichern nicht möglich – der Browser-Speicher ist voll.'; return; }
        $('#dash-title').textContent = host.name;
        W.toast('Haus gespeichert');
      });
    }

    /* ---------- Google Maps & Verlinkung ---------- */
    function renderVisibility() {
      const addr = `${host.name}, ${host.street}, ${host.zip} ${host.place}`;
      const badge = `<a href="${location.origin.startsWith('http') ? 'https://www.wohlii-urlaub.de/' : ''}haus.html?id=${host.id}" title="${host.name} auf wohlii-urlaub.de">Auch auf wohlii-urlaub.de – direkt beim Gastgeber</a>`;
      $('#t-sichtbarkeit').innerHTML = `
        <div class="panel">
          <h2>Position auf der wohlii-Karte</h2>
          <p class="small muted">Gäste sehen Ihr Haus auf der Karte am Schwarzen Brett und auf Ihrer Seite. Stimmen die Koordinaten?</p>
          <form class="form-grid" id="g-form" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
            <label for="g-lat">Breitengrad<input id="g-lat" type="number" step="0.00001" value="${esc(host.lat)}"></label>
            <label for="g-lng">Längengrad<input id="g-lng" type="number" step="0.00001" value="${esc(host.lng)}"></label>
            <div style="display:flex;align-items:end;gap:.5rem;flex-wrap:wrap"><button type="submit" class="btn btn-primary btn-sm">Position speichern</button></div>
          </form>
          <p class="small" style="margin-top:.8rem">So finden Sie die Koordinaten: <a href="${W.mapsLink(host.lat, host.lng, addr)}" target="_blank" rel="noopener">Adresse in Google Maps öffnen ↗</a>, rechts auf das Haus klicken – die erste Zeile (z. B. „53.70360, 7.15970“) ist Breiten- und Längengrad.</p>
          <label class="check small"><input type="checkbox" id="g-all" checked> Position auch für alle Unterkünfte des Hauses übernehmen</label>
        </div>
        <div class="panel">
          <h2>Ihr Eintrag bei Google Maps</h2>
          <p class="small muted">wohlii zeigt Ihr Haus auf der eigenen Karte. Damit Gäste Sie auch direkt in Google Maps finden, legen Sie ein kostenloses Google-Unternehmensprofil an:</p>
          <ol class="checklist">
            <li><span><a href="https://www.google.com/intl/de_de/business/" target="_blank" rel="noopener">Google Unternehmensprofil</a> öffnen und mit Ihrem Google-Konto anmelden.</span></li>
            <li><span>Name „${esc(host.name)}“ und Kategorie „Ferienwohnung“, „Pension“ oder „Hotel“ wählen.</span></li>
            <li><span>Adresse ${esc(host.street)}, ${esc(host.zip)} ${esc(host.place)} eintragen und die Markierung aufs Haus setzen.</span></li>
            <li><span>Als Website Ihre eigene Seite ${host.website ? `(<em>${esc(host.website)}</em>)` : ''} oder Ihre wohlii-Seite angeben.</span></li>
            <li><span>Bestätigung per Postkarte oder Telefon abschließen – danach erscheint Ihr Haus in Google Maps.</span></li>
          </ol>
          <p><a class="btn btn-ghost btn-sm" href="${W.mapsLink(host.lat, host.lng, host.name + ' ' + host.place)}" target="_blank" rel="noopener">Prüfen, ob Sie schon gefunden werden ↗</a></p>
        </div>
        <div class="panel">
          <h2>Verlinkung mit Ihrer Website</h2>
          <p class="small muted">Ihre Website ${host.website ? `<a href="${esc(host.website)}" target="_blank" rel="noopener">${esc(host.website)}</a>` : '(noch nicht eingetragen)'} wird auf Ihrer wohlii-Seite und bei jeder Unterkunft verlinkt. Umgekehrt können Sie diesen Link auf Ihrer Website einbauen:</p>
          <pre style="white-space:pre-wrap;overflow-wrap:anywhere;background:var(--stone-soft);padding:.8rem;border-radius:8px;font-size:.8rem">${esc(badge)}</pre>
          <button type="button" class="btn btn-ghost btn-sm" data-copy="${esc(badge)}">Code kopieren</button>
        </div>`;
      W.bindCopy($('#t-sichtbarkeit'));
      $('#g-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const lat = +$('#g-lat').value;
        const lng = +$('#g-lng').value;
        if (!(lat > 47 && lat < 55.2 && lng > 5.8 && lng < 15.1)) { W.toast('Die Koordinaten liegen nicht in Deutschland.'); return; }
        host = { ...host, lat, lng };
        store.saveHost(host);
        if ($('#g-all').checked) store.unitsOfHost(host.id, { includeHidden: true }).forEach((u) => store.saveUnit({ ...u, lat, lng }));
        W.toast('Position gespeichert');
      });
    }

    tab(location.hash.slice(1));
  });
})();
