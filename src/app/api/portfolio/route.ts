import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return Response.json(
      { success: false, error: 'User ID is required' },
      { status: 400 }
    );
  }
  
  const db = getDatabase(process.env as any);
  
  try {
    const portfolioItems = await db.getPortfolioItems(userId);
    
    // Enhance portfolio items with card details
    const enhancedItems = await Promise.all(
      portfolioItems.map(async (item) => {
        const card = await db.getCardById(item.card_id);
        const latestPrice = await db.getLatestCardPrice(item.card_id);
        
        return {
          ...item,
          card,
          current_price: latestPrice
        };
      })
    );
    
    return Response.json({ success: true, data: enhancedItems });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
