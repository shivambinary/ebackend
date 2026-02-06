import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import auth from "./middlewares/auth.middleware.js";
import { stripeWebhook } from "./controlers/webhook.controlle.js";


const app =  express();


app.use(cors());
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);



app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok "});
});


app.use(errorHandler);


export default app;
