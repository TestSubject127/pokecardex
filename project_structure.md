# PokéCardex Projektstruktur

## Übersicht
Die PokéCardex-Anwendung wird als moderne Web-Anwendung mit Next.js entwickelt, um eine benutzerfreundliche Oberfläche für die Verwaltung von Pokémon-Karten, Marktpreisanalyse und Portfolio-Berechnung bereitzustellen.

## Hauptkomponenten

### Frontend (Next.js)
- **Seiten**
  - Startseite: Übersicht und Hauptnavigation
  - Kartenkatalog: Durchsuchen und Filtern von Pokémon-Karten
  - Kartendetails: Detaillierte Informationen zu einzelnen Karten
  - Preisvergleich: Vergleich von Preisen auf verschiedenen Plattformen
  - Portfolio: Verwaltung und Analyse des eigenen Kartenbestands
  - Einstellungen: Benutzereinstellungen und Sprachauswahl

- **Komponenten**
  - Kartenkomponente: Anzeige von Karteninformationen
  - Preisdiagramm: Visualisierung von Preisverläufen
  - Portfolioübersicht: Zusammenfassung des Portfoliowerts
  - Sprachauswahl: Umschalten zwischen verschiedenen Sprachen
  - Suchfunktion: Suche nach Karten und Filtern von Ergebnissen

### Backend (Next.js API Routes)
- **API-Endpunkte**
  - /api/cards: Verwaltung von Kartendaten
  - /api/prices: Abfrage von Preisdaten von verschiedenen Plattformen
  - /api/portfolio: Verwaltung des Benutzerportfolios
  - /api/users: Benutzerverwaltung (falls erforderlich)

### Datenbank (Cloudflare D1)
- **Tabellen**
  - cards: Informationen zu Pokémon-Karten
  - prices: Historische und aktuelle Preisdaten
  - portfolio_items: Karten im Benutzerportfolio
  - users: Benutzerinformationen (falls erforderlich)

## Mehrsprachige Unterstützung
- Verwendung von i18n für Übersetzungen
- Unterstützung für Deutsch, Englisch und weitere Sprachen nach Bedarf
- Sprachspezifische Assets und Formatierungen

## Externe APIs und Dienste
- Pokémon TCG API: Für Kartendaten und Bilder
- Verschiedene Marktplatz-APIs: Für Preisdaten (eBay, Cardmarket, TCGPlayer, etc.)
- Authentifizierungsdienst: Für Benutzerverwaltung (falls erforderlich)

## Deployment
- Bereitstellung über Cloudflare Pages
- Nutzung von Cloudflare Workers für serverlose Funktionen
- Cloudflare D1 für die Datenbankfunktionalität
