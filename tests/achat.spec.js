import { test, expect } from '@playwright/test';



test('Le panier se met à jour après le retrait d’un produit', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // 1. Se connecter avec le compte de démonstration.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 2. Ajouter deux produits et vérifier le compteur.
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();

  const compteur = page.locator('.shopping_cart_badge');
  await expect(compteur).toHaveText('2');

  // 3. Ouvrir le panier et vérifier les deux produits.
  await page.locator('.shopping_cart_link').click();

  const sac = page.getByText('Sauce Labs Backpack', { exact: true });
  const lampe = page.getByText('Sauce Labs Bike Light', { exact: true });

  await expect(sac).toBeVisible();
  await expect(lampe).toBeVisible();

  // 4. Retirer le sac et vérifier le nouvel état du panier.
  await page.locator('#remove-sauce-labs-backpack').click();


  await expect(sac).toHaveCount(0);
  await expect(lampe).toBeVisible();
  await expect(compteur).toHaveText('1');

  // 5. Attendre 5 secondes pour voir le résultat
await page.waitForTimeout(5000);

// Retirer le deuxième produit, la lampe.
await page.locator('#remove-sauce-labs-bike-light').click();

// Vérifier que la lampe et le badge du compteur ont disparu.
await expect(lampe).toHaveCount(0);
await expect(compteur).toHaveCount(0);

});