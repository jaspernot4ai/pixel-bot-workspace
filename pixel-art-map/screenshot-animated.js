const puppeteer = require('puppeteer-core');
const path = require('path');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const previewPath = 'file://' + path.resolve(__dirname, 'preview-animated.html');
  await page.goto(previewPath, { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations to start
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'preview-animated.png', fullPage: true });
  
  console.log('Animated preview screenshot saved!');
  
  await browser.close();
}

takeScreenshot().catch(console.error);