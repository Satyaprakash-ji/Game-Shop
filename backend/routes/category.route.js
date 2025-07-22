import express from "express";
import { createCategoryHandler, getAllCategoriesHandler, getCategoriesProductHandler } from "../controllers/category.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.single("img"), createCategoryHandler);
router.route("/").get(getAllCategoriesHandler);
router.route("/:categoryName").get(getCategoriesProductHandler);

export default router;