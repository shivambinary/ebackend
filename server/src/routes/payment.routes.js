import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { createPayment } from "../controlers/payment.controller.js";

const router = express.Router();

router.post("/:orderId", auth, createPayment);

export default router;
