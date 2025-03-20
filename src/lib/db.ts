import { D1Database } from '@cloudflare/workers-types';

export interface CardSet {
  id: number;
  set_id: string;
  name: string;
  series?: string;
  printed_total?: number;
  release_date?: string;
  logo_url?: string;
  symbol_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PokemonCard {
  id: number;
  card_id: string;
  name: string;
  supertype?: string;
  subtypes?: string;
  hp?: string;
  types?: string;
  evolves_from?: string;
  evolves_to?: string;
  rules?: string;
  set_id?: string;
  number?: string;
  rarity?: string;
  flavor_text?: string;
  image_small?: string;
  image_large?: string;
  tcgplayer_url?: string;
  cardmarket_url?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketPlatform {
  id: number;
  name: string;
  url?: string;
  api_base_url?: string;
  created_at: string;
}

export interface CardPrice {
  id: number;
  card_id: string;
  platform_id: number;
  price_date: string;
  price_low?: number;
  price_mid?: number;
  price_high?: number;
  price_market?: number;
  price_direct_low?: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: number;
  user_id: string;
  card_id: string;
  quantity: number;
  purchase_price?: number;
  purchase_date?: string;
  purchase_platform_id?: number;
  condition?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export class Database {
  constructor(private db: D1Database) {}

  // Card Sets
  async getCardSets(): Promise<CardSet[]> {
    const { results } = await this.db.prepare('SELECT * FROM card_sets ORDER BY name').all();
    return results as CardSet[];
  }

  async getCardSetById(setId: string): Promise<CardSet | null> {
    const result = await this.db.prepare('SELECT * FROM card_sets WHERE set_id = ?').bind(setId).first();
    return result as CardSet | null;
  }

  // Pokemon Cards
  async getCards(limit = 20, offset = 0): Promise<PokemonCard[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM pokemon_cards ORDER BY name LIMIT ? OFFSET ?')
      .bind(limit, offset)
      .all();
    return results as PokemonCard[];
  }

  async getCardById(cardId: string): Promise<PokemonCard | null> {
    const result = await this.db.prepare('SELECT * FROM pokemon_cards WHERE card_id = ?').bind(cardId).first();
    return result as PokemonCard | null;
  }

  async searchCards(query: string, limit = 20, offset = 0): Promise<PokemonCard[]> {
    const searchQuery = `%${query}%`;
    const { results } = await this.db
      .prepare('SELECT * FROM pokemon_cards WHERE name LIKE ? OR card_id LIKE ? ORDER BY name LIMIT ? OFFSET ?')
      .bind(searchQuery, searchQuery, limit, offset)
      .all();
    return results as PokemonCard[];
  }

  async getCardsBySet(setId: string, limit = 100, offset = 0): Promise<PokemonCard[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM pokemon_cards WHERE set_id = ? ORDER BY number LIMIT ? OFFSET ?')
      .bind(setId, limit, offset)
      .all();
    return results as PokemonCard[];
  }

  // Card Prices
  async getCardPrices(cardId: string): Promise<CardPrice[]> {
    const { results } = await this.db
      .prepare(`
        SELECT cp.*, mp.name as platform_name 
        FROM card_prices cp
        JOIN market_platforms mp ON cp.platform_id = mp.id
        WHERE cp.card_id = ?
        ORDER BY cp.price_date DESC
      `)
      .bind(cardId)
      .all();
    return results as CardPrice[];
  }

  async getLatestCardPrice(cardId: string, platformId?: number): Promise<CardPrice | null> {
    let query = `
      SELECT * FROM card_prices 
      WHERE card_id = ? 
      ORDER BY price_date DESC 
      LIMIT 1
    `;
    
    if (platformId) {
      query = `
        SELECT * FROM card_prices 
        WHERE card_id = ? AND platform_id = ? 
        ORDER BY price_date DESC 
        LIMIT 1
      `;
      const result = await this.db.prepare(query).bind(cardId, platformId).first();
      return result as CardPrice | null;
    }
    
    const result = await this.db.prepare(query).bind(cardId).first();
    return result as CardPrice | null;
  }

  // Portfolio Items
  async getPortfolioItems(userId: string): Promise<PortfolioItem[]> {
    const { results } = await this.db
      .prepare('SELECT * FROM portfolio_items WHERE user_id = ? ORDER BY created_at DESC')
      .bind(userId)
      .all();
    return results as PortfolioItem[];
  }

  async getPortfolioItemById(id: number): Promise<PortfolioItem | null> {
    const result = await this.db.prepare('SELECT * FROM portfolio_items WHERE id = ?').bind(id).first();
    return result as PortfolioItem | null;
  }

  // Market Platforms
  async getMarketPlatforms(): Promise<MarketPlatform[]> {
    const { results } = await this.db.prepare('SELECT * FROM market_platforms ORDER BY name').all();
    return results as MarketPlatform[];
  }
}

export function getDatabase(env: { DB: D1Database }): Database {
  return new Database(env.DB);
}
