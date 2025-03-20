import { useLanguage } from '@/i18n';

interface PortfolioSummaryProps {
  summary: {
    total_cards: number;
    unique_cards: number;
    total_value: number;
    total_cost: number;
    profit_loss: number;
    profit_loss_percentage: number;
  };
  currency?: string;
}

export default function PortfolioSummary({ summary, currency = 'EUR' }: PortfolioSummaryProps) {
  const { t } = useLanguage();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency 
    }).format(value);
  };
  
  const isProfitable = summary.profit_loss >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-white">{t('portfolio.portfolio_summary')}</h3>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('portfolio.total_cards')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{summary.total_cards}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('portfolio.unique_cards')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{summary.unique_cards}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('portfolio.portfolio_value')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.total_value)}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('portfolio.portfolio_cost')}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.total_cost)}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">
              {isProfitable ? t('portfolio.portfolio_profit') : t('portfolio.portfolio_loss')}
            </dt>
            <dd className={`mt-1 text-2xl font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(summary.profit_loss))}
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('portfolio.profit_loss_percentage')}</dt>
            <dd className={`mt-1 text-2xl font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {summary.profit_loss_percentage.toFixed(2)}%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
