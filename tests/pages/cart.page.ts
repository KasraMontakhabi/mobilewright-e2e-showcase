import type { Screen } from '@mobilewright/core';
import { find } from '../locators';

export class CartPage {
  constructor(private readonly screen: Screen, private readonly bundleId?: string) {}

  get cartBadge() {
    return find(this.screen, 'cart', 'cartBadge', this.bundleId);
  }
}
