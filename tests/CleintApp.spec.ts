import { test, expect } from '@playwright/test';

test.only('Page context playwright Test', async ({ page }) => {
  // playwright code
  const username = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginbtn = page.locator('[value="Login"]');
  const cardTitle = page.locator('.card-body b');
  const productName = 'ZARA COAT 3'
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await username.fill('vinittyagi09@hotmail.com');
  await password.fill('passpasswordword');
  await loginbtn.click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
  console.log(allTitles.forEach(title => console.log(title)));
  const count = allTitles.length;
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator('text=Add To Cart').click();
      break;
    }
  }


  await page.locator('[routerlink*="cart"]').click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  expect(bool).toBeTruthy();
  console.log(bool);
  await page.locator('button:has-text("Checkout")').click();
  await page.locator('[class="input txt text-validated"]').nth(0).fill('');
  await page.locator('[class="input txt text-validated"]').nth(0).fill('1234 4567 8901 2345');
  await page.locator('[class="input ddl"]').nth(0).selectOption('12');
  await page.locator('[class="input ddl"]').nth(1).selectOption('16');
  await page.locator('[class="input txt"]').nth(0).fill('Rahul');
  await page.locator('[name="coupon"]').fill('rahulshettyacademy');
  await page.locator('button:has-text("Apply Coupon")').click();
  await page.locator('p:has-text("* Coupon Applied")').waitFor();
  const coupanText = await page.locator('p:has-text("* Coupon Applied")').textContent();
  console.log(coupanText);
  expect(coupanText).toEqual('* Coupon Applied');
  await page.locator('input[placeholder="Select Country"]').pressSequentially('ind', { delay: 100 });

  const dropDown = await page.locator('[class="ta-results list-group ng-star-inserted"]');
  await dropDown.waitFor();
  const countryOption = await dropDown.locator('button');

  for (let i = 0; i < await countryOption.count(); i++) {
    const countryText = await countryOption.nth(i).textContent();
    if (countryText?.trim() === 'India') {
      console.log(await countryOption.nth(i).textContent());
      await countryOption.nth(i).click();
      break;
    }
  }


  await page.locator('a:has-text("Place Order")').click();
  await page.waitForLoadState('networkidle');
  await page.locator('h1:has-text("Thankyou for the order.")').waitFor();
  const orderConfirmation = await page.locator('h1:has-text("Thankyou for the order.")').isVisible();
  await expect(orderConfirmation).toBeTruthy();

  const orderID = await page.locator('label[class="ng-star-inserted"]').textContent();
  console.log(orderID);
  await page.locator('button[routerlink="/dashboard/myorders" ]').click();
  // await page.pause();
  const orderRow = await page.locator('tbody tr');
  console.log(orderRow);
  for (let i = 0; i < await orderRow.count(); ++i) {
    const rowOrderID = await orderRow.nth(i).locator('th').textContent();
    console.log(rowOrderID);
    if (orderID?.includes(rowOrderID ?? '')) {
      console.log('Order found:', rowOrderID);
      await orderRow.nth(i).locator('button:has-text("View")').click();
      break;
    }
  }
  await page.locator('div[class="col-text -main"]').waitFor();
  const orderIDmatch = await page.locator('div[class="col-text -main"]').textContent();
  expect(orderID?.includes(orderIDmatch ?? '')).toBeTruthy();
  console.log("OrderID match:", orderIDmatch);
  // await page.pause();

});