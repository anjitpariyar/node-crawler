import axios from "axios";
import getProductDetails from "./components/getProductDetails";
const cheerio = require("cheerio");

const main = async () => {
  console.log("Hello, World!");
  //   this is first page to visit
  const paginationURLsToVisit = ["https://scrapeme.live/shop"];
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

    //========================
    //initial steps end here
    //========================

    // retrieving the product URLs
    $(".product.type-product  a.woocommerce-LoopProduct-link").each(
      (index, element) => {
        // updating productURLs
        const productURL = $(element).attr("href");
        productURLs.add(productURL);
      }
    );
  }

  // getting product URLs

  // use map to transform the array of values using the async function

  //   console.log([...productURLs]);
  const productMap = [...productURLs].map(async (url) => {
    let resp = getProductDetails(url);
    // console.log("after indi", resp);
    return resp;
  });

  return Promise.all(productMap)
    .then((results) => {
      //   console.log("results", results);
      resp = results;
      return resp;
    })
    .catch((err) => {
      console.log(err);
      resp = "fail";
      return resp;
    });
};
main()
  .then((resp) => {
    console.log("response", resp);
    process.exit(0);
  })
  .catch((e) => {
    // logging the error message
    console.error(e);
    process.exit(1);
  });
