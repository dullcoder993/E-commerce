import mongoose from "mongoose";

const retailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lower: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
},{timestamps: true})

export const retailer = mongoose.model("retailer",retailerSchema)