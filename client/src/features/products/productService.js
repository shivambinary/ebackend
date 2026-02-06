import { fetchProductsAPI } from "./productAPI";
import { fetchSingleProductAPI } from "./productAPI";

export const getProducts = async () => {
  const res = await fetchProductsAPI();
  return res.data;
};



export const getProductById = async (id) => {
  const res = await fetchSingleProductAPI(id);
  return res.data;
}