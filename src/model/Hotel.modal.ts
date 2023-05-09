import mongoose from "mongoose";

/**
 * A model for the post hotel database
 */
interface Review {
  name: string;
  text: string;
}

interface Service {
  name: string;
  svg: string;
}

export interface IHotel extends mongoose.Document {
  pid: string;
  name: string;
  location: string;
  price: string;
  about: string;
  service: Service[];
  food: string[];
  reviews: Review[];
  rate: number;
  gallery: string[];
  url: string;
}

const HotelSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    service: {
      type: Array,
      required: true,
    },
    food: {
      type: Array,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    gallery: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewScheme = {
  name: {
    type: String,
    readonly: true,
  },
};

export default mongoose.model<IHotel>("Hotels", HotelSchema);
