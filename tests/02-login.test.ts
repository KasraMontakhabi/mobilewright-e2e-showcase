import { test, expect } from '@mobilewright/test';

test('user can log in with valid standard credentials', async ({ device, screen, bundleId }) => {
  await device.terminateApp(bundleId!).catch(() => {});
  await device.launchApp(bundleId!);

  await screen.getByLabel('View menu').tap();
  await screen.getByText('Log In').tap();

  await screen.getByRole('textfield').nth(0).fill('standard_user');
  await screen.getByRole('textfield').nth(1).fill('secret_sauce');
  await screen.getByRole('button', { name: 'Tap to login with given credentials' }).tap();

  await expect(screen.getByText('Products')).toBeVisible();
});
