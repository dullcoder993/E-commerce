import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Customer } from "../models/customer.model.js";

/*1. Create register for customer
    a.Taking email, name, username, password, mobile, address.
    b.Checking username or email already exist
    c.if yes: throw error;
      if no: create new customer
    d.return res as customer is created.
  2. Create login for customer
     a.Taking username or email and password 
     b.check if user exist or not
     c.if user exist: check password 
     d.if user not exist: throw error
     e.return res
  3. Update details
     a.Checking user ie login or not.
     b.If yes can able to change details
     c.If not throw error
     d.Taking deatils from customer.
     e.return res
*/
const register = asyncHandler(async(req,res)=>{
  const {name, email, password, mobile, address, username} = req.body
  if(name || email || password || mobile || address || username){
    throw new ApiError(400,"Required field is empty.")
  }
  const existingUser = await Customer.findOne({
    $or:[{username},{email},{mobile}]
  })
  if(!existingUser){
    throw new ApiError(400,"User already exist.")
  }
  const create_customer = await Customer.create({
    name,
    email,
    password,
    mobile,
    address,
    username
  })
  const customer = await Customer.findById(create_customer.id).select(
    '-password -refreshToken'
  )
  if(!customer){
    throw new ApiError(400,"Something went wrong while creating account.")
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200,customer,"Account register successfully.")
  )
})
