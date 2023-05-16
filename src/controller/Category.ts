import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import Category, { ICategory } from "../model/Category.modal";

// category url https://www.tripadvisor.com/Tourism-g293889-Nepal-Vacations.html

const CategoryAdd = async (data: ICategory[]): Promise<void> => {
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

    let newHotel = new Category();
    newHotel.name = item.name;
    newHotel.icon = item.icon;
    newHotel.backgroundImage = item.backgroundImage;
    newHotel.about = item.about;
    newHotel.destination = item.destination;

    try {
      let response = await newHotel.save();
      if (response) {
        let resData = new ResponseObj(
          200,
          item,
          {},
          "category added successfully"
        );
        return resData;
      }
    } catch (error) {
      console.log("error", error);
      let errorObject: object = {};
      if (error instanceof Error) errorObject = error;
      let resData = new ResponseObj(
        400,
        errorObject,
        {},
        "Failed to add new category"
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

export default CategoryAdd;
