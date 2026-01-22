import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/product.model.js";
import { category } from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path"

const create = asyncHandler(async(req,res)=>{
    const {name,discription,price,stockQty,categoryId} = req.body
    if(!name||!discription||price == undefined||stockQty == undefined || !categoryId){
        throw new ApiError(400,"Required field is empty.")
    }
    
    let imageLocalPath = req.files?.image[0]?.path
    if(!imageLocalPath){
        throw new ApiError(400,"Image is required.")
    }
    let videoLocalPath = req.files?.video[0]?.path
    if(!videoLocalPath){
        throw new ApiError(400,"Video file required.")
    }
    const Category = await category.findById(categoryId)
    if(!Category){
        throw new ApiError(400,"Category does not exist.")
    }
    imageLocalPath = path.resolve(imageLocalPath)
    const fixedImagePath = imageLocalPath.replace(/\\/g,"/")
    const imageFile = await uploadOnCloudinary(fixedImagePath)
    if(!imageFile){
        throw new ApiError(400,"Image file is required")
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
        retailerId: req.customer.id,
        categoryId
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

const updateDetails = asyncHandler(async(req,res)=>{
    const {name,discription,price,stockQty} = req.body
    const productId = req.params.id
    if(!name||!discription||price === undefined||stockQty === undefined){
        throw new ApiError(400,"Required field is empty.")
    }
    if(!productId){
        throw new ApiError(400,"Product Id required.")
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Product does not exist.")
    }
    if(product.retailerId != req.customer.id){
        throw new ApiError(400,"Cannot update the details.")
    }
    if(name !== undefined){
        product.name = name
    }
    if(discription !== undefined){
        product.discription = discription
    }
    if(price !== undefined){
        product.price = price
    }
    if(stockQty !== undefined){
        product.stockQty = stockQty
    }
    await product.save()
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Products updated Successfully.")
    )
})

const addImage = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        throw new ApiError(400,"Product Id required.")
    }
    let imageLocalPath = req.files?.image[0]?.path
    console.log(imageLocalPath)
    if(!imageLocalPath){
        throw new ApiError(400,"Image is required.")
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Product does not exist.")
    }
    
    if(product.retailerId != req.customer.id){
        throw new ApiError(400,"Cannot add product image.")
    }
    imageLocalPath = path.resolve(imageLocalPath)
    const fixedImagePath = imageLocalPath.replace(/\\/g,"/")
    const imageFile = await uploadOnCloudinary(fixedImagePath)
    if(!imageFile){
        throw new ApiError(400,"Image file is required")
    }
    
    product.image.push(imageFile.url)
    await product.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Image added succesfully.")
    )

})

const removeImage = asyncHandler(async(req,res)=>{
    const imageUrl = req.body
    const productId = req.params.id
    if(!productId){
        throw new ApiError(400,"Product Id required.")
    }
    if(!imageUrl){
        throw new ApiError(400,"ImageUrl required.")
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Product does not exist.")
    }
    if(product.retailerId != req.customer.id){
        throw new ApiError(400,"Cannot remove image.")
    }

    if(!product.image.includes(imageUrl.imageUrl)){
        throw new ApiError(400,"Image does not exist.")
    }
    product.image = product.image.filter(img => img !== imageUrl.imageUrl)

    await product.save()
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Image remove Successfully.")
    )
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        throw new ApiError(400,"Product Id required.")
    }
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(400,"Product does not exist.")
    }
   
    if(product.retailerId != req.customer.id){
        throw new ApiError(400,"Cannot delete product.")
    }
    await product.deleteOne()
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Product is deleted.")
    )
    
})

const getProductByCategory = asyncHandler(async(req,res)=>{
    const categoryId = req.params.id
    if(!categoryId){
        throw new ApiError(400,"Category Id required.")
    }
    const product = await Product.find({categoryId}).populate("categoryId","name")
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Data fetched Successfully.")
    )
})

const getAllProduct = asyncHandler(async(req,res)=>{
    const product = await Product.find().populate("categoryId","name")

    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"All product fetched Successfully.")
    )
})
const getProductById = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    console.log(productId)
    if(!productId){
        throw new ApiError(400,"Product Id required.")
    }
    const product = await Product.findById(productId).populate("categoryId","name")
    if(!product){
        throw new ApiError(400,"Product Does not exist.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Product Data fetched successfully.")
    )

})

export {create,updateDetails,deleteProduct,addImage,removeImage,getAllProduct,getProductByCategory,getProductById}