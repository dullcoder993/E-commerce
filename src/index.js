import dotenv from "dotenv"
import mongoose from "mongoose"
import { db_name } from "./constant.js"
import app from "./app.js"

dotenv.config()


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${db_name}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log(db_name)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log('ERRR : ',error);
        throw error
    })
    
    
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed ",err);
})