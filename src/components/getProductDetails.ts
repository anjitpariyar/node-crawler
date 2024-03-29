const cheerio = require("cheerio");
import axios from "axios";
import { getAidFromUrl } from "../utils";

export default async function getProductDetails(paginationURLsToVisit) {
  const pageHTML = await axios.get(paginationURLsToVisit);
  const $ = cheerio.load(pageHTML.data);

  // what do i need ?

  // grab service and image
  let service = [];
  $("#hotelTmpl .hp--popular_facilities .e5e0727360 .a815ec762e").each(
    function () {
      service.push({
        svg: "",
        name: $(this).find(".db312485ba").text(),
      });
    }
  );

  // grab the reviews
  let reviews = [];
  $("#hotelTmpl .e567fd4fff.e64b686da7 li").each(function () {
    if ($(this).find(".a3332d346a.e6208ee469").text())
      reviews.push({
        name: $(this).find(".a3332d346a.e6208ee469").text(),
        text: $(this).find(".featuredreview-text").text(),
      });
  });

  // grab gallery
  let gallery = [];
  $("#hotelTmpl .gallery-side-reviews-wrapper a.bh-photo-grid-item").each(
    function () {
      if ($(this).attr("data-thumb-url"))
        gallery.push($(this).attr("data-thumb-url"));
    }
  );

  let rate: number | string = "NA";
  if ($(".b2b990caf1 .b5cd09854e.d10a6220b4").text()) {
    rate = parseInt($(".b2b990caf1 .b5cd09854e.d10a6220b4").text()) / 2;
  }
  let price = "NA";
  price = $("#hotelTmpl .prco-valign-middle-helper").text();
  let regex = /NPR\s+\d{1,3}(,\d{3})*\b/;
  price = price?.match(regex)?.length > 0 ? price?.match(regex)[0] : "NA";

  const productDetails = {
    pid: getAidFromUrl(paginationURLsToVisit),
    name: $("#hotelTmpl #wrap-hotelpage-top .pp-header__title").text(),
    location: $("#hotelTmpl .address_clean .hp_address_subtitle").text(),
    price: price,
    about: $("#hotelTmpl  #property_description_content").text(),
    service: service,
    food: [],
    reviews: reviews,
    rate: rate,
    gallery: gallery,
    url: paginationURLsToVisit,
  };
  //   console.log("inside", productDetails);
  return productDetails;
}
