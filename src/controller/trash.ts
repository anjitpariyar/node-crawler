import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import Hotels from "../model/Hotel.modal";

export const HotelAdd = async (req: Request, res: Response) => {
  const {
    pid,
    name,
    location,
    price,
    about,
    service,
    food,
    reviews,
    rate,
    gallery,
    url,
  } = req.body;

  // Validate request body against schema
  await Promise.all(
    Object.values(Hotels).map((fieldSchema) => fieldSchema.run(req))
  );
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors,
      {},
      "Validations error occured"
    );
    return res.status(400).send(respObject);
  }

  let newHotel = new Hotels();
  newHotel.pid = pid;
  newHotel.name = name;
  newHotel.location = location;
  newHotel.price = price;
  newHotel.about = about;
  newHotel.service = service;
  newHotel.food = food;
  newHotel.reviews = reviews;
  newHotel.rate = rate;
  newHotel.gallery = gallery;
  newHotel.url = url;

  try {
    await newHotel.save();

    let resData = new ResponseObj(
      200,
      newHotel,
      {},
      "hotel added successfully"
    );
    return res.send(resData);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(
      400,
      errorObject,
      {},
      "Failed to add new Hotel"
    );
    return res.send(resData);
  }
};
