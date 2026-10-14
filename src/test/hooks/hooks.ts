import { Before, After, AfterStep, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './customWorld';
import { browserConfig } from './browserConfig';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// Set global step timeout to 30 seconds
setDefaultTimeout(30000);

// macOS ignores --start-maximized and cascades new windows, so maximize via the DevTools protocol
async function maximizeWindow(world: CustomWorld): Promise<void> {
  const session = await world.context!.newCDPSession(world.page!);
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', {
    windowId,
    bounds: { windowState: 'maximized' },
  });
  await session.detach();
}

Before(async function (this: CustomWorld) {
  const isHeaded = browserConfig.headed;

  this.browser = await chromium.launch({
    headless: !isHeaded,
    slowMo: isHeaded ? browserConfig.slowMo : 0,
    args: ['--window-position=0,0'],
  });

  // viewport: null lets the page follow the maximized window; headless has no window, so use a large fixed size
  this.context = await this.browser.newContext({
    viewport: isHeaded ? null : { width: 1920, height: 1080 },
  });

  this.page = await this.context.newPage();
  if (isHeaded) await maximizeWindow(this);
  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
});

async function attachFullPageScreenshot(world: CustomWorld): Promise<void> {
  if (!world.page || world.page.isClosed()) return;
  try {
    const screenshot = await world.page.screenshot({ fullPage: true });
    await world.attach(screenshot, 'image/png');
  } catch (error) {
    console.warn('Could not capture screenshot:', error);
  }
}

// Runs after every step, including failed ones
AfterStep(async function (this: CustomWorld) {
  await attachFullPageScreenshot(this);
});

After(async function (this: CustomWorld) {
  await attachFullPageScreenshot(this);

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});
