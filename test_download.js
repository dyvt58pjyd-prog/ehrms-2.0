const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:8088/#canteen', { waitUntil: 'networkidle0' });
  
  console.log("Page loaded. Clicking download button...");
  
  try {
    await page.click('#btn-download-canteen');
    console.log("Button clicked!");
    // wait a bit to see if an error is thrown
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.log("Could not click button:", e.message);
  }
  
  await browser.close();
})();
