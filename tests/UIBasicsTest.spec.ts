import { test, expect } from '@playwright/test';

test('Browser context playwright Test', async ({ browser }) => {
  // playwright code


  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator('#username');
  const password = page.locator('input#password');
  const signInButton = page.locator('[value="Sign In"]');
  const cardTitle = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('input#password', 'Learning@830$3mK');
  await page.click('[value="Sign In"]');
  console.log(await page.locator('[style*="block"]').textContent());
  await expect(page.locator('[style*="block"]')).toContainText('password');
  await username.fill('');
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await signInButton.click();
  console.log(await page.locator('.card-body a').first().textContent());
  console.log(await page.locator('.card-body a').nth(1).textContent());
  console.log(await page.locator('.card-body a').last().textContent());
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
  console.log(allTitles.forEach(title => console.log(title)));

  for (let i = 0; i < allTitles.length; i++) {
    console.log(i, allTitles[i]);
  }

});


test('UI Control Test', async ({ page }) => {
  // playwright code
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log("Page title is: " + await page.title());
  const dropDown= page.locator('select.form-control');
  const documentLink= page.locator('a[href*="documents-request"]');
  await dropDown.selectOption('Teacher');
  await page.locator('[class="checkmark"]').nth(1).click();
  await page.locator('#okayBtn').click();
  console.log(await page.locator('[class="checkmark"]').last().isChecked());
  await expect(page.locator('[class="checkmark"]').last()).toBeChecked();
  await page.locator('input#terms').click();
  await expect(page.locator('input#terms')).toBeChecked();
  await page.locator('input#terms').uncheck();
  expect(await page.locator('input#terms').isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await page.pause(); 
});

test("Handle Child Windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const documentLink= page.locator('a[href*="documents-request"]');
  const username = page.locator('#username');
  const password = page.locator('input#password');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
  ]);
  console.log(await newPage.title());
  const documentText =await newPage.locator('.red').textContent();
  console.log(documentText);
  const domain = documentText?.split("@")[1]?.split(" ")[0] ?? '';
  console.log(domain);
  await page.pause();
  await username.fill(domain ?? '');
  await page.pause();
  console.log(await username.textContent());
  console.log(await username.inputValue());
});

test('Page context playwright Test', async ({ page }) => {
  // playwright code
  await page.goto('https://google.com');
  console.log("Page title is: " + await page.title());
  await expect(page).toHaveTitle("Google");
});

