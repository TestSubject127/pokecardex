import { test, expect } from '@playwright/test';

test.describe('PokéCardex E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3000');
  });

  test('should display the header with correct title', async ({ page }) => {
    const header = await page.locator('header');
    await expect(header).toBeVisible();
    await expect(page.locator('header h1')).toContainText('PokéCardex');
  });

  test('should switch language when clicking language switcher', async ({ page }) => {
    // Find and click the English language button
    await page.locator('button[title="English"]').click();
    
    // Check that some text has changed to English
    await expect(page.locator('nav a').first()).toContainText('Home');
    
    // Switch back to German
    await page.locator('button[title="Deutsch"]').click();
    
    // Check that text has changed back to German
    await expect(page.locator('nav a').first()).toContainText('Startseite');
  });

  test('should navigate to different pages', async ({ page }) => {
    // Click on Cards link
    await page.locator('nav a').nth(1).click();
    await expect(page.url()).toContain('/cards');
    
    // Click on Sets link
    await page.locator('nav a').nth(2).click();
    await expect(page.url()).toContain('/sets');
    
    // Click on Prices link
    await page.locator('nav a').nth(3).click();
    await expect(page.url()).toContain('/prices');
    
    // Click on Portfolio link
    await page.locator('nav a').nth(4).click();
    await expect(page.url()).toContain('/portfolio');
  });

  test('should display card grid with cards', async ({ page }) => {
    // Navigate to cards page
    await page.locator('nav a').nth(1).click();
    
    // Check that card grid is visible
    const cardGrid = await page.locator('.grid');
    await expect(cardGrid).toBeVisible();
    
    // Check that at least one card is displayed
    const cards = await page.locator('.card-item');
    await expect(cards.first()).toBeVisible();
  });

  test('should display card details when clicking on a card', async ({ page }) => {
    // Navigate to cards page
    await page.locator('nav a').nth(1).click();
    
    // Click on the first card
    await page.locator('.card-item').first().click();
    
    // Check that card details are displayed
    await expect(page.url()).toContain('/cards/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display portfolio summary', async ({ page }) => {
    // Navigate to portfolio page
    await page.locator('nav a').nth(4).click();
    
    // Check that portfolio summary is displayed
    const summary = await page.locator('h3').filter({ hasText: 'Portfolio Summary' });
    await expect(summary).toBeVisible();
    
    // Check that portfolio value is displayed
    await expect(page.locator('dt').filter({ hasText: 'Portfolio Value' })).toBeVisible();
  });

  test('should display price comparison', async ({ page }) => {
    // Navigate to prices page
    await page.locator('nav a').nth(3).click();
    
    // Check that price comparison is displayed
    const comparison = await page.locator('h3').filter({ hasText: 'Price Comparison' });
    await expect(comparison).toBeVisible();
  });

  test('should have a working footer with links', async ({ page }) => {
    // Check that footer is visible
    const footer = await page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check that footer has links
    const links = await page.locator('footer a');
    await expect(links.first()).toBeVisible();
  });
});
