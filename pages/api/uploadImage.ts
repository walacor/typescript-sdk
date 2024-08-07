import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { imageName, image } = req.body;

  if (!imageName || !image) {
    return res.status(400).json({ error: "Image name and image are required" });
  }

  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

  const fileType = image.split(";")[0].split(":")[1];

  if (!allowedFileTypes.includes(fileType)) {
    return res.status(400).json({ error: "Unsupported file type" });
  }

  const imageBuffer = Buffer.from(image.split(",")[1], "base64");

  try {
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 1024 })
      .toBuffer();

    const key = `${imageName}-${Date.now()}`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
      Key: key,
      Body: resizedImageBuffer,
      ContentType: fileType,
    };

    await s3.upload(params as AWS.S3.Types.PutObjectRequest).promise();

    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;

    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
}
