import {Router} from "express";
import {register,login, updateDetails, changePassword, logoutUser, getCurrentUser} from "../controller/customer.controller.js"
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(register)

router.route("/me").get(verifyJWT,getCurrentUser)

router.route("/login").post(login)

router.route("/update-details").patch(verifyJWT,updateDetails)

router.route("/change-password").patch(verifyJWT,changePassword)

router.route("/logout").post(verifyJWT,logoutUser)

export default router