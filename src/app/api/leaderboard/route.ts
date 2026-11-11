import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const topScorers = await prisma.player.findMany({
      take: 5,
      orderBy: { goals: 'desc' },
      include: { team: true },
    })

    const topAssists = await prisma.player.findMany({
      take: 5,
      orderBy: { assists: 'desc' },
      include: { team: true },
    })

    return NextResponse.json({ topScorers, topAssists })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
