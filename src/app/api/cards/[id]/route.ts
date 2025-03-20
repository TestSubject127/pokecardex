import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

// Add static export compatibility
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cardId = params.id;
  const db = getDatabase(process.env as Record<string, string>);
  
  try {
    const card = await db.getCardById(cardId);
    
    if (!card) {
      return Response.json(
        { success: false, error: 'Card not found' },
        { status: 404 }
      );
    }
    
    // Get prices for this card
    const prices = await db.getCardPrices(cardId);
    
    return Response.json({ 
      success: true, 
      data: {
        ...card,
        prices
      }
    });
  } catch (error) {
    console.error(`Error fetching card ${cardId}:`, error);
    return Response.json(
      { success: false, error: 'Failed to fetch card' },
      { status: 500 }
    );
  }
}
