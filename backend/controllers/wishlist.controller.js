import { User } from "../models/user.model.js";

export const getWishlistItemsHandler = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("wishlist");

    if(!user){
      return res.status(404).json({error: "User not found."})
    }
    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};

export const addItemToWishlistHandler = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    if(!productId){
      return res.status(400).json({errors: "Product ID is required."})
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({errors: "User not found."})
    }

    const alreadyInWishlist = user.wishlist.includes(productId);
    if(alreadyInWishlist){
      return res.status(400).json({errors: "Product is already in wishlist"})
    }

    user.wishlist.push(productId);
    await user.save();
    const populatedUser = await User.findById(userId).populate("wishlist");

    return res.status(201).json({ wishlist: populatedUser.wishlist });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error."] })
  }
};


export const removeItemFromWishlistHandler = async (req, res) => {
  try {
    const userId = req.id;
    const productId = req.params.id;

    if(!productId){
      return res.status(401).json({errors: "Product ID is required."})
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({errors: "User not found"})
    }

    user.wishlist = user.wishlist.filter((item) => item.toString() !== productId.toString())
    await user.save();
    const populatedUser = await User.findById(userId).populate("wishlist");

    return res.status(200).json({ wishlist: populatedUser.wishlist });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error."] })
  }
};
