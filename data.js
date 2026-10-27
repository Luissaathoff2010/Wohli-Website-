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
