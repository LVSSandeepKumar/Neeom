import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: params.id },
      //   include: { projects: true }
    });
    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data: body,
      //   include: { projects: true }
    });
    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.teamMember.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      {
        message: "Team member deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete team member" }, { status: 500 });
  }
}
