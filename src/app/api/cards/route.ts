import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

// Add static export compatibility
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const setId = searchParams.get('set');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  const db = getDatabase(process.env as Record<string, string>);
  
  try {
    const { cards, total } = await db.getCards({ name, setId, page, limit });
    
    return Response.json({
      success: true,
      data: {
        cards,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch cards' },
      { status: 500 }
    );
  }
}
