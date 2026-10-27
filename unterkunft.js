/* Detailseite einer Unterkunft: 4 Fotos, Beschreibung, Kalender, Karte, Kontakt */
(function () {
  const W = window.Wohlii;
  const { store, $, $$, esc } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const app = $('#app');
    const unit = store.unit(W.param('id') || 'saathoff-w1');
    const host = unit && store.host(unit.hostId);
    if (!unit || !host) {
      app.innerHTML = '<div class="wrap page-head"><h1>Unterkunft nicht gefunden</h1><p><a href="index.html">Zurück zum Schwarzen Brett</a></p></div>';
      return;
    }
    document.title = `${unit.name} · ${host.name} – wohlii urlaub`;
    const photos = (unit.photos || []).slice(0, 4);
    while (photos.length < 4) photos.push(W.photoOf(unit, photos.length));
    const siblings = store.unitsOfHost(host.id).filter((u) => u.id !== unit.id).slice(0, 4);
    const ph = (f) => W.placeholderTag(unit, f);

    app.innerHTML = `
      <div class="wrap">
        <p class="crumbs"><a href="index.html">Schwarzes Brett</a> › <a href="${W.hostUrl(host)}">${esc(host.name)}</a> › ${esc(unit.name)}</p>
        <div class="board-head" style="margin-bottom:1rem">
          <div>
            <p class="eyebrow"><span class="chip chip-${unit.category === 'Hotel' ? 'hotel' : unit.category === 'Ferienwohnung' ? 'fewo' : 'zmf'}">${esc(unit.category)}</span> ${esc(host.place)} · ${esc(host.region)}${host.demo ? ' <span class="chip chip-demo">Demo</span>' : ''}</p>
            <h1 style="margin:0">${esc(unit.name)} <span class="muted" style="font-size:.55em">· ${esc(host.name)}</span></h1>
            <p class="tile-tag" style="font-size:1.6rem;margin:.2rem 0 0">${esc(unit.tagline || '')} ${ph('tagline')}</p>
          </div>
          ${W.favButton(unit)}
        </div>

        <div class="gallery" aria-label="Fotos (${photos.length})">
          ${photos.map((p, i) => `<button type="button" data-photo="${i}" aria-label="Foto ${i + 1} von ${photos.length} vergrößern"><img src="${esc(p.src)}" alt="${esc(unit.name)} – Foto ${i + 1}" ${i ? 'loading="lazy"' : ''}>${p.placeholder ? '<span class="ph-badge">Platzhalter-Foto</span>' : ''}</button>`).join('')}
        </div>

        <div class="detail-grid">
          <div>
            <div class="keyfacts">
              <div><b>${esc(unit.persons)} ${ph('persons')}</b><span>Personen</span></div>
              <div><b>${esc(unit.sqm)} m² ${ph('sqm')}</b><span>Wohnfläche</span></div>
              <div><b>${esc(unit.rooms)} ${ph('rooms')}</b><span>${unit.rooms === 1 ? 'Raum' : 'Räume'}</span></div>
              <div><b>ab ${esc(unit.priceFrom)} € ${ph('priceFrom')}</b><span>pro Nacht</span></div>
            </div>
            <p style="font-size:1.08rem">${esc(unit.description)} ${ph('description')}</p>
            ${unit.features && unit.features.length ? `<ul class="features">${unit.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul> ${ph('features')}` : ''}

            <section class="block" aria-labelledby="cal-title">
              <div class="board-head" style="margin-bottom:.8rem">
                <div><p class="eyebrow">Belegungskalender</p><h2 id="cal-title" style="margin:0">Wann ist frei?</h2></div>
                <div class="month-nav"><button type="button" id="c-prev" aria-label="Frühere Monate">‹</button><strong id="c-label"></strong><button type="button" id="c-next" aria-label="Spätere Monate">›</button></div>
              </div>
              <div class="cal-row" id="cals"></div>
              ${W.calLegend()}
            </section>

            <section class="block" aria-labelledby="team-title">
              <p class="eyebrow">Persönliche Betreuung</p>
              <h2 id="team-title">Wer ist für Sie da?</h2>
              ${W.peopleBlock(host)}
            </section>

            <section class="block" aria-labelledby="lage-title">
              <p class="eyebrow">Lage</p>
              <h2 id="lage-title">${esc(host.street)}, ${esc(host.zip)} ${esc(host.place)}</h2>
              <div class="detail-map" id="map"></div>
              <p class="small" style="margin-top:.6rem"><a href="${W.mapsLink(unit.lat, unit.lng, host.name + ', ' + host.street + ', ' + host.zip + ' ' + host.place)}" target="_blank" rel="noopener">Route in Google Maps planen ↗</a></p>
            </section>
          </div>
          ${W.contactCard(host, { unit, title: 'Direkt beim Gastgeber anfragen' })}
        </div>

        ${siblings.length ? `
        <section class="block" aria-labelledby="more-title">
          <p class="eyebrow">Im selben Haus</p>
          <h2 id="more-title">Weitere Unterkünfte bei ${esc(host.name)}</h2>
          <div class="tile-grid">${siblings.map((u) => W.unitTile(u)).join('')}</div>
          <p style="margin-top:1rem"><a href="${W.hostUrl(host)}">Alle Unterkünfte von ${esc(host.name)} ansehen →</a></p>
        </section>` : ''}
      </div>`;

    // Handy: Kontakt-Leiste immer erreichbar
    const cta = document.createElement('div');
    cta.className = 'mobile-cta';
    cta.innerHTML = `<button type="button" class="btn btn-primary" data-inquire="${esc(unit.id)}">E-Mail-Anfrage</button><a class="btn btn-call" href="${W.telHref(host.phone)}" data-call="${esc(unit.id)}">Anrufen</a>`;
    app.appendChild(cta);
    document.body.classList.add('has-cta');

    // Kalender: drei Monate, blätterbar
    const months = W.monthList();
    let start = 0;
    function renderCals() {
      const box = $('#cals');
      box.innerHTML = '';
      months.slice(start, start + 3).forEach(({ y, m }) => box.appendChild(W.monthCalendar(unit.id, y, m)));
      $('#c-label').textContent = `${months[start].label.split(' ')[0]} – ${months[Math.min(start + 2, months.length - 1)].label}`;
      $('#c-prev').disabled = start === 0;
      $('#c-next').disabled = start + 3 >= months.length;
    }
    $('#c-prev').addEventListener('click', () => { start = Math.max(0, start - 3); renderCals(); });
    $('#c-next').addEventListener('click', () => { start = Math.min(months.length - 3, start + 3); renderCals(); });
    renderCals();

    // Lightbox
    const lb = document.createElement('dialog');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt=""><div class="lightbox-bar"><button type="button" data-lb="-1">‹ zurück</button><span></span><button type="button" data-lb="1">weiter ›</button><button type="button" data-lb="x">Schließen</button></div>';
    document.body.appendChild(lb);
    let cur = 0;
    const show = (i) => {
      cur = (i + photos.length) % photos.length;
      $('img', lb).src = photos[cur].src;
      $('img', lb).alt = `${unit.name} – Foto ${cur + 1}`;
      $('span', lb).textContent = `Foto ${cur + 1} von ${photos.length}${photos[cur].placeholder ? ' · Platzhalter' : ''}`;
    };
    $$('[data-photo]', app).forEach((b) => b.addEventListener('click', () => { show(+b.dataset.photo); lb.showModal(); }));
    lb.addEventListener('click', (e) => {
      const a = e.target.dataset.lb;
      if (a === 'x' || e.target === lb) lb.close(); else if (a) show(cur + +a);
    });
    lb.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });

    W.mountMap($('#map'), [{ id: unit.id, lat: unit.lat, lng: unit.lng, label: '♥', title: unit.name, html: `<div class="map-popup"><b>${esc(unit.name)}</b>${esc(host.name)}<br>${esc(host.street)}, ${esc(host.place)}</div>` }], { zoom: 15 });
    W.bindFavs(app);
    W.bindContactButtons(app, () => months[start].value);

    W.jsonLd({
      '@context': 'https://schema.org', '@type': unit.category === 'Hotel' ? 'HotelRoom' : 'Accommodation', name: `${unit.name} – ${host.name}`,
      description: unit.description, occupancy: { '@type': 'QuantitativeValue', maxValue: unit.persons },
      floorSize: { '@type': 'QuantitativeValue', value: unit.sqm, unitCode: 'MTK' }, numberOfRooms: unit.rooms,
      address: { '@type': 'PostalAddress', streetAddress: host.street, postalCode: host.zip, addressLocality: host.place, addressCountry: 'DE' },
      geo: { '@type': 'GeoCoordinates', latitude: unit.lat, longitude: unit.lng },
    });
  });
})();
