import { Locator, Page } from 'playwright';

export class DashboardPage {
  readonly page: Page;
  readonly homeButton: Locator;
  readonly signOutButton: Locator;
  readonly ordersButton: Locator;
  readonly cartButton: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeButton = page.locator('button:has-text("HOME")');
    this.signOutButton = page.locator('button:has-text("Sign Out")');
    this.ordersButton = page.locator('button:has-text("ORDERS")');
    this.cartButton = page.locator('button[routerlink*="cart"]');
    this.productCards = page.locator('.card-body');
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL(/.*dashboard/, { timeout: 10000 });
    await this.homeButton.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isSignOutVisible(): Promise<boolean> {
    return await this.signOutButton.isVisible();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
