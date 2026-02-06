import { createOrderAPI, createPaymentAPI } from "./orderAPI";
import { fetchMyOrdersAPI } from "./orderAPI";


export const placeOrder = async (items) => {
  const res = await createOrderAPI(items);
  return res.data;
};

export const startPayment = async (orderId) => {
  const res = await createPaymentAPI(orderId);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await fetchMyOrdersAPI();
  return res.data.data;
};