import api from "../../app/api";

export const fetchStatsAPI = () => {
  return api.get("/admin/stats");
};

export const fetchAllProductsAPI = () => {
  return api.get("/products");
};

export const deleteProductAPI = (id) => {
  return api.delete(`/products/${id}`);
};

export const fetchAllOrdersAPI = () => {
  return api.get("/orders");
};

export const updateOrderStatusAPI = (id, status) => {
  return api.patch(`/orders/${id}/status`, { status });
};

