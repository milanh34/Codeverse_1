import { S3 } from "@aws-sdk/client-s3";

export const s3Upload = async (file) => {
  const s3 = new S3({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  if (!file) {
    throw new Error("No file provided");
  }

  // Generate unique file key
  const fileKey = `uploads/${Date.now()}-${file.originalname.replace(
    / /g,
    "-"
  )}`;

  // Set up upload parameters
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.putObject(params);

  const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileKey}`;

  return {
    fileKey,
    fileName: file.originalname,
    url: publicUrl,
  };
};
