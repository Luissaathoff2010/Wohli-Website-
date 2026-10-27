/* Startseite: Suche (Region, Kategorie, Monat) + Schwarzes Brett + Karte */
(function () {
  const W = window.Wohlii;
  const { store, $, $$, esc } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const months = W.monthList();
    const hosts = store.hosts();
    const hostById = Object.fromEntries(hosts.map((h) => [h.id, h]));

    // Auswahllisten füllen
    const regionWords = new Set();
    hosts.forEach((h) => [h.region, h.place, h.state].forEach((x) => x && regionWords.add(x)));
    $('#regions').innerHTML = [...regionWords].sort().map((r) => `<option value="${esc(r)}">`).join('');
    $('#s-cat').insertAdjacentHTML('beforeend', window.WOHLII_SEED.categories.map((c) => `<option>${esc(c)}</option>`).join(''));
    $('#s-month').innerHTML = months.map((m) => `<option value="${m.value}">${m.label}</option>`).join('');

    // Startzustand: URL > zuletzt gesucht > Standard
    const qs = new URLSearchParams(location.search);
    const last = store.lastSearch() || {};
    // Kurz vor Monatsende lohnt der aktuelle Monat kaum – dann mit dem nächsten starten.
    const now = new Date();
    const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate();
    const defaultMonth = months[daysLeft < 10 && months[1] ? 1 : 0].value;
    const state = {
      region: qs.get('region') ?? last.region ?? '',
      cat: qs.get('kat') ?? last.cat ?? '',
      month: qs.get('monat') ?? last.month ?? defaultMonth,
      onlyFree: true,
    };
    if (!months.find((m) => m.value === state.month)) state.month = defaultMonth;
    $('#s-region').value = state.region;
    $('#s-cat').value = state.cat;
    $('#s-month').value = state.month;

    let mapCtrl = null;
    const list = $('#board-list');

    function render() {
      const mi = months.findIndex((m) => m.value === state.month);
      const { y, m, label } = months[mi];
      $('#board-month').textContent = label;
      $('#m-label').textContent = label;
      $('#m-prev').disabled = mi === 0;
      $('#m-next').disabled = mi === months.length - 1;

      const q = state.region.trim().toLowerCase();
      let units = store.units().filter((u) => {
        const h = hostById[u.hostId];
        if (!h) return false;
        if (state.cat && u.category !== state.cat) return false;
        if (q && ![h.region, h.place, h.state, h.name, h.zip].some((x) => String(x || '').toLowerCase().includes(q))) return false;
        return true;
      });
      const withFree = units.map((u) => ({ u, free: store.freeNightsInMonth(u.id, y, m) }));
      const shown = (state.onlyFree ? withFree.filter((x) => x.free > 0) : withFree)
        .sort((a, b) => b.free - a.free);

      list.innerHTML = '';
      if (!shown.length) {
        list.innerHTML = `<div class="empty"><p><strong>Für diese Auswahl ist im ${label} nichts frei.</strong></p><p class="small">Versuchen Sie einen anderen Monat oder eine größere Region.</p></div>`;
      } else {
        shown.forEach(({ u }) => list.appendChild(W.boardEntry(u, hostById[u.hostId], y, m)));
      }
      const nh = new Set(shown.map((x) => x.u.hostId)).size;
      $('#board-count').textContent = `${shown.length} ${shown.length === 1 ? 'Unterkunft' : 'Unterkünfte'} von ${nh} ${nh === 1 ? 'Gastgeber' : 'Gastgebern'}${state.region ? ' · Region: ' + state.region : ''}${state.cat ? ' · ' + state.cat : ''}`;

      // Karte: ein Punkt je Gastgeber, Zahl = passende Unterkünfte
      const groups = {};
      shown.forEach(({ u, free }) => ((groups[u.hostId] = groups[u.hostId] || []).push({ u, free })));
      const points = Object.entries(groups).map(([hid, arr]) => {
        const h = hostById[hid];
        return {
          id: hid, lat: h.lat, lng: h.lng, label: arr.length, title: h.name,
          html: `<div class="map-popup"><b><a href="${W.hostUrl(h)}">${esc(h.name)}</a></b>${esc(h.place)}<ul>${arr.map(({ u, free }) => `<li><a href="${W.unitUrl(u)}">${esc(u.name)}</a> – ${free} frei</li>`).join('')}</ul></div>`,
        };
      });
      const mapEl = $('#board-map');
      if (points.length) {
        mapEl.hidden = false;
        mapCtrl = W.mountMap(mapEl, points, {
          onSelect: (hid) => {
            $$('.board-entry').forEach((e) => e.classList.toggle('active', e.dataset.host === hid));
            const first = $(`.board-entry[data-host="${hid}"]`);
            if (first && window.innerWidth > 1000) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
          },
        });
      } else {
        mapEl.hidden = true;
      }
    }

    // Hover in der Liste hebt die Markierung auf der Karte hervor
    list.addEventListener('mouseover', (e) => {
      const entry = e.target.closest('.board-entry');
      if (entry && mapCtrl) mapCtrl.highlight(entry.dataset.host);
    });

    function commit() {
      store.saveSearch({ region: state.region, cat: state.cat, month: state.month });
      const p = new URLSearchParams();
      if (state.region) p.set('region', state.region);
      if (state.cat) p.set('kat', state.cat);
      p.set('monat', state.month);
      history.replaceState(null, '', '?' + p.toString() + '#brett');
      render();
    }

    $('#search').addEventListener('submit', (e) => {
      e.preventDefault();
      state.region = $('#s-region').value;
      state.cat = $('#s-cat').value;
      state.month = $('#s-month').value;
      commit();
      $('#brett').scrollIntoView({ behavior: 'smooth' });
    });
    const step = (d) => {
      const i = months.findIndex((m) => m.value === state.month) + d;
      if (i < 0 || i >= months.length) return;
      state.month = months[i].value;
      $('#s-month').value = state.month;
      commit();
    };
    $('#m-prev').addEventListener('click', () => step(-1));
    $('#m-next').addEventListener('click', () => step(1));
    $('#only-free').addEventListener('change', (e) => { state.onlyFree = e.target.checked; render(); });
    $$('.view-toggle [data-view]').forEach((b) => b.addEventListener('click', () => {
      $('#board-layout').dataset.view = b.dataset.view;
      $$('.view-toggle [data-view]').forEach((x) => x.setAttribute('aria-selected', x === b));
    }));

    W.bindFavs(list);
    W.bindContactButtons(list, () => state.month);
    render();
  });
})();
