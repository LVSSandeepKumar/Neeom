import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { projectNo: "asc" },
      include: {
        projectTeamMembers: {
          include: {
            teamMember: true,
          },
        },
      },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const projectData = await request.json();

    const { projectNo, teamMemberIds, completionDate, ...rest } = projectData;

    // Auto-generate projectNo if not provided
    let finalProjectNo = projectNo;
    if (!finalProjectNo) {
      const lastProject = await prisma.project.findFirst({
        orderBy: { projectNo: "desc" },
      });
      finalProjectNo = lastProject ? lastProject.projectNo + 1 : 1;
    }

    // Create project in DB
    const project = await prisma.project.create({
      data: {
        projectNo: finalProjectNo,
        ...rest,
        completionDate: new Date(completionDate),

        projectTeamMembers: {
          create: (teamMemberIds ?? []).map((teamMemberId: string) => ({
            teamMember: {
              connect: { id: teamMemberId },
            },
          })),
        },
      },
      include: {
        projectTeamMembers: {
          include: { teamMember: true },
        },
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error : any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
