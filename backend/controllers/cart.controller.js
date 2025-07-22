import { User } from "../models/user.model.js";
// import { Product } from "../models/product.model.js";


export const getCartItemsHandler = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("cart.product");

    if(!user){
      return res.status(404).json({error: "User not found."})
    }
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};


export const addItemToCartHandler = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    if(!productId){
      return res.status(400).json({errors: ["Product ID is required."]})
    }
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({errors: ["User not found."]})
    }
    
    const existingItem = user.cart.find((item) => item.product.toString() === productId);

    let message = "";
    if (existingItem) {
      // existingItem.qty += 1; // increment quantity
      message = "Product already in cart";
    } else {
      user.cart.push({ product: productId, qty: 1 });
    }

    await user.save();

    const populatedUser = await User.findById(userId).populate("cart.product");
    res.status(200).json({cart: populatedUser.cart, message});
    
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};


export const removeItemFromCartHandler = async (req, res) => {
  try {
    const userId = req.id;
    const productId = req.params.id;
    // const { productId } = req.body;

    if(!productId){
      return res.status(400).json({errors: "Product ID is required."})
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({errors: "User not found."})
    }
    user.cart = user.cart.filter((item) => item.product.toString() !== productId.toString())

    await user.save();
    const populatedUser = await User.findById(userId).populate("cart.product");
    return res.status(200).json({ cart: populatedUser.cart });
  } catch (error) {
    return res.status(500).json({ errors: ["Internal Server Error.", error] })
  }
};

export const updateCartQuantityHandler = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    const user = await User.findById(userId);
    const cartItem = user.cart.find(item => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart." });
    }

    if (type === "increment") {
      cartItem.qty += 1;
    } else if (type === "decrement") {
      if (cartItem.qty > 1) {
        cartItem.qty -= 1;
      } else {
        // Optional: remove item if quantity is 0
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
      }
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate("cart.product");
    // await user.populate("cart.product");

    res.status(200).json({ cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
