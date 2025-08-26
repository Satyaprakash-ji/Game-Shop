import express from "express";
import { addUserAddressHandler, deleteUserAddressHandler, editUserAddressHandler, getAllOrdersHandler, getAllUsersHandler, getMe, getOrderHistoryHandler, loginHandler, logoutHandler, placeOrderHandler, registerHandler } from "../controllers/auth.controller.js";
import authMiddleware, { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerHandler);
router.route("/login").post(loginHandler);
router.route("/logout").post(logoutHandler);
router.route("/me").get(getMe);
router.route("/all-users").get(authMiddleware, authorizeRoles("admin"), getAllUsersHandler);

router.route("/address").post(authMiddleware, addUserAddressHandler);
router.route("/address/:id").put(authMiddleware, editUserAddressHandler);
router.route("/address/:id").delete(authMiddleware, deleteUserAddressHandler);

router.route("/orders/place").post(authMiddleware, placeOrderHandler);
router.route("/orders").get(authMiddleware, getOrderHistoryHandler);
router.route("/all-orders").get(authMiddleware, authorizeRoles("admin"), getAllOrdersHandler);

export default router;