import mongoose from "mongoose";

/**
 * A model for the post Destination database
 */
interface Feature {
  svg: string;
  name: string;
}

interface Extra {
  title: string;
  text: string;
}

interface Itinerary {
  title: string;
  text: string;
}

interface Review {
  name: string;
  text: string;
}

export interface IDestination extends mongoose.Document {
  pid: string; // Assuming `getAidFromUrl` returns a string
  name: string;
  price: number | string; // It can be either a number or a string
  about: string;
  gallery: string[];
  feature: Feature[];
  highlight: string[];
  extra: Extra[];
  itinerary: Itinerary[];
  reviews: Review[];
  rate: number | string; // It can be either a number or a string
  url: string;
  categoryId: string; // Replace 'any' with the actual type for 'category'
}

const DestinationSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow both number and string
    about: { type: String, required: true },
    gallery: { type: [String], required: true },
    feature: [
      {
        svg: { type: String, required: true },
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
        text: { type: String, required: true },
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
    category: { type: mongoose.Schema.Types.Mixed }, // Replace with the actual type for 'category' if available
  },
  { timestamps: true }
);

export default mongoose.model<IDestination>("Destinations", DestinationSchema);
