import mongoose from "mongoose";

const productSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, min: 0, required: true },
        images: [String],
        category: {type: String, index: true, required: true },
        totalstock: {type: Number, min: 0, required: true },
        soldstock: {type: Number, default: 0, min: 0},
        isActive: {type: Boolean, default: true},

    },
    {
        timestamps: true,
        toJSON: {virutals: true},
        toObject: {virtuals: true},
    }
);

productSchema.virtual("remainingstock").get(function(){
    return this.totalstock - this.soldstock;
});

const Product = mongoose.model("Product", productSchema);
export default Product;