import { fetchStatsAPI } from "./adminAPI";
import { fetchAllProductsAPI, deleteProductAPI } from "./adminAPI";
import {
  fetchAllOrdersAPI,
  updateOrderStatusAPI,
} from "./adminAPI";


export const getStats = async () => {
  const res = await fetchStatsAPI();
  return res.data;
};
export const getAllProducts = async () => {
  const res = await fetchAllProductsAPI();
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await deleteProductAPI(id);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await fetchAllOrdersAPI();
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await updateOrderStatusAPI(id, status);
  return res.data;
};