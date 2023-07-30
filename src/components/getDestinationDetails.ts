const cheerio = require("cheerio");
import axios from "axios";
import { getAidFromUrl } from "../utils";
import { IDestination } from "src/model/Destination.modal";

export default async function getProductDetails(paginationURLsToVisit, index) {
  const pageHTML = await axios.get(paginationURLsToVisit);
  const $ = cheerio.load(pageHTML.data);

  // grab feature and image
  let feature = [];
  $("main .vwOfI.nlaXM .C .VntFx .f").each(function () {
    feature.push({
      svg: "",
      name: $(this).find(".biGQs").text(),
    });
  });

  // grab the highlights
  let highlight: string[] = [];
  $("main .vwOfI.nlaXM .C ._R .biGQs.pZUbB.KxBGd ul li").each(function () {
    highlight.push($(this).text());
  });

  // grab the extra
  let extra = [];
  $("main .vwOfI.nlaXM .C>dl>dt").each(function () {
    extra.push({
      title: $(this).text(),
      text: $(this).next().finc("ul li").text(),
    });
  });

  // grab the itinerary
  let itinerary = [];
  [...$("main .MLtLP.f .ckgbG ul li")].shift().each(function () {
    itinerary.push({
      title: $(this).find(".BnVmm .biGQs.fiohW.fOtGX").text(),
      text: $(this).next().find(".BnVmm .biGQs.pZUbB.KxBGd").text(),
    });
  });

  // grab the reviews
  let reviews = [];
  [...$("main .vwOfI #REVIEWS .LbPSX>div>div")]
    .splice(0, 5)
    .forEach(function (element) {
      if ($(element).find(".mwPje").text())
        reviews.push({
          name: $(element).find(".mwPje .biGQs.fiohW.fOtGX").text(),
          text: $(element).find(".fIrGe.bgMZj").text(),
        });
    });

  // grab gallery
  let gallery = [];
  $("main .hJiTo section .tdAhP .ARdFa button picture img").each(function () {
    if ($(this).attr("src")) gallery.push($(this).attr("src"));
  });

  let rate: number | string = "NA";
  rate = $("main .vwOfI #REVIEWS .bdeBj .biGQs").text();

  let price: number | string = "NA";
  price = $("main .vwOfI.nlaXM .qiTJh").text();

  let categoryId = "0";

  const productDetails: IDestination = {
    pid: getAidFromUrl(paginationURLsToVisit),
    name: $("main .hJiTo section .qyzqH  h1").text(),
    price: price,
    // location: $("#hotelTmpl .address_clean .hp_address_subtitle").text(),
    about: $("main .hJiTo section .wAiJR .SHPAN .fIrGe _T.bgMZj").text(),
    gallery: gallery,
    feature: feature,
    highlight: highlight,
    extra: extra,
    itinerary: itinerary,
    reviews: reviews,
    rate: rate,
    url: paginationURLsToVisit,
    categoryId: categoryId,
  };
  //   console.log("inside", productDetails);
  return productDetails;
}
