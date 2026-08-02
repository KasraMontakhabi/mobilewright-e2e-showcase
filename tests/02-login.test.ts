import { test, expect } from './fixtures';

test.only('user can log in with valid standard credentials', async ({ device, bundleId, menuPage, loginPage, catalogPage }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  await menuPage.open();
  await menuPage.goToLogin();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(catalogPage.productsTitle).toBeVisible();
});
