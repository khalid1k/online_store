import multer from "multer";
import cloudinary from "cloudinary";
// const storage = multer.memoryStorage();

// const upload = multer({ storage });
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).fields([
  { name: "images", maxCount: 5 }, 
  { name: "profilePhoto", maxCount: 1 }, 
]);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer, fileName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { public_id: fileName, resource_type: "auto" }, // Automatically detect the file type
        (error, result) => {
          if (error) {
            reject(new Error("Cloudinary upload failed: " + error.message));
          } else {
            resolve(result); // Resolve with the result if the upload is successful
          }
        }
      );

      // Pipe the buffer to the upload stream
      stream.end(fileBuffer); // End the stream and send the buffer
    });

    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return error;
  }
};

