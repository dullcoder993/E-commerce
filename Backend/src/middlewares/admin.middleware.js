import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Customer } from "../models/customer.model.js";

export const adminRole = asyncHandler(async(req,res,next)=>{
    try{
        if(req.customer.role !== "admin"){
            throw new ApiError(400,"Unauthorized Entry.")
        }
        next()
    }
    catch(error){
        throw new ApiError(400,error?.message || "Invalid access .")
    }
})