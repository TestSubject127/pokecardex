import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortfolioSummary from '../components/PortfolioSummary';

// Mock the useLanguage hook
vi.mock('@/i18n', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: 'de',
    setLanguage: vi.fn(),
  }),
}));

describe('PortfolioSummary', () => {
  const mockSummaryProfit = {
    total_cards: 10,
    unique_cards: 5,
    total_value: 500.75,
    total_cost: 400.50,
    profit_loss: 100.25,
    profit_loss_percentage: 25.03
  };
  
  const mockSummaryLoss = {
    total_cards: 8,
    unique_cards: 4,
    total_value: 300.25,
    total_cost: 450.75,
    profit_loss: -150.50,
    profit_loss_percentage: -33.39
  };

  it('renders the component title correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.portfolio_summary')).toBeDefined();
  });

  it('displays total cards count correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.total_cards')).toBeDefined();
    expect(screen.getByText('10')).toBeDefined();
  });

  it('displays unique cards count correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.unique_cards')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });

  it('displays portfolio value correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.portfolio_value')).toBeDefined();
  });

  it('displays portfolio cost correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.portfolio_cost')).toBeDefined();
  });

  it('displays profit when portfolio is profitable', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.portfolio_profit')).toBeDefined();
    expect(screen.queryByText('portfolio.portfolio_loss')).toBeNull();
  });

  it('displays loss when portfolio is not profitable', () => {
    render(<PortfolioSummary summary={mockSummaryLoss} />);
    expect(screen.getByText('portfolio.portfolio_loss')).toBeDefined();
    expect(screen.queryByText('portfolio.portfolio_profit')).toBeNull();
  });

  it('displays profit/loss percentage correctly', () => {
    render(<PortfolioSummary summary={mockSummaryProfit} />);
    expect(screen.getByText('portfolio.profit_loss_percentage')).toBeDefined();
    expect(screen.getByText('25.03%')).toBeDefined();
  });
});
