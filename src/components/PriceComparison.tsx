import { useLanguage } from '@/i18n';

interface PriceComparisonProps {
  cardId: string;
  platformPrices: Record<string, {
    platform: string;
    price: number;
    currency: string;
    url?: string;
  }>;
  bestPrice?: {
    platform: string;
    price: number;
    currency: string;
    date: string;
  };
}

export default function PriceComparison({ cardId, platformPrices, bestPrice }: PriceComparisonProps) {
  const { t } = useLanguage();
  
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency 
    }).format(value);
  };
  
  const platforms = Object.entries(platformPrices);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-500 px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-white">{t('prices.price_comparison')}</h3>
      </div>
      
      {platforms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{t('prices.no_prices_available')}</p>
        </div>
      ) : (
        <div className="px-4 py-5 sm:p-6">
          {bestPrice && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 mb-2">{t('prices.best_deal')}</h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold text-green-700">
                    {formatCurrency(bestPrice.price, bestPrice.currency)}
                  </p>
                  <p className="text-sm text-green-600">{bestPrice.platform}</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  {t('prices.view_offer')}
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-500">{t('prices.all_prices')}</h4>
            
            <div className="divide-y divide-gray-200">
              {platforms.map(([platform, data], index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{platform}</p>
                    <p className="text-sm text-gray-500">
                      {t('prices.last_updated')}: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold">
                      {formatCurrency(data.price, data.currency)}
                    </p>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors">
                      {t('prices.view')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
