import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.staticInfo.findMany();
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const staticInfo = await request.json();

    if (staticInfo.length === 0) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const createdList = [];

    for (const info of staticInfo) {
      if (!info.key || !info.value) {
        return NextResponse.json({ error: "Each entry must have 'key' and 'value'" }, { status: 400 });
      }
      info.key = info.key.trim();
      info.value = info.value.trim();
      if (info.key === "" || info.value === "") {
        return NextResponse.json({ error: "'key' and 'value' cannot be empty" }, { status: 400 });
      }

      const updatedInfo = await prisma.staticInfo.upsert({
        where: { key: info.key },
        update: { value: info.value },
        create: { key: info.key, value: info.value },
      });
      createdList.push(updatedInfo);
    }

    return NextResponse.json(createdList, { status: 201 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
