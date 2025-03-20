import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';
import { getDatabaseWithCRUD } from '@/lib/db-crud';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const format = searchParams.get('format') || 'json';
  
  if (!userId) {
    return Response.json(
      { success: false, error: 'User ID is required' },
      { status: 400 }
    );
  }
  
  const db = getDatabase(process.env as any);
  
  try {
    // Get portfolio value data
    const portfolioResponse = await fetch(`${request.nextUrl.origin}/api/portfolio/value?userId=${userId}`);
    const portfolioData = await portfolioResponse.json();
    
    if (!portfolioData.success) {
      return Response.json(
        { success: false, error: 'Failed to fetch portfolio data' },
        { status: 500 }
      );
    }
    
    const { portfolio_summary, portfolio_items, set_groups } = portfolioData.data;
    
    // Format for export
    if (format === 'csv') {
      // Generate CSV
      const headers = ['Card ID', 'Name', 'Set', 'Quantity', 'Condition', 'Purchase Price', 'Current Value', 'Profit/Loss', 'Profit/Loss %'];
      const rows = portfolio_items.map(item => [
        item.card_id,
        item.card.name,
        item.card.set_id,
        item.quantity,
        item.condition || 'Unknown',
        item.purchase_price || 0,
        (item.current_value / item.quantity).toFixed(2),
        item.profit_loss.toFixed(2),
        item.profit_loss_percentage.toFixed(2) + '%'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');
      
      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="pokemon_portfolio_${userId}.csv"`
        }
      });
    } else {
      // Return JSON by default
      return Response.json({
        success: true,
        data: {
          portfolio_summary,
          portfolio_items,
          set_groups,
          export_formats: ['json', 'csv']
        }
      });
    }
  } catch (error) {
    console.error('Error exporting portfolio:', error);
    return Response.json(
      { success: false, error: 'Failed to export portfolio' },
      { status: 500 }
    );
  }
}
