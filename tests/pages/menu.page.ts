import type { Screen } from '@mobilewright/core';
import { find } from '../locators';

export class MenuPage {
  constructor(private readonly screen: Screen) {}

  get viewMenuButton() {
    return find(this.screen, 'menu', 'viewMenu');
  }

  get logInLink() {
    return find(this.screen, 'menu', 'logIn');
  }

  async open() {
    await this.viewMenuButton.tap();
  }

  async goToLogin() {
    await this.logInLink.tap();
  }
}
