# wohlii-urlaub.de – Prototyp

Unterkunftsportal für ganz Deutschland: **Das Wesentliche. Direkt beim Gastgeber.**
Gäste finden Ferienwohnungen, Zimmer mit Frühstück und Hotels, sehen freie Zeiträume sofort am „Schwarzen Brett“ und fragen **direkt** beim Gastgeber an, per E-Mail oder Anruf. Buchung und Bezahlung laufen ausschließlich zwischen Gast und Gastgeber, ohne Provision.

Werte: **herzlich** – wohlfühlen · **heimelig** – inne halten · **putzmunter** – inspirieren

## Ansehen

Der Prototyp braucht keinen Build und keinen Server-Code. Im Projektordner:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Alternativ direkt auf GitHub Pages, Netlify o. Ä. hochladen (statische Dateien).

**Demo-Logins** (Passwort jeweils `wohlii`):

| Rolle | E-Mail |
|---|---|
| Gast | `gast@demo.wohlii` |
| Gastgeber (Apartmenthaus Saathoff) | `vermieter@demo.wohlii` |

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Suchleiste (Region/Ort, Kategorie, Monat), die drei Werte, Schwarzes Brett mit Monatskalender je Unterkunft und Karte daneben (Prinzip casamundo) |
| `haus.html?id=…` | Seite je Apartmenthaus/Gastgeber: alle Wohnungen im Kachel-Raster (Prinzip mein-glueck.de), Kontakt, Website-Link, Betreiber/Reinigung/Begrüßung, Karte |
| `unterkunft.html?id=…` | Detailseite: max. 4 Fotos mit Vergrößerung, Eckdaten, Beschreibung, Belegungskalender (3 Monate, blätterbar), Ansprechpartner, Karte, E-Mail- und Anruf-Button, Link zur Website des Gastgebers |
| `login.html` | Anmelden/Registrieren für Gäste und Gastgeber |
| `konto.html` | Gast: Favoriten und Übersicht der gesendeten Anfragen |
| `vermieter.html` | Gastgeber: Unterkünfte anlegen/bearbeiten/löschen, 4 Fotos hochladen, Kalender pflegen (Tag antippen oder Zeitraum eintragen), Haus- und Kontaktdaten, Ansprechpartner vor Ort, Position auf der Karte, Anleitung zum Google-Unternehmensprofil, Link-Code für die eigene Website |
| `konzept.html`, `gastgeber.html` | Konzept, Werte, Vergleich zu großen Portalen, Gebühren |
| `impressum.html`, `datenschutz.html` | Muster-Texte mit Platzhaltern (vor Livegang prüfen lassen) |

## Google Maps

In `js/config.js` den Schlüssel eintragen:

```js
maps: { provider: 'google', googleApiKey: 'AIza…' }
```

Ohne Schlüssel nutzt die Seite automatisch **OpenStreetMap** (Leaflet liegt lokal in `assets/vendor/leaflet`).
**DSGVO:** Karten laden erst nach Einwilligung (Cookie-Hinweis oder Button „Karte laden“). Vorher zeigt die Seite nur eine Skizze, dabei gehen keine Daten an Dritte.
Den Schlüssel in der Google Cloud Console auf die Domain `wohlii-urlaub.de` beschränken (HTTP-Referrer).

Damit die Häuser **auch in Google Maps selbst** erscheinen, braucht jeder Gastgeber ein kostenloses Google-Unternehmensprofil. Die Schritt-für-Schritt-Anleitung steht im Gastgeber-Bereich unter „Google Maps & Verlinkung“. Jede Seite liefert zusätzlich strukturierte Daten (schema.org `LodgingBusiness`/`Accommodation`) mit Adresse und Koordinaten.

## Platzhalter – bitte ersetzen

In der Oberfläche sind Platzhalter mit **PH** bzw. „Platzhalter-Foto“ markiert, erfundene Gastgeber mit **Demo**.

- **Apartmenthaus Saathoff** (`js/data.js`): Adresse, Telefon, E-Mail und Website stammen aus öffentlichen Angaben. Die Titelzeilen der Wohnungen folgen den öffentlichen Einträgen. Wohnfläche, Räume, Preise, Beschreibungen, Ausstattung und die Namen der Ansprechpartner sind **Platzhalter**. Die Personenzahl ist nur bei Wohnung 8 (5 Pers.) und Wohnung 10 (2 Pers.) belegt. Die Koordinaten sind ungefähr.
- **Echte Fotos je Wohnung:** `python3 tools/fotos_laden.py` holt bis zu 4 Fotos je Saathoff-Wohnung von myhome-norderney.de nach `assets/img/unterkuenfte/<id>/` und trägt sie in `js/fotos.js` ein. Alternativ Fotos von Hand ablegen und dort eintragen.
- **Fotos:** Alle Bilder in `assets/img/macro/` sind computergenerierte Makro-Platzhalter in den Moodboard-Farben (Sand, Muschel, Strick, Blatt …), erzeugt mit `tools/make_placeholders.py`. Sie werden durch echte Makrofotografien ersetzt.
- **Demo-Gastgeber** (Pension Lindenhof, Hotel Muschelgrund, Ferienhof Heideglück, Zimmer am Elbsandstein) sind frei erfunden und zeigen nur, wie die Regionssuche funktioniert.
- **Gebühren** auf `gastgeber.html` (9 €/Monat je Unterkunft) sind ein Beispiel.
- **Impressum/Datenschutz:** Angaben in [eckigen Klammern] ergänzen.
- **Logo:** Aquarell-Logo „wohli!“ (vom Auftraggeber geliefert) in `assets/img/logo-wohli*.png`, Hintergrund freigestellt; daraus auch das Favicon. Hinweis: Das Logo schreibt „wohli!“ mit einem i, die Domain „wohlii“ mit zwei.

## Design

Farben aus den Moodboards (`css/wohlii.css`, `:root`): Salbeigrün `#4E7F68`, Koralle `#D9857A`, Pastellgelb `#E8D58C`, Senfgelb `#E3B24F`, Hellgrau `#CFCBC3`, Dunkelgrau `#5E5E5E`.
Schriften: Young Serif (Überschriften), Nunito (Text), Caveat (Handschrift-Akzente, Logo). Alle Schriften sind **lokal eingebunden**, es gibt keinen Abruf bei Google Fonts.
Das Layout ist responsiv. Auf dem Handy schaltet das Schwarze Brett zwischen Liste und Karte um, die Detailseite hat eine feste Kontaktleiste.

## Designvarianten

Es gibt zwei Varianten, umschaltbar im Seitenfuß („Design: klassisch · heimelig“) oder per Adresse `index.html?stil=heimelig`:

- **klassisch** – Moodboard-Farben (Salbeigrün, Koralle, Senf), mittig begrenzte Breite, Liste mit Karte daneben.
- **heimelig** (`css/wohlii-heimelig.css`) – warme Stubenfarben: Walnuss `#6B4A35`, Honig `#E0A93B`, Hagebutte `#C0674B`, Friesenblau `#4F7A93`. Volle Bildschirmbreite, großes Bild mit mittiger Suche, Unterkünfte als große Karten im Raster, Karte als breites Band darüber, runde einfache Schrift.

Vorschau bauen: `python3 tools/build_preview.py vorschau.html heimelig`

## Technik & Weg in den Livebetrieb

- Reines HTML/CSS/JavaScript ohne Framework. Alle Seiten greifen über `js/store.js` auf die Daten zu.
- **Der Prototyp speichert alles im Browser (localStorage)**: Konten, Favoriten, Anfragen und Änderungen der Gastgeber. Andere Besucher sehen diese Änderungen deshalb nicht.
- Für den Livebetrieb wird `js/store.js` gegen eine echte API getauscht, z. B. Supabase/Firebase oder ein kleines Backend (Laravel, Node) mit:
  - Anmeldung mit sicheren Passwörtern, E-Mail-Bestätigung und „Passwort vergessen“
  - Datenbank für Gastgeber, Unterkünfte und Belegung
  - Foto-Upload mit Speicher und Verkleinerung
  - Freischaltung neuer Gastgeber durch wohlii
  - Hosting in der EU, Vertrag zur Auftragsverarbeitung
- Optional: iCal-Import/-Export der Belegung, damit Gastgeber ihren Kalender nicht doppelt pflegen.

## Ordner

```
index.html … vermieter.html   Seiten
css/wohlii.css                Gestaltung
js/config.js                  Einstellungen (Karten-Anbieter, API-Schlüssel)
js/data.js                    Startdaten (Saathoff + Demo-Gastgeber)
js/store.js                   Datenhaltung (Prototyp: localStorage)
js/app.js                     Kopf/Fuß, Cookie-Hinweis, Kalender, Karte, Anfrage-Fenster
js/blocks.js                  Kontaktkarte, Ansprechpartner, strukturierte Daten
js/pages/*.js                 Logik je Seite
assets/fonts, assets/vendor   lokale Schriften, Leaflet
assets/img/macro              Makro-Platzhalterbilder
tools/make_placeholders.py    Generator der Platzhalterbilder
```
