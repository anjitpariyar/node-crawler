import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import Destination, { IDestination } from "../model/Destination.modal";
const DestinationAdd = async (data: IDestination[]): Promise<void> => {
  const promises = data.map(async function (item) {
    let errors = validationResult(item);
    if (!errors.isEmpty()) {
      let respObject = new ResponseObj(
        400,
        errors,
        {},
        "Validations error occurred"
      );
      throw respObject;
    }

    let found = await Destination.findOne({ pid: item.pid });
    if (found) {
      let resData = new ResponseObj(409, {}, {}, "Destination already Added");
      throw resData;
    }

    let newDestination = new Destination();
    newDestination.pid = item.pid;
    newDestination.name = item.name;
    newDestination.location = item.location;
    newDestination.price = item.price;
    newDestination.about = item.about;
    newDestination.gallery = item.gallery;
    newDestination.feature = item.feature;
    newDestination.extra = item.extra;
    newDestination.itinerary = item.itinerary;
    newDestination.reviews = item.reviews;
    newDestination.rate = item.rate;
    newDestination.url = item.url;
    newDestination.categoryId = item.categoryId;

    try {
      await newDestination.save();
      let resData = new ResponseObj(
        200,
        newDestination,
        {},
        "destination added successfully"
      );
      return resData;
    } catch (error) {
      let errorObject: object = {};
      if (error instanceof Error) errorObject = error;
      let resData = new ResponseObj(
        400,
        errorObject,
        {},
        "Failed to add new destination"
      );
      throw resData;
    }
  });

  try {
    const results = await Promise.all(promises);
    console.log("results", results);
    return;
  } catch (error) {
    console.error("error", error);
    return error;
  }
};

export default DestinationAdd;
