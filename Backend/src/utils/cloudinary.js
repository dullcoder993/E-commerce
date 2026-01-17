import {v2} from "cloudinary";
import fs from 'fs'//file system
import dotenv from 'dotenv'

dotenv.config()

const cloud_keys = v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret :process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) {
            return null
        }
        const response = await v2.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log('File is uploaded on cloudinary', response.url);
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(cloud_keys)
        return null;
    }
}

export {uploadOnCloudinary}