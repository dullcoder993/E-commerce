import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    video: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockQty: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    retailerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "retailer",
        required: true
    }
},{timestamps: true})

export const Product = mongoose.model("Product",productSchema)