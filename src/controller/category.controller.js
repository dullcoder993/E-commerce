import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { category } from "../models/category.model.js";

const addCategory = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name){
        throw new ApiError(400,"Name is required.")
    }
    const Category = await category.create({
        name
    })
    if(!Category){
        throw new ApiError(400,"Somthing went Wrong.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,Category,"Category is created")
    )
})

const removeCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.id
    if(!categoryId){
        throw new ApiError(400,"CategoryId is required.")
    }
    const Category = await category.findByIdAndDelete(categoryId)
    if(!Category){
        throw new ApiError(400,"Category does not exist.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,Category,"Category deleted Successfully.")
    )
})

const updateCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.id
    const {name} = req.body
    if(!categoryId || !name){
        throw new ApiError(400,"Required field is empty.")
    }
    const Category = await category.findByIdAndUpdate(
        categoryId,
        {
            $set:{
                name
            }
        },
        {new: true}
    )
    if(!Category){
        throw new ApiError(400,"Category does not exist.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,Category,"Category updated.")
    )
})

const getAllCategory = asyncHandler(async(req,res)=>{
    const Category = await category.find()
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,Category,"All category fetched successfully.")
    )
})

export {addCategory,removeCategory,updateCategory,getAllCategory}