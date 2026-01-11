import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { becomeRetailer } from "../controller/retailer.controller.js";


const router = Router()
router.use(verifyJWT)

router.route("/create").post(becomeRetailer)

export default router