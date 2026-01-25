import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { addImage, create, deleteProduct, getAllProduct, getProductByCategory, getProductById, removeImage, updateDetails } from "../controller/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { adminRole } from "../middlewares/admin.middleware.js";

const router = Router()


router.route("/create").post(
     upload.fields([
        { name: "image", maxCount: 3 }
    ]),verifyJWT,adminRole,
    create)
router.route("/c/removeImage/:id").delete(verifyJWT,adminRole,removeImage)
router.route("/c/addImage/:id").post(
    upload.fields([
        {name: "image",maxCount: 3}
    ]),verifyJWT,
    addImage)
router.route("/c/update/:id").patch(verifyJWT,updateDetails)
router.route("/c/delete/:id").delete(verifyJWT,adminRole,deleteProduct)
router.route("/getAllProduct").get(verifyJWT,getAllProduct)
router.route("/c/getProducByCategory/:id").get(verifyJWT,getProductByCategory)
router.route("/c/getProduct/:id").get(verifyJWT,getProductById)
export default router