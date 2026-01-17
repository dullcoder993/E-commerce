import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { addItems, addQuantity, deleteItems, getItems, removeItems } from "../controller/cart_items.controller.js";

const router = Router()
router.use(verifyJWT)

router.route("/c/add/:id").post(addItems)
router.route("/c/remove/:id").delete(removeItems)
router.route("/c/delete/:id").delete(deleteItems)
router.route("/c/update/:id").patch(addQuantity)
router.route("/getItems").get(getItems)

export default router