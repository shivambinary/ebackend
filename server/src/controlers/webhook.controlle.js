import stripe from "../config/stripe.js";
import { confirmOrderPayment } from "../services/order.service.js";

export const stripeWebhook = async (req, res) => {
    console.log("🔔 Stripe webhook hit");
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await confirmOrderPayment(orderId, session.payment_intent);
  }

  res.json({ received: true });
};
