import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single project
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        projectTeamMembers: {
          include: {
            teamMember: true,
          },
        },
      },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch project" }, { status: 500 });
  }
}

// PUT update project
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { teamMemberIds, ...data } = await request.json();

    // First, delete existing team member relationships
    await prisma.projectTeamMember.deleteMany({
      where: { projectId: params.id },
    });

    // Then update the project with new relationships
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...data,
        projectTeamMembers: {
          create: teamMemberIds.map((teamMemberId: string) => ({
            teamMember: {
              connect: { id: teamMemberId },
            },
          })),
        },
      },
      include: {
        projectTeamMembers: {
          include: {
            teamMember: true,
          },
        },
      },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Delete project team members first
    await prisma.projectTeamMember.deleteMany({
      where: { projectId: params.id },
    });

    // Then delete the project
    await prisma.project.delete({
      where: { id: params.id },
    });
    return NextResponse.json("Project Deleted Successfully", { status: 200 });
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}
