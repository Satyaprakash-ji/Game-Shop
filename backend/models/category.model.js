import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    totalItem: {
      type: Number,
    }
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
