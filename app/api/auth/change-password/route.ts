import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { username, oldPassword, newPassword } = await request.json();

    if (!username || !oldPassword || !newPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { username },
      data: { password: hashedPassword },
    });

    // Optionally, issue a new JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    });

    const response = NextResponse.json({ message: "Password changed successfully" });
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to change password" }, { status: 500 });
  }
}
