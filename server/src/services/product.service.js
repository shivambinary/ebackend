import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import { paginate } from "../utils/paginate.js";



export const createProduct = async (data) => {
    const product = await Product.create(data);
    return product;
};

export const updateProduct = async (productId, data) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "product not found ");
    }

    Object.assign(product, data);
    await product.save();
    return product;
};


export const deleteProduct = async (productId, data) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    product.isActive = false;
    await product.save();
    return product;
};


export const getActiveProducts = async (page, limit) => {
  return paginate(Product, { isActive: true }, page, limit);
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new ApiError(404, "product not found");
  }

  return product;
};
