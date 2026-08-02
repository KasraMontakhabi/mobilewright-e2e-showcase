import { test, expect } from '@mobilewright/test';
import { find } from './locators';

test('app launches and shows the product catalog screen', async ({ device, screen, bundleId }) => {
  // Fresh-launch to avoid state bleeding from a previous run
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  // The catalog screen title / a known product should be visible on cold launch
  await expect(find(screen, 'catalog', 'productsTitle')).toBeVisible();
  await expect(find(screen, 'catalog', 'backpack')).toBeVisible();
  await expect(find(screen, 'catalog', 'sortButton')).toBeVisible();
  await expect(find(screen, 'catalog', 'viewCart')).toBeVisible();
  await expect(find(screen, 'menu', 'viewMenu')).toBeVisible();
});

