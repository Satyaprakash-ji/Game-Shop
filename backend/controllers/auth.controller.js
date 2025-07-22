import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerHandler =  async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

    if( !firstName || !lastName || !email || !password ){
      return res.status(400).json({ errors: "All fields are required." })
    }

    if( confirmPassword !== password ){
      return res.status(400).json({ errors: "Password and Confirm Password are not match." })
    }
    
    // check if email already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(422).json({ errors: ["Unprocessable Entity. Email Already Exists."] })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      firstName,
      lastName,
      email,
      password:hashedPassword,
      role,
      cart: [],
      wishlist: [],
    };
    const createdUser = await User.create(newUser);

    const tokenData = {
      userId: createdUser._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});
    
    return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite: "lax"}).json({ createdUser })
  } catch (error) {
    return res.status(500).json({ error: ["Internal Server Error."] })
  }
};


export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({error: "All fields are required."})
    }
    
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ errors: ["The email you entered is not Registered. Not Found error"]})
    }
    
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password)
    
    if (!isPasswordMatch) {
      return res.status(401).json({ errors: ["The credentials you entered are invalid. Unauthorized access error."] })
    }

      const tokenData = {
          userId:foundUser._id,
          role:foundUser.role
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"});
    
      return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite: "lax"}).json({ foundUser })
  } catch (error) {
    return res.status(500).json({ error: ["Internal Server Error."] })
  }
};

export const logoutHandler = async (req, res) => {
  try {
      res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ errors: "Internal Server Error" })
  }
}

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const addUserAddressHandler = async (req, res) => {
  try {
    const userId = req.id;
    const address = req.body;
    
    if (!userId || !address || !address.firstName || !address.lastName) {
      return res.status(400).json({ error: "Address or User ID missing." });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    
    user.userAddresses.push(address);
    await user.save();

    const updatedUser = await User.findById(user._id).select("userAddresses");

    return res.status(200).json({ userAddresses: updatedUser.userAddresses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const editUserAddressHandler = async (req, res) => {
  try {
    const userId = req.id;
    const addressId = req.params.id;
    const updatedAddress = req.body;

    if (!addressId || !updatedAddress) {
      return res.status(400).json({ error: "Address ID and data are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const addressIndex = user.userAddresses.findIndex(
      (addr) => addr.id === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found." });
    }

    user.userAddresses[addressIndex] = {
      ...user.userAddresses[addressIndex],
      ...updatedAddress,
    };

    await user.save();

    res.status(200).json({
      message: "Address updated successfully.",
      userAddresses: user.userAddresses,
    });
  } catch (error) {
    console.error("Edit Address Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteUserAddressHandler = async (req, res) => {
  try {
    const userId = req.id;
    const addressId = req.params.id;

    if (!addressId) {
      return res.status(400).json({ error: "Address ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.userAddresses = user.userAddresses.filter(
      (addr) => addr.id !== addressId
    );

    await user.save();

    res.status(200).json({
      message: "Address deleted successfully.",
      userAddresses: user.userAddresses,
    });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const placeOrderHandler = async (req, res) => {
  try {
    const userId = req.id;
    const { orderProducts, amount, deliveryAddress, paymentId, userEmail } = req.body;


    if (!orderProducts || !deliveryAddress || !paymentId || !userEmail) {
      return res.status(400).json({ error: "Incomplete order details." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const newOrder = {
      products: orderProducts,
      totalAmount: amount,
      deliveryAddress,
      paymentId,
      userEmail,
      status: "Placed",
      orderId: `ORD-${Date.now()}`,
    };

    user.orders.push(newOrder);
    user.cart = []; // clear the cart after placing order
    await user.save();

    return res.status(201).json({ message: "Order placed successfully", orders: user.orders });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderHistoryHandler = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate("orders.products.product");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ orders: user.orders });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};