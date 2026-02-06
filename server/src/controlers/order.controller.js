import ApiResponse from "../utils/ApiResponse.js";
import {
  createOrder,
  confirmOrderPayment,
  cancelOrder,
  refundOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../services/order.service.js";

export const placeOrder = async (req, res, next) => {
  try {
    const order = await createOrder(req.user.id, req.body.items);
    res.status(201).json(new ApiResponse(201, order));
  } catch (err) {
    next(err);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const order = await confirmOrderPayment(
      req.params.orderId,
      req.body.paymentId
    );
    res.status(200).json(new ApiResponse(200, order));
  } catch (err) {
    next(err);
  }
};

export const cancel = async (req, res, next) => {
  try {
    const order = await cancelOrder(
      req.params.orderId,
      req.user.id,
      req.user.role === "admin"
    );
    res.status(200).json(new ApiResponse(200, order, "Order cancelled"));
  } catch (err) {
    next(err);
  }
};

export const refund = async (req, res, next) => {
  try {
    const order = await refundOrder(
      req.params.orderId,
      req.user.id,
      req.user.role === "admin"
    );
    res.status(200).json(new ApiResponse(200, order, "Order refunded"));
  } catch (err) {
    next(err);
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await getUserOrders(req.user.id);
    res.status(200).json(new ApiResponse(200, orders));
  } catch (err) {
    next(err);
  }
};

export const adminOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const orders = await getAllOrders(page, limit);
    res.status(200).json(new ApiResponse(200, orders));
  } catch (err) {
    next(err);
  }
};


export const updateStatus = async (req, res, next) => {
  try {
    const order = await updateOrderStatus(
      req.params.orderId,
      req.body.status
    );
    res.status(200).json(new ApiResponse(200, order));
  } catch (err) {
    next(err);
  }
};
