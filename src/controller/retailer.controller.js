import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import dotenv from "dotenv";
import { Customer } from "../models/customer.model.js";

dotenv.config()

const becomeRetailer = asyncHandler(async (req, res) => {
    const userId = req.customer.id;
    const user = await Customer.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (user.role === "retailer") {
        throw new ApiError(400, "User is already a retailer");
    }
    user.role = "retailer";
    await user.save();
    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Successfully switched to retailer")
    );
});

const getRetailerById = asyncHandler(async(req,res)=>{
    const {retailerId} = req.params.id
    if(!retailerId){
        throw new ApiError(400,"Retailer Id required.")
    }
    const retailer = await Customer.findById(retailerId)
    if(!retailer){
        throw new ApiError(400,"Retailer does not exist.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,retailer,"Retailer data fetched Successfully.")
    )
})

const getRetailer = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.customer,"Retailer details fetched successfully.")
    )
})

export {becomeRetailer,getRetailer,getRetailerById}
