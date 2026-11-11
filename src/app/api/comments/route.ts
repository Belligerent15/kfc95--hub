import { NextResponse } from 'next/server'

// Temporary in-memory storage for fan shoutouts
let fanShoutouts = [
  {
    id: '1',
    author: 'Coach Seloga',
    team: 'Stars of Mmabatho',
    message: 'Stars of Mmabatho are ready for opening match against Makola FC! Bring the energy!',
    timestamp: 'Just now',
    isAnnouncement: true,
  },
  {
    id: '2',
    author: 'Kagiso M.',
    team: 'Manganeng Brazil',
    message: 'Group P is going to be intense. Brazil all the way to the finals! 🏆',
    timestamp: '10m ago',
    isAnnouncement: false,
  },
  {
    id: '3',
    author: 'Tournament Committee',
    team: 'KFC95 Hub',
    message: 'Gates open at 09:00 AM on Dec 19. Ensure you have your digital VIP spectator passes ready!',
    timestamp: '1h ago',
    isAnnouncement: true,
  },
]

export async function GET() {
  return NextResponse.json(fanShoutouts)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { author, team, message } = body

    if (!author || !message) {
      return NextResponse.json({ error: 'Author and message are required' }, { status: 400 })
    }

    const newShoutout = {
      id: String(Date.now()),
      author: author.trim(),
      team: team ? team.trim() : 'Fan',
      message: message.trim(),
      timestamp: 'Just now',
      isAnnouncement: false,
    }

    fanShoutouts = [newShoutout, ...fanShoutouts]

    return NextResponse.json(newShoutout, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post shoutout' }, { status: 500 })
  }
}
