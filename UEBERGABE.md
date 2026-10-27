# wohlii-urlaub.de – Technische Übergabe-Dokumentation

| | |
|---|---|
| **Projekt** | Unterkunftsportal wohlii-urlaub.de (Prototyp) |
| **Repository** | `github.com/Luissaathoff2010/Norderney-Guide` |
| **Branch** | `claude/wohlii-urlaub-portal-um558d` (kein Pull Request angelegt, `main` ist leer) |
| **Stand** | 27.10.2026, Commit `dcffb67` + diese Dokumentation |
| **Sprache von Oberfläche und Code-Kommentaren** | Deutsch (Anrede „Sie“) |
| **Vorschau-Links (claude.ai-Artifacts)** | Version 1 „klassisch“: https://claude.ai/artifact/7921L7T7jQC4hJ2GNkLcoN · Version 2 „heimelig“: https://claude.ai/artifact/9Dx95UCwnK8j9bM8ZS7UNS |

Diese Datei ist so geschrieben, dass ein Team ohne den bisherigen Chatverlauf weiterarbeiten kann. Teil A beschreibt das Projekt, Teil B (Anhang) enthält den kompletten Quellcode aller selbst geschriebenen Dateien.

---

## Inhalt

1. [Ziel, Zielgruppe, Anforderungen](#1-ziel-zielgruppe-anforderungen)
2. [Technologien](#2-technologien)
3. [Architektur und Aufbau](#3-architektur-und-aufbau)
4. [Daten und Integrationen](#4-daten-und-integrationen)
5. [Funktionen im Detail](#5-funktionen-im-detail)
6. [Design](#6-design)
7. [Entscheidungen und verworfene Ideen](#7-entscheidungen-und-verworfene-ideen)
8. [Bekannte Bugs, Einschränkungen, Workarounds](#8-bekannte-bugs-einschränkungen-workarounds)
9. [Offene Punkte und nächste Schritte](#9-offene-punkte-und-nächste-schritte)
10. [Anhang: vollständiger Quellcode](#anhang-vollständiger-quellcode)

---

## 1. Ziel, Zielgruppe, Anforderungen

### 1.1 Ziel

wohlii-urlaub.de ist ein **Unterkunftsportal für ganz Deutschland**. Es versteht sich als Gegenentwurf zu den großen Buchungsportalen:

- Das Portal **vermittelt nur den Kontakt**. Es gibt **keine Buchung und keine Zahlung** auf dem Portal. Der Gast bucht direkt beim Vermieter, ohne Provision.
- Vermieter zahlen **kleine, feste Gebühren** statt Provision. Die Höhe ist noch offen; im Prototyp steht ein Platzhalter von 9 € pro Monat und Unterkunft.
- Im Mittelpunkt stehen **persönliche Betreuung und Individualität**. Gäste erfahren, wer das Haus betreibt, wer reinigt und wer sie vor Ort begrüßt.
- Leitwerte, die auf der Startseite sichtbar sein müssen: **herzlich – wohlfühlen · heimelig – inne halten · putzmunter – inspirieren**.
- Bildsprache: **Makrofotografie** (Sand, Muscheln, Pflanzen, Strick). Sie soll zeigen, dass es um das Wesentliche geht.

### 1.2 Zielgruppen

| Gruppe | Bedürfnis |
|---|---|
| **Urlaubsgäste** (deutschlandweit) | Freie Zeiträume schnell sehen, persönlich und direkt anfragen (E-Mail/Anruf), Favoriten merken, Überblick über eigene Anfragen |
| **Vermieter** (kleine Häuser, Apartmenthäuser, Pensionen, kleine Hotels) | Unterkünfte selbst pflegen (Texte, max. 4 Fotos, Kalender), Ansprechpartner zeigen, eigene Website verlinken, bei Google Maps gefunden werden |
| **Betreiber** (Auftraggeber, Familie Saathoff) | Portal mit eigener Marke, später Gebühren-Einnahmen, Freischaltung von Vermietern |

### 1.3 Anforderungen (aus dem Auftrag, vollständig)

**Domain und Marke**
- Die Website heißt ausschließlich **www.wohlii-urlaub.de**.
- **Logo:** Aquarell-Logo „wohli!“, vom Auftraggeber geliefert und eingebaut. Der Schriftzug schreibt „wohli!“ mit **einem** i, die Domain „wohlii“ mit **zwei**. Die Rückfrage dazu ist offen, siehe §9.

**Vorlagen und Referenzen** (die Seiten waren in der Entwicklungsumgebung nicht abrufbar, siehe §8)
- **myhome-norderney.de, „Schwarzes Brett“:** Liste der Unterkünfte, jeweils mit Monatskalender, in dem freie Zeiträume direkt sichtbar sind. Vorbild für die Startseite.
- **mein-glueck.de/produkte/marmelade:** gleichmäßige Kacheln im Raster, oben großes Bild, darunter Name und kurze Info. Vorbild für die Seite eines Apartmenthauses mit seinen Wohnungen.
- **casamundo.de, Suchergebnisse:** Karte neben der Ergebnisliste, jede Unterkunft als Markierung. Vorbild für die Karte am Schwarzen Brett.
- **www.apartmenthaus-saathoff.de:** Beispiel-Vermieter (Apartmenthaus Saathoff, Norderney, 10 Ferienwohnungen). Die eigene Website soll verlinkt werden.
- **Moodboards** „Wohlii – pastellfarben“ und „Wohlii – gelb + grau“ sind die verbindliche Designvorlage. Die Bilder selbst sind **nie angekommen**; es liegen nur die Farbwerte aus dem Auftragstext vor (siehe §6).

**Startseite**
- Oben die **Suchleiste**: Region (deutschlandweit), Kategorie (Ferienwohnung / Zimmer mit Frühstück / Hotel), Monat.
- Darunter **nur** das Schwarze Brett: Unterkunft mit Monatskalender der freien Zeiträume.
- Die drei Werte sind sichtbar eingebaut.
- Kontakt per Klick: **E-Mail-Anfrage** oder **Anruf**.

**Detailseite je Ferienwohnung**
- Maximal **4 Fotos**, Beschreibung, Belegungskalender.
- **Karte** zur Lage (Google Maps, Prinzip casamundo).
- Kontakt-Buttons für E-Mail und Anruf.
- Link zur **Website des Vermieters**.
- Angaben zu **Betreiber, Reinigung und Begrüßung vor Ort**.

**Seite je Apartmenthaus**
- Alle Wohnungen als **Kachel-Raster**.

**Logins**
- **Vermieter:** Unterkünfte anlegen und bearbeiten, Fotos hochladen, Kalender pflegen, Kontaktdaten und Ansprechpartner vor Ort eintragen.
- **Gast:** Favoriten speichern, gesendete Anfragen im Überblick.

**Google Maps**
- Lage per Karte zeigen.
- Unterkünfte sollen **auch in Google Maps selbst** erscheinen (über ein Google-Unternehmensprofil).

**Sonstiges**
- **Responsive:** auf dem Handy genauso gut wie am PC.
- **DSGVO:** Impressum, Datenschutzerklärung und Cookie-Hinweis, mit Blick auf Google Maps und Login.
- **Platzhalter:** Fehlende Daten der 10 Saathoff-Wohnungen durch sinnvolle Platzhalter ersetzen und diese **klar kennzeichnen**.

**Nachträgliche Wünsche aus dem Verlauf**
1. Ein Link zum Öffnen im Browser. Umgesetzt als Artifact-Vorschau, siehe §4.6.
2. Das gelieferte Logo statt des selbstgebauten. Umgesetzt.
3. Eine **zweite Designvariante**: andere Farben, anderes Layout, volle Breite, heimischer, wohlfühlender, einfacher. Umgesetzt als „heimelig“, siehe §6.3.
4. Eine **ZIP-Datei der ersten Version mit echten Fotos der Unterkünfte** von den Internetseiten.
   - Die ZIP ist erstellt.
   - Die Fotos konnten **nicht** geladen werden (Netzwerksperre).
   - Stattdessen gibt es eine Foto-Schnittstelle (`js/fotos.js`) und ein Importskript (`tools/fotos_laden.py`), siehe §4.5.

---

## 2. Technologien

### 2.1 Sprachen und Laufzeit

| Bereich | Technik |
|---|---|
| Website | **HTML5, CSS3, JavaScript (ES2020, ohne Module, ohne Build-Schritt)** |
| Werkzeuge | **Python 3** (getestet mit 3.11): Platzhalterbilder, Vorschau-Bündel, Foto-Import |
| Tests (nur in der Entwicklung, nicht im Repo) | Node.js 22, Playwright 1.x mit Chromium (Screenshots, Klick-Tests) |
| Hosting-Anforderung | beliebiger statischer Webserver; die Seite funktioniert sogar per Doppelklick (`file://`) |

### 2.2 Frameworks und Bibliotheken

| Bibliothek | Version | Herkunft / Einbindung | Lizenz | Zweck |
|---|---|---|---|---|
| **Leaflet** | 1.9.4 | npm-Paket `leaflet@1.9.4`, **selbst gehostet** in `assets/vendor/leaflet/` (`leaflet.js`, `leaflet.css`, `LICENSE`); **kein CDN** | BSD-2-Clause | Kartenanzeige mit OpenStreetMap, wenn kein Google-Maps-Schlüssel gesetzt ist |
| **Google Maps JavaScript API** | aktuelle Version („weekly“), dynamisch geladen | `https://maps.googleapis.com/maps/api/js?key=…&callback=__wohliiGmaps&language=de&region=DE`, erst **nach Einwilligung** | Google ToS | Kartenanzeige, wenn `googleApiKey` gesetzt ist |
| **OpenStreetMap-Kacheln** | – | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, erst nach Einwilligung | ODbL | Kartenkacheln für Leaflet |

**Es gibt keine weiteren Bibliotheken:** kein React/Vue, kein jQuery, kein Tailwind, keine Icon-Bibliothek, keine Analytics und keine CDN-Abhängigkeit zur Laufzeit.

### 2.3 Styling

- **Eigenes CSS**, kein Tailwind und keine UI-Bibliothek:
  - `css/wohlii.css`: Grundgestaltung, Version 1 „klassisch“.
  - `css/wohlii-heimelig.css`: Override-Stylesheet für Version 2. Es greift nur unter `[data-stil="heimelig"]`.
- Gestaltung über **CSS-Custom-Properties** (Tokens) auf `:root`, siehe §6.
- Layout mit CSS Grid und Flexbox, Abstände über `gap`.
- **Kein Dark Mode.** Das helle Moodboard-Design ist bewusst so gewählt, siehe §8.

### 2.4 Schriften (alle lokal, keine Google-Fonts-Verbindung)

| Schrift | Paket / Version | Dateien in `assets/fonts/` | Einsatz |
|---|---|---|---|
| **Nunito** | `@fontsource/nunito` 5.3.0 (OFL-1.1) | `nunito-latin-{400,600,700,800}-normal.woff2` | Fließtext, Buttons; in „heimelig“ auch Überschriften |
| **Young Serif** | `@fontsource/young-serif` 5.3.0 (OFL-1.1) | `young-serif-latin-400-normal.woff2` | Überschriften (klassisch) |
| **Caveat** | `@fontsource/caveat` 5.3.0 (OFL-1.1) | `caveat-latin-{500,700}-normal.woff2` | Handschrift-Akzente (Werte, Kurzbeschreibungen der Wohnungen, Rollen) |

Die Dateien wurden mit `npm pack @fontsource/<name>` geladen und aus `package/files/` kopiert. Es ist nur der Latin-Subset eingebunden; er enthält Umlaute und ß.

### 2.5 Icons

Es gibt **keine Icon-Bibliothek**. Verwendet werden:
- **Unicode-Zeichen:** ♡ ♥ (Favorit), ‹ › (Monat blättern), ↗ (externer Link), × (schließen), ✓ (Checkliste), → (weiter).
- **CSS-Formen:** Kartenpins, Hamburger-Menü.
- **Favicon:** `assets/img/favicon.png`, aus dem Logo erzeugt.

### 2.6 Werkzeuge (Python)

| Skript | Abhängigkeiten | Zweck |
|---|---|---|
| `tools/make_placeholders.py` | `pillow`, `numpy` | Erzeugt 12 Makro-Platzhalterbilder (1200×900 JPG) in Moodboard-Farben |
| `tools/build_preview.py` | nur Standardbibliothek | Bündelt die ganze Website in **eine** HTML-Datei für claude.ai-Artifacts (§4.6) |
| `tools/fotos_laden.py` | nur Standardbibliothek | Lädt bis zu 4 echte Fotos je Saathoff-Wohnung von myhome-norderney.de und schreibt `js/fotos.js` |

---

## 3. Architektur und Aufbau

### 3.1 Grundprinzip

- **Statische Multi-Page-Website.** Jede Seite ist eine eigene HTML-Datei mit gemeinsamen Skripten.
- Inhalte der dynamischen Seiten rendert JavaScript in `<main id="app">`.
- Kopf- und Fußzeile werden von `js/app.js` für alle Seiten eingefügt.
- **Alle Datenzugriffe laufen über `Wohlii.store`** (`js/store.js`). Das ist die einzige Stelle, die für ein echtes Backend ersetzt werden muss.

### 3.2 Dateistruktur

```
/
├── index.html            Startseite: Suche, Werte, Schwarzes Brett + Karte
├── haus.html             Seite eines Apartmenthauses / Gastgebers  (?id=<hostId>)
├── unterkunft.html       Detailseite einer Unterkunft              (?id=<unitId>)
├── login.html            Anmelden / Registrieren (?rolle=host|guest, ?neu, ?next=)
├── konto.html            Gast-Konto: Favoriten, Anfragen (#favoriten | #anfragen)
├── vermieter.html        Gastgeber-Bereich (#unterkuenfte|#belegung|#haus|#sichtbarkeit)
├── konzept.html          Konzept & Werte (statisch)
├── gastgeber.html        Infos für Vermieter, Vergleich, Gebühren (statisch)
├── impressum.html        Muster-Impressum (statisch)
├── datenschutz.html      Muster-Datenschutzerklärung (statisch)
├── README.md             Kurzanleitung
├── css/
│   ├── wohlii.css            Grund-Stylesheet (Version 1 „klassisch“)
│   └── wohlii-heimelig.css   Override-Stylesheet (Version 2 „heimelig“)
├── js/
│   ├── config.js         Einstellungen (Karten-Anbieter, API-Schlüssel, Monate)
│   ├── fotos.js          Echte Fotos je Unterkunft (leer → Platzhalter)
│   ├── data.js           Startdaten: 5 Gastgeber, 17 Unterkünfte, Kategorien
│   ├── store.js          Datenschicht (Prototyp: localStorage)
│   ├── app.js            Gemeinsame UI: Kopf/Fuß, Designvariante, Cookie-Hinweis,
│   │                     Kalender, Karte, Anfrage-Dialog, Karten-/Kachel-Renderer
│   ├── blocks.js         Bausteine: Ansprechpartner, Kontaktkarte, JSON-LD
│   └── pages/
│       ├── home.js       Startseite
│       ├── haus.js       Apartmenthaus-Seite
│       ├── unterkunft.js Detailseite
│       ├── login.js      Login/Registrierung
│       ├── konto.js      Gast-Konto
│       └── vermieter.js  Gastgeber-Bereich
├── assets/
│   ├── fonts/            7 × woff2 (siehe §2.4)
│   ├── vendor/leaflet/   leaflet.js, leaflet.css, LICENSE (1.9.4)
│   └── img/
│       ├── logo-wohli.png        Logo 480 px hoch (2×)
│       ├── logo-wohli-240.png    Logo 240 px hoch (1×)
│       ├── favicon.png           128 × 128
│       ├── macro/                12 Platzhalter: abendlicht, blatt, duenengras, gischt,
│       │                         kiesel, koralle, leinen, muschel, sand, seeglas,
│       │                         strick, treibholz (.jpg)
│       └── unterkuenfte/         Ziel für echte Fotos (<unitId>/1.jpg …), noch leer
└── tools/
    ├── make_placeholders.py
    ├── build_preview.py
    └── fotos_laden.py
```

### 3.3 Ladereihenfolge der Skripte (auf jeder Seite)

```html
<script src="js/config.js"></script>   <!-- window.WOHLII_CONFIG -->
<script src="js/fotos.js"></script>    <!-- window.WOHLII_FOTOS -->
<script src="js/data.js"></script>     <!-- window.WOHLII_SEED (nutzt WOHLII_FOTOS) -->
<script src="js/store.js"></script>    <!-- window.Wohlii.store -->
<script src="js/app.js"></script>      <!-- window.Wohlii.* UI-Funktionen, setzt data-stil -->
<script src="js/blocks.js"></script>   <!-- nur haus.html, unterkunft.html -->
<script src="js/pages/<seite>.js"></script>
```

- Jede Datei ist eine **IIFE** und hängt sich an globale Objekte, ohne ES-Module. Der Grund: `file://`-Betrieb und kein Build.
- `app.js` registriert zuerst einen `DOMContentLoaded`-Handler. Er legt die Demo-Konten an, rendert Kopf und Fuß und zeigt den Cookie-Hinweis.
- Danach laufen die Seitenskripte, ebenfalls auf `DOMContentLoaded`. Die Reihenfolge der Registrierung entspricht der Ausführungsreihenfolge.

### 3.4 Globale Objekte / öffentliche Schnittstellen

| Objekt | Inhalt |
|---|---|
| `window.WOHLII_CONFIG` | `siteName`, `siteUrl`, `contactEmail`, `maps.provider` (`'google'`/`'osm'`), `maps.googleApiKey`, `monthsAhead` (12) |
| `window.WOHLII_FOTOS` | `{ unitId: ['pfad1.jpg', …] }`, max. 4 werden verwendet |
| `window.WOHLII_SEED` | `{ hosts[], units[], categories[] }` |
| `window.__STIL` | optional, erzwingt die Designvariante. Gesetzt im Vorschau-Bündel und in der ZIP; blendet den Umschalter aus |
| `Wohlii.store` | Datenschicht, siehe §4.2 |
| `Wohlii.*` (aus app.js) | `esc, $, $$, param, MONTHS, monthList, telHref, mapsLink, toast, placeholderTag, monthCalendar, calLegend, mountMap, inquiryDialog, bindCopy, unitTile, boardEntry, bindFavs, bindContactButtons, favButton, photoOf, unitUrl, hostUrl, requireRole, refreshFavCount` |
| `Wohlii.*` (aus blocks.js) | `peopleBlock(host)`, `contactCard(host, {unit, title})`, `jsonLd(obj)` |

### 3.5 Komponenten (Render-Funktionen)

| Komponente | Funktion | Verwendet in |
|---|---|---|
| Kopfzeile, Navigation, Favoriten-Zähler, Login-Button | `renderChrome()` (intern in app.js) | alle Seiten |
| Fußzeile mit Werten, Rechtslinks, Cookie-Einstellungen, Design-Umschalter | `renderChrome()` | alle Seiten |
| Cookie-/Einwilligungs-Banner | `consentBanner(force)` | alle Seiten |
| Monatskalender (lesend oder editierbar) | `monthCalendar(unitId, y, m, {compact, editable, booked, onToggle})` | Brett, Detail, Vermieter |
| Karte (Skizze → Google/Leaflet) | `mountMap(el, points, {zoom, onSelect})` → `{highlight(id)}` | Brett, Haus, Detail |
| Eintrag am Schwarzen Brett | `boardEntry(unit, host, y, m)` → `<article>` | Start |
| Kachel (Raster) | `unitTile(unit, host?)` → HTML-String | Haus, Detail, Konto |
| Favoriten-Herz | `favButton(unit)` + `bindFavs(root)` (Event-Delegation) | überall |
| Anfrage-Dialog (`<dialog>`) | `inquiryDialog(unit, host, monthValue)` | über `bindContactButtons` |
| Kontaktkarte | `contactCard(host, {unit})` | Haus, Detail |
| Ansprechpartner (Betreiber / Reinigung / Begrüßung) | `peopleBlock(host)` | Haus, Detail |
| Toast-Meldung | `toast(msg)` | überall |

### 3.6 Datenfluss

```
data.js (SEED) ─┐
fotos.js ───────┤
                ▼
          store.js  ── read/write ──►  localStorage  (Präfix "wohlii.v1.")
  hosts()/units() = SEED  ⊕  Overrides aus localStorage  ⊖  gelöschte IDs
  booked(unitId)  = gespeicherter Kalender  ODER  deterministische Beispielbelegung
                ▼
     app.js / blocks.js  (Render-Funktionen, reine Ableitung aus Store-Daten)
                ▼
     pages/*.js  (Seitenzustand: Suche, Monat, Tabs; Events → Store → neu rendern)
```

- **Lesen:** Seiten rufen `store.units()`, `store.host()`, `store.booked()` usw. auf und rendern komplett neu, ohne Virtual DOM.
- **Schreiben:** Formulare im Gastgeber-Bereich rufen `saveUnit`, `saveHost`, `setBooked` und `removeUnit` auf. Favoriten und Anfragen laufen über `toggleFavorite` und `logInquiry`.
- **Merge-Regel:** Ein Startdatensatz wird mit dem gespeicherten Override (`{...seed, ...override}`) zusammengeführt. Neue Datensätze liegen nur im Override. Gelöschte Seed-Unterkünfte stehen in `unitsRemoved`.

### 3.7 State-Verwaltung

| Zustand | Ort |
|---|---|
| Fachdaten (Gastgeber, Unterkünfte, Kalender, Konten, Favoriten, Anfragen, Einwilligung, letzte Suche) | `localStorage` über `store.js` (Schlüssel siehe §4.2) |
| Designvariante | `localStorage['wohlii.stil']`, **ohne** v1-Präfix; per URL `?stil=heimelig|klassisch` setzbar |
| Seitenzustand Startseite (Region, Kategorie, Monat, nur freie) | lokale Variable `state` in `home.js`, gespiegelt in URL (`?region=&kat=&monat=#brett`) und `store.saveSearch` |
| Aktiver Tab Konto/Vermieter | URL-Hash (`#anfragen`, `#belegung` …) |
| Kalender-Blätterposition | lokale Variable in der Seite (nicht persistent) |
| Laufzeit-Speicher-Fallback | `mem`-Objekt in `store.js`, falls `localStorage` wirft (Privatmodus) |

Es gibt **keinen** globalen Store, keine Reaktivität und kein Framework. Nach jeder Änderung rendern die Seiten explizit neu. Ereignisse für Seitenübergreifendes:
- `wohlii:consent`: Einwilligung geändert, Karten laden.
- `wohlii:favs`: Favoriten geändert, das Gast-Konto rendert neu.

---

## 4. Daten und Integrationen

### 4.1 Datenquellen

| Quelle | Inhalt | Verlässlichkeit |
|---|---|---|
| `js/data.js` | 5 Gastgeber, 17 Unterkünfte | Saathoff teils echt, teils **Platzhalter**; 4 Gastgeber **frei erfunden (Demo)** |
| Öffentliche Websuche (nicht die Seiten selbst) | Saathoff: Adresse Richthofenstraße 1 a–b, 26548 Norderney · Tel. +49 4932 92340 · info@apartmenthaus-saathoff.de · Titelzeilen der Wohnungen 1, 3, 4, 6, 7, 8, 9, 10 · W8 = 5 Personen, W10 = 2 Personen · Lage am Inselwäldchen, Nordstrand fußläufig, Zentrum ca. 15 Min., Getränkeservice | Echt laut Suchergebnis. Hinweis: Eine Quelle nennt **11** Wohnungen, der Auftrag **10** |
| Beispielbelegung | in `store.js` aus der Unterkunfts-ID per Seed-Zufall erzeugt (Saison: Juni–Sept. 80 %, Apr./Mai/Okt. 60 %, sonst 35 %), Zeitraum: Vormonat bis +14 Monate ab heute | Fiktiv; ändert sich mit dem aktuellen Datum, bis ein Vermieter den Kalender speichert |

**Datenmodell Gastgeber (`host`)**
```js
{ id, name, region, state, place, street, zip, lat, lng, website, email, phone,
  cover,            // Bildpfad oder data:-URL
  intro, extras: [string],
  team: { operator: {name, text, placeholder?}, cleaning: {…}, greeting: {…} },
  demo: boolean }
```

**Datenmodell Unterkunft (`unit`)**
```js
{ id, hostId, name, tagline, category /* 'Ferienwohnung'|'Zimmer mit Frühstück'|'Hotel' */,
  persons, sqm, rooms, priceFrom, description, features: [string],
  photos: [{ src, placeholder? }],   // max. 4
  lat, lng, visible: boolean,
  placeholderFields: [fieldName] }   // Felder, die als „PH“ markiert werden
```

**Kalender:** pro Unterkunft ein Array belegter Tage `['2026-10-03', …]`. Ein Tag steht für **eine Nacht ab diesem Tag**.

### 4.2 Speicher: localStorage (Prototyp, kein Backend)

Präfix `wohlii.v1.`, alle Werte JSON:

| Schlüssel | Inhalt |
|---|---|
| `hosts` | `{ hostId: host }`: Overrides und neue Gastgeber |
| `units` | `{ unitId: unit }`: Overrides und neue Unterkünfte |
| `unitsRemoved` | `[unitId]`: gelöschte Unterkünfte |
| `calendar` | `{ unitId: ['YYYY-MM-DD', …] }`: gespeicherte Belegung |
| `users` | `[{ id, role: 'guest'|'host', name, email, pw, created, hostId? }]` |
| `session` | `userId` oder `null` |
| `fav.<userId>` / `fav.anon` | `[unitId]`. Anonyme Favoriten werden beim Login übernommen |
| `inq.<userId>` | `[{ id, at, unitId, type: 'E-Mail'|'Anruf', from?, to?, persons? }]` |
| `consent` | `{ necessary: true, maps: boolean, at }` |
| `search` | `{ region, cat, month }` |
| *(ohne Präfix)* `wohlii.stil` | `'klassisch'` / `'heimelig'` |

**Store-API** (`Wohlii.store`):

| Bereich | Methoden |
|---|---|
| Hilfe | `iso(date)` |
| Gastgeber | `hosts()`, `host(id)`, `saveHost(host)` |
| Unterkünfte | `units({includeHidden})`, `unit(id)`, `unitsOfHost(hostId, opts)`, `saveUnit(u)`, `removeUnit(id)` |
| Belegung | `booked(unitId)` → `Set`, `setBooked(unitId, set)`, `freeNightsInMonth(unitId, y, m)` |
| Konten | `users()`, `register({...})`, `login(email, pw)`, `logout()`, `currentUser()`, `ensureDemoUsers()`, `mergeAnonFavorites(user)` |
| Gast | `favorites()`, `toggleFavorite(id)`, `inquiries()`, `logInquiry(entry)`, `removeInquiry(id)` |
| Sonstiges | `consent()`, `setConsent(c)`, `lastSearch()`, `saveSearch(q)` |

- Alle Schreibmethoden geben `true` oder `false` zurück. `false` heißt: Speicher voll, z. B. durch große Fotos.
- Die Seiten zeigen dann eine Fehlermeldung.

### 4.3 Authentifizierung (nur Demo)

- Konten liegen im localStorage.
- Das Passwort wird clientseitig per `crypto.subtle` gehasht: SHA-256 über `'wohlii:' + passwort`, mit festem Präfix und ohne individuellen Salt.
- Ist `crypto.subtle` nicht verfügbar, greift ein einfacher Fallback-Hash. **Das ist nicht sicher und nur für den Prototyp gedacht.**
- **Demo-Konten** legt `ensureDemoUsers()` an, Passwort jeweils `wohlii`:
  - `gast@demo.wohlii`: Gast.
  - `vermieter@demo.wohlii`: Vermieter, verknüpft mit `hostId: 'saathoff'`.
- **Registrierung als Vermieter** legt automatisch einen neuen Gastgeber an: `id = 'h' + Zeitstempel(base36)`, Koordinaten Deutschlandmitte, Titelbild `leinen.jpg`.
- **Rechte:** `requireRole('guest'|'host')` leitet bei fehlender Rolle nach `login.html?next=<seite>&rolle=<rolle>` um. Das ist rein clientseitig.

### 4.4 APIs und externe Dienste

| Dienst | Wie | Wann |
|---|---|---|
| Google Maps JS API | `loadGoogle()` in app.js, `google.maps.Map`, `google.maps.Marker` (Kreis-Symbol mit Zahl), `InfoWindow` | nur mit `googleApiKey` **und** Einwilligung |
| OpenStreetMap + Leaflet | `loadLeaflet()` lädt lokale Dateien, Kacheln von `tile.openstreetmap.org`, `L.divIcon`-Pins | ohne Schlüssel, nach Einwilligung |
| Google-Maps-Links | `https://www.google.com/maps/search/?api=1&query=…` | normaler Link, erst beim Klick |
| E-Mail / Telefon | `mailto:` mit vorbefülltem Betreff/Text, `tel:` | Klick des Gastes, keine Serverbeteiligung |
| schema.org JSON-LD | `LodgingBusiness` (Haus), `Accommodation`/`HotelRoom` (Unterkunft) per `jsonLd()` | auf Haus- und Detailseite |
| myhome-norderney.de | `tools/fotos_laden.py` liest die HTML-Seiten `…/unterkunft/3-apartmenthaus-saathoff-wohnung-{1..10}` und lädt Bilder | manuell, lokal beim Betreiber |

**Connectors / MCP:**
- In der Website selbst gibt es keine.
- In der Entwicklung wurde nur der GitHub-Zugang (Branch-Push) verwendet.

### 4.5 Echte Fotos (Schnittstelle)

- `js/fotos.js` definiert `window.WOHLII_FOTOS = { 'saathoff-w1': ['assets/img/unterkuenfte/saathoff-w1/1.jpg', …] }`.
- `data.js` ersetzt damit die `photos` der jeweiligen Unterkunft (max. 4, **ohne** Platzhalter-Kennzeichnung).
- Ist die Datei leer, bleiben die Makro-Platzhalter.
- `tools/fotos_laden.py` füllt diese Datei automatisch:
  - Pro Seite liest es `og:image`, `src`, `data-src`, `data-lazy`, `href` auf Bilddateien und `srcset` (jeweils die größte Variante).
  - Logos, Icons und Bilder unter 25 kB überspringt es.
  - Es speichert maximal 4 Bilder pro Wohnung.
- **Das Skript ist nur gegen eine nachgebaute Testseite getestet, nicht gegen die echte Seite.**

### 4.6 claude.ai-Artifacts (Vorschau)

- `tools/build_preview.py <ausgabe.html> [klassisch|heimelig]` erzeugt **eine** HTML-Datei:
  - Gebündelt werden CSS, Schriften als Base64, alle Skripte und alle Seiteninhalte.
  - Bilder werden als Begleitdateien unter `assets/img/…` mitveröffentlicht.
- **Warum nötig:** Artifacts erlauben keine Query-Strings, keine echten Seitenwechsel und keine externen Kartendienste (CSP).
- **Interner Router:**
  - `__nav(url)` tauscht `<main>` aus und führt die gesammelten `DOMContentLoaded`-Handler der Zielseite erneut aus.
  - `__VL` ersetzt `location.search/pathname/hash`.
  - Deep-Links laufen per Hash-Token `#unterkunft.saathoff-w8`.
- **Quelltext-Umschreibungen per Regex:**
  - `document.addEventListener('DOMContentLoaded',` → `__onReady(`
  - `location.href = X;` → `__nav(X);`
  - `history.replaceState(null, '', ` → `__VL.set(`
  - Die Karte wird zur Skizze mit Hinweis.
- **Artifact-Capabilities** (window.claude, Datenbank, geteilter Zustand): **nicht verwendet**. Die Vorschau speichert nur im localStorage des jeweiligen Betrachters.
- Veröffentlichte Artifacts:
  - `…/7921L7T7jQC4hJ2GNkLcoN`: klassisch.
  - `…/9Dx95UCwnK8j9bM8ZS7UNS`: heimelig.
  - Beide werden über erneutes Veröffentlichen derselben Datei aktualisiert, nicht automatisch.

---

## 5. Funktionen im Detail

### 5.1 Kopf, Fuß, Navigation (alle Seiten)

- **Logo:** führt zur Startseite. Höhe 78 px, auf dem Handy 64 px, in der Fußzeile 96 px. `srcset` liefert 1× und 2×.
- **Navigation:** Unterkünfte (`index.html#brett`), Für Gastgeber, Unser Konzept, ♡ mit Favoriten-Zähler (→ `konto.html#favoriten`).
- **Konto-Button:** abhängig von der Rolle „Anmelden“, „Mein Konto“ oder „Mein Gastgeber-Bereich“.
- **Unter 860 px:** Hamburger-Menü mit `aria-expanded`.
- **Fußzeile:** Claim, Hinweis „nur Vermittlung, keine Provision“, die drei Werte, Links (Konzept, Gastgeber werden, Anmelden, Impressum, Datenschutz), Button „Cookie-Einstellungen“ und der Umschalter „Design: klassisch · heimelig“. Der Umschalter fehlt, wenn `window.__STIL` gesetzt ist.
- **Designvariante:**
  - Bestimmt in dieser Reihenfolge: `window.__STIL`, dann `?stil=`, dann `localStorage['wohlii.stil']`, sonst `klassisch`.
  - Setzt `<html data-stil>` und lädt bei Bedarf `css/wohlii-heimelig.css` nach.
  - Ein Klick auf den Umschalter speichert die Wahl und lädt die Seite neu.

### 5.2 Cookie-/Einwilligungs-Hinweis

- Erscheint beim ersten Besuch unten links.
- **Optionen:**
  - „Nur notwendige“: Karten aus.
  - „Auswahl speichern“: Checkbox Karten.
  - „Alle akzeptieren“: Karten an.
- „Notwendig“ ist fest aktiviert und umfasst Login, Favoriten und die Auswahl selbst.
- Wieder öffnen über „Cookie-Einstellungen“ im Fuß.
- Beim Speichern feuert `wohlii:consent`. Offene Karten-Platzhalter laden dann sofort.

### 5.3 Startseite (`index.html`, `home.js`)

**Suchleiste**
- **Region oder Ort:** freier Text mit `datalist`, gefüllt aus Region, Ort und Bundesland aller Gastgeber.
- **Treffer:** Teilstring-Suche ohne Groß-/Kleinschreibung in Region, Ort, Bundesland, Hausname und PLZ.
- **Kategorie:** Alle / Ferienwohnung / Zimmer mit Frühstück / Hotel.
- **Monat:** die nächsten 12 Monate.
- „Suchen“ wendet die Suche an, schreibt die URL (`?region=&kat=&monat=#brett`), speichert die Suche und scrollt zum Brett.

**Startzustand**
- Reihenfolge: URL-Parameter, dann letzte gespeicherte Suche, dann Standard.
- **Standardmonat:** der aktuelle Monat. Bleiben weniger als 10 Tage im Monat, startet das Brett mit dem nächsten Monat.
- Ein ungültiger Monat in der URL fällt auf den Standard zurück.

**Werte-Leiste**
- Drei Kacheln (herzlich, heimelig, putzmunter), verlinkt auf die Abschnitte in `konzept.html`.

**Schwarzes Brett**
- **Kopf:**
  - Monat mit Vor/Zurück. An den Grenzen der 12 Monate werden die Buttons deaktiviert.
  - Checkbox „nur mit freien Nächten“, standardmäßig an.
  - Trefferzahl, z. B. „12 Unterkünfte von 5 Gastgebern“, mit richtiger Einzahl/Mehrzahl.
- **Sortierung:** nach freien Nächten im gewählten Monat, absteigend.
- **Eintrag:**
  - Foto (mit „Platzhalter-Foto“-Hinweis), Chip Kategorie, Ort, Region, ggf. „Demo“-Chip.
  - Name mit Link auf die Detailseite, Hausname mit Link auf die Hausseite, Kurzbeschreibung (Handschrift).
  - Personen, m², „ab … € / Nacht“, jeweils mit „PH“-Markierung bei Platzhaltern.
  - Buttons „E-Mail-Anfrage“ (öffnet den Dialog), „Anrufen“ (`tel:`), „Details“, dazu das Herz.
  - Kompakter Monatskalender mit „X Nächte frei“.
- **Leerer Zustand:** Hinweis mit Vorschlag, einen anderen Monat oder eine größere Region zu wählen. Die Karte wird dann ausgeblendet.

**Karte**
- **Ein Pin pro Gastgeber**, nicht pro Unterkunft. Die Zahl im Pin ist die Anzahl der Treffer.
- **Popup:** Hausname, Ort, Liste der Wohnungen mit „n frei“ und Links.
- **Hover über einen Eintrag** hebt den Pin hervor (Koralle).
- **Klick auf einen Pin** markiert alle Einträge des Hauses. Am Desktop scrollt die Liste zum ersten Eintrag.

**Layout und Sonderfälle**
- **Klassisch:** Liste links, Karte rechts mit `sticky`.
- **Unter 1000 px:** Umschalter Liste/Karte. Die Karte ist dann 58vh hoch und steht über der Liste.
- **Heimelig:** Karte als breites Band oben, Einträge als Karten im Raster.
- **Freie Nächte** zählen erst ab heute; vergangene Tage gelten als „vergangen“.

### 5.4 Apartmenthaus-Seite (`haus.html?id=…`, Standard `saathoff`)

- **Kopf:** Titelbild mit Region, Bundesland, ggf. Demo-Chip, Name, Ort und Anzahl der Unterkünfte.
- **Brotkrume:** Schwarzes Brett › Haus.
- **Willkommen:** Einleitung, Besonderheiten als Chips.
  - Bei Saathoff erscheint ein Hinweis auf Platzhalter.
  - Bei Demo-Häusern erscheint ein Hinweis „frei erfunden“.
- **Kontaktkarte:** „E-Mail schreiben“ (`mailto`), „Anrufen“, „Website des Gastgebers ↗“, E-Mail, Telefon, Adresse mit Link „In Google Maps öffnen ↗“ und Hinweis „keine Provision“.
- **„Unsere Wohnungen“:** Kachel-Raster mit Bild, Herz, Name, Kurzbeschreibung und Eckdaten. Nur sichtbare Unterkünfte erscheinen.
- **„Die Menschen hinter dem Haus“:** Betreiber, Reinigung und Begrüßung mit Namen und Satz. Ein „PH“ kennzeichnet Platzhalter.
- **Karte:** ein Pin, Zoom 15.
- **JSON-LD:** `LodgingBusiness`.
- **Unbekannte ID:** „Gastgeber nicht gefunden“ mit Link zurück.

### 5.5 Detailseite (`unterkunft.html?id=…`, Standard `saathoff-w1`)

- **Kopf:** Brotkrume, Kategorie-Chip, Ort, Region, Titel „Name · Haus“, Kurzbeschreibung, Herz.
- **Galerie:** 4 Felder (1 groß, 3 klein). Fehlen Fotos, werden die Felder mit Platzhaltern aufgefüllt.
  - Klick öffnet eine **Lightbox** (`<dialog>`) mit Zurück/Weiter (auch per Pfeiltasten), Schließen und „Foto n von 4 · Platzhalter“.
- **Eckdaten:** Personen, Wohnfläche, Räume, Preis ab. Dazu Beschreibung und Ausstattungs-Chips.
- **„Wann ist frei?“:** 3 Monatskalender nebeneinander (unter 760 px untereinander), blätterbar in 3er-Schritten über 12 Monate, mit Legende.
- **„Wer ist für Sie da?“:** Ansprechpartner wie auf der Hausseite.
- **Lage:** Adresse, Karte (ein Pin, Zoom 15), Link „Route in Google Maps planen ↗“.
- **Kontaktkarte rechts** (sticky): Preis, „Anfrage per E-Mail“ (Dialog), „Anrufen“, Website-Link, Kontaktdaten.
- **„Weitere Unterkünfte bei …“:** bis zu 4 Kacheln plus Link zur Hausseite.
- **Handy (unter 900 px):** feste Kontaktleiste unten mit „E-Mail-Anfrage“ und „Anrufen“. Der Fuß bekommt dafür zusätzlichen Abstand (`body.has-cta`).
- **JSON-LD:** `Accommodation` bzw. `HotelRoom`.
- **Unbekannte ID:** „Unterkunft nicht gefunden“.

### 5.6 Anfrage-Dialog

- Öffnet sich als modales `<dialog>`. Schließen geht per ×, ESC oder Klick daneben.
- **Felder:**
  - Anreise: vorbelegt mit dem 1. des gewählten Monats; im aktuellen Monat mit morgen.
  - Abreise, Personen (min. 1, max. = Personenzahl der Unterkunft), Name (beim angemeldeten Gast vorbelegt, außer bei Demo-Namen), Nachricht.
- **„E-Mail vorbereiten“** baut beim Klick einen `mailto:`-Link:
  - Betreff: `Anfrage über wohlii-urlaub.de: <Unterkunft>, <von> – <bis>`.
  - Text: Moin-Gruß, Daten, Nachricht, Name und „gefunden auf www.wohlii-urlaub.de“.
- **„Anrufen: <Nummer>“** ist ein `tel:`-Link.
- Die E-Mail-Adresse steht zusätzlich als markierbarer Text mit „kopieren“ (Clipboard API, Fallback-Hinweis).
- **Protokoll:**
  - Ist ein Gast angemeldet, schreibt jeder Klick auf E-Mail oder Anruf einen Eintrag in `inq.<userId>`.
  - Auch „Anrufen“-Buttons außerhalb des Dialogs werden protokolliert.
  - Nicht angemeldete Besucher sehen den Tipp „Mit Gast-Konto anmelden“.

### 5.7 Login / Registrierung (`login.html`)

- **Tabs** „Anmelden“ und „Neues Konto“. `?neu` öffnet direkt die Registrierung, `?rolle=host` wählt „Gastgeber“ vor.
- **Registrierung:**
  - Felder: Rolle (Gast oder Gastgeber), Name, bei Gastgebern der Hausname, E-Mail, Passwort und eine Checkbox zur Datenschutzerklärung.
  - **Validierung:** Name nicht leer, E-Mail per Regex, Passwort mindestens 8 Zeichen, Datenschutz bestätigt, E-Mail noch nicht vergeben. Fehler erscheinen auf Deutsch in einer `role=alert`-Zeile.
- **Weiterleitung nach Erfolg:**
  - Zu `?next=`, aber nur relative Ziele (Schutz vor offener Weiterleitung).
  - Sonst Gastgeber zu `vermieter.html`, Gäste zu `konto.html`.
- Ein **Demo-Kasten** listet die Zugangsdaten.
- Anonyme Favoriten werden beim Login oder bei der Registrierung ins Konto übernommen.

### 5.8 Gast-Konto (`konto.html`, nur Rolle `guest`)

- **Tab „Favoriten (n)“:** Kachel-Raster.
  - Ohne Favoriten erscheint ein Hinweis auf das Herz am Schwarzen Brett.
  - Entfernt man ein Herz, rendert der Tab sofort neu.
- **Tab „Meine Anfragen (n)“:**
  - Pro Anfrage: Unterkunft (Link), Haus, Art, Datum, Zeitraum und Personen, dazu „Entfernen“.
  - Ist die Unterkunft gelöscht, steht dort „Unterkunft entfernt“.
- Der aktive Tab steht im Hash; außerdem gibt es den Button „Abmelden“.

### 5.9 Gastgeber-Bereich (`vermieter.html`, nur Rolle `host`)

Kopf mit Hausname, „Meine öffentliche Seite“ und „Abmelden“. Der aktive Tab steht im Hash.

**Tab „Unterkünfte“**
- Liste aller Unterkünfte, auch verborgener (Chip „verborgen“), mit „Bearbeiten“, „Kalender“ und „Ansehen“.
- **„+ Neue Unterkunft“:** neue ID `<hostId>-<zeit36>`, Koordinaten vom Haus übernommen.
- **Formular:** Name (Pflicht), Kategorie, Kurzbeschreibung, Personen, m², Räume, Preis ab, Beschreibung, Ausstattung (Komma-Liste), Breiten- und Längengrad, „auf wohlii anzeigen“.
- **Fotos:** 4 Felder. Upload per Dateiauswahl; das Bild wird per Canvas auf max. 1200 px verkleinert und als JPEG-Data-URL (Qualität 0,72) gespeichert. × entfernt ein Foto.
- **Platzhalter-Logik:** Ein Feld verliert die „PH“-Markierung, sobald der Vermieter es **ändert**. Bleibt der Wert gleich, bleibt die Markierung.
- **Löschen** mit Bestätigung im Formular, weil `confirm()` in Artifacts nicht funktioniert.
- Ist der Speicher voll, erscheint eine Fehlermeldung.

**Tab „Belegungskalender“**
- Unterkunft wählen, 3 Monate anzeigen, blättern.
- **Tag antippen** schaltet zwischen frei und belegt um und speichert sofort. Vergangene Tage sind nicht klickbar.
- **„Zeitraum auf einmal eintragen“:** von/bis, dann „Als belegt markieren“ oder „Als frei markieren“.
  - Die **Abreisenacht bleibt frei**, damit am selben Tag der nächste Gast anreisen kann.
  - Prüfung: Abreise muss nach Anreise liegen.
  - Ergebnis als Toast mit Anzahl der Nächte.

**Tab „Haus & Ansprechpartner“**
- Felder: Name (Pflicht), Urlaubsregion (Auswahlliste mit 18 Regionen), Bundesland (16), Straße, PLZ, Ort, E-Mail, Telefon, Website (muss mit `https?://` beginnen), Begrüßungstext, Besonderheiten, Titelbild (max. 1600 px).
- **Ansprechpartner:** Betreiber, Reinigung, Begrüßung, jeweils Name und Satz.
- Speichern aktualisiert auch den Titel im Kopf. Selbst eingetragene Ansprechpartner gelten nicht mehr als Platzhalter.

**Tab „Google Maps & Verlinkung“**
- **Position:** Breiten- und Längengrad mit grober Deutschland-Prüfung (Breite 47–55,2, Länge 5,8–15,1). Optional werden die Koordinaten auf alle Unterkünfte übertragen. Dazu eine Anleitung, wie man die Koordinaten in Google Maps findet.
- **Google-Unternehmensprofil:** 5-Schritte-Checkliste und der Link „Prüfen, ob Sie schon gefunden werden ↗“.
- **Verlinkung:**
  - Zeigt die eigene Website an.
  - Liefert einen HTML-Link-Code „Auch auf wohlii-urlaub.de – direkt beim Gastgeber“ mit „Code kopieren“ zum Einbau auf der Vermieter-Website.

### 5.10 Statische Seiten

| Seite | Inhalt |
|---|---|
| `konzept.html` | Die drei Werte als Abschnitte mit Ankern `#herzlich`, `#heimelig`, `#putzmunter`; „So funktioniert wohlii“ in 3 Schritten; Hinweis-Band „Gastgeber werden“ |
| `gastgeber.html` | Pitch; Vergleichstabelle wohlii vs. große Portale (Kosten, Kontakt, Buchung, Darstellung, Website); 4 Schritte; Gebühren-Band „9 €/Monat“ (PH) |
| `impressum.html` | Muster nach **§ 5 DDG**, § 18 Abs. 2 MStV; Hinweis zur Vermittlerrolle, Bildnachweis |
| `datenschutz.html` | Muster: Verantwortlicher, Hosting/Logs (Art. 6 Abs. 1 f), Konto (Art. 6 Abs. 1 b), Browser-Speicher (§ 25 Abs. 2 TDDDG), **Karten** mit Anker `#karten` (Einwilligung Art. 6 Abs. 1 a, § 25 Abs. 1 TDDDG; Google Ireland, Data Privacy Framework; OSMF), Kontakt zu Gastgebern, lokale Schriften, Betroffenenrechte, Aufsichtsbehörde Niedersachsen |

### 5.11 Platzhalter-Kennzeichnung

- **`PH`-Badge** (`<abbr class="ph">`) neben jedem Wert, der in `placeholderFields` steht, und bei Ansprechpartnern mit `placeholder: true`.
- **„Platzhalter-Foto“-Badge** auf Fotos mit `placeholder: true`.
- **„Demo“-Chip** bei erfundenen Gastgebern.
- **Gelbe Hinweisboxen** (`.ph-note`) auf Hausseite, Impressum und Datenschutz.
- Die Fußzeile trägt den Vermerk „Prototyp – Inhalte teilweise Platzhalter“.

---

## 6. Design

### 6.1 Farben Version 1 „klassisch“ (`css/wohlii.css`, `:root`)

Moodboard-Farben laut Auftrag (die Moodboard-Bilder selbst lagen nie vor):

| Token | Wert | Rolle |
|---|---|---|
| `--sage` | `#4E7F68` | Salbeigrün: Hauptfarbe, Primär-Buttons, Pins |
| `--sage-deep` | `#3B6452` | Links, Hover, Text auf Grün-hell |
| `--sage-soft` | `#DCE8E0` | freie Kalendertage, Chip Ferienwohnung |
| `--coral` | `#D9857A` | Koralle: Favorit aktiv, Akzente |
| `--coral-deep` | `#A9534A` | Anruf-Button (weißer Text, ausreichender Kontrast), Fehler |
| `--coral-soft` | `#F6E0DA` | Chip Hotel |
| `--butter` | `#E8D58C` | Pastellgelb: PH-Badge |
| `--butter-soft` | `#F7EFCB` | Hinweisboxen, Chip Zimmer m. F. |
| `--mustard` | `#E3B24F` | Senfgelb: Fokusring, „heute“, Button gelb |
| `--stone` | `#CFCBC3` | Hellgrau: Rahmen von Feldern |
| `--stone-soft` | `#EDEAE4` | belegte Tage (schraffiert), Chips |
| `--graphite` | `#5E5E5E` | Dunkelgrau: Sekundärtext |
| `--ink` | `#3A3935` | Haupttext (dunkler als #5E5E5E wegen Kontrast) |
| `--muted` | `#6B6964` | gedämpfter Text |
| `--ground` | `#FAF8F4` | Seitenhintergrund |
| `--paper` | `#FFFFFF` | Karten |
| `--line` | `#E4E0D8` | Linien |
| Fußzeile | `#3F4A44` | dunkles Grüngrau |

### 6.2 Typografie

| Rolle | Klassisch | Heimelig |
|---|---|---|
| Überschriften | Young Serif 400, `h1` clamp(2rem, 4.6vw, 3.2rem), `h2` clamp(1.5rem, 3vw, 2.1rem), `h3` 1.2rem, `text-wrap: balance` | Nunito 800, `h1` clamp(2.1rem, 4.4vw, 3.6rem) |
| Fließtext | Nunito 400, 1rem / 1.6 | gleich |
| Akzente | Caveat 700 (Werte, Taglines, Rollen, Claim) | gleich |
| Eyebrows | 0.78rem, 700, Großbuchstaben, Laufweite .08em | Farbe Friesenblau |
| Zahlen | `font-variant-numeric: tabular-nums` in Kalender und Eckdaten | gleich |

### 6.3 Farben Version 2 „heimelig“ (`css/wohlii-heimelig.css`)

Die Datei überschreibt dieselben Token-Namen unter `[data-stil="heimelig"]`. **Achtung: `--sage` ist hier Walnussbraun.**

| Token | Wert | Bedeutung |
|---|---|---|
| `--sage` / `--sage-deep` | `#6B4A35` / `#4E3526` | Walnuss: Hauptfarbe, Buttons |
| `--sage-soft` | `#F6E6C4` | Honig hell: freie Tage |
| `--coral` / `--coral-deep` / `--coral-soft` | `#C0674B` / `#A54A34` / `#F6DED4` | Hagebutte |
| `--mustard` | `#E0A93B` | Honig, passend zum Logo |
| `--butter` / `--butter-soft` | `#F2D27E` / `#FCF3DC` | |
| `--friesen` / `--friesen-soft` | `#4F7A93` / `#E1EBF1` | Friesenblau, neu |
| `--ink`, `--muted`, `--ground`, `--paper`, `--line` | `#3B2E26`, `#7C6D61`, `#FBF7F1`, `#FFFDF9`, `#EADFD1` | |
| Radien | `--r-sm` 10, `--r-md` 20, `--r-lg` 34 px | weicher als klassisch (6/14/28) |
| Fußzeile | `#4E3526`, oben eine Kante aus Friesenkacheln (CSS-Streifen) | |

### 6.4 Layout-Regeln

**Klassisch**
- Inhalt in `.wrap` mit max. 1240 px.
- Seitenrand `--gutter: clamp(16px, 4vw, 40px)`.
- Abschnittsabstand `.section` clamp(40px, 7vw, 88px).

**Heimelig**
- `.wrap` ohne Maximalbreite, Seitenrand clamp(16px, 3.5vw, 56px). Damit nutzt die Seite die volle Breite.
- **Startseite:** Bild über die ganze Breite mit mittiger Suche; Werte als Farbfelder ohne Fotos; Karte als Band (360 px); Einträge als Karten `repeat(auto-fill, minmax(290px, 1fr))`.

**Allgemein**
- Karten und Kacheln haben im Raster gleiche Kanten.
- Abstände laufen über `gap`.
- Bilder bekommen `object-fit: cover` und feste Seitenverhältnisse: Kachel 1:1, Brett-Bild 1:1 (klassisch) bzw. 4:3 (heimelig), Galerie 16:7 (klassisch) bzw. 16:6 (heimelig).
- **Sticky-Elemente:** Kopfzeile (`top: env(safe-area-inset-top)`), Karte am Brett (`top: 104px`), Kontaktkarte Detail (`top: 108px`).

### 6.5 Responsive-Verhalten (Breakpoints)

| Breite | Änderung |
|---|---|
| ≤ 1240 px (über 1000 px) | Brett-Eintrag zweispaltig, Kalender darunter (klassisch) |
| ≤ 1000 px | Brett: Karte über der Liste, Umschalter Liste/Karte |
| ≤ 900 px | Hero einspaltig; Detailseite einspaltig, Kontaktkarte nicht sticky, feste Kontaktleiste unten |
| ≤ 860 px | Hamburger-Menü; Hausseite, Login und Split-Layouts einspaltig |
| ≤ 760 px | Suchleiste 2-spaltig; Werte, Ansprechpartner, Schritte und 3er-Kalender untereinander; Fußzeile einspaltig |
| ≤ 700 px | Brett-Eintrag mit 96 px Bild; Galerie: großes Bild oben, 3 kleine darunter |
| ≤ 560 px | Formulare einspaltig; Kacheln 2-spaltig; Foto-Felder 2×2; Logo 64 px |

**Getestet** (mit Playwright, Screenshots): 1400 × 900 und 390 × 844. Es gibt keinen horizontalen Scroll (`scrollWidth − innerWidth = 0` auf allen Seiten).

### 6.6 Barrierefreiheit (umgesetzt)

- Semantik: `header`, `nav`, `main`, `footer`, `section` mit `aria-labelledby`.
- Sichtbarer Fokusring in Senf; `aria-pressed` bei Favoriten und Kalendertagen; `aria-expanded` am Menü; `role=alert` für Fehler und `aria-live` für die Trefferzahl.
- Kalendertage tragen ein `aria-label` wie „3. Oktober: frei“. `prefers-reduced-motion` schaltet Animationen ab.
- **Nicht** geprüft: vollständiger Screenreader-Test, Farbkontrast aller Kombinationen nach WCAG.

---

## 7. Entscheidungen und verworfene Ideen

| # | Entscheidung | Begründung | Verworfen |
|---|---|---|---|
| 1 | **Statischer Prototyp ohne Backend**, Daten im localStorage | Hosting, Domain und Budget sind noch offen. Sofort vorzeigbar, läuft per Doppelklick. Die Datenschicht ist gekapselt (`store.js`) | Sofort ein Node/Laravel/Supabase-Backend: würde Hosting-Entscheidungen vorwegnehmen |
| 2 | **Kein Framework, kein Build** (Vanilla JS, IIFEs, globale Objekte) | Kein Werkzeug-Setup nötig, läuft unter `file://`, leicht zu übergeben | React/Vue, ES-Module (funktionieren nicht unter `file://`) |
| 3 | **Eigenes CSS mit Tokens**, kein Tailwind | Volle Kontrolle über die Moodboard-Optik, keine CDN-Abhängigkeit, Varianten über Token-Overrides | Tailwind Play-CDN (Laufzeit-CDN, DSGVO, Produktionstauglichkeit) |
| 4 | **Schriften und Leaflet lokal** | DSGVO: Das Einbinden von Google Fonts von Google-Servern gilt seit LG München I (2022) als abmahnfähig. Außerdem war das CDN in der Entwicklungsumgebung gesperrt | Google-Fonts-Link, unpkg/cdnjs für Leaflet |
| 5 | **Karte: Google Maps JS API mit Schlüssel, sonst OpenStreetMap/Leaflet; immer erst nach Einwilligung, vorher datensparsame Skizze** | Der Auftrag wünscht Google Maps. Ohne Schlüssel soll trotzdem eine Karte laufen. Datenübertragung in die USA nur mit Einwilligung | Google-Maps-iframe-Embed (keine Mehrfach-Pins, lädt ohne Einwilligung); Karte ohne Einwilligung laden |
| 6 | **Pins am Brett pro Gastgeber gruppiert** (Zahl im Pin) | Die 10 Saathoff-Wohnungen liegen auf denselben Koordinaten; einzelne Pins würden sich überdecken | Ein Pin pro Wohnung; Marker-Clustering-Bibliothek (zusätzliche Abhängigkeit) |
| 7 | **„Bei Google Maps platzieren“ über das Google-Unternehmensprofil**, plus Anleitung im Gastgeber-Bereich und schema.org-JSON-LD | Ein Eintrag in Google Maps ist nur über das Unternehmensprofil des Betriebs möglich, nicht über eine Website | Automatischer Eintrag (gibt es nicht) |
| 8 | **Keine Buchung, nur `mailto:`/`tel:` mit vorbereitetem Anfrage-Dialog**; Anfragen werden beim Gast protokolliert | Kernidee des Auftrags: direkt beim Vermieter buchen. Es gibt keinen Mailversand über eigene Server | Kontaktformular mit Serverversand (Backend, Datenschutz) |
| 9 | **Makro-Platzhalterbilder per Python generiert** | Keine Fotos geliefert; Internet und Bilddienste gesperrt; keine Lizenzfragen | Stockfotos (Unsplash o. Ä.): gesperrt, Lizenz- und Hotlink-Probleme |
| 10 | **Platzhalter sichtbar markieren** (PH, Platzhalter-Foto, Demo) | Ausdrücklicher Auftrag | Unmarkierte Fantasiewerte |
| 11 | **4 erfundene Demo-Gastgeber** in anderen Regionen | Regions- und Kategoriesuche lässt sich sonst nicht zeigen (Saathoff hat nur Ferienwohnungen auf Norderney) | Nur Saathoff |
| 12 | **Standardmonat:** nächster Monat, wenn weniger als 10 Tage übrig sind | Am Monatsende zeigte der aktuelle Monat fast nur „vergangen“ | Immer aktueller Monat |
| 13 | **Selbstgebautes Text-Logo** (Caveat mit farbigen i-Punkten) **ersetzt** durch das gelieferte Aquarell-Logo; Hintergrund per Flood-Fill freigestellt, inneres Weiß (Schrift) bleibt | Auftraggeber-Wunsch | Logo komplett freistellen (hätte die weiße Schrift entfernt) |
| 14 | **Zweite Designvariante als Override-Stylesheet** mit `data-stil`, umschaltbar im Fuß und per `?stil=` | Gleiche Funktionen, kein doppelter Code, A/B-Vergleich möglich | Kopie aller HTML- und JS-Dateien für Version 2 |
| 15 | In „heimelig“ **weiter „Sie“-Anrede** | Konsistenz, zielgruppengerecht | „du“-Anrede (wäre gemütlicher, aber ohne Rücksprache geändert) |
| 16 | **Artifact-Vorschau als Ein-Datei-Bündel mit internem Router** | Artifacts blockieren Query-Strings, Mehrseiten-Navigation und externe Karten | Mehrseitige Veröffentlichung ohne Umbau (Links und `?id=` funktionieren dort nicht) |
| 17 | **ZIP** enthält nur Version 1 (`window.__STIL = 'klassisch'`), ohne `wohlii-heimelig.css` und `build_preview.py` | Auftrag „aus der ersten Version“ | ZIP mit Umschalter |
| 18 | **Fotos statt fest eingebaut über `js/fotos.js` + Importskript** | Netzwerksperre; Import beim Betreiber mit offenem Internet | Fotos von Hand nachbauen oder raten |
| 19 | **Kein Dark Mode** | Das Moodboard ist ein helles Pastell-Design | Automatischer Dark Mode |
| 20 | **Kein Pull Request** | Wurde nicht beauftragt; Erklärung an den Auftraggeber erfolgt | – |

---

## 8. Bekannte Bugs, Einschränkungen, Workarounds

### 8.1 Grundsätzlich (Prototyp)

| Thema | Beschreibung | Workaround / Lösung |
|---|---|---|
| **Keine gemeinsame Datenhaltung** | Alles liegt im localStorage des jeweiligen Browsers. Änderungen eines Vermieters sieht niemand sonst | Backend einführen (§9); bis dahin nur Demo |
| **Unsichere Anmeldung** | Clientseitiger SHA-256 ohne individuellen Salt, keine Server-Prüfung, Rollen nur clientseitig, kein Passwort-Reset, keine E-Mail-Bestätigung | Echte Auth (z. B. Supabase Auth, Laravel Breeze) |
| **Fotos als Data-URL** | Uploads landen im localStorage (ca. 5 MB pro Origin); schon wenige Fotos füllen ihn | Fehlermeldung bei vollem Speicher; im Livebetrieb Upload in einen Objektspeicher |
| **Beispielbelegung ist datumsabhängig** | Sie wird aus der ID relativ zu „heute“ erzeugt und verschiebt sich jeden Monat, bis ein Vermieter speichert | Bei echtem Backend entfällt das |
| **„Heute“ = Uhr des Besuchers** | Zeitzone und Uhrzeit des Clients bestimmen „vergangen“ und „frei ab heute“ | Server-Datum im Backend |
| **Anfrage-Protokoll** | Wird beim Klick auf „E-Mail vorbereiten“ oder „Anrufen“ geschrieben, nicht beim tatsächlichen Versand | Hinnehmen oder Formular mit Serverversand |
| **Kopf und Fuß per JavaScript** | Ohne JavaScript fehlen Navigation und Fuß; schlechter für SEO; dynamische Seiten (Haus, Unterkunft) sind ohne JS leer | Serverseitiges Rendern oder ein Static-Site-Generator im Livebetrieb |
| **Platzhalter bestätigen** | Ein „PH“ verschwindet nur, wenn der Vermieter den Wert **ändert**. Einen korrekten Platzhalter kann man nicht als „stimmt“ bestätigen | Später eine Checkbox „Angabe geprüft“ |

### 8.2 Technische Kleinigkeiten

| Thema | Beschreibung |
|---|---|
| **Karten-Neuaufbau** | Bei jedem Monats- oder Suchwechsel wird die Karte neu aufgebaut. Leaflet wird sauber per `remove()` entfernt, Google-Maps-Instanzen werden ohne Aufräumen ersetzt (kleines Speicherleck bei sehr vielen Wechseln) |
| **Google `Marker` veraltet** | `google.maps.Marker` gilt seit 2024 als „deprecated“, Ersatz ist `AdvancedMarkerElement` (benötigt eine Map-ID). Funktioniert noch, sollte vor dem Livegang umgestellt werden |
| **Google Maps nie live getestet** | Es gab keinen API-Schlüssel und kein Internet. Geprüft ist nur der Leaflet-Pfad (lokal geladen, Pins da; Kacheln wegen Sperre nicht sichtbar) |
| **Speicherschlüssel `wohlii.stil`** | Liegt ohne den Präfix `wohlii.v1.` und wird nicht über `store.js` verwaltet; inkonsistent, aber unkritisch |
| **Token-Namen in „heimelig“** | `--sage` steht dort für Walnussbraun. Das ist irreführend; besser semantische Namen (`--primary` usw.) einführen |
| **Event-Listener im Vorschau-Router** | Im Artifact-Bündel bleiben `document`-Listener alter „Seiten“ bestehen (z. B. `wohlii:favs` aus dem Konto). Harmlos, weil sie auf abgehängte Elemente schreiben |
| **Regex-Umschreibung in `build_preview.py`** | Ändert sich das Code-Muster (z. B. `location.href = …` über mehrere Zeilen), bricht das Bündel stillschweigend. Nach Code-Änderungen das Bündel immer testen |
| **Detailseiten-Kalender** | Startet immer mit dem aktuellen Monat, auch kurz vor Monatsende (anders als das Brett) |
| **Positionsprüfung** | Nur ein grobes Rechteck um Deutschland; Grenzregionen im Nachbarland würden akzeptiert |
| **Badge-Code im Gastgeber-Bereich** | Erzeugt bei Aufruf über http(s) `https://www.wohlii-urlaub.de/haus.html?id=…` (Domain fest im Code), unter `file://` einen relativen Link |
| **`fotos_laden.py`** | Unbekannte HTML-Struktur von myhome-norderney.de: Das Skript könnte Fremdbilder erwischen (Karten, Werbung) oder gar nichts finden. Ergebnis prüfen, notfalls `QUELLEN` anpassen oder Fotos von Hand ablegen |

### 8.3 Umgebung während der Entwicklung

- **Netzwerksperre:** Die Entwicklungsumgebung (Claude Code im Web) durfte folgende Seiten **nicht** aufrufen: apartmenthaus-saathoff.de, myhome-norderney.de, apartments-norderney.de, mein-glueck.de, casamundo.de, unsplash, cdnjs. Alle Referenzen wurden nach der Textbeschreibung umgesetzt; Saathoff-Daten stammen aus Suchergebnissen. **Lösung:** In den Umgebungseinstellungen (Netzwerkzugriff) die Domains freigeben.
- **Fehlende Anhänge:** Moodboards und die „Anlage“ mit den 10 Wohnungen sind nie angekommen.
- **Artifact-Vorschau:**
  - Keine echte Karte (CSP).
  - `mailto:`/`tel:` funktionieren je nach Betrachter nicht zuverlässig; deshalb steht die E-Mail-Adresse auch als Text da.
  - Daten nur im localStorage des Betrachters.

---

## 9. Offene Punkte und nächste Schritte

### 9.1 Vom Auftraggeber zu klären

- [ ] **Logo-Schreibweise:** „wohli!“ (Logo) vs. „wohlii“ (Domain). Texte entsprechend angleichen.
- [ ] **Designvariante wählen:** klassisch oder heimelig (oder eine Mischung). Danach eine davon als Standard setzen und die andere ggf. entfernen.
- [ ] **Moodboards** liefern und Farben/Logo abgleichen.
- [ ] **Echte Daten der 10 Saathoff-Wohnungen:** Größe, Räume, Personen, Preise, Beschreibungen, Ausstattung, Fotos. Außerdem echte Namen für Betreiber, Reinigung und Begrüßung, exakte Koordinaten und die Frage 10 oder 11 Wohnungen.
- [ ] **Gebührenmodell** festlegen (Platzhalter 9 €/Monat/Unterkunft, 3 Monate gratis).
- [ ] **Impressum und Datenschutz:** echte Angaben ergänzen, juristisch prüfen lassen.
- [ ] **Google-Maps-API-Schlüssel** erstellen (Google Cloud, Maps JavaScript API, Referrer-Beschränkung auf `*.wohlii-urlaub.de`).
- [ ] **Hosting und Domain** (EU-Hosting, Auftragsverarbeitungsvertrag).

### 9.2 Technische nächste Schritte (empfohlene Reihenfolge)

1. **Fotos einbinden.** Entweder `tools/fotos_laden.py` mit Internetzugang ausführen und das Ergebnis prüfen, oder Fotos von Hand nach `assets/img/unterkuenfte/<id>/` legen und in `js/fotos.js` eintragen.
2. **Backend einführen.** Empfehlung: **Supabase** (Postgres, Auth, Storage, EU-Region) oder Laravel. Dafür `js/store.js` gegen eine API mit gleichen Methodennamen tauschen (async machen und die Aufrufer anpassen). Tabellen:
   - `hosts`, `units`, `unit_photos`, `bookings` (Tagesliste oder Zeiträume), `users`, `favorites`, `inquiries`.
   - Row-Level-Security: Vermieter dürfen nur das eigene Haus bearbeiten.
3. **Auth:** E-Mail-Bestätigung, Passwort vergessen, Freischaltung neuer Vermieter durch wohlii (Admin-Rolle und Admin-Oberfläche fehlen noch).
4. **Foto-Upload** in den Storage, serverseitig verkleinern, WebP, max. 4 pro Unterkunft.
5. **Google Maps** auf `AdvancedMarkerElement` umstellen und mit echtem Schlüssel testen.
6. **Kalender-Sync per iCal:** Import und Export, damit Vermieter nicht doppelt pflegen (z. B. mit eigener Website oder anderen Portalen).
7. **SEO:** serverseitiges Rendern oder Static Site Generation für Haus- und Unterkunftsseiten, `sitemap.xml`, sprechende URLs (`/norderney/apartmenthaus-saathoff/wohnung-8`), Open-Graph-Tags.
8. **Bezahlung der Vermieter-Gebühren** (z. B. Abo per Stripe oder Rechnung). Das betrifft nur Vermieter; Gäste zahlen weiterhin nichts über das Portal.
9. **Qualität:** Barrierefreiheit (WCAG 2.1 AA) prüfen, automatisierte Tests (Playwright) ins Repo, Linting (ESLint, Stylelint).
10. **Aufräumen:**
    - Semantische Token-Namen einführen.
    - `wohlii.stil` über den Store verwalten.
    - Die verworfene Designvariante entfernen.
    - Den PR von `claude/wohlii-urlaub-portal-um558d` nach `main` anlegen.

### 9.3 Arbeitsweise im neuen Chat

- Repository klonen und Branch `claude/wohlii-urlaub-portal-um558d` auschecken.
- **Lokal starten:** `python3 -m http.server 8000`, dann `http://localhost:8000` öffnen. Demo-Logins siehe §4.3.
- **Variante ansehen:** `http://localhost:8000/index.html?stil=heimelig`.
- **Vorschau-Bündel bauen:** `python3 tools/build_preview.py /pfad/wohlii.html klassisch`. Bilder unter `assets/img/` neben die Datei kopieren bzw. als Begleitdateien veröffentlichen.
- **Platzhalterbilder neu erzeugen:** `pip install pillow numpy && python3 tools/make_placeholders.py`.
- **ZIP der Version 1 neu bauen:**
  - Alle Dateien außer `css/wohlii-heimelig.css`, `tools/build_preview.py` und `.gitignore` kopieren.
  - In `js/config.js` vor `window.WOHLII_CONFIG` die Zeile `window.__STIL = 'klassisch';` einfügen.
  - Aus `README.md` den Abschnitt „Designvarianten“ entfernen und `LIESMICH.txt` beilegen (Inhalt siehe Anhang am Ende).

---

## Anhang: vollständiger Quellcode

Alle selbst geschriebenen Textdateien des Branches `claude/wohlii-urlaub-portal-um558d` folgen **vollständig und ungekürzt**, genau so, wie sie im Repository liegen. Nur die Bibliothek Leaflet (fremder, minifizierter Code) und Binärdateien (Schriften, Bilder) stehen nicht im Volltext. Sie sind unten mit Größe und SHA-256 aufgeführt; Leaflet lässt sich mit einem Befehl identisch wiederherstellen.

### Übersicht Binärdateien (nicht als Text darstellbar)

| Datei | Größe | SHA-256 (Anfang) |
|---|---|---|
| `assets/fonts/caveat-latin-500-normal.woff2` | 50.904 B | `edbfb1a768829d4e…` |
| `assets/fonts/caveat-latin-700-normal.woff2` | 51.020 B | `15f9638095ad5ec9…` |
| `assets/fonts/nunito-latin-400-normal.woff2` | 16.316 B | `a5906e15ceb68f73…` |
| `assets/fonts/nunito-latin-600-normal.woff2` | 16.556 B | `45f437de32ff5973…` |
| `assets/fonts/nunito-latin-700-normal.woff2` | 16.228 B | `fa89300b9bbb3bd0…` |
| `assets/fonts/nunito-latin-800-normal.woff2` | 16.520 B | `2363d3ed037283eb…` |
| `assets/fonts/young-serif-latin-400-normal.woff2` | 26.992 B | `6ba68b9927ad2a64…` |
| `assets/img/favicon.png` | 28.453 B | `24ea29aaa183b33c…` |
| `assets/img/logo-wohli-240.png` | 81.845 B | `3ce538bd00748037…` |
| `assets/img/logo-wohli.png` | 250.400 B | `e6d63302dc6c5bef…` |
| `assets/img/macro/abendlicht.jpg` | 65.769 B | `578ada82746c5211…` |
| `assets/img/macro/blatt.jpg` | 109.932 B | `316b0c7934d0e589…` |
| `assets/img/macro/duenengras.jpg` | 124.214 B | `5ef9eff028715ce0…` |
| `assets/img/macro/gischt.jpg` | 66.751 B | `276a1897d8af4c74…` |
| `assets/img/macro/kiesel.jpg` | 113.986 B | `3beec33ff2e89aa1…` |
| `assets/img/macro/koralle.jpg` | 67.079 B | `3a8d8c84a5207650…` |
| `assets/img/macro/leinen.jpg` | 80.042 B | `cb3c9a50a506a70a…` |
| `assets/img/macro/muschel.jpg` | 128.956 B | `b1d953fcbfd55d3c…` |
| `assets/img/macro/sand.jpg` | 114.154 B | `61fbb58047634acd…` |
| `assets/img/macro/seeglas.jpg` | 65.454 B | `8fdb64e24b894836…` |
| `assets/img/macro/strick.jpg` | 132.631 B | `4da8699db6bb2a6a…` |
| `assets/img/macro/treibholz.jpg` | 95.337 B | `5a719d9541646366…` |

### Fremdbibliothek Leaflet 1.9.4 (nicht im Volltext)

| Datei | Größe | SHA-256 (Anfang) |
|---|---|---|
| `assets/vendor/leaflet/leaflet.css` | 14.806 B | `a783710282418482…` |
| `assets/vendor/leaflet/leaflet.js` | 147.552 B | `db49d009c841f5ca…` |

Wiederherstellen: `npm pack leaflet@1.9.4 && tar xzf leaflet-1.9.4.tgz && cp package/dist/leaflet.js package/dist/leaflet.css package/LICENSE assets/vendor/leaflet/`

### `datenschutz.html`

61 Zeilen · 5.220 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Datenschutz – wohlii urlaub</title>
  <meta name="description" content="Datenschutzerklärung von wohlii-urlaub.de">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main>
  <section class="wrap page-head prose">
    <p class="eyebrow">Rechtliches</p>
    <h1>Datenschutzerklärung</h1>
    <p class="ph-note">Entwurf für den Prototyp mit Platzhaltern in [eckigen Klammern]. Vor dem Livegang von einer fachkundigen Stelle prüfen lassen, insbesondere Hosting, Server-Anmeldung und Zahlungsweg der Gebühren.</p>

    <h2>1. Verantwortlicher</h2>
    <p>[Name / Firma], [Anschrift], E-Mail: [datenschutz@wohlii-urlaub.de], Telefon: [Nummer]</p>

    <h2>2. Überblick</h2>
    <p>wohlii-urlaub.de zeigt Unterkünfte und stellt den Kontakt zwischen Gästen und Gastgebern her. Wir wickeln keine Buchungen und keine Zahlungen ab. Anfragen per E-Mail oder Telefon gehen direkt an den jeweiligen Gastgeber, der dafür selbst Verantwortlicher im Sinne der DSGVO ist.</p>

    <h2>3. Hosting und Server-Protokolle</h2>
    <p>Beim Aufruf der Website verarbeitet unser Hoster [Name, Sitz] technisch notwendige Daten (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) in Server-Protokollen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer Betrieb). Die Protokolle werden nach [7] Tagen gelöscht. Mit dem Hoster besteht ein Vertrag zur Auftragsverarbeitung.</p>

    <h2>4. Kundenkonto (Login)</h2>
    <p>Für ein Gast- oder Gastgeber-Konto verarbeiten wir Name, E-Mail-Adresse und ein verschlüsselt gespeichertes Passwort. Bei Gästen außerdem Favoriten und eine Übersicht der über wohlii gestarteten Anfragen; bei Gastgebern die Angaben zu Haus, Unterkünften, Fotos, Belegung und Ansprechpartnern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Nutzungsvertrag). Sie können Ihr Konto jederzeit löschen lassen.</p>
    <p><em>Hinweis zum Prototyp:</em> In der aktuellen Vorschau werden alle Kontodaten ausschließlich im Speicher Ihres Browsers (localStorage) abgelegt und nicht an uns übertragen.</p>

    <h2>5. Speicherungen im Browser und Cookies</h2>
    <p>Wir verwenden nur technisch notwendige Speicherungen in Ihrem Browser: Anmeldestatus, Favoriten, Ihre Auswahl im Cookie-Hinweis und die zuletzt verwendete Suche. Grundlage ist § 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. b bzw. f DSGVO. Eine Analyse Ihres Verhaltens oder Werbe-Tracking findet nicht statt.</p>

    <h2 id="karten">6. Karten (Google Maps / OpenStreetMap)</h2>
    <p>Karten laden wir erst, nachdem Sie im Cookie-Hinweis oder über „Karte laden“ zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Vorher sehen Sie nur eine Skizze, für die keine Daten übertragen werden.</p>
    <h3>Google Maps</h3>
    <p>Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Laden der Karte werden u. a. Ihre IP-Adresse und Informationen über die Nutzung an Google übertragen, ggf. auch an Server der Google LLC in den USA. Google ist unter dem EU-US Data Privacy Framework zertifiziert. Mehr: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener">Datenschutzerklärung von Google</a>.</p>
    <h3>OpenStreetMap</h3>
    <p>Ist Google Maps nicht eingerichtet, nutzen wir Kartenkacheln der OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, Vereinigtes Königreich. Dabei wird Ihre IP-Adresse an deren Server übertragen. Mehr: <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener">Datenschutz der OSMF</a>.</p>
    <p>Ihre Einwilligung können Sie jederzeit über „Cookie-Einstellungen“ im Seitenfuß widerrufen.</p>
    <p>Links „In Google Maps öffnen“ führen erst bei Klick zu Google.</p>

    <h2>7. Kontakt zu Gastgebern</h2>
    <p>Die Schaltflächen „E-Mail-Anfrage“ und „Anrufen“ öffnen Ihr eigenes E-Mail-Programm bzw. Ihre Telefon-App. Die Nachricht wird nicht über unsere Server geleitet. Bei angemeldeten Gästen merken wir uns lediglich, dass Sie eine Anfrage gestartet haben (Unterkunft, Datum, gewünschter Zeitraum), damit Sie sie im Konto wiederfinden.</p>

    <h2>8. Schriftarten</h2>
    <p>Alle Schriftarten sind lokal auf unserem Server eingebunden. Es findet keine Verbindung zu Google Fonts statt.</p>

    <h2>9. Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie auf Widerruf erteilter Einwilligungen. Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren, z. B. bei der Landesbeauftragten für den Datenschutz Niedersachsen.</p>

    <p class="small muted">Stand: [Datum]</p>
  </section>
</main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
</body>
</html>
````

### `gastgeber.html`

68 Zeilen · 3.953 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Für Gastgeber – wohlii urlaub</title>
  <meta name="description" content="Unterkünfte auf wohlii-urlaub.de zeigen: direkte Anfragen, keine Buchungsprovision.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main>
  <section class="wrap page-head">
    <div class="split">
      <div>
        <p class="eyebrow">Für Gastgeber</p>
        <h1>Ihre Gäste buchen direkt bei Ihnen.</h1>
        <p class="hero-lead">wohlii zeigt Ihre Unterkünfte mit Fotos, freien Zeiträumen und Karte – und schickt Anfragen direkt an Ihr E-Mail-Postfach oder Telefon. Die Buchung bleibt ganz bei Ihnen.</p>
        <p style="display:flex;gap:.6rem;flex-wrap:wrap"><a class="btn btn-primary" href="login.html?neu&amp;rolle=host">Gastgeber-Konto anlegen</a><a class="btn btn-ghost" href="haus.html?id=saathoff">Beispiel ansehen: Apartmenthaus Saathoff</a></p>
      </div>
      <img src="assets/img/macro/leinen.jpg" alt="Leinenstruktur in Makroaufnahme (Platzhalter)">
    </div>
  </section>

  <section class="wrap section" style="padding-top:1rem" aria-labelledby="vergleich">
    <h2 id="vergleich">wohlii im Vergleich</h2>
    <div class="table-scroll">
      <table class="compare">
        <thead><tr><th scope="col"></th><th scope="col">wohlii-urlaub.de</th><th scope="col">Große Buchungsportale</th></tr></thead>
        <tbody>
          <tr><th scope="row">Kosten</th><td>Kleine, feste Gebühr – keine Provision pro Buchung</td><td>Provision pro Buchung, oft rund 15 % und mehr</td></tr>
          <tr><th scope="row">Kontakt zum Gast</th><td>Direkt per E-Mail und Telefon, von Anfang an</td><td>Über das Portal, Kontaktdaten oft erst nach Buchung</td></tr>
          <tr><th scope="row">Buchung & Bezahlung</th><td>Bei Ihnen – nach Ihren Bedingungen</td><td>Über das Portal, nach Portal-Regeln</td></tr>
          <tr><th scope="row">Darstellung</th><td>Ihr Haus, Ihre Menschen: Betreiber, Reinigung, Begrüßung</td><td>Einheitliche Inserate, Fokus auf Preis und Rabatte</td></tr>
          <tr><th scope="row">Eigene Website</th><td>Wird auf jeder Seite verlinkt</td><td>Meist nicht erlaubt</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="wrap section" style="padding-top:0" aria-labelledby="ablauf">
    <h2 id="ablauf">In vier Schritten dabei</h2>
    <ol class="steps" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">
      <li><h3>Konto anlegen</h3><p>Mit E-Mail-Adresse und Passwort – in zwei Minuten.</p></li>
      <li><h3>Haus & Menschen zeigen</h3><p>Adresse, Website, Ansprechpartner für Betrieb, Reinigung und Begrüßung.</p></li>
      <li><h3>Unterkünfte & Fotos</h3><p>Jede Wohnung oder jedes Zimmer mit bis zu vier Fotos und kurzer Beschreibung.</p></li>
      <li><h3>Kalender pflegen</h3><p>Freie und belegte Tage mit einem Tipp umschalten – das Schwarze Brett zeigt es sofort.</p></li>
    </ol>
  </section>

  <section class="wrap" aria-labelledby="preise">
    <div class="band">
      <div>
        <p class="eyebrow" style="color:var(--butter)">Gebühren <abbr class="ph" title="Platzhalter – Preise werden noch festgelegt">PH</abbr></p>
        <h2 id="preise"><span class="price">9 €</span> im Monat je Unterkunft</h2>
        <p>Keine Provision, keine Vertragslaufzeit über ein Jahr. Die ersten drei Monate kostenlos. (Beispielpreise – werden noch festgelegt.)</p>
      </div>
      <a class="btn btn-butter" href="login.html?neu&amp;rolle=host">Jetzt Gastgeber werden</a>
    </div>
  </section>
</main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
</body>
</html>
````

### `haus.html`

21 Zeilen · 724 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Apartmenthaus – wohlii urlaub</title>
  <meta name="description" content="Alle Unterkünfte eines Gastgebers auf wohlii-urlaub.de">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main id="app"></main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/blocks.js"></script>
<script src="js/pages/haus.js"></script>
</body>
</html>
````

### `impressum.html`

43 Zeilen · 2.187 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Impressum – wohlii urlaub</title>
  <meta name="description" content="Impressum von wohlii-urlaub.de">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main>
  <section class="wrap page-head prose">
    <p class="eyebrow">Rechtliches</p>
    <h1>Impressum</h1>
    <p class="ph-note">Muster mit Platzhaltern in [eckigen Klammern]. Bitte vor Veröffentlichung vollständig ausfüllen und rechtlich prüfen lassen.</p>
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>[Vor- und Nachname bzw. Firmenname, Rechtsform]<br>[Straße Hausnummer]<br>[PLZ] [Ort]<br>Deutschland</p>
    <h2>Kontakt</h2>
    <p>Telefon: [Telefonnummer]<br>E-Mail: [hallo@wohlii-urlaub.de]</p>
    <h2>Vertreten durch</h2>
    <p>[Name der vertretungsberechtigten Person(en), bei Gesellschaften]</p>
    <h2>Registereintrag</h2>
    <p>[Registergericht, Registernummer – falls vorhanden]</p>
    <h2>Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: [DE…]</p>
    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>[Name, Anschrift]</p>
    <h2>Hinweis zur Vermittlung</h2>
    <p>wohlii-urlaub.de stellt lediglich Informationen über Unterkünfte bereit und stellt den Kontakt zwischen Gästen und Gastgebern her. Verträge über Unterkünfte kommen ausschließlich zwischen Gast und Gastgeber zustande. Für Angaben der Gastgeber sind diese selbst verantwortlich.</p>
    <h2>Verbraucherstreitbeilegung</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    <h2>Bildnachweis</h2>
    <p>Alle Makro-Bilder im Prototyp sind computergenerierte Platzhalter und werden durch eigene Makrofotografien ersetzt.</p>
  </section>
</main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
</body>
</html>
````

### `index.html`

94 Zeilen · 4.836 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>wohlii urlaub – Unterkünfte direkt beim Gastgeber</title>
  <meta name="description" content="wohlii-urlaub.de: Ferienwohnungen, Zimmer mit Frühstück und Hotels in ganz Deutschland – freie Zeiträume auf einen Blick, Anfrage und Buchung direkt beim Gastgeber, ohne Buchungsprovision.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">Unterkünfte in ganz Deutschland · direkt beim Gastgeber</p>
        <h1>Das Wesentliche zählt: <em>Menschen</em>, die sich auf Sie freuen.</h1>
        <p class="hero-lead">Freie Zeiträume auf einen Blick, Anfrage per E-Mail oder Anruf – und gebucht wird direkt beim Gastgeber. Ohne Buchungsprovision, mit echten Ansprechpartnern vor Ort.</p>
      </div>
      <div class="hero-mosaic" aria-hidden="true">
        <figure><img src="assets/img/macro/sand.jpg" alt=""><figcaption>Sand zwischen den Zehen</figcaption></figure>
        <figure><img src="assets/img/macro/muschel.jpg" alt=""></figure>
        <figure><img src="assets/img/macro/strick.jpg" alt=""></figure>
      </div>
    </div>
    <div class="wrap">
      <form class="search" id="search" role="search" aria-label="Unterkunft suchen">
          <label for="s-region">Region oder Ort
            <input id="s-region" list="regions" placeholder="z. B. Nordsee oder Norderney" autocomplete="off">
          </label>
          <datalist id="regions"></datalist>
          <label for="s-cat">Kategorie
            <select id="s-cat"><option value="">Alle Unterkünfte</option></select>
          </label>
          <label for="s-month">Monat
            <select id="s-month"></select>
          </label>
          <button class="btn btn-primary" type="submit">Suchen</button>
        </form>
    </div>
  </section>

  <section class="wrap" aria-label="Unsere Werte">
    <div class="values">
      <a class="value" href="konzept.html#herzlich" style="text-decoration:none">
        <img src="assets/img/macro/koralle.jpg" alt="">
        <div><b>herzlich</b><span>wohlfühlen</span><p>Gastgeber, die Sie beim Namen kennen und persönlich begrüßen.</p></div>
      </a>
      <a class="value" href="konzept.html#heimelig" style="text-decoration:none">
        <img src="assets/img/macro/blatt.jpg" alt="">
        <div><b>heimelig</b><span>inne halten</span><p>Kleine Häuser, echte Materialien, Ruhe statt Rummel.</p></div>
      </a>
      <a class="value" href="konzept.html#putzmunter" style="text-decoration:none">
        <img src="assets/img/macro/abendlicht.jpg" alt="">
        <div><b>putzmunter</b><span>inspirieren</span><p>Blitzsauber übergeben – und mit Tipps, die in keinem Reiseführer stehen.</p></div>
      </a>
    </div>
  </section>

  <section class="wrap section" id="brett" aria-labelledby="brett-title">
    <div class="board-head">
      <div>
        <p class="eyebrow">Das Schwarze Brett</p>
        <h2 id="brett-title">Freie Zeiträume im <span id="board-month">…</span></h2>
        <p class="small muted" id="board-count" aria-live="polite"></p>
      </div>
      <div class="board-tools">
        <div class="month-nav">
          <button type="button" id="m-prev" aria-label="Vorheriger Monat">‹</button>
          <strong id="m-label">…</strong>
          <button type="button" id="m-next" aria-label="Nächster Monat">›</button>
        </div>
        <label class="check small"><input type="checkbox" id="only-free" checked> nur mit freien Nächten</label>
        <div class="tabs view-toggle" role="tablist" aria-label="Ansicht">
          <button type="button" role="tab" aria-selected="true" data-view="list">Liste</button>
          <button type="button" role="tab" aria-selected="false" data-view="map">Karte</button>
        </div>
      </div>
    </div>
    <div class="board-layout" id="board-layout" data-view="list">
      <div class="board-list" id="board-list"></div>
      <div class="board-map" id="board-map" aria-label="Karte der Unterkünfte"></div>
    </div>
    <div class="cal-legend small" style="margin-top:1rem"><span><i class="lg free"></i>frei</span><span><i class="lg booked"></i>belegt</span><span><abbr class="ph">PH</abbr> Platzhalter-Angabe</span><span><span class="chip chip-demo">Demo</span> erfundener Beispiel-Eintrag</span></div>
  </section>
</main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/pages/home.js"></script>
</body>
</html>
````

### `konto.html`

21 Zeilen · 704 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Mein Konto – wohlii urlaub</title>
  <meta name="description" content="Favoriten und gesendete Anfragen.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
  <meta name="robots" content="noindex">
</head>
<body>
<main id="app"></main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/pages/konto.js"></script>
</body>
</html>
````

### `konzept.html`

73 Zeilen · 3.695 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Unser Konzept – wohlii urlaub</title>
  <meta name="description" content="herzlich, heimelig, putzmunter: warum wohlii auf das Wesentliche schaut.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main>
  <section class="wrap page-head">
    <p class="eyebrow">Unser Konzept</p>
    <h1>Das Wesentliche sehen.</h1>
    <p class="hero-lead">Große Buchungsportale zeigen tausend Filter, Rabatt-Countdowns und Sternchen. Wir zeigen, worauf es ankommt: ein schönes Zuhause auf Zeit – und die Menschen, die sich darum kümmern.</p>
  </section>

  <section class="wrap section" style="padding-top:1rem">
    <div class="split" id="herzlich">
      <img src="assets/img/macro/koralle.jpg" alt="Makroaufnahme in warmem Korallenrot (Platzhalter)">
      <div>
        <p class="hand" style="font-size:2.6rem;color:var(--coral-deep);margin:0">herzlich</p>
        <h2>wohlfühlen</h2>
        <p>Bei wohlii wissen Sie vor der Anreise, wer Ihr Gastgeber ist, wer Ihre Wohnung reinigt und wer Sie vor Ort begrüßt. Keine Callcenter, keine Schlüsselboxen ohne Gesicht – sondern Menschen, die Ihre Fragen selbst beantworten.</p>
      </div>
    </div>
  </section>
  <section class="wrap section" style="padding-top:0">
    <div class="split" id="heimelig">
      <div>
        <p class="hand" style="font-size:2.6rem;color:var(--sage);margin:0">heimelig</p>
        <h2>inne halten</h2>
        <p>Kleine Häuser, persönlich geführt. Wir zeigen Unterkünfte in ruhigen Bildern – Sand, Holz, Leinen, Wolle. Die Makrofotografie lenkt den Blick auf das Kleine und Echte: So sollen Sie auch Ihre Unterkunft auswählen.</p>
      </div>
      <img src="assets/img/macro/blatt.jpg" alt="Makroaufnahme eines Blattes (Platzhalter)">
    </div>
  </section>
  <section class="wrap section" style="padding-top:0">
    <div class="split" id="putzmunter">
      <img src="assets/img/macro/abendlicht.jpg" alt="Warmes Licht, unscharf fotografiert (Platzhalter)">
      <div>
        <p class="hand" style="font-size:2.6rem;color:#B38421;margin:0">putzmunter</p>
        <h2>inspirieren</h2>
        <p>Blitzsauber übergeben, mit Tipps für Strand, Wanderweg und Lieblingscafé, die in keinem Reiseführer stehen. Gastgeber auf wohlii teilen ihre Region – und Gäste reisen erholt und angeregt nach Hause.</p>
      </div>
    </div>
  </section>

  <section class="wrap section" style="padding-top:0" aria-labelledby="how">
    <p class="eyebrow">Für Gäste</p>
    <h2 id="how">So funktioniert wohlii</h2>
    <ol class="steps">
      <li><h3>Finden</h3><p>Region, Art der Unterkunft und Monat wählen. Am Schwarzen Brett sehen Sie sofort, wann frei ist.</p></li>
      <li><h3>Direkt anfragen</h3><p>Per E-Mail oder Anruf – Ihre Nachricht geht ohne Umweg an den Gastgeber.</p></li>
      <li><h3>Direkt buchen</h3><p>Buchung und Bezahlung vereinbaren Sie mit dem Gastgeber. Ohne Buchungsgebühr, ohne Portal dazwischen.</p></li>
    </ol>
  </section>

  <section class="wrap">
    <div class="band">
      <div><h2>Sie vermieten selbst?</h2><p>Zeigen Sie Ihre Unterkünfte auf wohlii – zu kleinen, festen Gebühren statt Provision.</p></div>
      <a class="btn btn-butter" href="gastgeber.html">Mehr für Gastgeber</a>
    </div>
  </section>
</main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
</body>
</html>
````

### `login.html`

21 Zeilen · 728 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Anmelden – wohlii urlaub</title>
  <meta name="description" content="Anmelden oder registrieren – als Gast oder als Gastgeber.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
  <meta name="robots" content="noindex">
</head>
<body>
<main id="app"></main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/pages/login.js"></script>
</body>
</html>
````

### `unterkunft.html`

21 Zeilen · 737 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Unterkunft – wohlii urlaub</title>
  <meta name="description" content="Fotos, freie Zeiträume, Lage und direkter Kontakt zum Gastgeber.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
</head>
<body>
<main id="app"></main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/blocks.js"></script>
<script src="js/pages/unterkunft.js"></script>
</body>
</html>
````

### `vermieter.html`

21 Zeilen · 740 Bytes

````html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Gastgeber-Bereich – wohlii urlaub</title>
  <meta name="description" content="Unterkünfte, Fotos, Kalender und Ansprechpartner pflegen.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="stylesheet" href="css/wohlii.css">
  <meta name="robots" content="noindex">
</head>
<body>
<main id="app"></main>
<script src="js/config.js"></script>
<script src="js/fotos.js"></script>
<script src="js/data.js"></script>
<script src="js/store.js"></script>
<script src="js/app.js"></script>
<script src="js/pages/vermieter.js"></script>
</body>
</html>
````

### `css/wohlii-heimelig.css`

145 Zeilen · 8.880 Bytes

````css
/* wohlii-urlaub.de – Designvariante „Heimelig“
 * Wird zusätzlich zu wohlii.css geladen, wenn <html data-stil="heimelig"> gesetzt ist.
 * Warme Stuben-Farben (Walnuss, Honig, Hagebutte, Friesenblau), volle Breite,
 * ruhigerer und einfacherer Aufbau: Unterkünfte als große Karten im Raster,
 * Karte als breites Band darüber.
 */
[data-stil="heimelig"] {
  --sage: #6B4A35;        /* Walnuss – Hauptfarbe */
  --sage-deep: #4E3526;
  --sage-soft: #F6E6C4;   /* Honig hell – freie Tage */
  --coral: #C0674B;       /* Hagebutte */
  --coral-deep: #A54A34;
  --coral-soft: #F6DED4;
  --butter: #F2D27E;
  --butter-soft: #FCF3DC;
  --mustard: #E0A93B;     /* Honig – passt zum Logo */
  --stone: #DCD1C3;
  --stone-soft: #F1EBE2;
  --graphite: #6A5A4E;
  --ink: #3B2E26;
  --muted: #7C6D61;
  --ground: #FBF7F1;
  --paper: #FFFDF9;
  --line: #EADFD1;
  --focus: #E0A93B;
  --friesen: #4F7A93;     /* Friesenblau für kleine Akzente */
  --friesen-soft: #E1EBF1;
  --r-sm: 10px;
  --r-md: 20px;
  --r-lg: 34px;
  --shadow: 0 2px 4px rgba(59, 46, 38, .05), 0 14px 30px -18px rgba(59, 46, 38, .35);
}

/* Volle Breite, einfache runde Schrift */
[data-stil="heimelig"] .wrap { max-width: none; padding-inline: clamp(16px, 3.5vw, 56px); }
[data-stil="heimelig"] h1, [data-stil="heimelig"] h2, [data-stil="heimelig"] h3 { font-family: var(--f-body); font-weight: 800; letter-spacing: -.015em; }
[data-stil="heimelig"] h1 { font-size: clamp(2.1rem, 4.4vw, 3.6rem); }
[data-stil="heimelig"] body { background: var(--ground); }
[data-stil="heimelig"] .eyebrow { color: var(--friesen); }

/* Kopfzeile */
[data-stil="heimelig"] .site-header { background: rgba(251, 247, 241, .96); }
[data-stil="heimelig"] .site-nav > a:not(.btn) { font-weight: 700; }
[data-stil="heimelig"] .btn-ghost { border-color: var(--stone); }

/* Hero: Bild über die ganze Breite, Suche mittig */
[data-stil="heimelig"] .hero {
  background: linear-gradient(rgba(59, 46, 38, .30), rgba(59, 46, 38, .52)), url('../assets/img/macro/sand.jpg') center / cover no-repeat;
  padding-block: clamp(56px, 9vw, 128px) clamp(40px, 6vw, 80px);
  text-align: center;
}
[data-stil="heimelig"] .hero-grid { grid-template-columns: 1fr; justify-items: center; }
[data-stil="heimelig"] .hero-mosaic { display: none; }
[data-stil="heimelig"] .hero .eyebrow { color: var(--butter-soft); justify-content: center; }
[data-stil="heimelig"] .hero h1 { color: #fff; max-width: 17ch; margin-inline: auto; text-shadow: 0 2px 18px rgba(0, 0, 0, .25); }
[data-stil="heimelig"] .hero h1 em { color: var(--butter); }
[data-stil="heimelig"] .hero-lead { color: #fff; margin-inline: auto; font-size: 1.15rem; }
[data-stil="heimelig"] .search { max-width: 1040px; margin-inline: auto; border: 0; text-align: left; box-shadow: 0 20px 50px -20px rgba(0, 0, 0, .45); }

/* Werte: schlichte, warme Farbfelder statt Fotos */
[data-stil="heimelig"] .values { margin-top: clamp(24px, 4vw, 48px); }
[data-stil="heimelig"] .value { min-height: 0; color: var(--ink); text-align: center; justify-content: center; border-radius: var(--r-md); }
[data-stil="heimelig"] .value img, [data-stil="heimelig"] .value::before { display: none; }
[data-stil="heimelig"] .value:nth-child(1) { background: var(--coral-soft); }
[data-stil="heimelig"] .value:nth-child(2) { background: var(--friesen-soft); }
[data-stil="heimelig"] .value:nth-child(3) { background: var(--butter-soft); }
[data-stil="heimelig"] .value div { padding: 1.4rem 1.2rem 1.5rem; }
[data-stil="heimelig"] .value b { font-size: 2.4rem; }
[data-stil="heimelig"] .value:nth-child(1) b { color: var(--coral-deep); }
[data-stil="heimelig"] .value:nth-child(2) b { color: var(--friesen); }
[data-stil="heimelig"] .value:nth-child(3) b { color: #A87414; }
[data-stil="heimelig"] .value span { color: var(--muted); }
[data-stil="heimelig"] .value p { margin-inline: auto; color: var(--graphite); }

/* Schwarzes Brett: Karte als breites Band, Unterkünfte als große Karten */
[data-stil="heimelig"] .board-layout { grid-template-columns: 1fr; gap: 28px; }
[data-stil="heimelig"] .board-map { position: relative; top: 0; order: -1; height: 360px; min-height: 0; border-radius: var(--r-lg); border: 0; box-shadow: var(--shadow); }
[data-stil="heimelig"] .board-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: clamp(16px, 2vw, 28px); }
[data-stil="heimelig"] .board-entry { grid-template-columns: 1fr; gap: 0; padding: 0; overflow: hidden; border: 0; border-radius: var(--r-md); box-shadow: var(--shadow); background: var(--paper); align-content: start; }
[data-stil="heimelig"] .board-entry:hover, [data-stil="heimelig"] .board-entry.active { box-shadow: 0 0 0 3px var(--mustard), var(--shadow); }
[data-stil="heimelig"] .be-img { aspect-ratio: 4 / 3; border-radius: 0; }
[data-stil="heimelig"] .be-img .ph-badge { display: inline-block; font-size: .66rem; left: .7rem; bottom: .7rem; }
[data-stil="heimelig"] .be-info { padding: 1rem 1.1rem .4rem; }
[data-stil="heimelig"] .be-info h3 { font-size: 1.3rem; }
[data-stil="heimelig"] .be-house { display: block; font-size: .85rem; }
[data-stil="heimelig"] .be-actions { margin-top: .4rem; }
[data-stil="heimelig"] .be-actions .btn { flex: 1; }
[data-stil="heimelig"] .be-cal { grid-column: auto; max-width: none; padding: .6rem 1.1rem 1.1rem; border-top: 1px dashed var(--line); margin-top: .6rem; }
[data-stil="heimelig"] .board-entry .fav { left: auto; right: 12px; top: 12px; }
@media (max-width: 1000px) {
  [data-stil="heimelig"] .board-layout[data-view="list"] .board-map { display: none; }
  [data-stil="heimelig"] .board-layout[data-view="map"] .board-map { height: 60vh; }
}

/* Kalender in Honig statt Grün */
[data-stil="heimelig"] .cal-day.free { background: var(--sage-soft); color: var(--sage-deep); }
[data-stil="heimelig"] .cal-free { color: #A87414; }

/* Chips */
[data-stil="heimelig"] .chip-fewo { background: var(--friesen-soft); color: #33596E; }
[data-stil="heimelig"] .chip-zmf { background: var(--butter-soft); color: #7A5412; }

/* Karte (Skizze) */
[data-stil="heimelig"] .map { background: #EFE7DB; }
[data-stil="heimelig"] .map-sketch { background:
  radial-gradient(circle at 22% 35%, rgba(224, 169, 59, .16) 0 20%, transparent 21%),
  radial-gradient(circle at 76% 66%, rgba(79, 122, 147, .14) 0 24%, transparent 25%),
  linear-gradient(transparent 49.5%, rgba(255, 255, 255, .75) 49.5% 50.5%, transparent 50.5%) 0 0 / 64px 64px,
  linear-gradient(90deg, transparent 49.5%, rgba(255, 255, 255, .75) 49.5% 50.5%, transparent 50.5%) 0 0 / 64px 64px,
  #EFE7DB; }

/* Apartmenthaus & Detailseite */
[data-stil="heimelig"] .house-hero { min-height: 380px; }
[data-stil="heimelig"] .house-hero::before { background: linear-gradient(to top, rgba(59, 46, 38, .7), rgba(59, 46, 38, .05) 75%); }
[data-stil="heimelig"] .tile-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
[data-stil="heimelig"] .tile-img { border-radius: var(--r-md); }
[data-stil="heimelig"] .tile-body h3 { font-size: 1.2rem; }
[data-stil="heimelig"] .gallery { aspect-ratio: 16 / 6; }
[data-stil="heimelig"] .person { border: 0; background: var(--butter-soft); }
[data-stil="heimelig"] .person:nth-child(2) { background: var(--friesen-soft); }
[data-stil="heimelig"] .person:nth-child(3) { background: var(--coral-soft); }
[data-stil="heimelig"] .person:nth-child(1) .role { color: var(--sage); }
[data-stil="heimelig"] .person:nth-child(2) .role { color: var(--friesen); }
[data-stil="heimelig"] .contact-card, [data-stil="heimelig"] .panel { border: 0; box-shadow: var(--shadow); }
[data-stil="heimelig"] .keyfacts { border-color: var(--line); }
[data-stil="heimelig"] .features li { background: var(--butter-soft); }

/* Inhaltsseiten */
[data-stil="heimelig"] .band { background: var(--sage); }
[data-stil="heimelig"] .compare thead th { background: var(--sage); }
[data-stil="heimelig"] .compare td:nth-child(2) { background: var(--butter-soft); }
[data-stil="heimelig"] .steps li { border: 0; box-shadow: var(--shadow); }

/* Fußzeile in Walnuss mit Friesenkachel-Kante */
[data-stil="heimelig"] .site-footer { background: #4E3526; color: #F1E6D8; position: relative; }
[data-stil="heimelig"] .site-footer::before { content: ''; position: absolute; left: 0; right: 0; top: -14px; height: 14px;
  background: repeating-linear-gradient(90deg, var(--friesen) 0 14px, #FBF7F1 14px 28px); opacity: .55; }
[data-stil="heimelig"] .footer-claim { color: var(--butter); }
[data-stil="heimelig"] .footer-values li:nth-child(2) b { color: #A8C6D6; }
[data-stil="heimelig"] .footer-base { color: #D6C6B4; }

/* Designwahl im Fuß */
.stil-switch { display: inline-flex; gap: .4rem; align-items: center; flex-wrap: wrap; }
.stil-switch button[aria-pressed="true"] { font-weight: 800; text-decoration: none; }
@media (max-width: 700px) { [data-stil="heimelig"] .gallery { aspect-ratio: auto; } }
````

### `css/wohlii.css`

454 Zeilen · 35.951 Bytes

````css
/* wohlii-urlaub.de – Stylesheet
 * Farben nach den Moodboards „Wohlii – pastellfarben“ und „Wohlii – gelb + grau“.
 * Schriften liegen lokal (DSGVO: kein Abruf bei Google Fonts).
 */
@font-face { font-family: 'Nunito'; src: url('../assets/fonts/nunito-latin-400-normal.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Nunito'; src: url('../assets/fonts/nunito-latin-600-normal.woff2') format('woff2'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'Nunito'; src: url('../assets/fonts/nunito-latin-700-normal.woff2') format('woff2'); font-weight: 700; font-display: swap; }
@font-face { font-family: 'Nunito'; src: url('../assets/fonts/nunito-latin-800-normal.woff2') format('woff2'); font-weight: 800; font-display: swap; }
@font-face { font-family: 'Young Serif'; src: url('../assets/fonts/young-serif-latin-400-normal.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Caveat'; src: url('../assets/fonts/caveat-latin-500-normal.woff2') format('woff2'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'Caveat'; src: url('../assets/fonts/caveat-latin-700-normal.woff2') format('woff2'); font-weight: 700; font-display: swap; }

:root {
  /* Moodboard-Farben */
  --sage: #4E7F68;
  --sage-deep: #3B6452;
  --sage-soft: #DCE8E0;
  --coral: #D9857A;
  --coral-deep: #A9534A;
  --coral-soft: #F6E0DA;
  --butter: #E8D58C;
  --butter-soft: #F7EFCB;
  --mustard: #E3B24F;
  --stone: #CFCBC3;
  --stone-soft: #EDEAE4;
  --graphite: #5E5E5E;
  /* Rollen */
  --ink: #3A3935;
  --muted: #6B6964;
  --ground: #FAF8F4;
  --paper: #FFFFFF;
  --line: #E4E0D8;
  --focus: #E3B24F;

  --f-body: 'Nunito', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --f-display: 'Young Serif', Georgia, 'Times New Roman', serif;
  --f-hand: 'Caveat', 'Segoe Print', 'Bradley Hand', cursive;

  --r-sm: 6px;
  --r-md: 14px;
  --r-lg: 28px;
  --shadow: 0 1px 2px rgba(58, 57, 53, .06), 0 8px 24px -12px rgba(58, 57, 53, .18);
  --gutter: clamp(16px, 4vw, 40px);
  color-scheme: light;
}

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  margin: 0;
  font: 400 1rem/1.6 var(--f-body);
  color: var(--ink);
  background: var(--ground);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }
img { max-width: 100%; display: block; }
a { color: var(--sage-deep); text-underline-offset: .18em; }
a:hover { color: var(--coral-deep); }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; border-radius: 4px; }
h1, h2, h3 { font-family: var(--f-display); font-weight: 400; line-height: 1.2; text-wrap: balance; margin: 0 0 .4em; color: var(--ink); }
h1 { font-size: clamp(2rem, 4.6vw, 3.2rem); letter-spacing: -.01em; }
h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); }
h3 { font-size: 1.2rem; }
p { margin: 0 0 1em; }
.wrap { width: 100%; max-width: 1240px; margin-inline: auto; padding-inline: var(--gutter); }
.narrow { max-width: 760px; }
.small { font-size: .875rem; }
.muted { color: var(--muted); }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.eyebrow { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: .35em; display: flex; flex-wrap: wrap; gap: .4em; align-items: center; }
.hand { font-family: var(--f-hand); font-weight: 700; }
.select-all { user-select: all; font-weight: 700; }
.section { padding-block: clamp(40px, 7vw, 88px); }

/* ---------- Logo (Aquarell-Logo „wohli!“) ---------- */
.logo { display: inline-flex; align-items: center; text-decoration: none; line-height: 0; margin-block: 3px; }
.logo img { width: auto; height: 78px; transition: transform .25s; }
.logo:hover img { transform: rotate(-4deg) scale(1.04); }
.logo-light img { height: 96px; }

/* ---------- Kopfzeile ---------- */
.site-header { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 50; background: rgba(250, 248, 244, .94); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 88px; }
.site-nav { display: flex; align-items: center; gap: clamp(.6rem, 2vw, 1.6rem); }
.site-nav > a:not(.btn) { color: var(--ink); text-decoration: none; font-weight: 600; }
.site-nav > a:not(.btn):hover, .site-nav a[aria-current] { color: var(--sage); }
.nav-fav { white-space: nowrap; }
.fav-count { font-size: .8rem; color: var(--coral-deep); font-weight: 800; }
.nav-toggle { display: none; background: none; border: 0; width: 44px; height: 44px; cursor: pointer; position: relative; }
.nav-toggle span:first-child, .nav-toggle span:first-child::before, .nav-toggle span:first-child::after { position: absolute; left: 11px; width: 22px; height: 2px; background: var(--ink); border-radius: 2px; content: ''; transition: transform .2s; }
.nav-toggle span:first-child { top: 21px; }
.nav-toggle span:first-child::before { left: 0; top: -7px; }
.nav-toggle span:first-child::after { left: 0; top: 7px; }
@media (max-width: 860px) {
  .nav-toggle { display: block; }
  .site-nav { display: none; position: absolute; inset: 100% 0 auto; flex-direction: column; align-items: stretch; background: var(--ground); padding: 1rem var(--gutter) 1.4rem; border-bottom: 1px solid var(--line); gap: .2rem; }
  .site-nav > a:not(.btn) { padding: .7rem 0; border-bottom: 1px solid var(--line); }
  .site-nav .btn { margin-top: .8rem; }
  .site-header.open .site-nav { display: flex; }
}

/* ---------- Buttons & Formulare ---------- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .4em; font: 700 .95rem/1 var(--f-body); padding: .85em 1.3em; border-radius: 999px; border: 1.5px solid transparent; cursor: pointer; text-decoration: none; transition: background-color .15s, color .15s, border-color .15s, transform .15s; white-space: nowrap; }
.btn:hover { transform: translateY(-1px); }
.btn-sm { font-size: .85rem; padding: .65em 1.05em; }
.btn-primary { background: var(--sage); color: #fff; }
.btn-primary:hover { background: var(--sage-deep); color: #fff; }
.btn-call { background: var(--coral-deep); color: #fff; }
.btn-call:hover { background: #8F443C; color: #fff; }
.btn-ghost { background: transparent; color: var(--ink); border-color: var(--stone); }
.btn-ghost:hover { border-color: var(--sage); color: var(--sage-deep); }
.btn-butter { background: var(--mustard); color: var(--ink); }
.btn-butter:hover { background: #D9A23A; color: var(--ink); }
.linklike { background: none; border: 0; padding: 0; font: inherit; color: var(--sage-deep); text-decoration: underline; text-underline-offset: .18em; cursor: pointer; }
label { display: flex; flex-direction: column; gap: .3rem; font-weight: 700; font-size: .85rem; color: var(--ink); }
input, select, textarea { font: 400 1rem/1.3 var(--f-body); color: var(--ink); background: var(--paper); border: 1.5px solid var(--stone); border-radius: var(--r-sm); padding: .7em .8em; width: 100%; min-width: 0; }
input:focus, select:focus, textarea:focus { border-color: var(--sage); outline: none; box-shadow: 0 0 0 3px var(--sage-soft); }
.check { flex-direction: row; align-items: center; gap: .5rem; font-weight: 600; }
.check input { width: auto; accent-color: var(--sage); }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.form-grid .span2 { grid-column: 1 / -1; }
@media (max-width: 560px) { .form-grid { grid-template-columns: 1fr; } }
.hint { font-weight: 400; color: var(--muted); font-size: .8rem; }

/* ---------- Platzhalter-Kennzeichnung ---------- */
.ph { font: 800 .62rem/1 var(--f-body); letter-spacing: .06em; text-decoration: none; color: var(--ink); background: var(--butter); border-radius: 4px; padding: .2em .35em; vertical-align: middle; cursor: help; }
.ph-badge { position: absolute; left: .6rem; bottom: .6rem; font: 700 .68rem/1 var(--f-body); letter-spacing: .04em; background: rgba(255, 255, 255, .88); color: var(--ink); padding: .35em .55em; border-radius: 999px; }
.ph-note { background: var(--butter-soft); border: 1px dashed var(--mustard); border-radius: var(--r-md); padding: .8rem 1rem; font-size: .9rem; }

/* ---------- Chips ---------- */
.chip { display: inline-block; font: 800 .68rem/1 var(--f-body); letter-spacing: .06em; text-transform: uppercase; padding: .4em .7em; border-radius: 999px; }
.chip-fewo { background: var(--sage-soft); color: var(--sage-deep); }
.chip-zmf { background: var(--butter-soft); color: #7A5E17; }
.chip-hotel { background: var(--coral-soft); color: var(--coral-deep); }
.chip-demo { background: var(--stone-soft); color: var(--graphite); }

/* ---------- Startseite: Hero + Suche ---------- */
.hero { position: relative; overflow: hidden; padding-block: clamp(32px, 6vw, 72px) clamp(28px, 4vw, 48px); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: clamp(24px, 5vw, 64px); align-items: center; }
.hero h1 em { font-style: normal; color: var(--sage); }
.hero-lead { font-size: 1.12rem; max-width: 36em; color: var(--graphite); }
.hero-mosaic { display: grid; grid-template-columns: 1.3fr 1fr; grid-template-rows: 1fr 1fr; gap: 10px; aspect-ratio: 5 / 4; max-width: 100%; }
.hero-mosaic figure { margin: 0; border-radius: var(--r-md); overflow: hidden; position: relative; }
.hero-mosaic figure:first-child { grid-row: span 2; border-radius: var(--r-lg) var(--r-md) var(--r-md) var(--r-lg); }
.hero-mosaic img { width: 100%; height: 100%; object-fit: cover; }
.hero-mosaic figcaption { position: absolute; left: .7rem; bottom: .6rem; font: 700 1.35rem/1 var(--f-hand); color: #fff; text-shadow: 0 1px 8px rgba(0, 0, 0, .35); }
@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; } .hero-mosaic { aspect-ratio: 16 / 9; } }

.search { margin-top: clamp(20px, 3vw, 36px); background: var(--paper); border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--shadow); padding: .7rem; display: grid; grid-template-columns: 1.3fr 1fr 1fr auto; gap: .5rem; align-items: end; }
.search label { padding: .35rem .6rem .2rem; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.search input, .search select { border: 0; padding: .35em 0; font-weight: 700; background: transparent; box-shadow: none; }
.search label + label { border-left: 1px solid var(--line); }
.search .btn { height: 100%; min-height: 52px; border-radius: 999px; padding-inline: 1.6em; }
@media (max-width: 760px) {
  .search { grid-template-columns: 1fr 1fr; border-radius: var(--r-md); }
  .search label:first-child { grid-column: 1 / -1; }
  .search label + label { border-left: 0; }
  .search label { border-bottom: 1px solid var(--line); }
  .search .btn { grid-column: 1 / -1; }
}

/* ---------- Die drei Werte ---------- */
.values { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(12px, 2vw, 24px); }
.value { position: relative; border-radius: var(--r-md); overflow: hidden; min-height: 170px; display: flex; align-items: flex-end; color: #fff; }
.value img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.value::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(40, 38, 34, .55), rgba(40, 38, 34, 0) 70%); z-index: 1; }
.value div { position: relative; z-index: 2; padding: 1rem 1.2rem; }
.value b { display: block; font: 700 2.2rem/1 var(--f-hand); }
.value span { font-weight: 700; letter-spacing: .12em; text-transform: uppercase; font-size: .78rem; }
.value p { margin: .4rem 0 0; font-size: .9rem; opacity: .95; max-width: 26em; }
@media (max-width: 760px) { .values { grid-template-columns: 1fr; } .value { min-height: 130px; } }

/* ---------- Schwarzes Brett + Karte (casamundo-Prinzip) ---------- */
.board-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 1.2rem; }
.board-head h2 { margin: 0; }
.board-tools { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; }
.month-nav { display: inline-flex; align-items: center; gap: .3rem; background: var(--paper); border: 1px solid var(--line); border-radius: 999px; padding: .2rem; }
.month-nav button { background: none; border: 0; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem; color: var(--ink); }
.month-nav button:hover { background: var(--sage-soft); }
.month-nav strong { min-width: 9.5em; text-align: center; font-size: .95rem; }
.tabs.view-toggle { display: none; margin: 0; }
.board-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 34%); gap: 24px; align-items: start; }
.board-list { display: flex; flex-direction: column; gap: 14px; }
.board-map { position: sticky; top: calc(104px + env(safe-area-inset-top, 0px)); height: calc(100vh - 124px); min-height: 420px; border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--line); }
@media (max-width: 1000px) {
  .board-layout { grid-template-columns: 1fr; }
  .board-map { position: relative; top: 0; height: 58vh; min-height: 340px; order: -1; }
  .tabs.view-toggle { display: inline-flex; }
  .board-layout[data-view="list"] .board-map { display: none; }
  .board-layout[data-view="map"] .board-list { display: none; }
}
.empty { background: var(--paper); border: 1px dashed var(--stone); border-radius: var(--r-md); padding: 2rem; text-align: center; color: var(--muted); }

.board-entry { position: relative; display: grid; grid-template-columns: 150px minmax(0, 1fr) 224px; gap: 1.1rem; background: var(--paper); border: 1px solid var(--line); border-radius: var(--r-md); padding: 12px; transition: border-color .15s, box-shadow .15s; }
.board-entry:hover, .board-entry.active { border-color: var(--sage); box-shadow: var(--shadow); }
.be-img { position: relative; border-radius: 10px; overflow: hidden; aspect-ratio: 1; align-self: start; }
.be-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.board-entry:hover .be-img img { transform: scale(1.04); }
.be-info { display: flex; flex-direction: column; min-width: 0; padding-block: .2rem; }
.be-info h3 { margin-bottom: .15rem; }
.be-info h3 a { color: var(--ink); text-decoration: none; }
.be-info h3 a:hover { color: var(--sage); }
.be-house { font-family: var(--f-body); font-size: .9rem; font-weight: 600; color: var(--muted); }
.be-house a { color: var(--muted) !important; }
.tile-tag { font-family: var(--f-hand); font-size: 1.3rem; line-height: 1.15; color: var(--sage-deep); margin: 0 0 .35rem; }
.facts { font-size: .88rem; color: var(--graphite); font-variant-numeric: tabular-nums; margin-bottom: .6rem; }
.be-actions { margin-top: auto; display: flex; flex-wrap: wrap; gap: .4rem; }
.board-entry .fav { position: absolute; top: 18px; left: 18px; }
@media (max-width: 1240px) and (min-width: 1001px) { .board-entry { grid-template-columns: 130px minmax(0, 1fr); } .be-cal { grid-column: 1 / -1; } }
@media (max-width: 700px) { .board-entry { grid-template-columns: 96px minmax(0, 1fr); } .be-cal { grid-column: 1 / -1; } }

/* ---------- Favoriten-Herz ---------- */
.fav { width: 38px; height: 38px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, .92); color: var(--coral-deep); font-size: 1.2rem; line-height: 1; cursor: pointer; box-shadow: 0 1px 4px rgba(0, 0, 0, .12); z-index: 2; }
.fav.on { background: var(--coral); color: #fff; }

/* ---------- Kalender ---------- */
.cal { font-variant-numeric: tabular-nums; }
.cal-head { display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; margin-bottom: .35rem; }
.cal-title { font-weight: 800; font-size: .9rem; }
.cal-free { font-size: .78rem; font-weight: 700; color: var(--sage-deep); }
.cal-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 3px; }
.cal-wd { font-size: .66rem; font-weight: 800; color: var(--muted); text-align: center; letter-spacing: .04em; }
.cal-day { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; font-size: .74rem; font-weight: 700; border-radius: 5px; border: 0; padding: 0; font-family: inherit; }
.cal-day.free { background: var(--sage-soft); color: var(--sage-deep); }
.cal-day.booked { background: repeating-linear-gradient(135deg, var(--stone-soft) 0 4px, #E2DED6 4px 8px); color: #9B978F; text-decoration: line-through; }
.cal-day.past { background: transparent; color: #BDB9B1; }
.cal-day.today { outline: 2px solid var(--mustard); outline-offset: -2px; }
.cal:not(.cal-compact) .cal-day { font-size: .85rem; border-radius: 7px; }
.cal:not(.cal-compact) .cal-grid { gap: 4px; }
.cal-edit button.cal-day { cursor: pointer; }
.cal-edit button.cal-day:hover { box-shadow: inset 0 0 0 2px var(--sage); }
.cal-legend { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: .6rem; color: var(--muted); }
.cal-legend span { display: inline-flex; align-items: center; gap: .35rem; }
.lg { width: 14px; height: 14px; border-radius: 4px; display: inline-block; }
.lg.free { background: var(--sage-soft); }
.lg.booked { background: repeating-linear-gradient(135deg, var(--stone-soft) 0 3px, #D8D4CB 3px 6px); }
.lg.past { border: 1px solid var(--stone); }
.cal-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
@media (max-width: 760px) { .cal-row { grid-template-columns: 1fr; } }

/* ---------- Karte ---------- */
.map { position: relative; background: #E9EFE9; min-height: 280px; }
.map-sketch { position: absolute; inset: 0; background:
  radial-gradient(circle at 20% 30%, rgba(78, 127, 104, .10) 0 18%, transparent 19%),
  radial-gradient(circle at 75% 70%, rgba(227, 178, 79, .12) 0 22%, transparent 23%),
  linear-gradient(transparent 49.5%, rgba(255, 255, 255, .7) 49.5% 50.5%, transparent 50.5%) 0 0 / 60px 60px,
  linear-gradient(90deg, transparent 49.5%, rgba(255, 255, 255, .7) 49.5% 50.5%, transparent 50.5%) 0 0 / 60px 60px,
  #E6EDE7; filter: blur(.3px); }
.pin, .lf-pin { position: absolute; transform: translate(-50%, -100%); }
.pin b, .lf-pin b { display: flex; align-items: center; justify-content: center; min-width: 30px; height: 30px; padding: 0 .4em; border-radius: 16px 16px 16px 3px; background: var(--sage); color: #fff; font: 800 .78rem/1 var(--f-body); border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0, 0, 0, .2); transform: rotate(-45deg); }
.pin b { transform: none; border-radius: 999px; }
.pin.active b, .lf-pin.active b { background: var(--coral-deep); }
.lf-pin { position: relative; transform: none; background: none; border: 0; }
.lf-pin b { transform: none; border-radius: 999px; }
.map-gate { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(88%, 340px); background: rgba(255, 255, 255, .95); border-radius: var(--r-md); padding: 1.1rem 1.2rem; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: .6rem; align-items: flex-start; font-size: .9rem; }
.map-gate p { margin: 0; }
.map-loading { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1rem; text-align: center; }
.map-popup { font-family: var(--f-body); min-width: 190px; }
.map-popup b { display: block; margin-bottom: .2rem; }
.map-popup ul { margin: .3rem 0 0; padding-left: 1.1em; }
.leaflet-container { font-family: var(--f-body); }

/* ---------- Kachel-Raster (mein-glueck-Prinzip) ---------- */
.tile-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: clamp(16px, 2.4vw, 28px); }
.tile { position: relative; display: flex; flex-direction: column; }
.tile-img { position: relative; display: block; aspect-ratio: 1; border-radius: var(--r-md); overflow: hidden; background: var(--stone-soft); }
.tile-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.tile:hover .tile-img img { transform: scale(1.05); }
.tile .fav { position: absolute; top: .6rem; right: .6rem; }
.tile-body { padding: .9rem .2rem 0; text-align: center; }
.tile-body h3 { margin-bottom: .1rem; font-size: 1.25rem; }
.tile-body h3 a { color: var(--ink); text-decoration: none; }
.tile-body .facts { margin-bottom: .2rem; }

/* ---------- Apartmenthaus-Seite ---------- */
.house-hero { position: relative; min-height: 300px; display: flex; align-items: flex-end; color: #fff; }
.house-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.house-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(35, 45, 40, .7), rgba(35, 45, 40, .05) 75%); z-index: 1; }
.house-hero .wrap { position: relative; z-index: 2; padding-block: 2.2rem; }
.house-hero h1 { color: #fff; margin: 0; }
.house-hero p { margin: .3rem 0 0; font-weight: 600; }
.house-intro { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); }
@media (max-width: 860px) { .house-intro { grid-template-columns: 1fr; } }
.contact-card { background: var(--paper); border: 1px solid var(--line); border-radius: var(--r-md); padding: 1.3rem; display: flex; flex-direction: column; gap: .7rem; align-self: start; }
.contact-card .btn { width: 100%; }
.contact-card dl { margin: 0; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: .3rem .8rem; font-size: .92rem; }
.contact-card dt { color: var(--muted); }
.contact-card dd { margin: 0; overflow-wrap: anywhere; }

/* Menschen hinter der Unterkunft */
.people { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.person { background: var(--paper); border-radius: var(--r-md); padding: 1.1rem 1.2rem; border: 1px solid var(--line); }
.person .role { font: 700 1.5rem/1 var(--f-hand); display: block; margin-bottom: .3rem; }
.person:nth-child(1) .role { color: var(--sage); }
.person:nth-child(2) .role { color: #B38421; }
.person:nth-child(3) .role { color: var(--coral-deep); }
.person h3 { font-size: 1.05rem; font-family: var(--f-body); font-weight: 800; margin-bottom: .2rem; }
.person p { margin: 0; font-size: .92rem; color: var(--graphite); }
@media (max-width: 760px) { .people { grid-template-columns: 1fr; } }

/* ---------- Detailseite Ferienwohnung ---------- */
.crumbs { font-size: .85rem; color: var(--muted); padding-block: 1rem .2rem; }
.crumbs a { color: var(--muted); }
.gallery { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 8px; aspect-ratio: 16 / 7; max-width: 100%; }
.gallery button { position: relative; border: 0; padding: 0; cursor: zoom-in; overflow: hidden; border-radius: 8px; background: var(--stone-soft); }
.gallery button:first-child { grid-row: span 2; border-radius: var(--r-md) 8px 8px var(--r-md); }
.gallery button:nth-child(2) { grid-column: span 2; }
.gallery img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 700px) { .gallery { grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; aspect-ratio: auto; } .gallery button:first-child { grid-column: 1 / -1; grid-row: auto; aspect-ratio: 4 / 3; border-radius: var(--r-md); } .gallery button:nth-child(2) { grid-column: auto; } .gallery button:not(:first-child) { aspect-ratio: 1; } }
.detail-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: clamp(24px, 4vw, 56px); align-items: start; margin-top: 1.8rem; }
.detail-grid .contact-card { position: sticky; top: calc(108px + env(safe-area-inset-top, 0px)); }
@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } .detail-grid .contact-card { position: static; } }
.keyfacts { display: flex; flex-wrap: wrap; gap: .5rem 1.4rem; padding: .9rem 0; border-block: 1px solid var(--line); margin-bottom: 1.4rem; font-variant-numeric: tabular-nums; }
.keyfacts div { display: flex; flex-direction: column; }
.keyfacts b { font-size: 1.15rem; }
.keyfacts span { font-size: .78rem; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; font-weight: 700; }
.features { display: flex; flex-wrap: wrap; gap: .4rem; padding: 0; list-style: none; }
.features li { background: var(--stone-soft); border-radius: 999px; padding: .35em .8em; font-size: .88rem; font-weight: 600; }
.block { margin-top: 2.4rem; }
.block > h2 { font-size: 1.5rem; }
.detail-map { height: 360px; border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--line); }
.lightbox { border: 0; padding: 0; background: transparent; max-width: min(1100px, 94vw); }
.lightbox::backdrop { background: rgba(30, 30, 28, .86); }
.lightbox img { max-height: 86vh; border-radius: var(--r-md); }
.lightbox-bar { display: flex; justify-content: space-between; align-items: center; color: #fff; margin-top: .6rem; gap: 1rem; }
.lightbox-bar button { background: rgba(255, 255, 255, .15); color: #fff; border: 0; border-radius: 999px; padding: .5em 1em; cursor: pointer; font: 700 .9rem var(--f-body); }

/* ---------- Dialog ---------- */
.dialog { border: 0; border-radius: var(--r-lg); padding: 0; width: min(560px, calc(100vw - 32px)); max-height: calc(100vh - 32px); box-shadow: 0 30px 80px -20px rgba(0, 0, 0, .4); color: var(--ink); background: var(--paper); }
.dialog::backdrop { background: rgba(40, 45, 42, .5); }
.dialog-body { padding: clamp(1.2rem, 4vw, 2rem); display: flex; flex-direction: column; gap: .8rem; position: relative; }
.dialog-body h2 { font-size: 1.4rem; margin: 0; padding-right: 2rem; }
.dialog-body p { margin: 0; }
.dialog-close { position: absolute; right: 1rem; top: 1rem; width: 36px; height: 36px; border-radius: 50%; border: 0; background: var(--stone-soft); font-size: 1.3rem; cursor: pointer; }
.dialog-actions { display: flex; flex-wrap: wrap; gap: .5rem; }

/* ---------- Cookie-Hinweis ---------- */
.consent { position: fixed; z-index: 100; left: 16px; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); max-width: 540px; background: var(--paper); border-radius: var(--r-md); box-shadow: 0 20px 60px -15px rgba(0, 0, 0, .35); padding: 1.3rem 1.4rem; display: flex; flex-direction: column; gap: .6rem; border: 1px solid var(--line); }
.consent h2 { font-size: 1.2rem; margin: 0; }
.consent p { font-size: .9rem; margin: 0; }
.consent-actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .3rem; }

/* ---------- Toast ---------- */
.toast { position: fixed; left: 50%; bottom: calc(24px + env(safe-area-inset-bottom, 0px)); transform: translate(-50%, 140%); background: var(--ink); color: #fff; padding: .7em 1.2em; border-radius: 999px; font-weight: 700; font-size: .9rem; z-index: 200; transition: transform .25s; pointer-events: none; }
.toast.show { transform: translate(-50%, 0); }

/* ---------- Inhaltsseiten ---------- */
.page-head { padding-block: clamp(32px, 6vw, 64px) 1rem; }
.prose { max-width: 68ch; }
.prose h2 { margin-top: 2rem; font-size: 1.45rem; }
.prose h3 { margin-top: 1.4rem; font-family: var(--f-body); font-weight: 800; font-size: 1.05rem; }
.prose ul { padding-left: 1.2em; }
.steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; counter-reset: s; padding: 0; list-style: none; }
.steps li { background: var(--paper); border: 1px solid var(--line); border-radius: var(--r-md); padding: 1.2rem; counter-increment: s; }
.steps li::before { content: counter(s); display: inline-flex; width: 2rem; height: 2rem; border-radius: 50%; background: var(--butter); align-items: center; justify-content: center; font-weight: 800; margin-bottom: .6rem; }
.steps h3 { font-size: 1.1rem; }
.steps p { margin: 0; font-size: .95rem; color: var(--graphite); }
@media (max-width: 760px) { .steps { grid-template-columns: 1fr; } }
.split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
.split img { border-radius: var(--r-lg); aspect-ratio: 4 / 3; object-fit: cover; width: 100%; }
@media (max-width: 860px) { .split { grid-template-columns: 1fr; } }
.compare { width: 100%; border-collapse: collapse; font-size: .95rem; background: var(--paper); border-radius: var(--r-md); overflow: hidden; }
.compare th, .compare td { padding: .8rem 1rem; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
.compare thead th { background: var(--sage); color: #fff; font-weight: 800; }
.compare td:nth-child(2) { background: #F6FAF7; font-weight: 600; }
.table-scroll { overflow-x: auto; border-radius: var(--r-md); border: 1px solid var(--line); }
.band { background: var(--sage); color: #fff; border-radius: var(--r-lg); padding: clamp(1.6rem, 4vw, 3rem); display: flex; flex-wrap: wrap; gap: 1.2rem; justify-content: space-between; align-items: center; }
.band h2 { color: #fff; margin: 0; }
.band p { margin: .3rem 0 0; opacity: .92; }
.price { font-family: var(--f-display); font-size: 2.4rem; line-height: 1; }

/* ---------- Login ---------- */
.auth { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: calc(100vh - 89px); }
.auth-art { position: relative; overflow: hidden; }
.auth-art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.auth-art p { position: absolute; left: 2rem; bottom: 2rem; right: 2rem; color: #fff; font: 700 2.2rem/1.1 var(--f-hand); text-shadow: 0 2px 12px rgba(0, 0, 0, .3); }
.auth-panel { padding: clamp(28px, 6vw, 72px) var(--gutter); max-width: 560px; width: 100%; }
.tabs { display: inline-flex; background: var(--stone-soft); border-radius: 999px; padding: 4px; margin-bottom: 1.4rem; flex-wrap: wrap; }
.tabs button { border: 0; background: none; padding: .6em 1.1em; border-radius: 999px; font: 700 .9rem var(--f-body); cursor: pointer; color: var(--muted); }
.tabs button[aria-selected="true"] { background: var(--paper); color: var(--ink); box-shadow: 0 1px 3px rgba(0, 0, 0, .1); }
.stack { display: flex; flex-direction: column; gap: 1rem; }
.error { color: var(--coral-deep); font-weight: 700; font-size: .9rem; min-height: 1.2em; margin: 0; }
.demo-box { background: var(--butter-soft); border-radius: var(--r-md); padding: 1rem 1.1rem; font-size: .9rem; margin-top: 1.6rem; }
.demo-box code { font-weight: 800; }
@media (max-width: 860px) { .auth { grid-template-columns: 1fr; } .auth-art { min-height: 180px; } .auth-art p { font-size: 1.7rem; } }

/* ---------- Konto & Vermieter-Bereich ---------- */
.dash-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1rem; padding-block: 2rem 1rem; }
.dash-head h1 { margin: 0; font-size: clamp(1.7rem, 3.5vw, 2.4rem); }
.dash-tabs { display: flex; gap: .3rem; border-bottom: 1px solid var(--line); margin-bottom: 1.6rem; overflow-x: auto; }
.dash-tabs button { border: 0; background: none; padding: .8em 1em; font: 700 .95rem var(--f-body); color: var(--muted); cursor: pointer; border-bottom: 3px solid transparent; white-space: nowrap; }
.dash-tabs button[aria-selected="true"] { color: var(--sage-deep); border-bottom-color: var(--sage); }
.panel { background: var(--paper); border: 1px solid var(--line); border-radius: var(--r-md); padding: clamp(1rem, 3vw, 1.6rem); }
.panel + .panel { margin-top: 1rem; }
.panel h2 { font-size: 1.3rem; }
.unit-rows { display: flex; flex-direction: column; gap: .6rem; }
.unit-row { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 1rem; align-items: center; padding: .6rem; border: 1px solid var(--line); border-radius: 10px; background: var(--paper); }
.unit-row img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; }
.unit-row h3 { margin: 0; font-size: 1.05rem; font-family: var(--f-body); font-weight: 800; }
.unit-row p { margin: 0; font-size: .85rem; color: var(--muted); }
.unit-row .row-actions { display: flex; gap: .4rem; flex-wrap: wrap; justify-content: flex-end; }
@media (max-width: 600px) { .unit-row { grid-template-columns: 56px minmax(0, 1fr); } .unit-row img { width: 56px; height: 56px; } .unit-row .row-actions { grid-column: 1 / -1; justify-content: flex-start; } }
.photo-slots { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .6rem; }
.photo-slot { position: relative; aspect-ratio: 1; border: 2px dashed var(--stone); border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center; font-size: .8rem; color: var(--muted); background: var(--ground); }
.photo-slot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.photo-slot input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.photo-slot .remove { position: absolute; top: 4px; right: 4px; z-index: 3; width: 28px; height: 28px; border-radius: 50%; border: 0; background: rgba(255, 255, 255, .92); cursor: pointer; font-size: 1rem; }
@media (max-width: 560px) { .photo-slots { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.form-actions { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 1.2rem; }
.checklist { list-style: none; padding: 0; display: flex; flex-direction: column; gap: .7rem; }
.checklist li { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: .6rem; }
.checklist li::before { content: '✓'; width: 26px; height: 26px; border-radius: 50%; background: var(--sage-soft); color: var(--sage-deep); display: flex; align-items: center; justify-content: center; font-weight: 800; }
.inq-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .6rem; }
.inq-list li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: .8rem; align-items: center; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; padding: .8rem 1rem; }

/* ---------- Fußzeile ---------- */
.site-footer { background: #3F4A44; color: #E7ECE8; margin-top: clamp(48px, 8vw, 96px); padding-block: 3rem 1.4rem; }
.site-footer a, .site-footer .linklike { color: #fff; }
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 2rem; }
.footer-claim { font: 700 1.5rem/1.2 var(--f-hand); color: var(--butter); margin: .8rem 0 .4rem; }
.footer-values { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .5rem; }
.footer-values b { font: 700 1.5rem/1 var(--f-hand); margin-right: .4rem; }
.footer-values li:nth-child(1) b { color: #F0A89D; }
.footer-values li:nth-child(2) b { color: #A9D0B9; }
.footer-values li:nth-child(3) b { color: var(--mustard); }
.footer-links { display: flex; flex-direction: column; gap: .45rem; align-items: flex-start; }
.footer-base { border-top: 1px solid rgba(255, 255, 255, .15); margin-top: 2rem; padding-top: 1rem; color: #BFC9C3; }
@media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
}

/* ---------- Feinschliff Handy ---------- */
.cal-compact .cal-day { aspect-ratio: auto; height: 24px; }
.be-cal { max-width: 360px; width: 100%; }
.be-img .ph-badge { font-size: .58rem; left: .35rem; bottom: .35rem; }
.mobile-cta { display: none; }
@media (max-width: 560px) {
  .tile-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }
  .tile-body h3 { font-size: 1.05rem; }
  .tile-tag { font-size: 1.1rem; }
  .tile-body .facts { font-size: .78rem; }
  .be-img .ph-badge { display: none; }
}
@media (max-width: 900px) {
  .mobile-cta { display: flex; gap: .5rem; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; padding: .7rem 16px calc(.7rem + env(safe-area-inset-bottom, 0px)); background: rgba(255, 255, 255, .96); border-top: 1px solid var(--line); backdrop-filter: blur(8px); }
  .mobile-cta .btn { flex: 1; }
  body.has-cta .site-footer { padding-bottom: 5.5rem; }
}
@media (max-width: 560px) { .logo img { height: 64px; } .header-inner { min-height: 74px; } }
````

### `js/app.js`

500 Zeilen · 26.408 Bytes

````javascript
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
````

### `js/blocks.js`

43 Zeilen · 2.680 Bytes

````javascript
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
````

### `js/config.js`

20 Zeilen · 798 Bytes

````javascript
/* wohlii-urlaub.de – Konfiguration
 *
 * maps.provider:
 *   'google' – Google Maps JavaScript API (benötigt googleApiKey, s. README)
 *   'osm'    – OpenStreetMap über die mitgelieferte Leaflet-Bibliothek
 * Ist 'google' eingestellt, aber kein Schlüssel hinterlegt, wird automatisch
 * OpenStreetMap verwendet. Karten laden in beiden Fällen erst nach Einwilligung
 * (Cookie-Hinweis bzw. Button „Karte laden“).
 */
window.WOHLII_CONFIG = {
  siteName: 'wohlii-urlaub.de',
  siteUrl: 'https://www.wohlii-urlaub.de',
  contactEmail: 'hallo@wohlii-urlaub.de', // PLATZHALTER
  maps: {
    provider: 'google',
    googleApiKey: '', // hier den Google-Maps-API-Schlüssel eintragen
  },
  // Monate, die im Belegungskalender und in der Monatssuche angeboten werden
  monthsAhead: 12,
};
````

### `js/data.js`

228 Zeilen · 14.216 Bytes

````javascript
/* wohlii-urlaub.de – Startdaten (Prototyp)
 *
 * Alles, was mit `placeholder` markiert ist, sind PLATZHALTER und müssen durch
 * echte Angaben der Vermieter ersetzt werden. Die Vermieter außerhalb von
 * Norderney sind frei erfundene DEMO-Einträge, damit die Regionssuche etwas
 * zeigt.
 */
(function () {
  const M = 'assets/img/macro/';
  const photos = (...names) => names.map((n) => ({ src: M + n + '.jpg', placeholder: true }));

  const hosts = [
    {
      id: 'saathoff',
      name: 'Apartmenthaus Saathoff',
      region: 'Nordsee',
      state: 'Niedersachsen',
      place: 'Norderney',
      street: 'Richthofenstraße 1 a–b',
      zip: '26548',
      // Koordinaten ungefähr – bitte im Vermieter-Login exakt setzen.
      lat: 53.7036,
      lng: 7.1597,
      website: 'https://www.apartmenthaus-saathoff.de',
      email: 'info@apartmenthaus-saathoff.de',
      phone: '+49 4932 92340',
      cover: M + 'sand.jpg',
      intro:
        'Am Rand des Inselwäldchens, wenige Gehminuten vom Nordstrand: zehn Ferienwohnungen unterschiedlicher Größe – für Paare, Familien und alle, die auf Norderney zur Ruhe kommen möchten. Ins lebendige Zentrum sind es zu Fuß rund 15 Minuten.',
      extras: ['Getränkeservice auf Wunsch', 'Persönlich geführt', 'Strand in wenigen Gehminuten'],
      team: {
        operator: { name: 'Familie Saathoff', text: 'Führt das Haus persönlich und beantwortet alle Anfragen selbst.', placeholder: true },
        cleaning: { name: 'Hausteam Saathoff', text: 'Reinigt jede Wohnung vor Ihrer Anreise – kein externer Dienstleister.', placeholder: true },
        greeting: { name: 'Familie Saathoff', text: 'Begrüßt Sie bei Anreise im Haus und übergibt die Schlüssel persönlich.', placeholder: true },
      },
      demo: false,
    },
    {
      id: 'lindenhof',
      name: 'Pension Lindenhof',
      region: 'Allgäu',
      state: 'Bayern',
      place: 'Oberstdorf',
      street: 'Musterweg 3',
      zip: '87561',
      lat: 47.4099,
      lng: 10.2797,
      website: 'https://www.wohlii-urlaub.de',
      email: 'demo-lindenhof@wohlii-urlaub.de',
      phone: '+49 8322 000000',
      cover: M + 'blatt.jpg',
      intro: 'Kleine Pension mit hausgemachtem Frühstück, Bergblick und Kräutergarten.',
      extras: ['Frühstück aus der Region', 'Wanderkarten im Flur'],
      team: {
        operator: { name: 'Anna Beispiel', text: 'Gastgeberin und Köchin des Frühstücks.' },
        cleaning: { name: 'Anna & Tochter Lea', text: 'Reinigen die Zimmer täglich auf Wunsch.' },
        greeting: { name: 'Anna Beispiel', text: 'Empfängt Sie ab 15 Uhr an der Haustür.' },
      },
      demo: true,
    },
    {
      id: 'muschelgrund',
      name: 'Hotel Muschelgrund',
      region: 'Ostsee',
      state: 'Mecklenburg-Vorpommern',
      place: 'Warnemünde',
      street: 'Strandpromenade 0',
      zip: '18119',
      lat: 54.1766,
      lng: 12.0846,
      website: 'https://www.wohlii-urlaub.de',
      email: 'demo-muschelgrund@wohlii-urlaub.de',
      phone: '+49 381 000000',
      cover: M + 'muschel.jpg',
      intro: 'Zwölf Zimmer, ein Frühstücksraum mit Meerblick und eine Gastgeberfamilie in dritter Generation.',
      extras: ['Frühstück inklusive', 'Fahrradverleih'],
      team: {
        operator: { name: 'Familie Muster', text: 'Führt das Hotel in dritter Generation.' },
        cleaning: { name: 'Hausdame Petra', text: 'Seit 14 Jahren im Haus.' },
        greeting: { name: 'Rezeption, Jonas Muster', text: 'Täglich 7–21 Uhr für Sie da.' },
      },
      demo: true,
    },
    {
      id: 'heideglueck',
      name: 'Ferienhof Heideglück',
      region: 'Lüneburger Heide',
      state: 'Niedersachsen',
      place: 'Bispingen',
      street: 'Heideweg 1',
      zip: '29646',
      lat: 53.0856,
      lng: 9.9976,
      website: 'https://www.wohlii-urlaub.de',
      email: 'demo-heideglueck@wohlii-urlaub.de',
      phone: '+49 5194 000000',
      cover: M + 'duenengras.jpg',
      intro: 'Zwei Ferienwohnungen im alten Heidschnuckenstall, umgeben von Birken und Wacholder.',
      extras: ['Hofladen', 'Kinder dürfen Hühner füttern'],
      team: {
        operator: { name: 'Jens & Maren Beispiel', text: 'Bewirtschaften den Hof seit 2009.' },
        cleaning: { name: 'Maren Beispiel', text: 'Reinigt beide Wohnungen selbst.' },
        greeting: { name: 'Jens Beispiel', text: 'Zeigt Ihnen Hof, Stall und die besten Heidewege.' },
      },
      demo: true,
    },
    {
      id: 'elbsandstein',
      name: 'Zimmer am Elbsandstein',
      region: 'Sächsische Schweiz',
      state: 'Sachsen',
      place: 'Bad Schandau',
      street: 'Elbufer 0',
      zip: '01814',
      lat: 50.9175,
      lng: 14.1548,
      website: 'https://www.wohlii-urlaub.de',
      email: 'demo-elbsandstein@wohlii-urlaub.de',
      phone: '+49 35022 000000',
      cover: M + 'kiesel.jpg',
      intro: 'Zwei ruhige Gästezimmer mit Frühstück, direkt am Malerweg.',
      extras: ['Lunchpaket für Wanderer'],
      team: {
        operator: { name: 'Karin Beispiel', text: 'Vermietet die Zimmer im eigenen Haus.' },
        cleaning: { name: 'Karin Beispiel', text: 'Macht alles selbst – mit viel Liebe zum Detail.' },
        greeting: { name: 'Karin Beispiel', text: 'Wartet mit Tee und Wanderkarte auf Sie.' },
      },
      demo: true,
    },
  ];

  // Wohnungs-Steckbriefe Saathoff: Titelzeilen nach den öffentlichen Einträgen,
  // Größe/Personen/Preis sind – wo unbekannt – Platzhalter (siehe `placeholderFields`).
  const S = (n, o) => ({
    id: 'saathoff-w' + n,
    hostId: 'saathoff',
    name: 'Wohnung ' + n,
    category: 'Ferienwohnung',
    lat: 53.7036 + (n % 3) * 0.00012,
    lng: 7.1597 + (n % 4) * 0.00015,
    visible: true,
    placeholderFields: ['sqm', 'rooms', 'priceFrom', 'description'],
    ...o,
  });

  const units = [
    S(1, { tagline: 'Ruhig gelegene Ferienwohnung', persons: 2, sqm: 38, rooms: 2, priceFrom: 85,
      description: 'Ruhige Wohnung zur Gartenseite mit Wohn-/Schlafbereich, Küchenzeile und Duschbad. Ideal für zwei, die morgens den Vögeln im Inselwäldchen zuhören möchten.',
      features: ['Küchenzeile', 'Duschbad', 'WLAN', 'Nichtraucher'], photos: photos('sand', 'leinen', 'duenengras', 'treibholz'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description'] }),
    S(2, { tagline: 'Kompakt & hell für zwei', persons: 2, sqm: 35, rooms: 1, priceFrom: 79,
      description: 'Helles Apartment mit Doppelbett, Sitzecke und kleiner Küche – alles, was man für eine gute Inselzeit braucht, nichts, was ablenkt.',
      features: ['Küchenzeile', 'Duschbad', 'WLAN'], photos: photos('leinen', 'gischt', 'sand', 'muschel'),
      placeholderFields: ['tagline', 'persons', 'sqm', 'rooms', 'priceFrom', 'description'] }),
    S(3, { tagline: 'Apartment für Eltern mit Kindern', persons: 4, sqm: 55, rooms: 3, priceFrom: 115,
      description: 'Separates Kinderzimmer, Elternschlafzimmer und ein Wohnraum mit Esstisch für die ganze Familie. Kinderbett und Hochstuhl auf Anfrage.',
      features: ['2 Schlafzimmer', 'Kinderbett auf Anfrage', 'Hochstuhl', 'WLAN'], photos: photos('strick', 'koralle', 'sand', 'kiesel'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description'] }),
    S(4, { tagline: 'Ihr persönlich geführtes Apartmenthaus', persons: 3, sqm: 45, rooms: 2, priceFrom: 95,
      description: 'Gemütliche Wohnung mit Schlafzimmer und Schlafsofa im Wohnraum. Auf kurzen Wegen zu Strand, Wald und Stadt.',
      features: ['Schlafsofa', 'Balkon', 'WLAN'], photos: photos('abendlicht', 'leinen', 'blatt', 'sand'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(5, { tagline: 'Ruhepol unterm Dach', persons: 2, sqm: 40, rooms: 2, priceFrom: 89,
      description: 'Dachgeschosswohnung mit Holzbalken und Blick in die Baumkronen. Zum Lesen, Ausschlafen und Innehalten.',
      features: ['Dachgeschoss', 'Badewanne', 'WLAN'], photos: photos('treibholz', 'strick', 'leinen', 'seeglas'),
      placeholderFields: ['tagline', 'persons', 'sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(6, { tagline: 'In den Farben des Meers eingerichtet', persons: 4, sqm: 52, rooms: 3, priceFrom: 110,
      description: 'Blau, Sand und Weiß: Die Einrichtung holt die Nordsee ins Haus. Zwei Schlafzimmer und ein großzügiger Wohnraum.',
      features: ['2 Schlafzimmer', 'Terrasse', 'WLAN'], photos: photos('gischt', 'seeglas', 'muschel', 'sand'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(7, { tagline: 'Persönlich geführte Unterkunft', persons: 3, sqm: 46, rooms: 2, priceFrom: 98,
      description: 'Freundliche Wohnung mit gut ausgestatteter Küche und Sitzplatz im Grünen.',
      features: ['Küche mit Geschirrspüler', 'Sitzplatz im Garten', 'WLAN'], photos: photos('blatt', 'duenengras', 'leinen', 'kiesel'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(8, { tagline: 'Viel Platz für 5 Personen', persons: 5, sqm: 68, rooms: 3, priceFrom: 135,
      description: 'Die größte Wohnung im Haus: zwei Schlafzimmer, ein Schlafsofa und ein langer Esstisch für gemeinsame Abende nach dem Strandtag.',
      features: ['2 Schlafzimmer + Schlafsofa', 'Großer Esstisch', 'Waschmaschine', 'WLAN'], photos: photos('koralle', 'abendlicht', 'strick', 'sand'),
      placeholderFields: ['sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(9, { tagline: 'Urlaub auf Norderney', persons: 4, sqm: 50, rooms: 2, priceFrom: 105,
      description: 'Solide, gemütlich, zentral im Grünen: Schlafzimmer, Wohnraum mit Schlafsofa und Balkon.',
      features: ['Balkon', 'Schlafsofa', 'WLAN'], photos: photos('kiesel', 'treibholz', 'gischt', 'leinen'),
      placeholderFields: ['persons', 'sqm', 'rooms', 'priceFrom', 'description', 'features'] }),
    S(10, { tagline: 'Modern eingerichtete Ferienwohnung', persons: 2, sqm: 42, rooms: 2, priceFrom: 99,
      description: 'Geschmackvoll und komfortabel eingerichtetes Apartment für zwei – klare Linien, warme Materialien.',
      features: ['Boxspringbett', 'Regendusche', 'Smart-TV', 'WLAN'], photos: photos('seeglas', 'leinen', 'sand', 'abendlicht'),
      placeholderFields: ['sqm', 'rooms', 'priceFrom', 'features'] }),

    // Demo-Einträge anderer Regionen
    { id: 'lindenhof-z1', hostId: 'lindenhof', name: 'Zimmer Enzian', tagline: 'Doppelzimmer mit Bergblick', category: 'Zimmer mit Frühstück',
      persons: 2, sqm: 22, rooms: 1, priceFrom: 72, lat: 47.4101, lng: 10.2801, visible: true,
      description: 'Holzboden, Wollplaid, Blick auf den Nebelhorn-Hang. Frühstück mit Bergkäse und Honig vom Nachbarn.',
      features: ['Frühstück inklusive', 'Balkon'], photos: photos('blatt', 'strick', 'leinen', 'treibholz'), placeholderFields: [] },
    { id: 'lindenhof-z2', hostId: 'lindenhof', name: 'Zimmer Arnika', tagline: 'Einzelzimmer für Wandernde', category: 'Zimmer mit Frühstück',
      persons: 1, sqm: 14, rooms: 1, priceFrom: 49, lat: 47.4097, lng: 10.2793, visible: true,
      description: 'Kleines, ruhiges Zimmer mit Schreibtisch. Trockenraum für Wanderschuhe im Keller.',
      features: ['Frühstück inklusive'], photos: photos('duenengras', 'leinen', 'kiesel', 'strick'), placeholderFields: [] },
    { id: 'muschelgrund-dz', hostId: 'muschelgrund', name: 'Doppelzimmer Meerseite', tagline: 'Aufwachen mit Möwen', category: 'Hotel',
      persons: 2, sqm: 24, rooms: 1, priceFrom: 119, lat: 54.1769, lng: 12.0842, visible: true,
      description: 'Zimmer zur Seeseite mit französischem Balkon. Frühstück im Wintergarten.',
      features: ['Frühstück inklusive', 'Meerblick', 'Aufzug'], photos: photos('muschel', 'gischt', 'sand', 'leinen'), placeholderFields: [] },
    { id: 'muschelgrund-fz', hostId: 'muschelgrund', name: 'Familienzimmer Düne', tagline: 'Platz für vier', category: 'Hotel',
      persons: 4, sqm: 34, rooms: 2, priceFrom: 159, lat: 54.1763, lng: 12.0851, visible: true,
      description: 'Zwei verbundene Räume, Etagenbett für die Kinder, Strandkorb im Garten reservierbar.',
      features: ['Frühstück inklusive', 'Etagenbett'], photos: photos('koralle', 'sand', 'strick', 'gischt'), placeholderFields: [] },
    { id: 'heideglueck-stall', hostId: 'heideglueck', name: 'Wohnung Stallgeflüster', tagline: 'Unter alten Eichenbalken', category: 'Ferienwohnung',
      persons: 4, sqm: 70, rooms: 3, priceFrom: 95, lat: 53.0859, lng: 9.9972, visible: true,
      description: 'Umgebauter Stall mit Kaminofen, zwei Schlafzimmern und eigener Terrasse zum Heidefeld.',
      features: ['Kaminofen', 'Terrasse', 'Haustiere erlaubt'], photos: photos('duenengras', 'treibholz', 'strick', 'abendlicht'), placeholderFields: [] },
    { id: 'heideglueck-deele', hostId: 'heideglueck', name: 'Wohnung Deele', tagline: 'Klein, fein, für zwei', category: 'Ferienwohnung',
      persons: 2, sqm: 40, rooms: 2, priceFrom: 75, lat: 53.0853, lng: 9.9981, visible: true,
      description: 'Gemütliche Wohnung in der alten Diele mit Blick auf die Hühnerwiese.',
      features: ['Terrasse', 'Fahrräder'], photos: photos('abendlicht', 'blatt', 'leinen', 'sand'), placeholderFields: [] },
    { id: 'elbsandstein-z1', hostId: 'elbsandstein', name: 'Zimmer Malerweg', tagline: 'Start direkt vor der Tür', category: 'Zimmer mit Frühstück',
      persons: 2, sqm: 20, rooms: 1, priceFrom: 65, lat: 50.9178, lng: 14.1552, visible: true,
      description: 'Ruhiges Doppelzimmer mit Blick auf die Elbe. Frühstück mit selbst gebackenem Brot.',
      features: ['Frühstück inklusive', 'Lunchpaket'], photos: photos('kiesel', 'treibholz', 'blatt', 'leinen'), placeholderFields: [] },
  ];

  const categories = ['Ferienwohnung', 'Zimmer mit Frühstück', 'Hotel'];

  // Echte Fotos (js/fotos.js) ersetzen die Platzhalter
  const real = window.WOHLII_FOTOS || {};
  units.forEach((u) => {
    if (real[u.id] && real[u.id].length) u.photos = real[u.id].slice(0, 4).map((src) => ({ src }));
  });

  window.WOHLII_SEED = { hosts, units, categories };
})();
````

### `js/fotos.js`

9 Zeilen · 433 Bytes

````javascript
/* wohlii-urlaub.de – echte Fotos je Unterkunft (max. 4)
 *
 * Wird automatisch von tools/fotos_laden.py geschrieben, kann aber auch von
 * Hand gepflegt werden: Fotos nach assets/img/unterkuenfte/<id>/ legen und
 * hier eintragen. Unterkünfte ohne Eintrag zeigen die Makro-Platzhalter.
 */
window.WOHLII_FOTOS = {
  // 'saathoff-w1': ['assets/img/unterkuenfte/saathoff-w1/1.jpg', 'assets/img/unterkuenfte/saathoff-w1/2.jpg'],
};
````

### `js/pages/haus.js`

64 Zeilen · 3.603 Bytes

````javascript
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
````

### `js/pages/home.js`

136 Zeilen · 6.285 Bytes

````javascript
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
````

### `js/pages/konto.js`

54 Zeilen · 3.469 Bytes

````javascript
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
````

### `js/pages/login.js`

83 Zeilen · 5.290 Bytes

````javascript
/* Anmelden / Registrieren für Gäste und Gastgeber (Demo ohne Server) */
(function () {
  const W = window.Wohlii;
  const { store, $, $$ } = W;

  document.addEventListener('DOMContentLoaded', () => {
    const role = W.param('rolle') === 'host' ? 'host' : 'guest';
    const next = W.param('next');
    const app = $('#app');
    app.innerHTML = `
      <div class="auth">
        <div class="auth-art"><img src="assets/img/macro/${role === 'host' ? 'leinen' : 'gischt'}.jpg" alt=""><p>Schön, dass Sie da sind.</p></div>
        <div class="auth-panel">
          <div class="tabs" role="tablist" aria-label="Anmelden oder registrieren">
            <button type="button" role="tab" aria-selected="true" data-tab="login">Anmelden</button>
            <button type="button" role="tab" aria-selected="false" data-tab="register">Neues Konto</button>
          </div>

          <form id="f-login" class="stack" novalidate>
            <h1 style="font-size:2rem;margin:0">Anmelden</h1>
            <label for="l-email">E-Mail-Adresse<input id="l-email" type="email" autocomplete="email" required></label>
            <label for="l-pw">Passwort<input id="l-pw" type="password" autocomplete="current-password" required></label>
            <p class="error" id="l-err" role="alert"></p>
            <button class="btn btn-primary" type="submit">Anmelden</button>
          </form>

          <form id="f-register" class="stack" novalidate hidden>
            <h1 style="font-size:2rem;margin:0">Neues Konto</h1>
            <fieldset class="tabs" style="border:0;margin:0" aria-label="Ich bin …">
              <label class="check"><input type="radio" name="r-role" value="guest" ${role === 'guest' ? 'checked' : ''}> Gast</label>
              <label class="check" style="margin-left:1rem"><input type="radio" name="r-role" value="host" ${role === 'host' ? 'checked' : ''}> Gastgeber / Vermieter</label>
            </fieldset>
            <label for="r-name">Ihr Name<input id="r-name" autocomplete="name" required></label>
            <label for="r-house" id="r-house-wrap" ${role === 'host' ? '' : 'hidden'}>Name Ihres Hauses / Ihrer Unterkunft<input id="r-house" placeholder="z. B. Apartmenthaus Seeblick"></label>
            <label for="r-email">E-Mail-Adresse<input id="r-email" type="email" autocomplete="email" required></label>
            <label for="r-pw">Passwort <span class="hint">mindestens 8 Zeichen</span><input id="r-pw" type="password" autocomplete="new-password" minlength="8" required></label>
            <label class="check small" style="font-weight:400"><input type="checkbox" id="r-privacy" required> Ich habe die <a href="datenschutz.html" target="_blank">Datenschutzerklärung</a> gelesen.</label>
            <p class="error" id="r-err" role="alert"></p>
            <button class="btn btn-primary" type="submit">Konto anlegen</button>
          </form>

          <div class="demo-box">
            <strong>Prototyp – zum Ausprobieren:</strong><br>
            Gast: <code>gast@demo.wohlii</code> · Passwort <code>wohlii</code><br>
            Gastgeber (Apartmenthaus Saathoff): <code>vermieter@demo.wohlii</code> · Passwort <code>wohlii</code><br>
            <span class="small muted">Im Prototyp werden Konten nur in Ihrem Browser gespeichert. Für den Livebetrieb kommt ein Server mit sicherer Anmeldung dazu.</span>
          </div>
        </div>
      </div>`;

    const go = (user) => {
      location.href = next && !/^https?:|^\/\//.test(next) ? next : user.role === 'host' ? 'vermieter.html' : 'konto.html';
    };
    const tab = (name) => {
      $$('[data-tab]').forEach((b) => b.setAttribute('aria-selected', b.dataset.tab === name));
      $('#f-login').hidden = name !== 'login';
      $('#f-register').hidden = name !== 'register';
    };
    $$('[data-tab]').forEach((b) => b.addEventListener('click', () => tab(b.dataset.tab)));
    if (W.param('neu') !== null) tab('register');
    $$('[name="r-role"]').forEach((r) => r.addEventListener('change', () => { $('#r-house-wrap').hidden = r.value !== 'host' || !r.checked; }));

    $('#f-login').addEventListener('submit', async (e) => {
      e.preventDefault();
      $('#l-err').textContent = '';
      try { go(await store.login($('#l-email').value, $('#l-pw').value)); } catch (err) { $('#l-err').textContent = err.message; }
    });
    $('#f-register').addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = $('#r-err');
      err.textContent = '';
      const email = $('#r-email').value.trim();
      if (!$('#r-name').value.trim()) return (err.textContent = 'Bitte geben Sie Ihren Namen ein.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return (err.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      if ($('#r-pw').value.length < 8) return (err.textContent = 'Das Passwort braucht mindestens 8 Zeichen.');
      if (!$('#r-privacy').checked) return (err.textContent = 'Bitte bestätigen Sie die Datenschutzerklärung.');
      try {
        const user = await store.register({ role: $('[name="r-role"]:checked').value, name: $('#r-name').value, email, password: $('#r-pw').value, houseName: $('#r-house').value.trim() });
        go(user);
      } catch (x) { err.textContent = x.message; }
    });
  });
})();
````

### `js/pages/unterkunft.js`

134 Zeilen · 8.161 Bytes

````javascript
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
````

### `js/pages/vermieter.js`

338 Zeilen · 24.355 Bytes

````javascript
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
````

### `js/store.js`

263 Zeilen · 9.193 Bytes

````javascript
/* wohlii-urlaub.de – Datenhaltung im Prototyp
 *
 * Der Prototyp läuft ohne Server: Konten, Favoriten, Anfragen und die
 * Änderungen der Vermieter liegen im localStorage des Browsers. Für den
 * Livebetrieb wird diese Datei durch Aufrufe einer echten API ersetzt
 * (siehe README, Abschnitt „Weg in den Livebetrieb“). Alle Seiten sprechen
 * nur über `Wohlii.store` mit den Daten – der Austausch betrifft nur diese Datei.
 */
(function () {
  const KEY = 'wohlii.v1.';
  const mem = {};

  function read(name, fallback) {
    try {
      const raw = localStorage.getItem(KEY + name);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      return name in mem ? mem[name] : fallback;
    }
  }
  function write(name, value) {
    mem[name] = value;
    try {
      localStorage.setItem(KEY + name, JSON.stringify(value));
      return true;
    } catch (e) {
      return false; // z. B. Speicher voll (große Fotos) oder privater Modus
    }
  }

  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // Deterministischer Zufall je Unterkunft, damit die Beispielbelegung stabil bleibt.
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
    return () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  function sampleBookings(unitId) {
    const rnd = seeded(unitId);
    const start = new Date();
    start.setDate(1);
    start.setMonth(start.getMonth() - 1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 14);
    const booked = [];
    const d = new Date(start);
    while (d < end) {
      const m = d.getMonth();
      const season = m >= 5 && m <= 8 ? 0.8 : m === 3 || m === 4 || m === 9 ? 0.6 : 0.35;
      if (rnd() < season) {
        const len = 3 + Math.floor(rnd() * 9);
        for (let i = 0; i < len; i++) {
          booked.push(iso(d));
          d.setDate(d.getDate() + 1);
        }
      } else {
        d.setDate(d.getDate() + 1 + Math.floor(rnd() * 5));
      }
    }
    return booked;
  }

  async function hash(text) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('wohlii:' + text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      let h = 0;
      for (const c of 'wohlii:' + text) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
      return 'x' + h;
    }
  }

  const seed = window.WOHLII_SEED;

  const store = {
    iso,

    /* ---------- Unterkünfte & Vermieter ---------- */
    hosts() {
      const over = read('hosts', {});
      const list = seed.hosts.map((h) => ({ ...h, ...(over[h.id] || {}) }));
      Object.values(over).forEach((h) => { if (!list.find((x) => x.id === h.id)) list.push(h); });
      return list;
    },
    host(id) {
      return this.hosts().find((h) => h.id === id) || null;
    },
    saveHost(host) {
      const over = read('hosts', {});
      over[host.id] = host;
      return write('hosts', over);
    },
    units({ includeHidden = false } = {}) {
      const over = read('units', {});
      const removed = read('unitsRemoved', []);
      const list = seed.units.filter((u) => !removed.includes(u.id)).map((u) => ({ ...u, ...(over[u.id] || {}) }));
      Object.values(over).forEach((u) => { if (!list.find((x) => x.id === u.id) && !removed.includes(u.id)) list.push(u); });
      return includeHidden ? list : list.filter((u) => u.visible !== false);
    },
    unit(id) {
      return this.units({ includeHidden: true }).find((u) => u.id === id) || null;
    },
    unitsOfHost(hostId, opts) {
      return this.units(opts).filter((u) => u.hostId === hostId);
    },
    saveUnit(unit) {
      const over = read('units', {});
      over[unit.id] = unit;
      return write('units', over);
    },
    removeUnit(id) {
      const over = read('units', {});
      delete over[id];
      write('units', over);
      const removed = read('unitsRemoved', []);
      if (!removed.includes(id)) removed.push(id);
      write('unitsRemoved', removed);
    },

    /* ---------- Belegung ---------- */
    booked(unitId) {
      const cal = read('calendar', {});
      return new Set(cal[unitId] || sampleBookings(unitId));
    },
    setBooked(unitId, set) {
      const cal = read('calendar', {});
      cal[unitId] = Array.from(set).sort();
      return write('calendar', cal);
    },
    freeNightsInMonth(unitId, year, month) {
      const booked = this.booked(unitId);
      const today = iso(new Date());
      const days = new Date(year, month + 1, 0).getDate();
      let free = 0;
      for (let d = 1; d <= days; d++) {
        const key = iso(new Date(year, month, d));
        if (key >= today && !booked.has(key)) free++;
      }
      return free;
    },

    /* ---------- Konten (Demo) ---------- */
    users() {
      return read('users', []);
    },
    async register({ role, name, email, password, houseName }) {
      email = email.trim().toLowerCase();
      const users = this.users();
      if (users.find((u) => u.email === email)) throw new Error('Für diese E-Mail-Adresse gibt es schon ein Konto. Bitte melden Sie sich an.');
      const user = { id: 'u' + Date.now(), role, name: name.trim(), email, pw: await hash(password), created: new Date().toISOString() };
      if (role === 'host') {
        const id = 'h' + Date.now().toString(36);
        this.saveHost({
          id, name: houseName || name, region: '', state: '', place: '', street: '', zip: '', lat: 51.1657, lng: 10.4515,
          website: '', email, phone: '', cover: 'assets/img/macro/leinen.jpg', intro: '', extras: [],
          team: { operator: { name, text: '' }, cleaning: { name: '', text: '' }, greeting: { name: '', text: '' } }, demo: false,
        });
        user.hostId = id;
      }
      users.push(user);
      write('users', users);
      write('session', user.id);
      this.mergeAnonFavorites(user);
      return user;
    },
    async login(email, password) {
      email = email.trim().toLowerCase();
      await this.ensureDemoUsers();
      const user = this.users().find((u) => u.email === email);
      if (!user || user.pw !== (await hash(password))) throw new Error('E-Mail-Adresse oder Passwort stimmen nicht.');
      write('session', user.id);
      this.mergeAnonFavorites(user);
      return user;
    },
    mergeAnonFavorites(user) {
      const anon = read('fav.anon', []);
      if (!anon.length) return;
      const mine = read('fav.' + user.id, []);
      write('fav.' + user.id, [...new Set([...mine, ...anon])]);
      write('fav.anon', []);
    },
    logout() {
      write('session', null);
    },
    currentUser() {
      const id = read('session', null);
      return id ? this.users().find((u) => u.id === id) || null : null;
    },
    async ensureDemoUsers() {
      const users = this.users();
      const demo = [
        { id: 'demo-guest', role: 'guest', name: 'Gast (Demo)', email: 'gast@demo.wohlii' },
        { id: 'demo-host', role: 'host', name: 'Apartmenthaus Saathoff (Demo)', email: 'vermieter@demo.wohlii', hostId: 'saathoff' },
      ];
      let changed = false;
      for (const d of demo) {
        if (!users.find((u) => u.id === d.id)) {
          users.push({ ...d, pw: await hash('wohlii'), created: new Date().toISOString() });
          changed = true;
        }
      }
      if (changed) write('users', users);
    },

    /* ---------- Gast: Favoriten & Anfragen ---------- */
    favorites() {
      const u = this.currentUser();
      return u ? read('fav.' + u.id, []) : read('fav.anon', []);
    },
    toggleFavorite(unitId) {
      const u = this.currentUser();
      const key = 'fav.' + (u ? u.id : 'anon');
      const list = read(key, []);
      const i = list.indexOf(unitId);
      if (i >= 0) list.splice(i, 1); else list.push(unitId);
      write(key, list);
      return i < 0;
    },
    inquiries() {
      const u = this.currentUser();
      return u ? read('inq.' + u.id, []) : [];
    },
    logInquiry(entry) {
      const u = this.currentUser();
      if (!u) return false;
      const list = read('inq.' + u.id, []);
      list.unshift({ id: 'q' + Date.now(), at: new Date().toISOString(), ...entry });
      return write('inq.' + u.id, list);
    },
    removeInquiry(id) {
      const u = this.currentUser();
      if (!u) return;
      write('inq.' + u.id, read('inq.' + u.id, []).filter((q) => q.id !== id));
    },

    /* ---------- Einwilligung ---------- */
    consent() {
      return read('consent', null);
    },
    setConsent(c) {
      write('consent', { ...c, at: new Date().toISOString() });
      document.dispatchEvent(new CustomEvent('wohlii:consent', { detail: c }));
    },

    /* ---------- Suche (merkt sich die letzte Eingabe) ---------- */
    lastSearch() {
      return read('search', null);
    },
    saveSearch(q) {
      write('search', q);
    },
  };

  window.Wohlii = window.Wohlii || {};
  window.Wohlii.store = store;
})();
````

### `tools/build_preview.py`

142 Zeilen · 6.323 Bytes

````python
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
````

### `tools/fotos_laden.py`

98 Zeilen · 4.028 Bytes

````python
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
````

### `tools/make_placeholders.py`

218 Zeilen · 9.233 Bytes

````python
"""Erzeugt Makro-Platzhalterbilder (Sand, Muschel, Strick …) in den wohlii-Farben.

Die Bilder sind bewusst als PLATZHALTER gedacht und werden durch echte
Makro-Fotografien ersetzt. Aufruf:  python3 tools/make_placeholders.py
Benötigt: pip install pillow numpy
"""
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 900
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "macro")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def dof(img, focus_y=0.55, spread=0.28, radius=14):
    """Makro-Tiefenschärfe: scharfer Streifen, oben/unten weich."""
    blurred = img.filter(ImageFilter.GaussianBlur(radius))
    y = np.linspace(0, 1, img.height)[:, None]
    m = np.clip(np.abs(y - focus_y) / spread, 0, 1) ** 1.6
    mask = Image.fromarray((np.repeat(m, img.width, axis=1) * 255).astype("uint8"))
    return Image.composite(blurred, img, mask)


def vignette(img, strength=0.35, tint=(40, 38, 34)):
    y, x = np.mgrid[0:img.height, 0:img.width]
    d = np.sqrt(((x - img.width / 2) / (img.width / 2)) ** 2 + ((y - img.height / 2) / (img.height / 2)) ** 2)
    m = np.clip((d - 0.55) / 0.9, 0, 1) * strength
    arr = np.asarray(img).astype(float)
    arr = arr * (1 - m[..., None]) + np.array(tint) * m[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"))


def grain(img, amount=6):
    arr = np.asarray(img).astype(float)
    arr += rng.normal(0, amount, arr.shape[:2])[..., None]
    return Image.fromarray(arr.clip(0, 255).astype("uint8"))


def save(img, name):
    img.convert("RGB").save(os.path.join(OUT, name + ".jpg"), quality=78, optimize=True, progressive=True)


def sand():
    base = np.array(hex2rgb("#E6D3AE"), float)
    arr = np.ones((H, W, 3)) * base
    n = rng.normal(0, 1, (H, W))
    arr += n[..., None] * np.array([22, 20, 16])
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    d = ImageDraw.Draw(img)
    for _ in range(2600):
        x, y = rng.integers(0, W), rng.integers(0, H)
        r = rng.integers(2, 7)
        c = tuple(int(v) for v in base + rng.normal(0, 22) + rng.normal(0, 4, 3))
        d.ellipse([x - r, y - r, x + r, y + r], fill=c)
    for _ in range(40):  # Glitzernde Quarzkörner
        x, y = rng.integers(0, W), rng.integers(0, H)
        d.ellipse([x - 3, y - 3, x + 3, y + 3], fill=(255, 250, 235))
    img = img.filter(ImageFilter.GaussianBlur(0.8))
    return grain(vignette(dof(img, 0.6, 0.3, 10)), 4)


def shell():
    img = Image.new("RGB", (W, H), hex2rgb("#F3E6DA"))
    d = ImageDraw.Draw(img)
    cx, cy = W * 0.5, H * 1.05
    for i in range(34):
        a0 = math.radians(200 + i * 4.2)
        a1 = a0 + math.radians(3.4)
        col = [hex2rgb("#D9857A"), hex2rgb("#EBB7A6"), hex2rgb("#F6DCCD")][i % 3]
        pts = [(cx, cy)]
        for t in np.linspace(a0, a1, 8):
            pts.append((cx + math.cos(t) * 1150, cy + math.sin(t) * 1150))
        d.polygon(pts, fill=col)
    for r in range(120, 1150, 46):  # Wachstumsringe
        d.arc([cx - r, cy - r, cx + r, cy + r], 190, 350, fill=(250, 240, 232), width=3)
    img = img.filter(ImageFilter.GaussianBlur(1.6))
    return grain(vignette(dof(img, 0.45, 0.3, 16), 0.3), 5)


def knit():
    img = Image.new("RGB", (W, H), hex2rgb("#B8862A"))
    sw, sh = 64, 56
    for row in range(-1, H // sh + 2):
        for col in range(-1, W // sw + 2):
            x, y = col * sw, row * sh
            for side, ang in ((0, 28), (1, -28)):
                tile = Image.new("RGBA", (60, 90), (0, 0, 0, 0))
                td = ImageDraw.Draw(tile)
                c = tuple(int(v) for v in np.array(hex2rgb("#E3B24F")) + rng.normal(0, 9) + side * 14)
                td.ellipse([12, 4, 48, 86], fill=c + (255,))
                td.ellipse([22, 14, 34, 70], fill=tuple(min(255, v + 22) for v in c) + (180,))
                tile = tile.rotate(ang, expand=True, resample=Image.BICUBIC)
                img.paste(tile, (int(x + side * sw / 2 - 18), int(y - 20)), tile)
    img = img.filter(ImageFilter.GaussianBlur(1.3))
    return grain(vignette(dof(img, 0.5, 0.28, 14), 0.4), 6)


def leaf():
    img = Image.new("RGB", (W, H), hex2rgb("#4E7F68"))
    arr = np.asarray(img).astype(float)
    y, x = np.mgrid[0:H, 0:W]
    arr += (np.sin(x / 90) * 8)[..., None]
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    d = ImageDraw.Draw(img)
    d.line([(-50, H * 0.85), (W + 50, H * 0.25)], fill=hex2rgb("#A9C7AE"), width=16)
    for i in range(14):
        t = i / 13
        sx, sy = -50 + t * (W + 100), H * 0.85 - t * H * 0.6
        for s in (-1, 1):
            ex, ey = sx + 260, sy + s * 300 - 120
            d.line([(sx, sy), (ex, ey)], fill=hex2rgb("#86AE93"), width=6)
            for j in range(5):
                u = (j + 1) / 6
                px, py = sx + (ex - sx) * u, sy + (ey - sy) * u
                d.line([(px, py), (px + 70, py + s * 30)], fill=hex2rgb("#6E9A80"), width=2)
    img = img.filter(ImageFilter.GaussianBlur(1.4))
    return grain(vignette(dof(img, 0.5, 0.25, 18), 0.4, (20, 40, 30)), 5)


def bokeh(bg, cols, name_count=70, blur=10):
    """Weiches Makro-Bokeh: zwei Ebenen, hinten sehr unscharf, vorn einzelne Lichtscheiben."""
    img = Image.new("RGB", (W, H), hex2rgb(bg))
    for count, rmin, rmax, bl, amin, amax in ((name_count, 60, 220, blur * 3, 50, 120), (name_count // 3, 25, 70, max(3, blur // 3), 90, 170)):
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        for _ in range(count):
            x, y = rng.integers(-60, W + 60), rng.integers(-60, H + 60)
            r = int(rng.integers(rmin, rmax))
            c = hex2rgb(cols[rng.integers(0, len(cols))])
            d.ellipse([x - r, y - r, x + r, y + r], fill=c + (int(rng.integers(amin, amax)),))
        layer = layer.filter(ImageFilter.GaussianBlur(bl))
        img.paste(layer, (0, 0), layer)
    return grain(vignette(img, 0.25), 3)


def wood():
    y, x = np.mgrid[0:H, 0:W].astype(float)
    n = np.cumsum(rng.normal(0, 1, W)) * 0.8
    rings = np.sin((y + n[None, :] * 3 + np.sin(x / 140) * 30) / 9)
    base = np.array(hex2rgb("#B7B0A4"), float)
    arr = base + rings[..., None] * np.array([18, 17, 15]) + rng.normal(0, 4, (H, W))[..., None]
    img = Image.fromarray(arr.clip(0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1))
    return grain(vignette(dof(img, 0.5, 0.3, 12), 0.35), 4)


def grass():
    img = Image.new("RGB", (W, H), hex2rgb("#EFE9D6"))
    d = ImageDraw.Draw(img)
    for _ in range(90):
        x = rng.integers(0, W)
        bend = rng.normal(0, 80)
        c = [hex2rgb("#A9B98C"), hex2rgb("#C9C08A"), hex2rgb("#8FA27A")][rng.integers(0, 3)]
        pts = [(x + bend * (t ** 2), H - t * rng.integers(400, 900)) for t in np.linspace(0, 1, 10)]
        d.line(pts, fill=c, width=int(rng.integers(3, 8)))
    img = img.filter(ImageFilter.GaussianBlur(2))
    fore = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fd = ImageDraw.Draw(fore)
    fd.line([(W * 0.62, H), (W * 0.58, H * 0.35), (W * 0.52, 0)], fill=hex2rgb("#6F8E62") + (255,), width=10)
    for k in range(12):  # Samenrispe
        yy = H * 0.1 + k * 26
        fd.ellipse([W * 0.53 + k * 2 - 14, yy, W * 0.53 + k * 2 + 14, yy + 34], fill=hex2rgb("#D9C58A") + (255,))
    img.paste(fore.filter(ImageFilter.GaussianBlur(1)), (0, 0), fore.filter(ImageFilter.GaussianBlur(1)))
    return grain(vignette(img, 0.25), 4)


def pebbles():
    img = Image.new("RGB", (W, H), hex2rgb("#9C968C"))
    d = ImageDraw.Draw(img)
    for _ in range(160):
        x, y = rng.integers(-40, W + 40), rng.integers(-40, H + 40)
        rx, ry = rng.integers(40, 110), rng.integers(30, 80)
        g = int(rng.integers(150, 225))
        c = (g, g - 4, g - 10)
        d.ellipse([x - rx, y - ry, x + rx, y + ry], fill=c, outline=(120, 116, 108), width=4)
        d.ellipse([x - rx * 0.5, y - ry * 0.7, x, y - ry * 0.2], fill=(min(g + 18, 255),) * 3)
    img = img.filter(ImageFilter.GaussianBlur(2.2))
    return grain(vignette(dof(img, 0.55, 0.3, 12), 0.4), 5)


def linen():
    y, x = np.mgrid[0:H, 0:W].astype(float)
    warp = np.sin(x / 2.6) * 0.5 + 0.5
    weft = np.sin(y / 2.6) * 0.5 + 0.5
    irregular = np.cumsum(rng.normal(0, 1, W))[None, :] * 0.2
    base = np.array(hex2rgb("#E4E0D6"), float)
    arr = base + ((warp * weft) - 0.25)[..., None] * 30 + (irregular % 6)[..., None] - 3
    img = Image.fromarray(arr.clip(0, 255).astype("uint8"))
    return grain(vignette(dof(img, 0.5, 0.3, 8), 0.3), 3)


MOTIFS = {
    "sand": sand,
    "muschel": shell,
    "strick": knit,
    "blatt": leaf,
    "gischt": lambda: bokeh("#DCE6E3", ["#FFFFFF", "#BCD3CC", "#E8D58C"], 80, 9),
    "seeglas": lambda: bokeh("#4E7F68", ["#A9C7AE", "#E8D58C", "#F5EFD8"], 60, 12),
    "treibholz": wood,
    "duenengras": grass,
    "kiesel": pebbles,
    "leinen": linen,
    "abendlicht": lambda: bokeh("#E3B24F", ["#F6DFA0", "#D9857A", "#FFF5DA"], 70, 14),
    "koralle": lambda: bokeh("#EBC2B6", ["#D9857A", "#FFFFFF", "#E8D58C"], 70, 11),
}

if __name__ == "__main__":
    for name, fn in MOTIFS.items():
        save(fn(), name)
        print("ok", name)
````

### `README.md`

106 Zeilen · 7.403 Bytes

````markdown
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
````

### `.gitignore`

3 Zeilen · 37 Bytes

````text
.DS_Store
node_modules/
__pycache__/
````

### `assets/vendor/leaflet/LICENSE`

26 Zeilen · 1.395 Bytes

````text
BSD 2-Clause License

Copyright (c) 2010-2023, Volodymyr Agafonkin
Copyright (c) 2010-2011, CloudMade
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
````

### `LIESMICH.txt` (nur in der ZIP-Datei der Version 1, nicht im Repository)

````text
wohlii-urlaub.de – Version 1 (Prototyp)
========================================

ÖFFNEN
  Einfach die Datei  index.html  doppelklicken – die Seite öffnet sich im Browser.
  Demo-Logins (Passwort jeweils: wohlii)
    Gast:                 gast@demo.wohlii
    Vermieter Saathoff:   vermieter@demo.wohlii

ECHTE FOTOS DER WOHNUNGEN EINFÜGEN
  Weg A – automatisch von den Internetseiten (myhome-norderney.de):
    1. Python 3 muss installiert sein (python.org, kostenlos).
    2. In diesem Ordner ein Terminal / eine Eingabeaufforderung öffnen.
    3. Eingeben:   python3 tools/fotos_laden.py      (Windows: py tools\fotos_laden.py)
    4. Die Fotos landen in assets/img/unterkuenfte/ und erscheinen sofort auf der Seite.

  Weg B – von Hand:
    1. Fotos (max. 4 je Wohnung) in den Ordner  assets/img/unterkuenfte/saathoff-w1/  usw. legen.
    2. In  js/fotos.js  eintragen, z. B.:
         'saathoff-w1': ['assets/img/unterkuenfte/saathoff-w1/1.jpg', 'assets/img/unterkuenfte/saathoff-w1/2.jpg'],

  Wohnungen ohne Foto zeigen weiterhin die Makro-Platzhalterbilder.
  Bitte nur Fotos verwenden, an denen Sie die Rechte haben.

GOOGLE MAPS
  Schlüssel in  js/config.js  bei  googleApiKey  eintragen. Ohne Schlüssel wird OpenStreetMap verwendet.

Mehr Details: README.md
````
