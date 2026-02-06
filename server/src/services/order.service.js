import mongoose from "mongoose";
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import {
  checkStockAvailability,
  reduceStock,
  restoreStock,
} from "./inventory.service.js";
import { createRefund } from "./payment.service.js";
import { paginate } from "../utils/paginate.js";



export const createOrder = async (userId, items) => {
  if (!items || items.length === 0) {
    throw new ApiError(400, "Order items are required");
  }

  let totalAmount = 0;
  for (const item of items) {
    totalAmount += item.price * item.quantity;
  }

  await checkStockAvailability(items);

  const order = await Order.create({
    user: userId,
    items,
    totalAmount,
    paymentStatus: "pending",
    orderStatus: "pending",
  });

  return order;
};


export const confirmOrderPayment = async (orderId, paymentId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);

    if (!order) throw new ApiError(404, "Order not found");

    if (order.paymentStatus === "paid") {
      throw new ApiError(400, "Order already paid");
    }

    await reduceStock(order.items, session);

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


export const cancelOrder = async (orderId, userId, isAdmin = false) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);

    if (!order) throw new ApiError(404, "Order not found");

    if (!isAdmin && order.user.toString() !== userId) {
      throw new ApiError(403, "Not allowed to cancel this order");
    }

    if (["shipped", "delivered"].includes(order.orderStatus)) {
      throw new ApiError(400, "Order cannot be cancelled at this stage");
    }

    if (order.orderStatus === "cancelled") {
      throw new ApiError(400, "Order already cancelled");
    }

    if (order.paymentStatus === "paid") {
      await restoreStock(order.items, session);
    }

    order.orderStatus = "cancelled";
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};


export const refundOrder = async (orderId, userId, isAdmin = false) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(orderId).session(session);

    if (!order) throw new ApiError(404, "Order not found");

    if (!isAdmin && order.user.toString() !== userId) {
      throw new ApiError(403, "Not allowed");
    }

    if (order.paymentStatus === "refunded") {
      throw new ApiError(400, "Order already refunded");
    }

    if (order.paymentStatus !== "paid") {
      throw new ApiError(400, "Only paid orders can be refunded");
    }

    if (order.orderStatus === "delivered") {
      throw new ApiError(400, "Delivered orders cannot be refunded");
    }

    await createRefund(order.paymentId);

    await restoreStock(order.items, session);

    order.paymentStatus = "refunded";
    order.orderStatus = "cancelled";

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};



export const getUserOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};




export const getAllOrders = async (page, limit) => {
  return paginate(Order, {}, page, limit, "user");
};



export const updateOrderStatus = async (orderId, status) => {
  const allowedStatuses = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }

  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(404, "Order not found");

  order.orderStatus = status;
  await order.save();

  return order;
};
