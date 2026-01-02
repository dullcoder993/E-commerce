import mongoose from "mongoose";

const cart_itemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    ItemQty: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
},{timestamps: true})

export const cart_item = mongoose.model("cart_item",cart_itemSchema)