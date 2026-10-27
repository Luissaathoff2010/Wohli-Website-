"""Holt die echten Fotos der Saathoff-Wohnungen von den Internetseiten.

Für jede Wohnung wird die Seite auf myhome-norderney.de geöffnet, die größten
Wohnungsfotos (max. 4) werden nach assets/img/unterkuenfte/<id>/ geladen und
in js/fotos.js eingetragen. Danach zeigt die Website die echten Bilder.

Aufruf (im Projektordner, Internet nötig, nur Python 3 – keine Zusatzpakete):
    python3 tools/fotos_laden.py

Weitere Quellen: In QUELLEN unten können zusätzliche Seiten je Wohnung
eingetragen werden (z. B. Unterseiten von www.apartmenthaus-saathoff.de).
Bitte nur Fotos verwenden, an denen Sie die Rechte haben.
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request

ROOT = os.path.join(os.path.dirname(__file__), "..")
QUELLEN = {
    f"saathoff-w{n}": [f"https://myhome-norderney.de/unterkunft/3-apartmenthaus-saathoff-wohnung-{n}"]
    for n in range(1, 11)
}
MAX_FOTOS = 4
MIN_BYTES = 25_000  # kleine Bilder (Logos, Icons) überspringen
UA = {"User-Agent": "Mozilla/5.0 (wohlii-urlaub.de Fotoimport)"}
IGNORIEREN = re.compile(r"logo|icon|sprite|flag|banner|button|avatar|placeholder|map", re.I)


def hole(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read()


def bild_urls(seite, html):
    kandidaten = []
    # og:image zuerst, dann <img src/data-src/srcset> und Links auf .jpg
    kandidaten += re.findall(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)', html, re.I)
    kandidaten += re.findall(r'(?:src|data-src|data-lazy|href)=["\']([^"\']+\.(?:jpe?g|webp|png)(?:\?[^"\']*)?)["\']', html, re.I)
    for srcset in re.findall(r'srcset=["\']([^"\']+)["\']', html, re.I):
        teile = [t.strip().split(" ")[0] for t in srcset.split(",") if t.strip()]
        if teile:
            kandidaten.append(teile[-1])  # größte Variante
    gesehen, out = set(), []
    for k in kandidaten:
        voll = urllib.parse.urljoin(seite, k.replace("&amp;", "&"))
        if voll in gesehen or IGNORIEREN.search(voll):
            continue
        gesehen.add(voll)
        out.append(voll)
    return out


def main():
    fotos_js = os.path.join(ROOT, "js", "fotos.js")
    eintraege = {}
    for uid, seiten in QUELLEN.items():
        ziel = os.path.join(ROOT, "assets", "img", "unterkuenfte", uid)
        os.makedirs(ziel, exist_ok=True)
        gespeichert = []
        for seite in seiten:
            try:
                html = hole(seite).decode("utf-8", "replace")
            except Exception as e:
                print(f"  ! {seite}: {e}")
                continue
            for url in bild_urls(seite, html):
                if len(gespeichert) >= MAX_FOTOS:
                    break
                try:
                    daten = hole(url)
                except Exception:
                    continue
                if len(daten) < MIN_BYTES:
                    continue
                endung = ".png" if daten[:4] == b"\x89PNG" else ".webp" if daten[8:12] == b"WEBP" else ".jpg"
                name = f"{len(gespeichert) + 1}{endung}"
                with open(os.path.join(ziel, name), "wb") as f:
                    f.write(daten)
                gespeichert.append(f"assets/img/unterkuenfte/{uid}/{name}")
        print(f"{uid}: {len(gespeichert)} Foto(s)")
        if gespeichert:
            eintraege[uid] = gespeichert

    with open(fotos_js, "w", encoding="utf-8") as f:
        f.write("/* wohlii-urlaub.de – echte Fotos je Unterkunft (max. 4)\n"
                " * Automatisch geschrieben von tools/fotos_laden.py – kann von Hand ergänzt werden.\n */\n")
        f.write("window.WOHLII_FOTOS = " + json.dumps(eintraege, indent=2, ensure_ascii=False) + ";\n")
    print(f"\n{sum(map(len, eintraege.values()))} Fotos eingetragen in js/fotos.js")
    if not eintraege:
        print("Keine Fotos gefunden – Internetverbindung prüfen oder Fotos von Hand ablegen (siehe js/fotos.js).")
        sys.exit(1)


if __name__ == "__main__":
    main()
