import express from "express";
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getSingleProductHandler, updatePrductHandler } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("img"), createProductHandler);
router.route("/").get(getAllProductsHandler);
router.route("/:id").get(getSingleProductHandler);
router.route("/:id").put(upload.single("img"), updatePrductHandler);
router.route("/:id").delete(deleteProductHandler);

export default router;