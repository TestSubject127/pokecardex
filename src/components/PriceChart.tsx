import { useLanguage } from '@/i18n';

interface PriceChartProps {
  cardId: string;
  priceHistory: Array<{
    name: string;
    data: Array<{
      date: string;
      price: number;
      currency: string;
    }>;
  }>;
}

export default function PriceChart({ cardId, priceHistory }: PriceChartProps) {
  const { t } = useLanguage();
  
  // This is a placeholder for the actual chart component
  // In a real implementation, we would use a library like Recharts
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{t('prices.price_history')}</h3>
      
      {priceHistory.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{t('prices.no_price_history')}</p>
        </div>
      ) : (
        <div>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">{t('prices.price_chart_placeholder')}</p>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            {priceHistory.map((platform, index) => (
              <div key={index} className="border rounded p-3">
                <h4 className="font-medium text-sm mb-2">{platform.name}</h4>
                <div className="space-y-1">
                  {platform.data.slice(0, 3).map((point, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{new Date(point.date).toLocaleDateString()}</span>
                      <span className="font-medium">{point.price.toFixed(2)} {point.currency}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
