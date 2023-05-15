import mongoose from "mongoose";

/**
 * A model for the post hotel database
 */

export interface ICategoryScheme extends mongoose.Document {
  icon: string;
  name: string;
  backgroundImage: string;
  about: string;
  destination: string[];
}

const CategoryScheme = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    destination: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICategoryScheme>("Category", CategoryScheme);
