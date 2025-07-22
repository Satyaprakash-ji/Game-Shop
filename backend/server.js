import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import wishlistRoute from "./routes/wishlist.route.js";
import categoryRoute from "./routes/category.route.js";

const app = express();
env.config();

connectDB();

// middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/category", categoryRoute);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello from home")
})

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`)
})