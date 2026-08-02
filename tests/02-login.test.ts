import { test, expect } from '@mobilewright/test';
import { find } from './locators';

test('user can log in with valid standard credentials', async ({ device, screen, bundleId }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  await find(screen, 'menu', 'viewMenu').tap();
  await find(screen, 'menu', 'logIn').tap();

  await find(screen, 'login', 'usernameField').fill('standard_user');
  await find(screen, 'login', 'passwordField').fill('secret_sauce');
  await find(screen, 'login', 'loginButton').tap();

  await expect(find(screen, 'catalog', 'productsTitle')).toBeVisible();
});
