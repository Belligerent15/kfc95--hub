import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: [
        { points: 'desc' },
        { goalsFor: 'desc' }
      ]
    })
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch standings' }, { status: 500 })
  }
}
