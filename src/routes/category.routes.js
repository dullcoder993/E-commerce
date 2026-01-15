import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { adminRole } from "../middlewares/admin.middleware.js";
import { addCategory, getAllCategory, removeCategory, updateCategory } from "../controller/category.controller.js";

const router = Router()
router.use(verifyJWT,adminRole)

router.route("/add").post(addCategory)
router.route("/c/update/:id").patch(updateCategory)
router.route("/c/remove/:id").delete(removeCategory)
router.route("/getAll").get(getAllCategory)

export default router