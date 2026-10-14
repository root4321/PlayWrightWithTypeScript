import { chromium, firefox, webkit, BrowserType } from 'playwright';

declare const process: { env: Record<string, string | undefined> };

// Global browser settings applied to every scenario, regardless of which
// feature, scenario or tag is executed.
//
// Supported browsers: chrome, chromium, firefox, webkit.
// Edit DEFAULT_BROWSER to change the default, or override per run with the BROWSER env variable.
const DEFAULT_BROWSER = 'webkit';
const browserName = (process.env.BROWSER ?? DEFAULT_BROWSER).toLowerCase();

const browsers: Record<string, { type: BrowserType; channel?: string }> = {
  chrome: { type: chromium, channel: 'chrome' },
  chromium: { type: chromium },
  firefox: { type: firefox },
  webkit: { type: webkit },
};

if (!browsers[browserName]) {
  throw new Error(
    `Unsupported BROWSER "${browserName}". Use one of: ${Object.keys(browsers).join(', ')}`
  );
}

export const browserConfig = {
  name: browserName,
  type: browsers[browserName].type,
  channel: browsers[browserName].channel,
  // Only Chrome is maximized locally; other browsers open at the default size
  maximize: browserName === 'chrome',
  // Headed for every browser locally; headless only on GitHub Actions (which sets GITHUB_ACTIONS=true)
  headed: process.env.GITHUB_ACTIONS !== 'true',
  slowMo: 300, // slight delay in headed mode to make watching easier
};
