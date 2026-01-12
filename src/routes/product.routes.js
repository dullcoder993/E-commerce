import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { create } from "../controller/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()
router.use(verifyJWT,requireRole)

router.route("/create").post(
     upload.fields([
        { name: "video", maxCount: 1 },
        { name: "image", maxCount: 1 }
    ]),
    create)

export default router