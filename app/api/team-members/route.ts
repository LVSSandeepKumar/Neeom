import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      include: {
        projectTeamMembers: {
          include: {
            project: true
          }
        }
      }
    })
    return NextResponse.json(members)
  } catch (error : any ) {
    return NextResponse.json({ error: error.message || 'Failed to fetch team members' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { projectIds, ...memberData } = body

    const member = await prisma.teamMember.create({
      data: {
        ...memberData,
        projectTeamMembers: {
          create: projectIds?.map((projectId: string) => ({
            project: {
              connect: { id: projectId }
            }
          })) || []
        }
      },
      include: {
        projectTeamMembers: {
          include: {
            project: true
          }
        }
      }
    })
    return NextResponse.json(member, { status: 201 })
  } catch (error : any) {
    return NextResponse.json({ error: error.message || 'Failed to create team member' }, { status: 500 })
  }
}
