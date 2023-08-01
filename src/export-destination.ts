import axios from "axios";
const cheerio = require("cheerio");
// utils
import getDestinationDetails from "./components/getDestinationDetails";
import { HEADERS } from "./utils/config";
// const util = require("node:util");
const fs = require("fs");
const baseUrl = "https://www.tripadvisor.com";

const main = async () => {
  console.log("Hello, World!");
  //   this is first page to visit
  // Hiking Tours
  // Hiratage
  // Cultural Tours
  //Nature and Wildlife
  const paginationURLsToVisit = [
    "https://www.tripadvisor.com/Tourism-g293889-Nepal-Vacations.html",
  ];

  // keep track of visited pages
  const visitedURLs = [];
  const maxPages = 2;
  const productURLs = new Set();
  let resp: string | any[] = "true";
  // iterating until the queue is empty
  // or the iteration limit is hit
  while (paginationURLsToVisit.length !== 0 && visitedURLs.length <= maxPages) {
    // the current webpage to crawl
    const paginationURL = paginationURLsToVisit.pop();

    // retrieving the HTML content from paginationURL
    const pageHTML = await axios.get(paginationURL, {
      headers: HEADERS,
    });
    // console.log("pageHTML", pageHTML);
    // web pages already crawled
    visitedURLs.push(paginationURL);
    // initializing cheerio on the current webpage
    const $ = cheerio.load(pageHTML.data);
    //========================
    //initial steps end here
    //========================
    // retrieving the product URLs
    [...$(".mKXaY.TFSSL > div:last-child .WfLVk.lfXDH .TAcAQ")]
      .splice(0, 5)
      .forEach((element) => {
        // updating productURLs
        [...$(element).find("li")].splice(0, 3).forEach((element2) => {
          const productURL = $(element2).find("a").attr("href");
          productURLs.add(baseUrl + productURL);
        });
      });
  }

  // console.log("productUrl", productURLs);
  // getting product URLs
  // use map to transform the array of values using the async function
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d11469615-Nagarkot_Sunrise_View_and_Day_Hiking_from_Kathmandu-Kathmandu_Kathmandu_Valley_Bag.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g1367591-d19422647-Jungle_Towernight_Stay_In_Chitwan_National_Park_nepal_2_Nights_3_Days_Package-Sau.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d13166235-Everest_Base_Camp_Trek_14_Days-Kathmandu_Kathmandu_Valley_Bagmati_Zone_Central_Reg.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d12577594-Bhaktapur_and_Nagarkot_Day_Tour_From_Kathmandu-Kathmandu_Kathmandu_Valley_Bagmati_.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d13774467-UNESCO_Seven_World_Heritage_Tour_in_Kathmandu-Kathmandu_Kathmandu_Valley_Bagmati_Z.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d20187061-Nagarkot_Sunrise_and_Bhaktapur_Durbar_Squar_UNESCO_Tour-Kathmandu_Kathmandu_Valley.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d24081739-3_Day_Chitwan_National_Park_Jungle_Safari_Tour_Package_with_Pick_Up-Kathmandu_Kath.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d12466057-Day_Trip_to_Bhaktapur_and_Panauti_from_Kathmandu-Kathmandu_Kathmandu_Valley_Bagmat.html',
  // 'https://www.tripadvisor.com/AttractionProductReview-g293890-d19499705-1_Hour_Mount_Everest_flight_from_Kathmandu_With_Hotel_Pick_Up-Kathmandu_Kathmandu_.html'
  const productMap = [...productURLs].map(async (url, index) => {
    let resp = getDestinationDetails(url, index);
    return resp;
  });

  return Promise.all(productMap)
    .then((results) => {
      resp = results;
      return resp;
    })
    .catch((err) => {
      console.log(err);
      resp = "fail";
      return resp;
    });
};

const getStarted = async () => {
  try {
    let resp = await main();

    // console.log("response", util.inspect(resp, { depth: null }));
    // console.log("count resp", resp);
    if (resp) {
      // let resp2: any = await HotelAdd(resp as IHotel[]);
      // console.log("response", resp2);
      const dataObject = {
        data: resp,
      };
      const jsonData = JSON.stringify(dataObject, null, 2);
      const filePath = "./destinationData.json";
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
