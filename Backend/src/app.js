import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app  = express()

app.use(cors({
  origin: "http://localhost:5173", // EXACT frontend origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

import customerRouter from "./routes/customer.routes.js"
import retailerRouter from "./routes/retailer.routes.js"
import productRouter from "./routes/product.routes.js"
import categoryRouter from "./routes/category.routes.js"
import cartRouter from "./routes/cart.routes.js"
import cartItemRouter from "./routes/cart_items.routes.js"
import errorHandler from './middlewares/error.middleware.js'

app.use(express.json());

app.use('/api/v1/customer',customerRouter)
app.use('/api/v1/retailer',retailerRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/CartItems',cartItemRouter)
app.use(errorHandler)
export { app }