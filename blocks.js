/* Bausteine für Apartmenthaus- und Detailseite: Ansprechpartner, Kontaktkarte, strukturierte Daten */
(function () {
  const W = window.Wohlii;
  const { esc } = W;

  W.peopleBlock = function (host) {
    const t = host.team || {};
    const roles = [
      ['operator', 'Betreiber', 'Wer vermietet?'],
      ['cleaning', 'Reinigung', 'Wer macht sauber?'],
      ['greeting', 'Begrüßung', 'Wer empfängt Sie?'],
    ];
    return `<div class="people">${roles.map(([k, role, q]) => {
      const p = t[k] || {};
      return `<div class="person"><span class="role">${role}</span><h3>${esc(p.name || 'noch nicht angegeben')} ${p.placeholder ? '<abbr class="ph" title="Platzhalter – echte Angabe folgt">PH</abbr>' : ''}</h3><p><span class="sr">${q} </span>${esc(p.text || '')}</p></div>`;
    }).join('')}</div>`;
  };

  W.contactCard = function (host, { unit = null, title = 'Direkt anfragen' } = {}) {
    const addr = [host.street, [host.zip, host.place].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    return `
      <aside class="contact-card" aria-label="Kontakt zum Gastgeber">
        ${unit ? `<p style="margin:0"><span class="muted small">ab</span> <span class="price">${esc(unit.priceFrom)} €</span> <span class="muted small">/ Nacht ${W.placeholderTag(unit, 'priceFrom')}</span></p>` : ''}
        <h2 style="font-size:1.25rem;margin:0">${title}</h2>
        ${unit ? `<button type="button" class="btn btn-primary" data-inquire="${esc(unit.id)}">Anfrage per E-Mail</button>` : `<a class="btn btn-primary" href="mailto:${esc(host.email)}?subject=${encodeURIComponent('Anfrage über wohlii-urlaub.de')}">E-Mail schreiben</a>`}
        <a class="btn btn-call" href="${W.telHref(host.phone)}" ${unit ? `data-call="${esc(unit.id)}"` : ''}>Anrufen: ${esc(host.phone)}</a>
        ${host.website ? `<a class="btn btn-ghost" href="${esc(host.website)}" target="_blank" rel="noopener">Website des Gastgebers ↗</a>` : ''}
        <dl>
          <dt>E-Mail</dt><dd><span class="select-all">${esc(host.email)}</span></dd>
          <dt>Telefon</dt><dd>${esc(host.phone)}</dd>
          <dt>Adresse</dt><dd>${esc(addr)}<br><a href="${W.mapsLink(host.lat, host.lng, host.name + ', ' + addr)}" target="_blank" rel="noopener">In Google Maps öffnen ↗</a></dd>
        </dl>
        <p class="small muted" style="margin:0">Buchung und Bezahlung vereinbaren Sie direkt mit dem Gastgeber. wohlii-urlaub.de erhebt keine Buchungsprovision.</p>
      </aside>`;
  };

  W.jsonLd = function (obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  };
})();
