import { test as base, expect } from '@mobilewright/test';
import { MenuPage } from './pages/menu.page';
import { LoginPage } from './pages/login.page';
import { CatalogPage } from './pages/catalog.page';
import { CartPage } from './pages/cart.page';

type PageFixtures = {
  menuPage: MenuPage;
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
  menuPage: async ({ screen }, use) => {
    await use(new MenuPage(screen));
  },
  loginPage: async ({ screen }, use) => {
    await use(new LoginPage(screen));
  },
  catalogPage: async ({ screen }, use) => {
    await use(new CatalogPage(screen));
  },
  cartPage: async ({ screen, bundleId }, use) => {
    await use(new CartPage(screen, bundleId));
  },
});

export { expect };
