const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://us.trip.com/m/searchpage/resultlist?keyword=Nepal");

  // Wait for the content to load (you might need to adjust this wait time)
  // Wait for the .search-result-item elements to appear
  await page.waitForTimeout(5000);

  const content = await page.evaluate(() => {
    const items = [];

    // Replace with the appropriate selector for your content
    const elements = document.querySelectorAll("a.IBUSearch__card-normalCard");
    console.log("element", elements);
    elements.forEach((element) => {
      const title = element?.textContent;

      items.push({ title });
    });

    return items;
  });

  console.log(content);

  await browser.close();
})();
