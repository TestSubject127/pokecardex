import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PriceComparison from '../components/PriceComparison';

// Mock the useLanguage hook
vi.mock('@/i18n', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'de',
    setLanguage: vi.fn(),
  }),
}));

describe('PriceComparison', () => {
  const mockCardId = 'swsh4-6';
  
  const mockPlatformPrices = {
    'Cardmarket': {
      platform: 'Cardmarket',
      price: 135.75,
      currency: 'EUR',
      url: 'https://www.cardmarket.com/en/Pokemon/Products/Singles/Vivid-Voltage/Charizard-V'
    },
    'TCGPlayer': {
      platform: 'TCGPlayer',
      price: 145.99,
      currency: 'USD',
      url: 'https://www.tcgplayer.com/product/226410/pokemon-swsh04-vivid-voltage-charizard-v'
    },
    'eBay': {
      platform: 'eBay',
      price: 150.00,
      currency: 'EUR',
      url: 'https://www.ebay.com/itm/Pokemon-Charizard-V-Vivid-Voltage/'
    }
  };
  
  const mockBestPrice = {
    platform: 'Cardmarket',
    price: 135.75,
    currency: 'EUR',
    date: '2025-03-20'
  };

  it('renders the component title correctly', () => {
    render(<PriceComparison cardId={mockCardId} platformPrices={mockPlatformPrices} bestPrice={mockBestPrice} />);
    expect(screen.getByText('prices.price_comparison')).toBeDefined();
  });

  it('renders the best deal section when bestPrice is provided', () => {
    render(<PriceComparison cardId={mockCardId} platformPrices={mockPlatformPrices} bestPrice={mockBestPrice} />);
    expect(screen.getByText('prices.best_deal')).toBeDefined();
    expect(screen.getByText('Cardmarket')).toBeDefined();
  });

  it('renders all platform prices', () => {
    render(<PriceComparison cardId={mockCardId} platformPrices={mockPlatformPrices} bestPrice={mockBestPrice} />);
    expect(screen.getByText('Cardmarket')).toBeDefined();
    expect(screen.getByText('TCGPlayer')).toBeDefined();
    expect(screen.getByText('eBay')).toBeDefined();
  });

  it('renders a message when no prices are available', () => {
    render(<PriceComparison cardId={mockCardId} platformPrices={{}} />);
    expect(screen.getByText('prices.no_prices_available')).toBeDefined();
  });

  it('does not render best deal section when bestPrice is not provided', () => {
    render(<PriceComparison cardId={mockCardId} platformPrices={mockPlatformPrices} />);
    expect(screen.queryByText('prices.best_deal')).toBeNull();
  });
});
