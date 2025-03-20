import { useLanguage } from '@/i18n';
import CardItem from './CardItem';

interface CardGridProps {
  cards: Array<{
    card_id: string;
    name: string;
    image_small?: string;
    rarity?: string;
    types?: string;
    set_id?: string;
    number?: string;
    best_price?: {
      value: number;
      currency: string;
      platform?: string;
    };
  }>;
  onCardClick?: (cardId: string) => void;
}

export default function CardGrid({ cards, onCardClick }: CardGridProps) {
  const { t } = useLanguage();
  
  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('cards.no_cards_found')}</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {cards.map(card => (
        <CardItem 
          key={card.card_id}
          card={card}
          price={card.best_price}
          onClick={() => onCardClick && onCardClick(card.card_id)}
        />
      ))}
    </div>
  );
}
