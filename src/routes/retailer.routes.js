import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { becomeRetailer, getRetailer, getRetailerById } from "../controller/retailer.controller.js";
import { requireRole } from "../middlewares/role.middleware.js";


const router = Router()
router.use(verifyJWT)

router.route("/create").post(becomeRetailer)
router.route("/get").get(requireRole,getRetailer)
router.route("/c/getById/:id").get(requireRole,getRetailerById)

export default router