import type { Screen } from '@mobilewright/core';
import { find } from '../locators';

export class CatalogPage {
  constructor(private readonly screen: Screen) {}

  get productsTitle() {
    return find(this.screen, 'catalog', 'productsTitle');
  }

  get backpack() {
    return find(this.screen, 'catalog', 'backpack');
  }

  get sortButton() {
    return find(this.screen, 'catalog', 'sortButton');
  }

  get viewCartButton() {
    return find(this.screen, 'catalog', 'viewCart');
  }

  get productImage() {
    return find(this.screen, 'catalog', 'productImage');
  }

  get addToCartButton() {
    return find(this.screen, 'catalog', 'addToCartButton');
  }

  /** Open the first product from the list and add it to the cart. */
  async addFirstProductToCart() {
    await this.productImage.tap();
    await this.addToCartButton.tap();
  }

  async openCart() {
    await this.viewCartButton.tap();
  }
}
