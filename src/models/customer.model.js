import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})

export const Customer = mongoose.model("customer",customerSchema)