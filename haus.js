/* Seite eines Apartmenthauses / Gastgebers: alle Wohnungen im Kachel-Raster */
(function () {
  const W = window.Wohlii;
  const { store, $, esc } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const host = store.host(W.param('id') || 'saathoff');
    const app = $('#app');
    if (!host) {
      app.innerHTML = '<div class="wrap page-head"><h1>Gastgeber nicht gefunden</h1><p><a href="index.html">Zurück zum Schwarzen Brett</a></p></div>';
      return;
    }
    document.title = host.name + ' – wohlii urlaub';
    const units = store.unitsOfHost(host.id);
    app.innerHTML = `
      <section class="house-hero">
        <img src="${esc(host.cover)}" alt="">
        <div class="wrap">
          <p class="eyebrow" style="color:#fff">${esc(host.region)} · ${esc(host.state)}${host.demo ? ' <span class="chip chip-demo">Demo-Eintrag</span>' : ''}</p>
          <h1>${esc(host.name)}</h1>
          <p>${esc(host.place)} · ${units.length} ${units.length === 1 ? 'Unterkunft' : 'Unterkünfte'}</p>
        </div>
      </section>
      <div class="wrap">
        <p class="crumbs"><a href="index.html">Schwarzes Brett</a> › ${esc(host.name)}</p>
        <section class="house-intro section" style="padding-top:1rem">
          <div>
            <p class="eyebrow">Willkommen</p>
            <h2>${esc(host.place)}, ganz persönlich</h2>
            <p style="font-size:1.08rem">${esc(host.intro)}</p>
            ${host.extras && host.extras.length ? `<ul class="features">${host.extras.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
            ${host.id === 'saathoff' ? '<p class="ph-note small">Beispiel-Gastgeber im Entwurf. Größen, Preise, Beschreibungen und Namen sind teils <strong>Platzhalter</strong> (markiert mit <abbr class="ph">PH</abbr>) und werden durch echte Angaben des Apartmenthauses ersetzt.</p>' : ''}
            ${host.demo ? '<p class="ph-note small">Dieser Gastgeber ist frei erfunden und dient nur als Beispiel für die Regionssuche.</p>' : ''}
          </div>
          ${W.contactCard(host)}
        </section>

        <section aria-labelledby="units-title">
          <div class="board-head"><div><p class="eyebrow">Unsere Wohnungen</p><h2 id="units-title">Suchen Sie sich Ihr Lieblingsplätzchen aus</h2></div></div>
          <div class="tile-grid" id="tiles">${units.map((u) => W.unitTile(u)).join('')}</div>
        </section>

        <section class="block" aria-labelledby="team-title">
          <p class="eyebrow">Persönliche Betreuung</p>
          <h2 id="team-title">Die Menschen hinter dem Haus</h2>
          ${W.peopleBlock(host)}
        </section>

        <section class="block" aria-labelledby="lage-title">
          <p class="eyebrow">Lage</p>
          <h2 id="lage-title">Hier finden Sie uns</h2>
          <div class="detail-map" id="map"></div>
        </section>
      </div>`;
    W.mountMap($('#map'), [{ id: host.id, lat: host.lat, lng: host.lng, label: units.length, title: host.name, html: `<div class="map-popup"><b>${esc(host.name)}</b>${esc(host.street)}, ${esc(host.zip)} ${esc(host.place)}</div>` }], { zoom: 15 });
    W.bindFavs(app);
    W.bindContactButtons(app);
    W.jsonLd({
      '@context': 'https://schema.org', '@type': 'LodgingBusiness', name: host.name, url: host.website || location.href, email: host.email, telephone: host.phone,
      address: { '@type': 'PostalAddress', streetAddress: host.street, postalCode: host.zip, addressLocality: host.place, addressCountry: 'DE' },
      geo: { '@type': 'GeoCoordinates', latitude: host.lat, longitude: host.lng },
    });
  });
})();
