import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {
  // Chaque test se connecte et prépare son propre panier.
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();

  await expect(page.getByPlaceholder('Zip/Postal Code')).toBeVisible();
  await page.getByPlaceholder('First Name').fill('Jonathan');
  await page.getByPlaceholder('Last Name').fill('Kabore');

  // 5. Attendre 5 secondes pour voir le résultat
  await page.waitForTimeout(5000);
});

test('Un utilisateur peut commander un produit', async ({ page }) => {
  await page.getByPlaceholder('Zip/Postal Code').fill('44000');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Finish', exact: true }).click();

  await expect(
    page.getByRole('heading', { name: 'Thank you for your order!' })
  ).toBeVisible();

});

test('La commande est bloquée si le code postal est vide', async ({ page }) => {
  const codePostal = page.getByPlaceholder('Zip/Postal Code');

  await expect(codePostal).toHaveValue('');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await expect(page.getByText('Error: Postal Code is required', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
  await expect(codePostal).toBeVisible();

  // 5. Attendre 5 secondes pour voir le résultat
  await page.waitForTimeout(5000);

});