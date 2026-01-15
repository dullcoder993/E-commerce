import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cart } from "../models/cart.model.js";

const add = asyncHandler(async(req,res)=>{
    const {name} = req.body
    const customerId = req.customer.id
    if(!name){
        throw new ApiError(400,"Name is required.")
    }
    const Cart = await cart.create({
        name,
        customerId
    })
    if(!Cart){
        throw new ApiError(400,"Something went wrong.")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,Cart,"Cart is created Successfully.")
    )
})

const deleteCart = asyncHandler(async(req,res)=>{
    const cartId = req.params.id
    if(!cartId){
        throw new ApiError(400,"Cart Id required.")
    }
    const Cart = await cart.findById(cartId)
    if(!Cart){
        throw new ApiError(400,"Cart does not exist.")
    }
    if(req.customer.id != Cart.customerId){
        throw new ApiError(400,"Cannot delete Cart")
    }
    await Cart.deleteOne()
    return res
    .status(200)
    .json(
        new ApiResponse(200,Cart,"Cart deleted Successfully.")
    )
})

const updateCart = asyncHandler(async(req,res)=>{
    const {name} = req.body
    const CartId = req.params.id
    if(!name || !CartId){
        throw new ApiError(400,"Required field is Empty.")
    }
    const Cart = await cart.findById(CartId)
    if(!Cart){
        throw new ApiResponse(400,"Cart does not exist.")
    }
    Cart.name = name;
    Cart.save()
    return res
    .status(200)
    .json(
        new ApiResponse(200,Cart,"Cart updated Successfully.")
    )
})

const getAllCart = asyncHandler(async(req,res)=>{
    const CustomerId = req.customer.id
    const Cart = await cart.find({CustomerId})
    if(!Cart){
        throw new ApiError(400,"User Don't have Carts")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,"Data fetched Successfully.")
    )
})
export {add,deleteCart,updateCart,getAllCart}