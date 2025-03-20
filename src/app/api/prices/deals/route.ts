import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';
import { getDatabaseWithCRUD } from '@/lib/db-crud';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
  const currency = searchParams.get('currency') || 'EUR';
  
  const db = getDatabase(process.env as any);
  
  try {
    // Get all cards matching the query
    let cards;
    if (query) {
      cards = await db.searchCards(query);
    } else {
      cards = await db.getCards(100, 0);
    }
    
    // Get latest prices for each card
    const cardsWithPrices = await Promise.all(
      cards.map(async (card) => {
        const prices = await db.getCardPrices(card.card_id);
        
        // Filter prices by currency
        const currencyPrices = prices.filter(price => price.currency === currency);
        
        // Group by platform and get latest price for each
        const platformPrices = new Map();
        currencyPrices.forEach(price => {
          const existingPrice = platformPrices.get(price.platform_id);
          if (!existingPrice || new Date(price.price_date) > new Date(existingPrice.price_date)) {
            platformPrices.set(price.platform_id, price);
          }
        });
        
        // Find best price
        let bestPrice = null;
        for (const price of platformPrices.values()) {
          const marketPrice = price.price_market || price.price_mid || price.price_low;
          if (!bestPrice || marketPrice < bestPrice.price) {
            bestPrice = {
              platform_id: price.platform_id,
              price: marketPrice,
              currency: price.currency,
              date: price.price_date
            };
          }
        }
        
        return {
          ...card,
          best_price: bestPrice
        };
      })
    );
    
    // Filter by price range if specified
    const filteredCards = cardsWithPrices.filter(card => {
      if (!card.best_price) return false;
      return card.best_price.price >= minPrice && card.best_price.price <= maxPrice;
    });
    
    // Sort by price (lowest first)
    filteredCards.sort((a, b) => {
      if (!a.best_price) return 1;
      if (!b.best_price) return -1;
      return a.best_price.price - b.best_price.price;
    });
    
    // Get platform names for display
    const platforms = await db.getMarketPlatforms();
    const platformMap = new Map();
    platforms.forEach(platform => {
      platformMap.set(platform.id, platform.name);
    });
    
    // Add platform names to results
    const results = filteredCards.map(card => ({
      ...card,
      best_price: card.best_price ? {
        ...card.best_price,
        platform_name: platformMap.get(card.best_price.platform_id) || `Platform ${card.best_price.platform_id}`
      } : null
    }));
    
    return Response.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error searching deals:', error);
    return Response.json(
      { success: false, error: 'Failed to search deals' },
      { status: 500 }
    );
  }
}
