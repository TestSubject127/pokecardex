import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

// Add static export compatibility
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const setId = params.id;
  const db = getDatabase(process.env as Record<string, string>);
  
  try {
    const set = await db.getSetById(setId);
    
    if (!set) {
      return Response.json(
        { success: false, error: 'Set not found' },
        { status: 404 }
      );
    }
    
    // Get cards in this set
    const cards = await db.getCardsBySet(setId);
    
    return Response.json({ 
      success: true, 
      data: {
        ...set,
        cards
      }
    });
  } catch (error) {
    console.error(`Error fetching set ${setId}:`, error);
    return Response.json(
      { success: false, error: 'Failed to fetch set' },
      { status: 500 }
    );
  }
}
