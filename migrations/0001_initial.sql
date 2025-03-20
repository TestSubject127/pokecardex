-- Migration number: 0001 	 2025-01-16T13:42:41.031Z
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS access_logs;
DROP TABLE IF EXISTS pokemon_cards;
DROP TABLE IF EXISTS card_sets;
DROP TABLE IF EXISTS card_prices;
DROP TABLE IF EXISTS portfolio_items;
DROP TABLE IF EXISTS market_platforms;

-- Tabelle für Kartensets
CREATE TABLE IF NOT EXISTS card_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  set_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  series TEXT,
  printed_total INTEGER,
  release_date TEXT,
  logo_url TEXT,
  symbol_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabelle für Pokémon-Karten
CREATE TABLE IF NOT EXISTS pokemon_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  supertype TEXT,
  subtypes TEXT,
  hp TEXT,
  types TEXT,
  evolves_from TEXT,
  evolves_to TEXT,
  rules TEXT,
  set_id TEXT,
  number TEXT,
  rarity TEXT,
  flavor_text TEXT,
  image_small TEXT,
  image_large TEXT,
  tcgplayer_url TEXT,
  cardmarket_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (set_id) REFERENCES card_sets(set_id)
);

-- Tabelle für Marktplattformen
CREATE TABLE IF NOT EXISTS market_platforms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  url TEXT,
  api_base_url TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabelle für Kartenpreise
CREATE TABLE IF NOT EXISTS card_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  card_id TEXT NOT NULL,
  platform_id INTEGER NOT NULL,
  price_date DATE NOT NULL,
  price_low REAL,
  price_mid REAL,
  price_high REAL,
  price_market REAL,
  price_direct_low REAL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES pokemon_cards(card_id),
  FOREIGN KEY (platform_id) REFERENCES market_platforms(id),
  UNIQUE(card_id, platform_id, price_date, currency)
);

-- Tabelle für Portfolio-Einträge
CREATE TABLE IF NOT EXISTS portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  card_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  purchase_price REAL,
  purchase_date DATE,
  purchase_platform_id INTEGER,
  condition TEXT,
  notes TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES pokemon_cards(card_id),
  FOREIGN KEY (purchase_platform_id) REFERENCES market_platforms(id)
);

-- Tabellen für Systemfunktionen
CREATE TABLE IF NOT EXISTS counters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  path TEXT,
  accessed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Initialdaten
INSERT INTO counters (name, value) VALUES 
  ('page_views', 0),
  ('api_calls', 0);

-- Marktplattformen einfügen
INSERT INTO market_platforms (name, url, api_base_url) VALUES
  ('TCGPlayer', 'https://www.tcgplayer.com', 'https://api.tcgplayer.com'),
  ('Cardmarket', 'https://www.cardmarket.com', 'https://api.cardmarket.com'),
  ('eBay', 'https://www.ebay.com', 'https://api.ebay.com');

-- Indizes erstellen
CREATE INDEX idx_access_logs_accessed_at ON access_logs(accessed_at);
CREATE INDEX idx_counters_name ON counters(name);
CREATE INDEX idx_pokemon_cards_card_id ON pokemon_cards(card_id);
CREATE INDEX idx_pokemon_cards_name ON pokemon_cards(name);
CREATE INDEX idx_pokemon_cards_set_id ON pokemon_cards(set_id);
CREATE INDEX idx_card_prices_card_id ON card_prices(card_id);
CREATE INDEX idx_card_prices_platform_id ON card_prices(platform_id);
CREATE INDEX idx_card_prices_price_date ON card_prices(price_date);
CREATE INDEX idx_portfolio_items_user_id ON portfolio_items(user_id);
CREATE INDEX idx_portfolio_items_card_id ON portfolio_items(card_id);
