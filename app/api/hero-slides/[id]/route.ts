import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const slide = await prisma.heroSlide.findUnique({
      where: { id: params.id },
    });
    if (!slide) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }
    return NextResponse.json(slide);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch slide" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const slide = await prisma.heroSlide.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(slide);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update slide" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.heroSlide.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      {
        message: "Slide deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete slide" }, { status: 500 });
  }
}
