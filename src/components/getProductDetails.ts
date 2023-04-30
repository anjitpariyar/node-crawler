const cheerio = require("cheerio");
import axios from "axios";

export default async function getProductDetails(paginationURLsToVisit) {
  const pageHTML = await axios.get(paginationURLsToVisit);
  const $ = cheerio.load(pageHTML.data);
  //   get your desired valuse

  const productDetails = {
    id: "uniqid",
    title: $(".product .summary .product_title.entry-title").text(),
    price: $(".product .summary .price .amount").text(),
    description: $(
      ".product .summary .woocommerce-product-details__short-description"
    ).text(),
    categories: $(".product .summary .product_meta .posted_in a").text(),
    url: paginationURLsToVisit,
    imageUrl: $(".product .woocommerce-product-gallery__image img").attr("src"),
  };
  //   console.log("inside", productDetails);
  return productDetails;
}
