import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { cart_item } from "../models/cart_item.model.js";
import {cart} from "../models/cart.model.js"

const addItems = asyncHandler(async(req,res)=>{
    const CartId = req.params.id
    const { productId, quantity = 1 } = req.body
    const Cart = await cart.findById(CartId)
    if (!Cart) {
        throw new ApiError(404, "Cart not found.")
    }
    
    let cartItem = await cart_item.findOne({
        cart: Cart.id,
    }).populate("product", "name price image")

    if(cartItem){
        cartItem.quantity += 1
        await cartItem.save()
    }else{
        cartItem = await cart_item.create({
            cart: Cart.id,
            product: productId,
            quantity
        });
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,cartItem,"Cart item added.")
    )
})

const deleteItems = asyncHandler(async(req,res)=>{
    const cartItemId = req.params.id
    if(!cartItemId){
        throw new ApiError(400,"Cart Item Id required.")
    }
    const cartItem = await cart_item.findById(cartItemId)
    if(!cartItem){
        throw new ApiError(400,"Cart Item does not exist.")
    }
    const Cart = await cart.findById(cartItem.cart)
    if(Cart.customerId != req.customer.id){
        throw new ApiError(400,"Cannot remove Item")
    }
    await cartItem.deleteOne()
    return res
    .status(200)
    .json(
        new ApiResponse(200,cartItem,"cartItem deleted.")
    )
})

const removeItems = asyncHandler(async(req,res)=>{
    const cartId = req.params.id
    if(!cartId){
        throw new ApiError(400,"Cart Id required.")
    }
    const Cart = await cart.findById(cartId)
    let cartItem = await cart_item.findOne({
        cart: Cart.id,
    }).populate("product", "name price image")
    if(!cartItem){
        throw new ApiError(400,"Cart Item does not exist.")
    }
    if(cartItem.quantity>1){
        cartItem.quantity -= 1
        cartItem.save()
        return res
        .status(200)
        .json(
            new ApiResponse(200,cartItem,"Cart quantity remove.")
        )
    }
    await cartItem.deleteOne()
    return res
    .status(200)
    .json(
        new ApiResponse(200,cartItem,"Cart item remove completely.")
    )
})

const addQuantity = asyncHandler(async(req,res)=>{
    const cartItemId = req.params.id
    if(!cartItemId){
        throw new ApiError(400,"Cart Item Id required.")
    }
    const cartItem = await cart_item.findById(cartItemId)
    if(!cartItem){
        throw new ApiError(400,"Cart Item does not exist.")
    }
    const Cart = await cart.findById(cartItem.cart)
    if(Cart.customerId != req.customer.id){
        throw new ApiError(400,"Cannot add items.")
    }
    if(cartItem.quantity){
        cartItem.quantity += 1
        cartItem.save()
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,cartItem,"Cart quantity added.")
    )
})
const getItems = asyncHandler(async(req,res)=>{
    const cartId = req.params.id;
    console.log(cartId)

    if (!cartId) {
    throw new ApiError(400, "cartId is required");
    }
    const Cart = await cart.findById(cartId)
    if (!Cart) {
        throw new ApiError(404, "Cart not found.")
    }

    const items = await cart_item.find({ cart: cartId })
        .populate("product", "name price image")
    console.log(items)
    return res.status(200).json(
        new ApiResponse(200, items, "Cart items fetched.")
    )
})



export {addItems,removeItems,deleteItems,addQuantity,getItems}