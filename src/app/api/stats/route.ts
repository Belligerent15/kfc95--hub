import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: [
        { points: 'desc' },
        { goalsFor: 'desc' }
      ],
      include: {
        players: true
      }
    })
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tournament statistics' }, { status: 500 })
  }
}
