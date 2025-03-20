import { NextRequest } from 'next/server';
import { getDatabase } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const period = searchParams.get('period') || 'all'; // all, month, year
  
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
    
    const { portfolio_items } = portfolioData.data;
    
    // Calculate performance metrics
    const performanceData = {
      best_performers: [],
      worst_performers: [],
      value_by_type: {},
      value_by_rarity: {},
      historical_value: []
    };
    
    // Filter items with valid profit/loss data
    const itemsWithPerformance = portfolio_items.filter(item => 
      item.current_value > 0 && item.purchase_cost > 0
    );
    
    // Sort by profit/loss percentage
    const sortedByPerformance = [...itemsWithPerformance].sort(
      (a, b) => b.profit_loss_percentage - a.profit_loss_percentage
    );
    
    // Get top 5 best performers
    performanceData.best_performers = sortedByPerformance.slice(0, 5).map(item => ({
      card_id: item.card_id,
      name: item.card.name,
      image: item.card.image_small,
      profit_loss_percentage: item.profit_loss_percentage,
      profit_loss: item.profit_loss,
      current_value: item.current_value
    }));
    
    // Get top 5 worst performers
    performanceData.worst_performers = sortedByPerformance.slice(-5).reverse().map(item => ({
      card_id: item.card_id,
      name: item.card.name,
      image: item.card.image_small,
      profit_loss_percentage: item.profit_loss_percentage,
      profit_loss: item.profit_loss,
      current_value: item.current_value
    }));
    
    // Group by type
    for (const item of portfolio_items) {
      if (!item.card?.types) continue;
      
      const types = item.card.types.split(',');
      for (const type of types) {
        const typeName = type.trim();
        if (!performanceData.value_by_type[typeName]) {
          performanceData.value_by_type[typeName] = {
            type: typeName,
            value: 0,
            count: 0
          };
        }
        
        performanceData.value_by_type[typeName].value += item.current_value;
        performanceData.value_by_type[typeName].count += item.quantity;
      }
    }
    
    // Group by rarity
    for (const item of portfolio_items) {
      if (!item.card?.rarity) continue;
      
      const rarity = item.card.rarity;
      if (!performanceData.value_by_rarity[rarity]) {
        performanceData.value_by_rarity[rarity] = {
          rarity,
          value: 0,
          count: 0
        };
      }
      
      performanceData.value_by_rarity[rarity].value += item.current_value;
      performanceData.value_by_rarity[rarity].count += item.quantity;
    }
    
    // Convert to arrays for easier consumption by charts
    performanceData.value_by_type = Object.values(performanceData.value_by_type);
    performanceData.value_by_rarity = Object.values(performanceData.value_by_rarity);
    
    // Sort by value
    performanceData.value_by_type.sort((a, b) => b.value - a.value);
    performanceData.value_by_rarity.sort((a, b) => b.value - a.value);
    
    // For a real application, we would fetch historical portfolio values from a time series database
    // For this demo, we'll generate some mock historical data
    const today = new Date();
    const mockHistoricalData = [];
    
    // Generate data points for the last 30 days
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Calculate a mock value with some random fluctuation
      const baseValue = portfolioData.data.portfolio_summary.total_value;
      const randomFactor = 0.9 + (Math.random() * 0.2); // Random between 0.9 and 1.1
      
      mockHistoricalData.push({
        date: date.toISOString().split('T')[0],
        value: baseValue * randomFactor * (1 + (i / 100)) // Slight upward trend
      });
    }
    
    performanceData.historical_value = mockHistoricalData;
    
    return Response.json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    console.error('Error analyzing portfolio performance:', error);
    return Response.json(
      { success: false, error: 'Failed to analyze portfolio performance' },
      { status: 500 }
    );
  }
}
