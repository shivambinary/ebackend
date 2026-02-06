import stripe from "../config/stripe.js";
import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";

export const createCheckoutSession = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(404, "Order not found");

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Order already paid");
  }

  const session = await stripe.checkout.sessions.create(
    {
        payment_method_types: ["card"],
        mode: "payment",
        line_items: order.items.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: "Product",},
            unit_amount: item.price * 100,
            },
        quantity: item.quantity,
    })),
    metadata: {
      orderId: order._id.toString(),
    },
    success_url: `${process.env.FRONTEND_URL}/order-success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  }
);
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY?.slice(0, 6));


  return session.url;
};


export const createRefund = async (paymentIntentId) => {
  return await stripe.refunds.create({
    payment_intent:paymentIntentId,
  });
};
