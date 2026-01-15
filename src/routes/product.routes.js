import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { addImage, create, deleteProduct, getAllProduct, getProductByCategory, removeImage, updateDetails } from "../controller/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()
router.use(verifyJWT,requireRole)

router.route("/create").post(
     upload.fields([
        { name: "video", maxCount: 1 },
        { name: "image", maxCount: 3 }
    ]),
    create)
router.route("/c/removeImage/:id").delete(removeImage)
router.route("/c/addImage/:id").post(
    upload.fields([
        {name: "image",maxCount: 3}
    ]),
    addImage)
router.route("/c/update/:id").patch(updateDetails)
router.route("/c/delete/:id").delete(deleteProduct)
router.route("/getAllProduct").get(getAllProduct)
router.route("/c/getProducByCategory/:id").get(getProductByCategory)
export default router