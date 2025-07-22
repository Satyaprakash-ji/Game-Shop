import express from "express";
import { addItemToCartHandler, getCartItemsHandler, removeItemFromCartHandler, updateCartQuantityHandler } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(authMiddleware, getCartItemsHandler);
router.route("/add").post(authMiddleware, addItemToCartHandler);
router.route("/:id").delete(authMiddleware, removeItemFromCartHandler);
router.route("/update-qty").post(authMiddleware, updateCartQuantityHandler);

export default router;