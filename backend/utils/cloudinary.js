import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import fs from "fs";
import env from "dotenv"

env.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            console.error("No file path provided");
            return null;
        } 
        // Upload the filr on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("File is uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const removeFromCloudinary = async (existingProduct) => {
        if (existingProduct.img) {
        const urlParts = existingProduct.img.split('/upload/');
        if (urlParts.length < 2) return null;
        const publicIdWithExtension = urlParts[1].replace(/^v\d+\//, '');
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        } catch (err) {
          console.error('Error deleting old image from Cloudinary', err);
        }
      }
}

export { uploadOnCloudinary, removeFromCloudinary }