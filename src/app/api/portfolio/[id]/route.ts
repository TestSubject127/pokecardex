import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

// Add static export compatibility
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const portfolioId = params.id;
  const db = getDatabase(process.env as Record<string, string>);
  
  try {
    const portfolioItem = await db.getPortfolioItemById(portfolioId);
    
    if (!portfolioItem) {
      return Response.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }
    
    return Response.json({ 
      success: true, 
      data: portfolioItem
    });
  } catch (error) {
    console.error(`Error fetching portfolio item ${portfolioId}:`, error);
    return Response.json(
      { success: false, error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}
