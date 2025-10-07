import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { endOfMonth, startOfMonth } from "date-fns";

// export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();
    const lastMonthStart = startOfMonth(now);
    const lastMonthEnd = endOfMonth(now);

    // Portfolio Projects Analytics
    const [totalProjects, projectsLastMonth, projectsByCategory] = await Promise.all([
      prisma.project.findMany(),
      prisma.project.count({
        where: {
          createdAt: {
            gte: lastMonthStart,
            lte: lastMonthEnd,
          },
        },
      }),
      prisma.project.groupBy({
        by: ["category"],
        _count: {
          id: true,
        },
      }),
    ]);

    // Hero Slides Analytics
    const [totalSlides, activeSlides, slidesLastMonth] = await Promise.all([
      prisma.heroSlide.findMany(),
      prisma.heroSlide.count({
        where: {
          isActive: true,
        },
      }),
      prisma.heroSlide.count({
        where: {
          createdAt: {
            gte: lastMonthStart,
            lte: lastMonthEnd,
          },
        },
      }),
    ]);

    // Team Members Analytics
    const [totalTeamMembers, teamMembersLastMonth, teamMembersWithProjects] = await Promise.all([
      prisma.teamMember.findMany(),
      prisma.teamMember.count({
        where: {
          createdAt: {
            gte: lastMonthStart,
            lte: lastMonthEnd,
          },
        },
      }),
      prisma.teamMember.count({
        where: {
          projectTeamMembers: {
            some: {},
          },
        },
      }),
    ]);

    // Calculate growth percentages
    const projectGrowth =
      totalProjects.length > 0 && projectsLastMonth > 0
        ? (((totalProjects.length - projectsLastMonth) / projectsLastMonth) * 100).toFixed(2)
        : "0.00";
    const slideGrowth =
      totalSlides.length > 0 && slidesLastMonth > 0
        ? (((totalSlides.length - slidesLastMonth) / slidesLastMonth) * 100).toFixed(2)
        : "0.00";
    const teamMemberGrowth =
      totalTeamMembers.length > 0 && teamMembersLastMonth > 0
        ? (((totalTeamMembers.length - teamMembersLastMonth) / teamMembersLastMonth) * 100).toFixed(2)
        : "0.00";

    return NextResponse.json(
      {
        portfolioProjects: {
          totalCount: totalProjects.length,
          lastMonthCount: projectsLastMonth,
          growthPercentage: projectGrowth,
          byCategory: projectsByCategory.map((category) => ({
            category: category.category,
            count: category._count.id,
          })),
        },
        heroSlides: {
          totalCount: totalSlides.length,
          activeCount: activeSlides,
          lastMonthCount: slidesLastMonth,
          growthPercentage: slideGrowth,
        },
        teamMembers: {
          totalCount: totalTeamMembers.length,
          lastMonthCount: teamMembersLastMonth,
          growthPercentage: teamMemberGrowth,
          withProjectsCount: teamMembersWithProjects,
          percentageWithProjects:
            totalTeamMembers.length > 0
              ? ((teamMembersWithProjects / totalTeamMembers.length) * 100).toFixed(2)
              : "0.00",
        },
        timestamp: now.toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, public, max-age=0, s-maxage=0, stale-while-revalidate=0",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch analytics data" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const analytics = {};
    return NextResponse.json(analytics);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch analytics data" }, { status: 500 });
  }
}
