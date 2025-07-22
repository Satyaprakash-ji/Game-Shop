// import { Response } from "miragejs";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const createProductHandler = async (req, res) => {
  try {
    const { title, img, publisher, price, originalPrice, category, genre, stockQty, rating, releaseDate, aboutGame } = req.body
    if( !title || !publisher || !price || !originalPrice || !category || !genre || !stockQty || !rating || !releaseDate || !aboutGame ){
      return res.status(400).json({error: "All fields are required."})
    }
  
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    return res.status(400).json({ message: 'Image file is required' });
  }
  
  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse || !cloudinaryResponse.url) {
    fs.unlinkSync(localFilePath); // cleanup
    return res.status(500).json({ message: 'Image upload failed' });
  }

  // delete local temp file
  fs.unlinkSync(localFilePath);

  const createdProduct = await Product.create({
    title,
    img: cloudinaryResponse.url,
    publisher,
    price: Number(price),
    originalPrice: Number(originalPrice),
    category,
    genre: Array.isArray(genre) ? genre : genre.split(','),
    stockQty: Number(stockQty),
    rating,
    releaseDate,
    aboutGame
  })

  await Category.findOneAndUpdate(
    { categoryName: { $regex: new RegExp(category, 'i') } },
    { $inc: { totalItem: 1 } }
  );

  return res.status(200).json({createdProduct})

  } catch (error) {
    return res.status(500).json({error: "Internal server error"})
  }
}

export const getAllProductsHandler = async (req, res) => {
  const products = await Product.find({})
  return res.status(200).json({ products });
};

export const getSingleProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ _id: productId });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};

export const updatePrductHandler = async (req, res) => {
  try{
    const productId = req.params.id;
    const updateFields = { ...req.body };

    const localFilePath = req.file?.path;
    if (!localFilePath) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      fs.unlinkSync(localFilePath); // cleanup
      return res.status(500).json({ message: 'Image upload failed' });
    }

    updateFields.img = cloudinaryResponse.url;

    // Optional: delete local temp file
    fs.unlinkSync(localFilePath);

    const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, updateFields, {new: true});
    
    return res.status(200).json({updatedProduct});
  } catch (error){
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};

export const deleteProductHandler = async (req, res) => {
  try{
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const deletedProduct = await Product.findByIdAndDelete({_id: productId});

    await Category.findOneAndUpdate(
      { categoryName: { $regex: new RegExp(product.category, 'i') } },
      { $inc: { totalItem: -1 } }
    );
    
    return res.status(200).json({deletedProduct})
  } catch (error){
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
}

