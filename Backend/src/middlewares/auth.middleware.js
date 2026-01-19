import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {Customer} from "../models/customer.model.js"

dotenv.config()


export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            // When User not login.
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const customer = await Customer.findById(decodeToken?.id)
        if(!customer){
            throw new ApiError(401,"Invalid Access Token.Login plz")
        }
        req.customer = customer;
        next()
    } catch (error) {
        throw new ApiError(400,error?.message || "Invalid access token")
    }
})

export default verifyJWT;