import express from "express";
import { addUserAddressHandler, deleteUserAddressHandler, editUserAddressHandler, getMe, getOrderHistoryHandler, loginHandler, logoutHandler, placeOrderHandler, registerHandler } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/logout").post(logoutHandler);
router.route("/me").get(getMe);

router.route("/address").post(authMiddleware, addUserAddressHandler);
router.route("/address/:id").put(authMiddleware, editUserAddressHandler);
router.route("/address/:id").delete(authMiddleware, deleteUserAddressHandler);

router.route("/orders/place").post(authMiddleware, placeOrderHandler);
router.route("/orders").get(authMiddleware, getOrderHistoryHandler);

export default router;