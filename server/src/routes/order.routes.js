import express from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import {
  placeOrder,
  confirmPayment,
  cancel,
  refund,
  myOrders,
  adminOrders,
  updateStatus,
} from "../controlers/order.controller.js";

const router = express.Router();

/* User */
router.post("/", auth, placeOrder);
router.get("/my-orders", auth, myOrders);

/* Admin */
router.get("/", auth, role("admin"), adminOrders);
router.patch("/:orderId/status", auth, role("admin"), updateStatus);

/* Actions */
router.post("/:orderId/confirm-payment", confirmPayment);
router.post("/:orderId/cancel", auth, cancel);
router.post("/:orderId/refund", auth, refund);

export default router;
