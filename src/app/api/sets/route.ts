import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const db = getDatabase(process.env as any);
  
  try {
    const sets = await db.getCardSets();
    return Response.json({ success: true, data: sets });
  } catch (error) {
    console.error('Error fetching card sets:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch card sets' },
      { status: 500 }
    );
  }
}
