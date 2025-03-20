import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardId = searchParams.get('cardId');
  const platformId = searchParams.get('platformId') ? parseInt(searchParams.get('platformId')!) : undefined;
  
  if (!cardId) {
    return Response.json(
      { success: false, error: 'Card ID is required' },
      { status: 400 }
    );
  }
  
  const db = getDatabase(process.env as any);
  
  try {
    // Get card details
    const card = await db.getCardById(cardId);
    
    if (!card) {
      return Response.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      );
    }
    
    // Get price alerts configuration
    // In a real application, this would be stored in the database
    const priceAlertThresholds = {
      low: 0.9, // 10% below market price
      high: 1.1, // 10% above market price
    };
    
    // Get latest price
    const latestPrice = await db.getLatestCardPrice(cardId, platformId);
    
    if (!latestPrice) {
      return Response.json({
        success: true,
        data: {
          card,
          price_alert: null,
          message: 'No price data available for this card'
        }
      });
    }
    
    // Get historical average price (simplified for demo)
    const prices = await db.getCardPrices(cardId);
    const relevantPrices = platformId 
      ? prices.filter(p => p.platform_id === platformId)
      : prices;
    
    const marketPrices = relevantPrices
      .filter(p => p.price_market !== null && p.price_market !== undefined)
      .map(p => p.price_market!);
    
    let avgPrice = 0;
    if (marketPrices.length > 0) {
      avgPrice = marketPrices.reduce((sum, price) => sum + price, 0) / marketPrices.length;
    } else {
      avgPrice = latestPrice.price_market || latestPrice.price_mid || latestPrice.price_low || 0;
    }
    
    // Determine if current price is a good deal
    const currentPrice = latestPrice.price_market || latestPrice.price_mid || latestPrice.price_low || 0;
    let alertType = null;
    let message = '';
    
    if (currentPrice < avgPrice * priceAlertThresholds.low) {
      alertType = 'buy';
      message = 'Guter Kaufzeitpunkt! Der aktuelle Preis liegt unter dem durchschnittlichen Marktpreis.';
    } else if (currentPrice > avgPrice * priceAlertThresholds.high) {
      alertType = 'sell';
      message = 'Guter Verkaufszeitpunkt! Der aktuelle Preis liegt über dem durchschnittlichen Marktpreis.';
    } else {
      alertType = 'neutral';
      message = 'Der Preis entspricht dem aktuellen Marktdurchschnitt.';
    }
    
    // Get platform name
    const platform = await db.db
      .prepare('SELECT name FROM market_platforms WHERE id = ?')
      .bind(latestPrice.platform_id)
      .first();
    
    return Response.json({
      success: true,
      data: {
        card,
        price_alert: {
          type: alertType,
          message,
          current_price: currentPrice,
          avg_price: avgPrice,
          difference_percent: ((currentPrice - avgPrice) / avgPrice) * 100,
          platform: platform?.name || `Platform ${latestPrice.platform_id}`,
          currency: latestPrice.currency,
          date: latestPrice.price_date
        }
      }
    });
  } catch (error) {
    console.error('Error generating price alert:', error);
    return Response.json(
      { success: false, error: 'Failed to generate price alert' },
      { status: 500 }
    );
  }
}
