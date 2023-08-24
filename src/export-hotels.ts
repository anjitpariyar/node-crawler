import axios from "axios";
const cheerio = require("cheerio");
// utils

import { getDate } from "./utils";
const fs = require("fs");


const main = async () => {
  console.log("Hello, World!");
  //   this is first page to visit
  // pokh, ktm, chitwan, bhaktapur
  const paginationURLsToVisit = [
    `https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaKsBiAEBmAEJuAEXyAEM2AEB6AEB-AEMiAIBqAIDuALf_7yiBsACAdICJGJiZWM3NWY5LWZmOWMtNDY2Mi1hMWQ0LWNiNGZkZDZmY2I0ZNgCBuACAQ&sid=e1eb3666e37647366e03ca0e86dfd6cb&aid=356980&dest_id=-1022488&dest_type=city&checkin=${
      getDate()[0]+1
    }&checkout=${getDate()[1]+1};`,
    `https://www.booking.com/searchresults.en-gb.html?ss=Kathmandu&ssne=Kathmandu&ssne_untouched=Kathmandu&label=gen173nr-1FCAEoggI46AdIM1gEaKsBiAEBmAEJuAEXyAEM2AEB6AEB-AEMiAIBqAIDuALf_7yiBsACAdICJGJiZWM3NWY5LWZmOWMtNDY2Mi1hMWQ0LWNiNGZkZDZmY2I0ZNgCBuACAQ&sid=e1eb3666e37647366e03ca0e86dfd6cb&aid=356980&lang=en-gb&sb=1&src_elem=sb&src=searchresults&dest_id=-1022136&dest_type=city&&checkin=${
      getDate()[0]+1
    }&checkout=${
      getDate()[1]+1
    }&group_adults=1&no_rooms=1&group_children=0&sb_travel_purpose=leisures`,
    `https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaKsBiAEBmAEJuAEXyAEM2AEB6AEB-AEMiAIBqAIDuALf_7yiBsACAdICJGJiZWM3NWY5LWZmOWMtNDY2Mi1hMWQ0LWNiNGZkZDZmY2I0ZNgCBuACAQ&sid=e1eb3666e37647366e03ca0e86dfd6cb&aid=356980&checkin=${
      getDate()[0]+1
    }&checkout=${
      getDate()[1]+1
    }&dest_id=900049092&dest_type=city&group_adults=1&req_adults=1&no_rooms=1&group_children=0&req_children=0`,
    `https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggI46AdIM1gEaKsBiAEBmAEJuAEXyAEM2AEB6AEB-AEMiAIBqAIDuALf_7yiBsACAdICJGJiZWM3NWY5LWZmOWMtNDY2Mi1hMWQ0LWNiNGZkZDZmY2I0ZNgCBuACAQ&sid=e1eb3666e37647366e03ca0e86dfd6cb&aid=356980&checkin=${
      getDate()[0]+1
    }&checkout=${
      getDate()[1]+1
    }&dest_id=-1021748&dest_type=city&group_adults=1&req_adults=1&no_rooms=1&group_children=0&req_children=0
    
    `,
  ];

  // keep track of visited pages
  const visitedURLs = [];
  const maxPages = 2;
  const productURLs = new Set();
  let resp: string | any[] = "true";
  // iterating until the queue is empty
  // or the iteration limit is hit
  while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
    // initial  4 process
    // test one usrl from paginationURLsToVisit
    // assing to get data from it
    // push that usl to visitedURLs
    // init cheerio  values

    // the current webpage to crawl
    const paginationURL = paginationURLsToVisit.pop();

    // retrieving the HTML content from paginationURL
    const pageHTML = await axios.get(paginationURL);

    // adding the current webpage to the
    // web pages already crawled
    visitedURLs.push(paginationURL);
    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);

    // console.log("hiii",$(".c82435a4b8.a178069f51.a6ae3c2b40").find("a").attr("href"));

    //========================
    //initial steps end here
    //========================
    // retrieving the product URLs
    [...$(".c82435a4b8.a178069f51.a6ae3c2b40")]
      .splice(0, 15)
      .forEach((element) => {
        // updating productURLs
        const url = $(element).find("a").attr("href") ?? "NA";
        const title = $(element)?.find(".f6431b446c.a23c043802")?.text();
   

        const location = $(element)?.find(".abf093bdfe.a1fbd102d9 a span span:first-child")?.text();
        const price = $(element)?.find(".f419a93f12 .e729ed5ab6 .f6431b446c ")?.text();
        const rating = $(element)?.find(".f419a93f12 .e4755bbd60 ")?.attr("aria-label") ?? "NA"
        ;
        const imageSrc = $(element)?.find(".c90a25d457 a img")?.attr("src");
        if(price)
        productURLs.add({url, title, location, price, rating, imageSrc});
      });
  }

return Array.from(productURLs);
  // getting product URLs
  // use map to transform the array of values using the async function
//   const productMap = [...productURLs].map(async (url) => {
//     let resp = getProductDetails(url);
//     return resp;
//   });

//   return Promise.all(productMap)
//     .then((results) => {
//       resp = results;
//       return resp;
//     })
//     .catch((err) => {
//       console.log(err);
//       resp = "fail";
//       return resp;
//     });
};

const getStarted = async () => {
  try {
    let resp = await main();
    // console.log("response", util.inspect(resp, { depth: null }));
    if (resp) {
        const dataObject = {
            data: resp
          };
          const jsonData = JSON.stringify(dataObject, null, 2);
          const filePath = "./hotelsData.json";
          // Write the JSON data to the file
          try {
            fs.writeFileSync(filePath, jsonData);
            console.log("JSON file has been saved.");
          } catch (err) {
            console.error("Error writing JSON file:", err);
          }
          process.exit(0);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

getStarted();
