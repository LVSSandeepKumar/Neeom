import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// Init S3 client
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// POST API that takes file from frontend and uploads to S3
export async function POST(req: Request) {
  try {
    // get raw file from formData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload params
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `${Date.now()}-${file.name}`, // unique name
      Body: buffer,
      ContentType: file.type,
    };

    // Upload to S3
    const result = await s3.upload(uploadParams).promise();

    // Return the S3 file URL
    return NextResponse.json({ fileUrl: result.Location });
  } catch (err) {
    console.error("S3 upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
