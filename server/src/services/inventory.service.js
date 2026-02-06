import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";

export const checkStockAvailability = async (items) => {
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product || !product.isActive) {
            throw new ApiError(404, "product not found");
        }

        const remaningStock = product.totalstock - product.soldstock;

        if (remaningStock < item.quantity) {
            throw new ApiError(404, `Insufficient stock for product : ${product.name}`);
        }
    }
};

export const reduceStock = async (items, session = null) => {
  for (const item of items) {
    const updateQuery = {
      $inc: { soldstock: item.quantity },
    };

    const options = session ? { session, new: true } : { new: true };

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: item.product,
        $expr: {
          $gte: [
            { $subtract: ["$totalstock", "$soldstock"] },
            item.quantity,
          ],
        },
      },
      updateQuery,
      options
    );

    if (!updatedProduct) {
      throw new ApiError(409, "Stock Update Failed due to concurrent order");
    }
  }
};



export const restoreStock = async (items, session = null) => {
  for (const item of items) {
    const updateQuery = {
      $inc: { soldstock: -item.quantity },
    };

    const options = session ? { session } : {};

    await Product.findByIdAndUpdate(item.product, updateQuery, options);
  }
};
