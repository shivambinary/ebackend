import api from "../../app/api";

export const fetchProductsAPI = () => {
  return api.get("/products");
};
export const fetchSingleProductAPI = (id) => {
  return api.get(`/products/${id}`);
}
