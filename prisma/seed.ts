import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding KFC95 Hub database with official tournament data...')

  await prisma.match.deleteMany()
  await prisma.player.deleteMany()
  await prisma.team.deleteMany()

  const teamNames = [
    { name: 'Stars of Mmabatho', group: 'Group A' },
    { name: 'Makola FC', group: 'Group A' },
    { name: 'Votex FC', group: 'Group B' },
    { name: 'Maila United', group: 'Group B' },
    { name: 'Kwena Academy', group: 'Group C' },
    { name: 'Mochadi FC', group: 'Group C' },
    { name: 'De Stars FC', group: 'Group D' },
    { name: 'Mantwaleng Shakers', group: 'Group D' },
    { name: 'Matsebeng Real Hearts', group: 'Group E' },
    { name: 'PSG FC', group: 'Group E' },
    { name: 'Malegale Circuit', group: 'Group F' },
    { name: 'Gosebo FC', group: 'Group F' },
    { name: 'The Joint FC', group: 'Group G' },
    { name: 'Limpopo Express', group: 'Group G' },
    { name: 'Manganeng Barcelona', group: 'Group H' },
    { name: 'Ngwabe City Motors', group: 'Group H' },
    { name: 'Real Eagles', group: 'Group I' },
    { name: 'Team Galatasaray', group: 'Group I' },
    { name: 'Platinum City', group: 'Group J' },
    { name: 'Shaka United FC', group: 'Group J' },
    { name: 'Mmotong SA', group: 'Group K' },
    { name: 'Marizeburg FC', group: 'Group K' },
    { name: 'Dikakapa FC', group: 'Group L' },
    { name: 'Leopard FC', group: 'Group L' },
    { name: 'Manyasa FC', group: 'Group M' },
    { name: 'Future FC', group: 'Group M' },
    { name: 'Moopong FC', group: 'Group N' },
    { name: 'Super Strikes FC', group: 'Group N' },
    { name: 'Mmakgari Stars', group: 'Group O' },
    { name: 'Mabule All Blacks', group: 'Group O' },
    { name: 'Manganeng Brazil', group: 'Group P' },
    { name: 'Stars of Fetakgomo', group: 'Group P' }
  ]

  const createdTeams: { [key: string]: string } = {}

  for (const t of teamNames) {
    const team = await prisma.team.create({
      data: {
        name: t.name,
        groupName: t.group,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0
      }
    })
    createdTeams[t.name] = team.id

    await prisma.player.createMany({
      data: [
        { name: `${t.name} Captain`, position: 'Midfielder', number: 10, teamId: team.id },
        { name: `${t.name} Striker`, position: 'Forward', number: 9, teamId: team.id },
        { name: `${t.name} Goalkeeper`, position: 'Goalkeeper', number: 1, teamId: team.id }
      ]
    })
  }

  const fixturePairs = [
    ['Stars of Mmabatho', 'Makola FC'],
    ['Votex FC', 'Maila United'],
    ['Kwena Academy', 'Mochadi FC'],
    ['De Stars FC', 'Mantwaleng Shakers'],
    ['Matsebeng Real Hearts', 'PSG FC'],
    ['Malegale Circuit', 'Gosebo FC'],
    ['The Joint FC', 'Limpopo Express'],
    ['Manganeng Barcelona', 'Ngwabe City Motors'],
    ['Real Eagles', 'Team Galatasaray'],
    ['Platinum City', 'Shaka United FC'],
    ['Mmotong SA', 'Marizeburg FC'],
    ['Dikakapa FC', 'Leopard FC'],
    ['Manyasa FC', 'Future FC'],
    ['Moopong FC', 'Super Strikes FC'],
    ['Mmakgari Stars', 'Mabule All Blacks'],
    ['Manganeng Brazil', 'Stars of Fetakgomo']
  ]

  for (const [home, away] of fixturePairs) {
    if (createdTeams[home] && createdTeams[away]) {
      await prisma.match.create({
        data: {
          homeTeamId: createdTeams[home],
          awayTeamId: createdTeams[away],
          homeScore: 0,
          awayScore: 0,
          status: 'UPCOMING',
          matchDate: '19-29 December 2026',
          venue: 'Manganeng Mampuru Sport Ground'
        }
      })
    }
  }

  console.log('🚀 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
