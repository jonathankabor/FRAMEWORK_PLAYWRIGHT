const { test, expect } = require('@playwright/test');

test('Mon premier test Playwright', async ({ page }) => {

// 1. Ouvrir le site Playwright
await page.goto('https://playwright.dev/');

// 2. Vérifier le titre de la page
await expect(page).toHaveTitle(/Playwright/);

// 3. Cliquer sur Get started
await page.getByRole('link', { name: 'Get started' }).click();

// 4. Vérifier que la page Installation est affichée
await expect(
page.getByRole('heading', { name: 'Installation' })
).toBeVisible();

// 5. Attendre 5 secondes pour voir le résultat
await page.waitForTimeout(5000);

console.log('Mon premier test est réussi !');
});