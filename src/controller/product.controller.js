import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path"

const create = asyncHandler(async(req,res)=>{
    const {name,discription,price,stockQty,} = req.body
    if(!name||!discription||!price||!stockQty){
        throw new ApiError(400,"Required field is empty.")
    }
    let imageLocalPath = req.files?.image[0]?.path
    if(!imageLocalPath){
        throw new ApiError(400,"Image is required.")
    }
    imageLocalPath = path.resolve(imageLocalPath)
    const fixedImagePath = imageLocalPath.replace(/\\/g,"/")
    const imageFile = await uploadOnCloudinary(fixedImagePath)
    if(!imageFile){
        throw new ApiError(400,"Image file is required")
    }

    let videoLocalPath = req.files?.video[0]?.path
    if(!videoLocalPath){
        throw new ApiError(400,"Video file required.")
    }
    videoLocalPath = path.resolve(videoLocalPath)
    const fixedVideoPath = videoLocalPath.replace(/\\/g,"/")
    const videoFile = await uploadOnCloudinary(fixedVideoPath)
    if(!videoFile){
        throw new ApiError(400,"Video file required, retry.")
    }
    console.log(req.customer.id)
    const product = await Product.create({
        name,
        discription,
        price,
        stockQty,
        image: imageFile.url,
        video: videoFile.url,
        retailerId: req.customer.id
    })
    if(!product){
        throw new ApiError(400,"Something Went wrong while creating product.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Product is created")
    )
})

export {create}