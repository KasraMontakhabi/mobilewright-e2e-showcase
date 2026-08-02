import { test, expect } from './fixtures';

test('adding a product updates the cart badge count', async ({ device, bundleId, catalogPage, cartPage }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  await catalogPage.addFirstProductToCart();

  await expect(cartPage.cartBadge).toHaveText('1');
});

test('cart screen lists the added item with correct name', async ({ device, bundleId, catalogPage }) => {
  await device.launchApp(bundleId!);

  await catalogPage.addFirstProductToCart();
  await catalogPage.openCart();

  await expect(catalogPage.backpack).toBeVisible();
});
