import fs from "fs";
import { Category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Product } from "../models/product.model.js";

export const createCategoryHandler = async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    if (!categoryName) {
      return res.status(400).json({ errors: ["Category name is required"] });
    }

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      fs.unlinkSync(localFilePath); // cleanup
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Optional: delete local temp file
    fs.unlinkSync(localFilePath);

    const createdCategory = await Category.create({
      categoryName,
      img: cloudinaryResponse.url,
      description,
    });

    return res.status(200).json({ createdCategory });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};

export const getAllCategoriesHandler = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error."] });
  }
};

export const getCategoriesProductHandler = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ errors: ["Category name is required."] });
    }

    // Find products matching the category (case-insensitive)
    const products = await Product.find({
      category: { $regex: new RegExp(categoryName, "i") },
    });

    const totalItem = products.length;

    const updatedCategory = await Category.findOneAndUpdate(
      { categoryName: { $regex: new RegExp(categoryName, "i") } },
      { totalItem },
      { new: true }
    );

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] });
  }
};
