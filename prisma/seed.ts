import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.match.deleteMany()
  await prisma.player.deleteMany()
  await prisma.team.deleteMany()

  const teamsData = [
    { name: 'Stars of Mmabatho', groupName: 'Group A' },
    { name: 'Makola FC', groupName: 'Group A' },
    { name: 'Votex FC', groupName: 'Group B' },
    { name: 'Maila United', groupName: 'Group B' },
    { name: 'Kwena Academy', groupName: 'Group C' },
    { name: 'Mochadi FC', groupName: 'Group C' },
    { name: 'De Stars FC', groupName: 'Group D' },
    { name: 'Mantwaleng Shakers', groupName: 'Group D' },
    { name: 'Matsebeng Real Hearts', groupName: 'Group E' },
    { name: 'PSG FC', groupName: 'Group E' },
    { name: 'Malegale Circuit', groupName: 'Group F' },
    { name: 'Gosebo FC', groupName: 'Group F' },
    { name: 'The Joint FC', groupName: 'Group G' },
    { name: 'Limpopo Express', groupName: 'Group G' },
    { name: 'Manganeng Barcelona', groupName: 'Group H' },
    { name: 'Ngwabe City Motors', groupName: 'Group H' },
    { name: 'Real Eagles', groupName: 'Group I' },
    { name: 'Team Galatasaray', groupName: 'Group I' },
    { name: 'Platinum City', groupName: 'Group J' },
    { name: 'Shaka United FC', groupName: 'Group J' },
    { name: 'Mmotong SA', groupName: 'Group K' },
    { name: 'Marizeburg FC', groupName: 'Group K' },
    { name: 'Dikakapa FC', groupName: 'Group L' },
    { name: 'Leopard FC', groupName: 'Group L' },
    { name: 'Manyasa FC', groupName: 'Group M' },
    { name: 'Future FC', groupName: 'Group M' },
    { name: 'Moopong FC', groupName: 'Group N' },
    { name: 'Super Strikes FC', groupName: 'Group N' },
    { name: 'Mmakgari Stars', groupName: 'Group O' },
    { name: 'Mabule All Blacks', groupName: 'Group O' },
    { name: 'Manganeng Brazil', groupName: 'Group P' },
    { name: 'Stars of Fetakgomo', groupName: 'Group P' },
  ]

  for (const t of teamsData) {
    await prisma.team.create({
      data: {
        name: t.name,
        groupName: t.groupName,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      },
    })
  }

  console.log('Seeded all 32 official tournament teams successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
