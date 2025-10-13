import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id: params.id },
    });
    if (!partner) {
      return NextResponse.json(
        { error: "Partner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(partner);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch partner" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const partner = await prisma.partner.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(partner);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update partner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.partner.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { message: "Partner deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete partner" },
      { status: 500 }
    );
  }
}
