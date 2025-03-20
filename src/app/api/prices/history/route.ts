import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cardId = searchParams.get('cardId');
  const days = parseInt(searchParams.get('days') || '30');
  
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
    
    // Get platform names
    const platformMap = new Map();
    const platforms = await db.getMarketPlatforms();
    platforms.forEach(platform => {
      platformMap.set(platform.id, platform.name);
    });
    
    // Group prices by date and platform for history chart
    const priceHistory: Record<string, any> = {};
    const platformData: Record<string, any> = {};
    
    for (const price of prices) {
      const platformName = platformMap.get(price.platform_id) || `Platform ${price.platform_id}`;
      
      if (!platformData[platformName]) {
        platformData[platformName] = {
          name: platformName,
          data: []
        };
      }
      
      platformData[platformName].data.push({
        date: price.price_date,
        price: price.price_market || price.price_mid || price.price_low,
        currency: price.currency
      });
    }
    
    // Sort data points by date
    Object.values(platformData).forEach((platform: any) => {
      platform.data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    
    // Get card details
    const card = await db.getCardById(cardId);
    
    return Response.json({
      success: true,
      data: {
        card,
        price_history: Object.values(platformData),
        currency_info: {
          primary: "EUR",
          available: ["EUR", "USD"]
        }
      }
    });
  } catch (error) {
    console.error('Error fetching price history:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch price history' },
      { status: 500 }
    );
  }
}
