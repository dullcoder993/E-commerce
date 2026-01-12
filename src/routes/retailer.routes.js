import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { becomeRetailer, getRetailer } from "../controller/retailer.controller.js";
import { requireRole } from "../middlewares/role.middleware.js";


const router = Router()
router.use(verifyJWT)

router.route("/create").post(becomeRetailer)
router.route("/get").get(requireRole,getRetailer)

export default router