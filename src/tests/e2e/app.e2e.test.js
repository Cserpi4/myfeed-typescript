const puppeteer = require('puppeteer');

describe('MyReddit app', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should show header on home page', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('header');
    const headerText = await page.$eval('header', el => el.textContent);
    expect(headerText).toBeTruthy();
  });
});
