import mongoose from "mongoose";

/**
 * A model for the post Destination database
 */
export interface IDesFeature {
  svg?: string | null;
  name: string;
}

export interface IDesExtra {
  title: string;
  text: string;
}

export interface IDesItinerary {
  title: string;
  text: string;
}

export interface IDesReview {
  name: string;
  text: string;
}

// extends mongoose.Document
export interface IDestination {
  pid: string; // Assuming `getAidFromUrl` returns a string
  name: string;
  location?: string;
  price: number | string; // It can be either a number or a string
  about: string;
  gallery: string[];
  feature?: IDesFeature[];
  highlight: string[];
  extra: IDesExtra[];
  itinerary: IDesItinerary[];
  reviews: IDesReview[];
  rate: number | string; // It can be either a number or a string
  url: string;
  categoryId: string;
  // Replace 'any' with the actual type for 'category'
}

const DestinationSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow both number and string
    about: { type: String, required: true },
    gallery: { type: [String], required: true },
    feature: [
      {
        svg: { type: String, required: false },
        name: { type: String, required: true },
      },
    ],
    highlight: { type: [String], required: true },
    extra: [
      {
        title: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    itinerary: [
      {
        title: { type: String, required: true },
        text: { type: String, required: false },
      },
    ],
    reviews: [
      {
        name: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    rate: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow both number and string
    url: { type: String, required: true },
    categoryId: { type: String, required: true }, // Replace with the actual type for 'category' if available
  },
  { timestamps: true }
);

export default mongoose.model<IDestination>("Destination", DestinationSchema);
