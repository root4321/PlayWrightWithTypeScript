# AutomationUsingPlaywright

This repository contains a robust automation framework using **Playwright with TypeScript and Cucumber BDD**.

---

## 📁 Project Structure

```
├── features/
│   └── login.feature              # Gherkin feature file with positive & negative scenarios
├── src/
│   ├── pages/
│   │   ├── LoginPage.ts           # Page Object for Rahul Shetty Client Login page
│   │   └── DashboardPage.ts       # Page Object for Client Portal Dashboard page
│   ├── test/
│   │   ├── steps/
│   │   │   └── loginSteps.ts      # Cucumber step definitions
│   │   └── hooks/
│   │       ├── customWorld.ts     # Cucumber World with Playwright instances
│   │       └── hooks.ts           # Before/After hooks (browser lifecycle, screenshots on failure)
│   ├── test-data/
│   │   └── loginData.json         # JSON test data file for credentials and expected values
│   └── utils/
│       └── dataUtils.ts           # Reusable JsonReader utility to load & extract test data
├── cucumber.json                  # Cucumber configuration and profiles
├── tsconfig.json                  # TypeScript compiler settings
├── playwright.config.ts           # Playwright standard runner configuration
└── package.json                   # Dependencies and npm test runner scripts
```

---

## 🚀 Running the Cucumber Tests

### 1. Run all scenarios
```bash
npm run test:cucumber
```
Locally the browser launches maximized in headed mode; on CI (`CI=true`) it runs headless. This is
controlled globally in `src/test/hooks/browserConfig.ts`.

### Run on GitHub Actions
The **Cucumber Tests** workflow (`.github/workflows/cucumber.yml`) runs manually only, never on push
or pull request. Go to **Actions → Cucumber Tests → Run workflow**, pick a tag (or `all`, or enter a
custom tag expression), then download the `cucumber-report` artifact from the finished run.

### 2. Run by tag
```bash
npx cucumber-js --tags "@negative"
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@positive or @negative"
```

### 3. Run a specific scenario by name or line number
```bash
# By scenario name
npx cucumber-js --name "Successful login"

# By feature file and line number
npx cucumber-js features/login.feature:9
npx cucumber-js features/login.feature:16
```

---

## 📊 Reports
After test execution, a rich HTML report is automatically generated at:
```
test-results/cucumber-report.html
```
Open it in any browser to inspect step-by-step results and screenshots if any step fails.
