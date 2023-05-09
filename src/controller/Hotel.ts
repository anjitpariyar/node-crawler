import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import Hotels, { IHotel } from "../model/Hotel.modal";

export const HotelAdd = async (data: IHotel[]): Promise<void> => {
  const promises = data.map(async function (item) {
    let errors = validationResult(item);
    if (!errors.isEmpty()) {
      let respObject = new ResponseObj(
        400,
        errors,
        {},
        "Validations error occured"
      );
      throw respObject;
    }

    let found = await Hotels.findOne({ pid: item.pid });
    if (found) {
      let resData = new ResponseObj(409, {}, {}, "Hotel arready Added");
      throw resData;
    }

    let newHotel = new Hotels();
    newHotel.pid = item.pid;
    newHotel.name = item.name;
    newHotel.location = item.location;
    newHotel.price = item.price;
    newHotel.about = item.about;
    newHotel.service = item.service;
    newHotel.food = item.food;
    newHotel.reviews = item.reviews;
    newHotel.rate = item.rate;
    newHotel.gallery = item.gallery;
    newHotel.url = item.url;

    try {
      await newHotel.save();
      let resData = new ResponseObj(
        200,
        newHotel,
        {},
        "hotel added successfully"
      );
      return resData;
    } catch (error) {
      let errorObject: object = {};
      if (error instanceof Error) errorObject = error;
      let resData = new ResponseObj(
        400,
        errorObject,
        {},
        "Failed to add new Hotel"
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
