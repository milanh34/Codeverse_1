import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

export const multerUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadFilesToCloudinary = async (files = [], options = {}) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: "auto",
        public_id: uuid(),
        folder: "receipts",
        ...options,
      };

      const base64Data = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      cloudinary.uploader.upload(base64Data, uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    return results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw new Error("Error uploading files to cloudinary");
  }
};
