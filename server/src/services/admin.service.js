import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const getDashboardStats = async () => {
  const [
    users,
    totalOrders,
    paidOrders,
    pendingOrders,
    cancelledOrders,
    refundedOrders,
    products,
    revenueResult,
  ] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Order.countDocuments({ paymentStatus: "paid" }),
    Order.countDocuments({ paymentStatus: "pending" }),
    Order.countDocuments({ orderStatus: "cancelled" }),
    Order.countDocuments({ paymentStatus: "refunded" }),
    Product.countDocuments(),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  return {
    users,
    totalOrders,
    paidOrders,
    pendingOrders,
    cancelledOrders,
    refundedOrders,
    products,
    revenue: revenueResult[0]?.total || 0,
  };
};
