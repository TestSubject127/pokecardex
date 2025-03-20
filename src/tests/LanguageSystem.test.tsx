import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, LanguageSwitcher, useLanguage } from '../i18n';

// Mock translations
vi.mock('../i18n/locales/de.json', () => ({
  default: {
    'app.title': 'PokéCardex',
    'test.key': 'Deutscher Text'
  }
}));

vi.mock('../i18n/locales/en.json', () => ({
  default: {
    'app.title': 'PokéCardex',
    'test.key': 'English Text'
  }
}));

// Test component that uses translations
const TestComponent = () => {
  const { t } = useLanguage();
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p data-testid="translated-text">{t('test.key')}</p>
    </div>
  );
};

describe('Language System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('provides default language (German)', () => {
    render(
      <LanguageProvider defaultLanguage="de">
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('translated-text').textContent).toBe('Deutscher Text');
  });

  it('switches language when using LanguageSwitcher', async () => {
    render(
      <LanguageProvider defaultLanguage="de">
        <LanguageSwitcher />
        <TestComponent />
      </LanguageProvider>
    );
    
    // Initially in German
    expect(screen.getByTestId('translated-text').textContent).toBe('Deutscher Text');
    
    // Click English button
    fireEvent.click(screen.getByTitle('English'));
    
    // Should now be in English
    expect(screen.getByTestId('translated-text').textContent).toBe('English Text');
  });

  it('persists language preference in localStorage', () => {
    render(
      <LanguageProvider defaultLanguage="de">
        <LanguageSwitcher />
        <TestComponent />
      </LanguageProvider>
    );
    
    // Click English button
    fireEvent.click(screen.getByTitle('English'));
    
    // Check localStorage
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('loads language preference from localStorage', () => {
    // Set language preference in localStorage
    localStorage.setItem('language', 'en');
    
    render(
      <LanguageProvider defaultLanguage="de">
        <TestComponent />
      </LanguageProvider>
    );
    
    // Should load English from localStorage despite default being German
    expect(screen.getByTestId('translated-text').textContent).toBe('English Text');
  });
});
