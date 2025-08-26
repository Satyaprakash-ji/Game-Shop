import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary, removeFromCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const createProductHandler = async (req, res) => {
  try {
    const { title, publisher, price, originalPrice, category, genre, stockQty, rating, releaseDate, aboutGame } = req.body;
    
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

  // Normalize genre input
  let genreArray;
    try {
      genreArray = JSON.parse(genre);
      if (!Array.isArray(genreArray)) throw new Error();
    } catch (err) {
      genreArray = genre.split(",").map((g) => g.trim());
    }

  const createdProduct = await Product.create({
    title,
    img: cloudinaryResponse.url,
    publisher,
    price: Number(price),
    originalPrice: Number(originalPrice),
    category,
    genre: genreArray,
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

export const updatePrductHandler = async (req, res) => {
  try{
    const productId = req.params.id;
    const updateFields = { ...req.body };

    if (updateFields.genre) {
      try {
        if (Array.isArray(updateFields.genre)) {
          // already array
        } else {
          const parsed = JSON.parse(updateFields.genre);
          updateFields.genre = Array.isArray(parsed) ? parsed : parsed.toString().split(",").map((g) => g.trim());
        }
      } catch {
        updateFields.genre = updateFields.genre.split(",").map((g) => g.trim());
      }
    }

    if (req.file?.path) {
      const localFilePath = req.file?.path;

      // Delete old image from Cloudinary
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        fs.unlinkSync(localFilePath);
        return res.status(404).json({ message: 'Product not found' });
      }

      removeFromCloudinary(existingProduct);
      
      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
  
      if (!cloudinaryResponse.url) {
        fs.unlinkSync(localFilePath); // cleanup
        return res.status(500).json({ message: 'Image upload failed' });
      }
  
      updateFields.img = cloudinaryResponse.url;
  
      // Delete local temp file
      fs.unlinkSync(localFilePath);

    }

    const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, { $set: updateFields }, {new: true});

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.status(200).json({updatedProduct});
  } catch (error){
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};

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

