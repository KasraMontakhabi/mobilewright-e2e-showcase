import { test, expect } from '@mobilewright/test';

test('app launches and shows the product catalog screen', async ({ device, screen, bundleId }) => {
  // Fresh-launch to avoid state bleeding from a previous run
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  // The catalog screen title / a known product should be visible on cold launch
  await expect(screen.getByText('Products')).toBeVisible();
  await expect(screen.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(screen.getByLabel('Shows current sorting order and displays available sorting options')).toBeVisible();
  await expect(screen.getByLabel('View cart')).toBeVisible();
  await expect(screen.getByLabel('View menu')).toBeVisible();
});

