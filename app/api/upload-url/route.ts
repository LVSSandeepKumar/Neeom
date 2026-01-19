import { NextResponse } from "next/server";
import AWS from "aws-sdk";
const expireSeconds = process.env.EXPIRE_SECONDS || 60 * 5; // 5 minutes
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
    const { fileName, contentType } = await req.json();

    if (!fileName) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Upload params
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `${Date.now()}-${fileName}`, // unique name
      
      ContentType: contentType,
      Expires: expireSeconds,
    };

    // Upload to S3
    const signedUrl = await s3.getSignedUrlPromise("putObject", uploadParams);

    // Return the S3 file URL
    return NextResponse.json({ signedUrl });
  } catch (err) {
    console.error("S3 upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
