import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Customer } from "../models/customer.model.js";
import dotenv from 'dotenv'

dotenv.config()

const generateToken = async (customerId) => {
  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const accessToken = customer.generateAccessToken();
    const refreshToken = customer.generateRefreshToken();

    customer.refreshToken = refreshToken;

    await customer.save({ validateBeforeSave: false });
    
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("generateToken error:", error);
    throw error;
  }
};


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
*/
const register = asyncHandler(async(req,res)=>{
  const { name, email, password, mobile, address, username} = req.body
  if(!name || !email || !password || !mobile || !address || !username){
    throw new ApiError(400,"Required field is empty.")
  }
  const existingUser = await Customer.findOne({
    $or:[{username},{email},{mobile}]
  })
  if(existingUser){
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
  const customer = await Customer.findById(create_customer.id)
  
  if(!customer){
    throw new ApiError(400,"Something went wrong while creating account.")
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200,customer,"Account register successfully.")
  )
})

const login = asyncHandler(async(req,res)=>{
  const { email, mobile, password} = req.body
  if(!email || !mobile && !password){
    throw new ApiError(400,"Required field is empty.")
  }
  const customer = await Customer.findOne({
    $or:[{email},{mobile}]
  }).select("+password")
  if(!customer){
    throw new ApiError(400,"User does not exist.")
  }
  const passwordValid = await customer.isPasswordCorrect(password)

  if(!passwordValid){
    throw new ApiError(400,"Password is wrong.")
  }
  const {accessToken,refreshToken} = await generateToken(customer.id) 
  const options = {
    httpOnly: true,
    secure: true
  }
  return res
  .status(200)
  .cookie("refreshToken",refreshToken,options)
  .cookie("accessToken",accessToken,options)
  .json(
    new ApiResponse(200,{ Customer:customer,refreshToken,accessToken},"Log in successfully.")
  )
  
})

const updateDetails = asyncHandler(async(req,res)=>{
  const {email,username,mobile,address,name} = req.body
  if(!email && !username && !mobile && !address && !name){
    throw new ApiError(400,"Required feild is empty.")
  }
  const customer = await Customer.findByIdAndUpdate(
        req.customer?.id,
        {
            $set:{
                email,
                username,
                mobile,
                address,
                name
            }
        },
        {new: true}
    )
  if(!customer){
    throw new ApiError(400,"Customer Account does not exist.")
  }
  return res
  .status(200)
  .json(
    new ApiResponse(200,customer,"Data updated successfully.")
  )
})

const updatePassword = asyncHandler(async(req,res)=>{
  const {password,confirmPassword} = req.body
  if(!password || !confirmPassword){
    throw new ApiError(400,"Password is required.")
  }
  
  const customer = await Customer.findById(req.customer?.id)
  if(!customer){
    throw new ApiError(400,"Customer does not exist.")
  }
})  

const getCurrentUser = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(200,req.customer,"Customer deatils is fetched.")
})

export  {register,login,updateDetails,updatePassword,getCurrentUser}