// Global browser settings applied to every scenario, regardless of which
// feature, scenario or tag is executed.
export const browserConfig = {
  // Headed locally; CI runners (GitHub Actions sets CI=true) have no display, so run headless there
  headed: !process.env.CI,
  slowMo: 300, // slight delay in headed mode to make watching easier
};
