import { test, expect } from '@mobilewright/test';
import { find } from './locators';

test('adding a product updates the cart badge count', async ({ device, screen, bundleId }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  // Add a known product to the cart from the catalog screen
  await find(screen, 'catalog', 'productImage').tap();
  await find(screen, 'catalog', 'addToCartButton').tap();

  // Cart tab badge should now read "1"
  await expect(find(screen, 'cart', 'cartBadge', bundleId)).toHaveText('1');
});

test('cart screen lists the added item with correct name', async ({ device, screen, bundleId }) => {
  await device.launchApp(bundleId!);

  await find(screen, 'catalog', 'productImage').tap();
  await find(screen, 'catalog', 'addToCartButton').tap();

  await find(screen, 'catalog', 'viewCart').tap();

  await expect(find(screen, 'catalog', 'backpack')).toBeVisible();
});
