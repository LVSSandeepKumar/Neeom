import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: {
        slideNumber: "asc",
      },
    });
    return NextResponse.json(slides);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slide = await prisma.heroSlide.create({
      data: body,
    });
    return NextResponse.json(slide, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create slide" }, { status: 500 });
  }
}
