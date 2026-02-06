import { createProduct, updateProduct, deleteProduct, getActiveProducts, getProductById } from "../services/product.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadImage } from "../services/image.service.js";


export const create = async (req, res, next) => {
  try {
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadImage(file.buffer);
        imageUrls.push(uploaded.secure_url);
      }
    }


    const product = await createProduct({
      ...req.body,
      images: imageUrls,
    });


    res.status(201).json(new ApiResponse(201, product));
  } catch (err) {
    
    next(err);

  }
};


export const update = async (req, res, next) => {
    try {
        const product = await updateProduct(req.body);
        res
    } catch (err) {
        next (err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const product = await deleteProduct(req.body);
        res.status(200).json(new ApiResponse(200, product));
    } catch (err) {
        next(err);
    }
};


export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getActiveProducts(page, limit);
    res.status(200).json(new ApiResponse(200, result));
  } catch (err) {
    next(err);
  }
};


export const getOne = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json(new ApiResponse(200, product));
    } catch (err) {
        next (err);
    }
};



