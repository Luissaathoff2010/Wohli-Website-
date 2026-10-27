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
