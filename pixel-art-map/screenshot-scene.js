const puppeteer = require('puppeteer-core');
const path = require('path');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  
  const previewPath = 'file://' + path.resolve(__dirname, 'preview-scene.html');
  await page.goto(previewPath, { waitUntil: 'networkidle0' });
  
  // Wait for animation to run
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'preview-scene.png', fullPage: false });
  
  console.log('Scene screenshot saved!');
  
  await browser.close();
}

takeScreenshot().catch(console.error);