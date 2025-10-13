import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "No account found with this username" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await prisma.admin.update({
      where: { username },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const WEB_URL = `http://localhost:3000`
    // Create reset URL
    const resetUrl = `${WEB_URL}/admin/reset-password/${resetToken}`;

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL, // Since we're using username, send to admin email
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({
      message: "Password reset instructions sent to admin email",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
