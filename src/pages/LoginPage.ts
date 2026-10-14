import { Locator, Page } from 'playwright';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly toastErrorMessage: Locator;

  private readonly defaultUrl = 'https://rahulshettyacademy.com/client/#/auth/login';

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
    this.toastErrorMessage = page.locator('#toast-container [role="alert"], .ngx-toastr.toast-error');
  }

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url || this.defaultUrl, { waitUntil: 'domcontentloaded' });
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    await this.toastErrorMessage.first().waitFor({ state: 'visible', timeout: 7000 });
    return (await this.toastErrorMessage.first().innerText()).trim();
  }
}
