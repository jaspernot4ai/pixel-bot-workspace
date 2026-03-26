const puppeteer = require('puppeteer-core');
const path = require('path');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Take screenshot of preview.html
  const previewPath = 'file://' + path.resolve(__dirname, 'preview.html');
  await page.goto(previewPath);
  await page.screenshot({ path: 'preview-screenshot.png', fullPage: true });
  
  console.log('Screenshot saved to preview-screenshot.png');
  
  await browser.close();
}

takeScreenshot().catch(console.error);