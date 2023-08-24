const puppeteer = require("puppeteer");

const fs = require("fs");



(async () => {
  const browser = await puppeteer.launch({
    headless: false
});
  const page = await browser.newPage();

  await page.goto("https://us.trip.com/m/searchpage/resultlist?keyword=Nepal");
  await page.setViewport({
    width: 1200,
    height: 800
});

  

  // Wait for the content to load (you might need to adjust this wait time)
  // Wait for the .search-result-item elements to appear

  await page.waitForTimeout(10000);


   

  const content = await page.evaluate(() => {

    // name, location, price, rating, url, imageSrc
    const items = [];

    // Replace with the appropriate selector for your content
    const elements = document.querySelectorAll(".infinite-scroll-component a.IBUSearch__card-normalCard");
    elements.forEach((element) => {
      const title = element?.querySelector(".titleStyle")?.textContent;
      const location = element?.querySelector(".greyColor.fs3.lh18.ellipsis")?.textContent;
      const price = element?.querySelector(".fs8.tar .fwibubold")?.textContent;
      const rating = element?.querySelector(".fs3.mb6 .greyColor")?.textContent;
      const imageSrc = element?.querySelector("img")?.getAttribute("src");


      items.push({ title, location,price,rating,url:"",imageSrc });
    });

    elements.forEach(async(element, index) => {
      await page.click(element);
      await page.waitForNavigation();
      const newPageUrl = page.url();
      console.log('New Page URL:', newPageUrl);
      items[index].url = newPageUrl;
    })

    return items;
  });

  await exportJson(content)
  await browser.close();
})();


const exportJson = async (data)=>{

  const dataObject = {
    data: data,
  };
  const jsonData = JSON.stringify(dataObject, null, 2);

  const filePath = "./testData.json";

  try {
    fs.writeFileSync(filePath, jsonData);
    console.log("JSON file has been saved.");
    return true;
  } catch (err) {
    console.error("Error writing JSON file:", err);
    return true
  }

}
