import axios from "axios";
const cheerio = require("cheerio");
// utils
import getDestinationDetails from "./components/getDestinationDetails";
import connectDb from "./db/Dbconnect";
import { HotelAdd } from "./controller/Hotel";
import { IHotel } from "./model/Hotel.modal";
const baseUrl = "https://www.tripadvisor.com";

const main = async () => {
  console.log("Hello, World!");
  connectDb();
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
    const pageHTML = await axios.get(paginationURL);
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

  console.log("productUrl", productURLs);
  // getting product URLs
  // use map to transform the array of values using the async function
  const productMap = [...productURLs].map(async (url) => {
    let resp = getDestinationDetails(url);
    return resp;
  });

  // return Promise.all(productMap)
  //   .then((results) => {
  //     resp = results;
  //     return resp;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     resp = "fail";
  //     return resp;
  //   });
};

const getStarted = async () => {
  try {
    let resp = await main();
    // console.log("response", util.inspect(resp, { depth: null }));
    process.exit(0);

    // if (resp) {
    //   let resp2: any = await HotelAdd(resp as IHotel[]);
    //   console.log("response", resp2);
    //   process.exit(0);
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

getStarted();
