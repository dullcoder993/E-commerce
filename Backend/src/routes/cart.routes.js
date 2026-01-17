import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { add, deleteCart, getAllCart, updateCart } from "../controller/cart.controller.js";

const router = Router()
router.use(verifyJWT)

router.route("/add").post(add)
router.route("/c/remove/:id").delete(deleteCart)
router.route("/c/update/:id").patch(updateCart)
router.route("/getAllCart").get(getAllCart)

export default router