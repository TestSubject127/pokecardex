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
    // Get all portfolio items for this user
    const portfolioItems = await db.getPortfolioItems(userId);
    
    // Calculate portfolio value
    let totalValue = 0;
    let totalCost = 0;
    const itemsWithValue = await Promise.all(
      portfolioItems.map(async (item) => {
        // Get card details
        const card = await db.getCardById(item.card_id);
        
        // Get latest price for this card
        const latestPrice = await db.getLatestCardPrice(item.card_id);
        
        // Calculate current value
        let currentValue = 0;
        if (latestPrice) {
          currentValue = (latestPrice.price_market || latestPrice.price_mid || latestPrice.price_low || 0) * item.quantity;
          totalValue += currentValue;
        }
        
        // Calculate purchase cost
        const purchaseCost = (item.purchase_price || 0) * item.quantity;
        totalCost += purchaseCost;
        
        // Calculate profit/loss
        const profitLoss = currentValue - purchaseCost;
        const profitLossPercentage = purchaseCost > 0 ? (profitLoss / purchaseCost) * 100 : 0;
        
        // Get platform name
        let platformName = '';
        if (item.purchase_platform_id) {
          const platform = await db.db
            .prepare('SELECT name FROM market_platforms WHERE id = ?')
            .bind(item.purchase_platform_id)
            .first();
          platformName = platform?.name || `Platform ${item.purchase_platform_id}`;
        }
        
        return {
          ...item,
          card,
          current_price: latestPrice,
          current_value: currentValue,
          purchase_cost: purchaseCost,
          profit_loss: profitLoss,
          profit_loss_percentage: profitLossPercentage,
          purchase_platform: platformName
        };
      })
    );
    
    // Calculate overall profit/loss
    const overallProfitLoss = totalValue - totalCost;
    const overallProfitLossPercentage = totalCost > 0 ? (overallProfitLoss / totalCost) * 100 : 0;
    
    // Group cards by set
    const setGroups = {};
    for (const item of itemsWithValue) {
      if (!item.card?.set_id) continue;
      
      if (!setGroups[item.card.set_id]) {
        const set = await db.getCardSetById(item.card.set_id);
        setGroups[item.card.set_id] = {
          set,
          items: [],
          total_value: 0,
          total_cost: 0,
          profit_loss: 0
        };
      }
      
      setGroups[item.card.set_id].items.push(item);
      setGroups[item.card.set_id].total_value += item.current_value;
      setGroups[item.card.set_id].total_cost += item.purchase_cost;
      setGroups[item.card.set_id].profit_loss += item.profit_loss;
    }
    
    // Sort items by value (highest first)
    itemsWithValue.sort((a, b) => b.current_value - a.current_value);
    
    return Response.json({
      success: true,
      data: {
        portfolio_summary: {
          total_cards: portfolioItems.reduce((sum, item) => sum + item.quantity, 0),
          unique_cards: portfolioItems.length,
          total_value: totalValue,
          total_cost: totalCost,
          profit_loss: overallProfitLoss,
          profit_loss_percentage: overallProfitLossPercentage
        },
        portfolio_items: itemsWithValue,
        set_groups: Object.values(setGroups)
      }
    });
  } catch (error) {
    console.error('Error calculating portfolio value:', error);
    return Response.json(
      { success: false, error: 'Failed to calculate portfolio value' },
      { status: 500 }
    );
  }
}
