"""Baut eine klickbare Ein-Datei-Vorschau der Website (für claude.ai-Artifacts).

Alle Seiten, Skripte, Styles und Schriften landen in einer HTML-Datei; die
Seitenwechsel laufen intern (ohne Neuladen). Die Makro-Bilder werden als
Begleitdateien unter assets/img/macro/ mitveröffentlicht. Echte Karten sind in
der Vorschau abgeschaltet (dort sind externe Kartendienste gesperrt).

Aufruf: python3 tools/build_preview.py <ausgabe.html> [heimelig]
"""
import base64
import json
import os
import re
import sys

ROOT = os.path.join(os.path.dirname(__file__), "..")
PAGES = {  # Seite -> Seitenskript
    "index": "home", "haus": "haus", "unterkunft": "unterkunft", "login": "login",
    "konto": "konto", "vermieter": "vermieter", "konzept": None, "gastgeber": None,
    "impressum": None, "datenschutz": None,
}


def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()


def js(src):
    src = src.replace("document.addEventListener('DOMContentLoaded',", "__onReady(")
    src = re.sub(r"location\.href = (.+?);", r"__nav(\1);", src)
    src = src.replace("location.replace(", "__nav(")
    src = src.replace("location.search", "__VL.search").replace("location.pathname", "__VL.pathname").replace("location.hash", "__VL.hash")
    src = src.replace("location.href", "'https://www.wohlii-urlaub.de/'").replace("location.origin", "'https://www.wohlii-urlaub.de'")
    src = re.sub(r"history\.replaceState\(null, '', ", "__VL.set(", src)
    return src


def app_js():
    src = js(read("js/app.js"))
    # Karten: in der Vorschau nur die Skizze, mit Hinweis statt Lade-Button
    src = src.replace("if (consent && consent.maps) live(); else sketch();", "sketch();")
    src = re.sub(
        r'<div class="map-gate">[\s\S]*?</div>',
        '<div class="map-gate"><p><strong>Kartenvorschau</strong><br>In dieser Vorschau wird keine echte Karte geladen. '
        'Auf www.wohlii-urlaub.de erscheint hier Google Maps mit allen Markierungen.</p>'
        '<a class="small" href="${mapsLink(points[0].lat, points[0].lng)}" target="_blank" rel="noopener">Ort in Google Maps ansehen ↗</a></div>',
        src, count=1)
    src = src.replace("$('[data-load-map]', el).addEventListener", "($('[data-load-map]', el) || document.createElement('i')).addEventListener")
    return src


def css(stil=None):
    src = read("css/wohlii.css")
    if stil and stil != "klassisch":
        src += "\n" + read(f"css/wohlii-{stil}.css")
    src = src.replace("url('../assets/img/", "url('assets/img/")

    def font(m):
        data = base64.b64encode(open(os.path.join(ROOT, "assets/fonts", m.group(1)), "rb").read()).decode()
        return f"url('data:font/woff2;base64,{data}')"

    return re.sub(r"url\('\.\./assets/fonts/([^']+)'\)", font, src)


def body_of(page):
    html = read(page + ".html")
    return re.search(r"<main[\s\S]*?</main>", html).group(0)


def main(out, stil=None):
    bodies = {p: body_of(p) for p in PAGES}
    scripts = [
        ("common", js(read("js/config.js"))),
        ("common", js(read("js/fotos.js"))),
        ("common", js(read("js/data.js"))),
        ("common", js(read("js/store.js"))),
        ("common", app_js()),
        ("common", js(read("js/blocks.js"))),
    ] + [(p, js(read(f"js/pages/{s}.js"))) for p, s in PAGES.items() if s]

    router = r"""
window.__VL = { pathname: '/index.html', search: '', hash: '',
  set(u) { const m = String(u).match(/^([^?#]*)(\?[^#]*)?(#.*)?$/); if (m[2] !== undefined) this.search = m[2]; if (m[3] !== undefined) this.hash = m[3]; } };
window.__READY = {};
window.__cur = 'common';
window.__onReady = (cb) => { (__READY[__cur] = __READY[__cur] || []).push(cb); };
let __token = '';
window.__nav = (url) => {
  const m = String(url).match(/^(?:\.\/)?([\w-]+)\.html(\?[^#]*)?(#.*)?$/) || ['', 'index', '', ''];
  const page = __BODIES[m[1]] ? m[1] : 'index';
  __VL.pathname = '/' + page + '.html'; __VL.search = m[2] || ''; __VL.hash = m[3] || '';
  const id = new URLSearchParams(__VL.search).get('id');
  __token = page + (id ? '.' + id : '');
  try { if (location.hash.slice(1) !== __token) location.hash = __token; } catch (e) {}
  [...document.body.children].forEach((el) => { if (!/^(SCRIPT|STYLE|TITLE)$/.test(el.tagName)) el.remove(); });
  document.body.classList.remove('has-cta');
  document.body.insertAdjacentHTML('afterbegin', __BODIES[page]);
  (__READY.common || []).forEach((f) => f());
  (__READY[page] || []).forEach((f) => f());
  const target = __VL.hash && document.getElementById(__VL.hash.slice(1));
  if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
};
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || a.target === '_blank') return;
  const href = a.getAttribute('href');
  if (/^(?:\.\/)?[\w-]+\.html/.test(href)) { e.preventDefault(); __nav(href); }
});
window.addEventListener('hashchange', () => {
  const t = location.hash.slice(1);
  if (t && t !== __token) { const [p, id] = t.split('.'); __nav(p + '.html' + (id ? '?id=' + id : '')); }
});
"""
    boot = r"""
(function () {
  const go = () => {
    const t = (location.hash || '').slice(1);
    const [p, id] = t.split('.');
    __nav(__BODIES[p] ? p + '.html' + (id ? '?id=' + id : '') : 'index.html');
  };
  if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
})();
"""
    esc = lambda s: s.replace("</", "<\\/")
    parts = [
        "<title>wohlii urlaub</title>",
        '<meta name="description" content="Vorschau des Unterkunftsportals wohlii-urlaub.de">',
        "<style>" + css(stil) + "</style>",
        "<script>" + (f"window.__STIL = {json.dumps(stil)};" if stil else "") + router + "window.__BODIES = " + esc(json.dumps(bodies, ensure_ascii=False)) + ";</script>",
    ]
    for page, src in scripts:
        parts.append(f"<script>window.__cur = {json.dumps(page)};\n{esc(src)}</script>")
    parts.append("<script>" + boot + "</script>")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(parts))
    print("geschrieben:", out, round(os.path.getsize(out) / 1024), "KB")


if __name__ == "__main__":
    # optional zweites Argument: Designvariante, z. B. „heimelig“
    main(sys.argv[1] if len(sys.argv) > 1 else "wohlii-vorschau.html", sys.argv[2] if len(sys.argv) > 2 else "klassisch")
