const cheerio = require("cheerio");
import axios from "axios";
import { getAidFromUrlDestination } from "../utils";
import {
  IDesExtra,
  IDesFeature,
  IDesItinerary,
  IDesReview,
  IDestination,
} from "src/model/Destination.modal";
import { HEADERS } from "../utils/config";

export default async function getProductDetails(paginationURLsToVisit, index) {
  const pageHTML = await axios.get(paginationURLsToVisit, {
    headers: HEADERS,
  });

  const $ = cheerio.load(pageHTML.data);

  // grab feature and image
  let feature: IDesFeature[] = [];
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
  let extra: IDesExtra[] = [];
  $("main .vwOfI.nlaXM .C>dl>dt").each(function () {
    extra.push({
      title: $(this).text(),
      text: $(this).next().find("ul li").text(),
    });
  });

  // grab the itinerary
  let itinerary: IDesItinerary[] = [];
  let tempItinerary = [...$("main .MLtLP.f .ckgbG ul li")];
  tempItinerary.shift();
  tempItinerary.forEach(function (elem) {
    itinerary.push({
      title: $(elem).find(".BnVmm .biGQs.fiohW.fOtGX").text(),
      text: $(elem).next().find(".BnVmm .biGQs.pZUbB.KxBGd").text(),
    });
  });

  // grab the reviews
  let reviews: IDesReview[] = [];
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
  let gallery: string[] = [];
  $("main .hJiTo section .tdAhP .ARdFa button picture img").each(function () {
    if ($(this).attr("src")) gallery.push($(this).attr("src"));
  });

  let rate: number | string = "NA";
  rate = $("main .vwOfI #REVIEWS .bdeBj .f.u .biGQs").text();

  let price: number | string = "NA";
  price = $("main .vwOfI.nlaXM .qiTJh").text();

  let categoryId: string = "0";

  const productDetails: IDestination = {
    pid: getAidFromUrlDestination(paginationURLsToVisit),
    name: $("h1.biGQs.fiohW.ncFvv.EVnyE").text(),
    price: price,
    location: "",
    about: $(".fIrGe.bgMZj").text(),
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
