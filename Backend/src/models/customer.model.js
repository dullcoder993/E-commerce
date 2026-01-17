import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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
        required: true,
        select: false // Does not show until expicitly ask.
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer","retailer","admin"],
        default: "customer"
    },
    mobile: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        select: false // Does not show until expicitly ask.
    }
},{timestamps: true})

customerSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10)
    ;
})
customerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}
customerSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id: this.id,
        email: this.email,
        mobile: this.mobile,
        role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

customerSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const Customer = mongoose.model("customer",customerSchema)