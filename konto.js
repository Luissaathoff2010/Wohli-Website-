/* Gast-Konto: Favoriten und gesendete Anfragen */
(function () {
  const W = window.Wohlii;
  const { store, $, $$, esc } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const user = W.requireRole('guest');
    if (!user) return;
    const app = $('#app');
    const fmt = (s) => (s ? new Date(s.length === 10 ? s + 'T12:00' : s).toLocaleDateString('de-DE') : '–');

    function render() {
      const favs = store.favorites().map((id) => store.unit(id)).filter(Boolean);
      const inq = store.inquiries();
      app.innerHTML = `
        <div class="wrap">
          <div class="dash-head">
            <div><p class="eyebrow">Mein Konto</p><h1>Moin, ${esc(user.name)}</h1></div>
            <button type="button" class="btn btn-ghost btn-sm" id="logout">Abmelden</button>
          </div>
          <div class="dash-tabs" role="tablist">
            <button type="button" role="tab" data-t="favoriten" aria-selected="true">Favoriten (${favs.length})</button>
            <button type="button" role="tab" data-t="anfragen" aria-selected="false">Meine Anfragen (${inq.length})</button>
          </div>
          <section id="t-favoriten">
            ${favs.length ? `<div class="tile-grid">${favs.map((u) => W.unitTile(u, store.host(u.hostId))).join('')}</div>`
              : '<div class="empty"><p><strong>Noch keine Favoriten.</strong></p><p class="small">Tippen Sie am <a href="index.html#brett">Schwarzen Brett</a> auf das Herz, um sich Unterkünfte zu merken.</p></div>'}
          </section>
          <section id="t-anfragen" hidden>
            <p class="small muted">Hier sehen Sie, wann Sie welche Unterkunft per E-Mail oder Telefon angefragt haben. Die Antwort kommt direkt vom Gastgeber – per E-Mail oder Telefon.</p>
            ${inq.length ? `<ul class="inq-list">${inq.map((q) => {
              const u = store.unit(q.unitId);
              const h = u && store.host(u.hostId);
              return `<li><div><strong>${u ? `<a href="${W.unitUrl(u)}">${esc(u.name)}</a>` : 'Unterkunft entfernt'}</strong>${h ? ' · ' + esc(h.name) : ''}<br>
                <span class="small muted">${esc(q.type)} am ${fmt(q.at)}${q.from ? ` · Zeitraum ${fmt(q.from)} – ${fmt(q.to)}` : ''}${q.persons ? ` · ${esc(q.persons)} Pers.` : ''}</span></div>
                <button type="button" class="btn btn-ghost btn-sm" data-del="${esc(q.id)}">Entfernen</button></li>`;
            }).join('')}</ul>` : '<div class="empty"><p><strong>Noch keine Anfragen.</strong></p><p class="small">Sobald Sie über wohlii eine E-Mail vorbereiten oder anrufen, erscheint die Anfrage hier.</p></div>'}
          </section>
        </div>`;
      const tab = (t) => {
        $$('[data-t]').forEach((b) => b.setAttribute('aria-selected', b.dataset.t === t));
        $('#t-favoriten').hidden = t !== 'favoriten';
        $('#t-anfragen').hidden = t !== 'anfragen';
      };
      $$('[data-t]').forEach((b) => b.addEventListener('click', () => { tab(b.dataset.t); history.replaceState(null, '', '#' + b.dataset.t); }));
      tab(location.hash === '#anfragen' ? 'anfragen' : 'favoriten');
      $('#logout').addEventListener('click', () => { store.logout(); location.href = 'index.html'; });
      $$('[data-del]').forEach((b) => b.addEventListener('click', () => { store.removeInquiry(b.dataset.del); render(); tab('anfragen'); }));
    }
    W.bindFavs(app);
    document.addEventListener('wohlii:favs', () => { render(); });
    render();
  });
})();
