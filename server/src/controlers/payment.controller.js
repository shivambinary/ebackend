import { createCheckoutSession } from "../services/payment.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createPayment = async (req, res, next) => {
  try {
    const url = await createCheckoutSession(req.params.orderId);
    res.status(200).json(new ApiResponse(200, { url }));
  } catch (err) {
    next(err);
  }
};
