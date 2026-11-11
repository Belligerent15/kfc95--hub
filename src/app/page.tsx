import PrismaClient from '@prisma/client'

async function getMatches() {
  const dummyMatches = [
    { id: '1', home: 'Stars of Mmabatho', away: 'Makola FC', date: 'Dec 19, 14:00', venue: 'Ground A', status: 'UPCOMING' },
    { id: '2', home: 'Votex FC', away: 'Maila United', date: 'Dec 19, 16:00', venue: 'Ground A', status: 'UPCOMING' },
    { id: '3', home: 'Kwena Academy', away: 'Mochadi FC', date: 'Dec 20, 14:00', venue: 'Ground B', status: 'UPCOMING' },
    { id: '4', home: 'Manganeng Barcelona', away: 'Ngwabe City Motors', date: 'Dec 20, 16:00', venue: 'Ground A', status: 'UPCOMING' },
  ]
  return dummyMatches
}

export default async function Home() {
  const matches = await getMatches()

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-[#c5a059]/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="font-bold text-white tracking-wide text-lg">KFC95 HUB</h1>
              <p className="text-xs text-[#c5a059] tracking-wider uppercase font-semibold">Keeper Of The Nation</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-3 py-1 rounded-full">
            OFFICIAL TOURNAMENT
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-slate-300 text-xs font-mono mb-6">
          📍 Manganeng Mampuru Sport Ground • Dec 19–29, 2026
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
          7th Annual <span className="text-[#c5a059]">Soccer Tournament</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mb-8 leading-relaxed">
          16 elite teams battling for ultimate glory. Track live scores, official group tables, and squad stats in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#fixtures" className="bg-[#c5a059] hover:bg-[#b08943] text-black font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-[#c5a059]/10 text-sm">
            Explore Fixtures
          </a>
          <a href="#teams" className="bg-zinc-900 hover:bg-zinc-800 text-slate-200 border border-zinc-700 font-bold px-8 py-3.5 rounded-xl transition text-sm">
            View 16 Teams
          </a>
        </div>
      </section>

      {/* Fixtures Feed */}
      <section id="fixtures" className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Opening Matchups</h3>
            <p className="text-slate-400 text-sm">Official Group Stage Fixtures</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <div key={match.id} className="p-5 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-[#c5a059]/40 transition">
              <div className="flex justify-between text-xs text-slate-400 mb-3 font-mono">
                <span>{match.venue}</span>
                <span className="text-[#c5a059]">{match.date}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-white text-base">{match.home}</span>
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs text-slate-300 rounded font-mono">VS</span>
                <span className="font-bold text-white text-base">{match.away}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Summary Cards */}
      <section id="teams" className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-zinc-800">
            <div className="text-3xl mb-3">🏆</div>
            <h4 className="text-lg font-bold text-white mb-1">16 Teams</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Featuring Stars of Mmabatho, Makola FC, Votex FC, Manganeng Brazil, and more.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#121212] border border-zinc-800">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-lg font-bold text-white mb-1">Live Updates</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real-time match scores, goal alerts, and instant group table standings.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#121212] border border-zinc-800">
            <div className="text-3xl mb-3">🎟️</div>
            <h4 className="text-lg font-bold text-white mb-1">VIP Passes</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Digital spectator tickets with embedded verification codes for gate entry.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
