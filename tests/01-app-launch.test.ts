import { test, expect } from './fixtures';

test('app launches and shows the product catalog screen', async ({ device, bundleId, catalogPage, menuPage }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  await expect(catalogPage.productsTitle).toBeVisible();
  await expect(catalogPage.backpack).toBeVisible();
  await expect(catalogPage.sortButton).toBeVisible();
  await expect(catalogPage.viewCartButton).toBeVisible();
  await expect(menuPage.viewMenuButton).toBeVisible();
});
