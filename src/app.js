import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app  = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

import customerRouter from "./routes/customer.routes.js"
import retailerRouter from "./routes/retailer.routes.js"

app.use('/api/v1/customer',customerRouter)
app.use('/api/v1/retailer',retailerRouter)


export { app }