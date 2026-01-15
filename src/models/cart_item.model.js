import mongoose from "mongoose";

const cart_itemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: String,
        required: true
    }
},{timestamps: true})

export const cart_item = mongoose.model("cart_item",cart_itemSchema)