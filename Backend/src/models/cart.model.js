import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
    }
},{timestamps: true})

export const cart = mongoose.model("cart",cartSchema)