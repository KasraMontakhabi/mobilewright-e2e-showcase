import type { Screen } from '@mobilewright/core';
import { find } from '../locators';

export class LoginPage {
  constructor(private readonly screen: Screen) {}

  get usernameField() {
    return find(this.screen, 'login', 'usernameField');
  }

  get passwordField() {
    return find(this.screen, 'login', 'passwordField');
  }

  get loginButton() {
    return find(this.screen, 'login', 'loginButton');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.tap();
  }
}
