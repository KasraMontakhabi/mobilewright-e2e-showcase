import { test, expect } from '@mobilewright/test';

test('adding a product updates the cart badge count', async ({ device, screen, bundleId }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  // Add a known product to the cart from the catalog screen
  await screen.getByRole('image', { name: 'Product Image' }).first().tap();
  await screen.getByRole('button', { name: 'Tap to add product to cart' }).tap();

  // Cart tab badge should now read "1"
  await expect(screen.getByTestId(`${bundleId}:id/cartTV`)).toHaveText('1');
});

test('cart screen lists the added item with correct name', async ({ device, screen, bundleId }) => {
  await device.launchApp(bundleId!);

  await screen.getByRole('image', { name: 'Product Image' }).first().tap();
  await screen.getByRole('button', { name: 'Tap to add product to cart' }).tap();

  await screen.getByLabel('View cart').tap();

  await expect(screen.getByText('Sauce Labs Backpack')).toBeVisible();
});
