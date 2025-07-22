import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { addItemToWishlistHandler, getWishlistItemsHandler, removeItemFromWishlistHandler } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.route("/").get(authMiddleware, getWishlistItemsHandler);
router.route("/add").post(authMiddleware, addItemToWishlistHandler);
router.route("/:id").delete(authMiddleware, removeItemFromWishlistHandler);

export default router;