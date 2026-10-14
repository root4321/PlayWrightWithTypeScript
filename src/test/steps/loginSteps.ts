import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../hooks/customWorld';
import { JsonReader } from '../../utils/dataUtils';

Given(
  'user navigates to the application login page using {string} test data',
  async function (this: CustomWorld, datasetKey: string) {
    const data = JsonReader.getLoginData(datasetKey as any);
    this.currentDataset = data;
    await this.loginPage!.navigate(data.url);
  }
);

Given('user navigates to the application login page', async function (this: CustomWorld) {
  await this.loginPage!.navigate();
});

When(
  'user logs in with credentials for {string} from json',
  async function (this: CustomWorld, datasetKey: string) {
    const data = JsonReader.getLoginData(datasetKey as any);
    this.currentDataset = data;
    await this.loginPage!.login(data.userEmail, data.userPassword);
  }
);

When(
  'user logs in with email {string} and password {string}',
  async function (this: CustomWorld, email: string, pass: string) {
    await this.loginPage!.login(email, pass);
  }
);

Then(
  'user should be successfully redirected to the dashboard',
  async function (this: CustomWorld) {
    await this.dashboardPage!.waitForDashboard();
    const currentUrl = await this.dashboardPage!.getUrl();
    const expectedPart = this.currentDataset?.expectedUrlPart || '/dashboard/dash';
    expect(currentUrl).toContain(expectedPart);
  }
);

Then(
  'user should see the sign out button and home navigation',
  async function (this: CustomWorld) {
    const isSignOutVisible = await this.dashboardPage!.isSignOutVisible();
    expect(isSignOutVisible).toBeTruthy();
  }
);

Then(
  'user should see the error message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    const actualMessage = await this.loginPage!.getErrorMessage();
    expect(actualMessage).toContain(expectedMessage);
  }
);

Then(
  'user should see error message for {string} from test data',
  async function (this: CustomWorld, datasetKey: string) {
    const data = JsonReader.getLoginData(datasetKey as any);
    const actualMessage = await this.loginPage!.getErrorMessage();
    expect(actualMessage).toContain(data.expectedErrorMessage);
  }
);
