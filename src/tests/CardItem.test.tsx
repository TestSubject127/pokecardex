import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardItem from '../components/CardItem';

// Mock the useLanguage hook
vi.mock('@/i18n', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'de',
    setLanguage: vi.fn(),
  }),
}));

describe('CardItem', () => {
  const mockCard = {
    card_id: 'swsh4-6',
    name: 'Charizard',
    image_small: 'https://images.pokemontcg.io/swsh4/6.png',
    rarity: 'Rare Holo',
    types: 'Fire',
    set_id: 'swsh4',
    number: '6',
  };

  const mockPrice = {
    value: 145.99,
    currency: 'EUR',
    platform: 'Cardmarket',
  };

  it('renders card name correctly', () => {
    render(<CardItem card={mockCard} />);
    expect(screen.getByText('Charizard')).toBeDefined();
  });

  it('renders card image with correct alt text', () => {
    render(<CardItem card={mockCard} />);
    const image = screen.getByAltText('Charizard');
    expect(image).toBeDefined();
    expect(image.getAttribute('src')).toBe('https://images.pokemontcg.io/swsh4/6.png');
  });

  it('renders card rarity', () => {
    render(<CardItem card={mockCard} />);
    expect(screen.getByText('Rare Holo')).toBeDefined();
  });

  it('renders set and number information', () => {
    render(<CardItem card={mockCard} />);
    expect(screen.getByText('swsh4 · #6')).toBeDefined();
  });

  it('renders price information when provided', () => {
    render(<CardItem card={mockCard} price={mockPrice} />);
    expect(screen.getByText('145.99 EUR')).toBeDefined();
    expect(screen.getByText('Cardmarket')).toBeDefined();
  });

  it('does not render price information when not provided', () => {
    render(<CardItem card={mockCard} />);
    expect(screen.queryByText('EUR')).toBeNull();
  });
});
