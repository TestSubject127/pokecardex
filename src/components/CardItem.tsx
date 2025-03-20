import { useLanguage } from '@/i18n';

interface CardProps {
  card: {
    card_id: string;
    name: string;
    image_small?: string;
    rarity?: string;
    types?: string;
    set_id?: string;
    number?: string;
  };
  price?: {
    value: number;
    currency: string;
    platform?: string;
  };
  onClick?: () => void;
}

export default function CardItem({ card, price, onClick }: CardProps) {
  const { t } = useLanguage();
  
  // Default image if none provided
  const imageUrl = card.image_small || 'https://via.placeholder.com/245x342?text=Pokemon+Card';
  
  // Parse types
  const types = card.types?.split(',').map(type => type.trim()) || [];
  
  // Determine background color based on type
  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      'Fire': 'bg-red-500',
      'Water': 'bg-blue-500',
      'Grass': 'bg-green-500',
      'Electric': 'bg-yellow-500',
      'Psychic': 'bg-purple-500',
      'Fighting': 'bg-orange-700',
      'Darkness': 'bg-gray-800',
      'Metal': 'bg-gray-400',
      'Fairy': 'bg-pink-400',
      'Dragon': 'bg-indigo-600',
      'Colorless': 'bg-gray-300'
    };
    
    return typeColors[type] || 'bg-gray-300';
  };
  
  return (
    <div 
      className="card-item bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={card.name}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        {card.rarity && (
          <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {card.rarity}
          </span>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-bold text-gray-800 mb-1 truncate">{card.name}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-gray-600">
            {card.set_id} · #{card.number}
          </div>
          
          <div className="flex space-x-1">
            {types.map((type, index) => (
              <span 
                key={index}
                className={`${getTypeColor(type)} w-5 h-5 rounded-full flex items-center justify-center text-white text-xs`}
                title={type}
              >
                {type.charAt(0)}
              </span>
            ))}
          </div>
        </div>
        
        {price && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-800">
              {price.value.toFixed(2)} {price.currency}
            </span>
            {price.platform && (
              <span className="text-xs text-gray-500">
                {price.platform}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
