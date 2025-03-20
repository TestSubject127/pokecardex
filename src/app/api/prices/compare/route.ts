import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardId = searchParams.get('cardId');
  
  if (!cardId) {
    return Response.json(
      { success: false, error: 'Card ID is required' },
      { status: 400 }
    );
  }
  
  const db = getDatabase(process.env as any);
  
  try {
    // Get all prices for this card
    const prices = await db.getCardPrices(cardId);
    
    // Group prices by platform
    const platformPrices: Record<string, any> = {};
    
    for (const price of prices) {
      const platform = await db.db
        .prepare('SELECT name FROM market_platforms WHERE id = ?')
        .bind(price.platform_id)
        .first();
      
      const platformName = platform?.name || `Platform ${price.platform_id}`;
      
      if (!platformPrices[platformName]) {
        platformPrices[platformName] = [];
      }
      
      platformPrices[platformName].push(price);
    }
    
    // Find best price (lowest market price)
    let bestPrice = null;
    let bestPlatform = null;
    
    for (const [platform, prices] of Object.entries(platformPrices)) {
      const latestPrice = prices[0]; // Assuming prices are sorted by date desc
      
      if (!bestPrice || (latestPrice.price_market && latestPrice.price_market < bestPrice.price_market)) {
        bestPrice = latestPrice;
        bestPlatform = platform;
      }
    }
    
    return Response.json({
      success: true,
      data: {
        card_id: cardId,
        platform_prices: platformPrices,
        best_price: bestPrice ? {
          platform: bestPlatform,
          price: bestPrice.price_market,
          currency: bestPrice.currency,
          date: bestPrice.price_date
        } : null
      }
    });
  } catch (error) {
    console.error('Error fetching price comparison:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch price comparison' },
      { status: 500 }
    );
  }
}
