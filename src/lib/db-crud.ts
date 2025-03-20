import { D1Database } from '@cloudflare/workers-types';
import { Database, PokemonCard, CardSet, CardPrice, PortfolioItem, MarketPlatform } from './db';

export class DatabaseWithCRUD extends Database {
  constructor(private db: D1Database) {
    super(db);
  }

  // Card Sets CRUD
  async createCardSet(set: Omit<CardSet, 'id' | 'created_at' | 'updated_at'>): Promise<CardSet | null> {
    const now = new Date().toISOString();
    const { success } = await this.db
      .prepare(`
        INSERT INTO card_sets (set_id, name, series, printed_total, release_date, logo_url, symbol_url, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        set.set_id,
        set.name,
        set.series || null,
        set.printed_total || null,
        set.release_date || null,
        set.logo_url || null,
        set.symbol_url || null,
        now,
        now
      )
      .run();

    if (success) {
      return this.getCardSetById(set.set_id);
    }
    return null;
  }

  async updateCardSet(setId: string, set: Partial<Omit<CardSet, 'id' | 'set_id' | 'created_at' | 'updated_at'>>): Promise<CardSet | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (set.name !== undefined) {
      updates.push('name = ?');
      values.push(set.name);
    }
    if (set.series !== undefined) {
      updates.push('series = ?');
      values.push(set.series);
    }
    if (set.printed_total !== undefined) {
      updates.push('printed_total = ?');
      values.push(set.printed_total);
    }
    if (set.release_date !== undefined) {
      updates.push('release_date = ?');
      values.push(set.release_date);
    }
    if (set.logo_url !== undefined) {
      updates.push('logo_url = ?');
      values.push(set.logo_url);
    }
    if (set.symbol_url !== undefined) {
      updates.push('symbol_url = ?');
      values.push(set.symbol_url);
    }

    if (updates.length === 0) {
      return this.getCardSetById(setId);
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(setId);

    const { success } = await this.db
      .prepare(`UPDATE card_sets SET ${updates.join(', ')} WHERE set_id = ?`)
      .bind(...values)
      .run();

    if (success) {
      return this.getCardSetById(setId);
    }
    return null;
  }

  async deleteCardSet(setId: string): Promise<boolean> {
    const { success } = await this.db
      .prepare('DELETE FROM card_sets WHERE set_id = ?')
      .bind(setId)
      .run();
    return success;
  }

  // Pokemon Cards CRUD
  async createCard(card: Omit<PokemonCard, 'id' | 'created_at' | 'updated_at'>): Promise<PokemonCard | null> {
    const now = new Date().toISOString();
    const { success } = await this.db
      .prepare(`
        INSERT INTO pokemon_cards (
          card_id, name, supertype, subtypes, hp, types, evolves_from, evolves_to, 
          rules, set_id, number, rarity, flavor_text, image_small, image_large, 
          tcgplayer_url, cardmarket_url, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        card.card_id,
        card.name,
        card.supertype || null,
        card.subtypes || null,
        card.hp || null,
        card.types || null,
        card.evolves_from || null,
        card.evolves_to || null,
        card.rules || null,
        card.set_id || null,
        card.number || null,
        card.rarity || null,
        card.flavor_text || null,
        card.image_small || null,
        card.image_large || null,
        card.tcgplayer_url || null,
        card.cardmarket_url || null,
        now,
        now
      )
      .run();

    if (success) {
      return this.getCardById(card.card_id);
    }
    return null;
  }

  async updateCard(cardId: string, card: Partial<Omit<PokemonCard, 'id' | 'card_id' | 'created_at' | 'updated_at'>>): Promise<PokemonCard | null> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(card).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return this.getCardById(cardId);
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(cardId);

    const { success } = await this.db
      .prepare(`UPDATE pokemon_cards SET ${updates.join(', ')} WHERE card_id = ?`)
      .bind(...values)
      .run();

    if (success) {
      return this.getCardById(cardId);
    }
    return null;
  }

  async deleteCard(cardId: string): Promise<boolean> {
    const { success } = await this.db
      .prepare('DELETE FROM pokemon_cards WHERE card_id = ?')
      .bind(cardId)
      .run();
    return success;
  }

  // Card Prices CRUD
  async createCardPrice(price: Omit<CardPrice, 'id' | 'created_at' | 'updated_at'>): Promise<CardPrice | null> {
    const now = new Date().toISOString();
    const { success, meta } = await this.db
      .prepare(`
        INSERT INTO card_prices (
          card_id, platform_id, price_date, price_low, price_mid, price_high, 
          price_market, price_direct_low, currency, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        price.card_id,
        price.platform_id,
        price.price_date,
        price.price_low || null,
        price.price_mid || null,
        price.price_high || null,
        price.price_market || null,
        price.price_direct_low || null,
        price.currency,
        now,
        now
      )
      .run();

    if (success && meta?.last_row_id) {
      const result = await this.db
        .prepare('SELECT * FROM card_prices WHERE id = ?')
        .bind(meta.last_row_id)
        .first();
      return result as CardPrice;
    }
    return null;
  }

  async updateCardPrice(id: number, price: Partial<Omit<CardPrice, 'id' | 'card_id' | 'platform_id' | 'price_date' | 'created_at' | 'updated_at'>>): Promise<CardPrice | null> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(price).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      const result = await this.db
        .prepare('SELECT * FROM card_prices WHERE id = ?')
        .bind(id)
        .first();
      return result as CardPrice;
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    const { success } = await this.db
      .prepare(`UPDATE card_prices SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    if (success) {
      const result = await this.db
        .prepare('SELECT * FROM card_prices WHERE id = ?')
        .bind(id)
        .first();
      return result as CardPrice;
    }
    return null;
  }

  async deleteCardPrice(id: number): Promise<boolean> {
    const { success } = await this.db
      .prepare('DELETE FROM card_prices WHERE id = ?')
      .bind(id)
      .run();
    return success;
  }

  // Portfolio Items CRUD
  async createPortfolioItem(item: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioItem | null> {
    const now = new Date().toISOString();
    const { success, meta } = await this.db
      .prepare(`
        INSERT INTO portfolio_items (
          user_id, card_id, quantity, purchase_price, purchase_date, 
          purchase_platform_id, condition, notes, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        item.user_id,
        item.card_id,
        item.quantity,
        item.purchase_price || null,
        item.purchase_date || null,
        item.purchase_platform_id || null,
        item.condition || null,
        item.notes || null,
        now,
        now
      )
      .run();

    if (success && meta?.last_row_id) {
      return this.getPortfolioItemById(meta.last_row_id);
    }
    return null;
  }

  async updatePortfolioItem(id: number, item: Partial<Omit<PortfolioItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<PortfolioItem | null> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(item).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return this.getPortfolioItemById(id);
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);

    const { success } = await this.db
      .prepare(`UPDATE portfolio_items SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    if (success) {
      return this.getPortfolioItemById(id);
    }
    return null;
  }

  async deletePortfolioItem(id: number): Promise<boolean> {
    const { success } = await this.db
      .prepare('DELETE FROM portfolio_items WHERE id = ?')
      .bind(id)
      .run();
    return success;
  }
}

export function getDatabaseWithCRUD(env: { DB: D1Database }): DatabaseWithCRUD {
  return new DatabaseWithCRUD(env.DB);
}
