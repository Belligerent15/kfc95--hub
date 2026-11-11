import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'kfc95admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { passkey, homeTeamId, awayTeamId, homeScore, awayScore, scorerName, scorerTeamId, isAssist } = body

    if (passkey !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
    }

    // 1. If updating match results & recalculating standings
    if (homeTeamId && awayTeamId && homeScore !== undefined && awayScore !== undefined) {
      const hScore = Number(homeScore)
      const aScore = Number(awayScore)

      const homeTeam = await prisma.team.findUnique({ where: { id: homeTeamId } })
      const awayTeam = await prisma.team.findUnique({ where: { id: awayTeamId } })

      if (homeTeam && awayTeam) {
        let homePts = 0
        let awayPts = 0
        let homeWon = 0, homeDrawn = 0, homeLost = 0
        let awayWon = 0, awayDrawn = 0, awayLost = 0

        if (hScore > aScore) {
          homePts = 3
          homeWon = 1
          awayLost = 1
        } else if (hScore < aScore) {
          awayPts = 3
          awayWon = 1
          homeLost = 1
        } else {
          homePts = 1
          awayPts = 1
          homeDrawn = 1
          awayDrawn = 1
        }

        // Update Home Team
        await prisma.team.update({
          where: { id: homeTeamId },
          data: {
            played: { increment: 1 },
            won: { increment: homeWon },
            drawn: { increment: homeDrawn },
            lost: { increment: homeLost },
            goalsFor: { increment: hScore },
            goalsAgainst: { increment: aScore },
            points: { increment: homePts },
          },
        })

        // Update Away Team
        await prisma.team.update({
          where: { id: awayTeamId },
          data: {
            played: { increment: 1 },
            won: { increment: awayWon },
            drawn: { increment: awayDrawn },
            lost: { increment: awayLost },
            goalsFor: { increment: aScore },
            goalsAgainst: { increment: hScore },
            points: { increment: awayPts },
          },
        })
      }
    }

    // 2. If updating individual player goals or assists
    if (scorerName && scorerTeamId) {
      const existingPlayer = await prisma.player.findFirst({
        where: { name: scorerName, teamId: scorerTeamId },
      })

      if (existingPlayer) {
        await prisma.player.update({
          where: { id: existingPlayer.id },
          data: isAssist
            ? { assists: { increment: 1 } }
            : { goals: { increment: 1 } },
        })
      } else {
        await prisma.player.create({
          data: {
            name: scorerName,
            teamId: scorerTeamId,
            goals: isAssist ? 0 : 1,
            assists: isAssist ? 1 : 0,
          },
        })
      }
    }

    return NextResponse.json({ success: true, message: 'Tournament stats updated successfully!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 })
  }
}
