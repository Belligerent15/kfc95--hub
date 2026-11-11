import React from 'react'
import StandingsTable from '@/components/StandingsTable'
import MatchPredictor from '@/components/MatchPredictor'

export default function Home() {
  const openingMatch = {
    id: 'm1',
    home: 'Stars of Mmabatho',
    away: 'Makola FC',
    date: 'Dec 19, 2026 • 14:00',
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-[#c5a059]/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="font-bold text-white tracking-wide text-lg">KFC95 HUB</h1>
              <p className="text-xs text-[#c5a059] tracking-wider uppercase font-semibold">Keeper Of The Nation</p>
            </div>
          </div>
          <a
            href="/tickets"
            className="bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-[#c5a059]/20"
          >
            Get VIP Pass 🎟️
          </a>
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
          16 elite teams battling for ultimate glory. Track live scores, group standings, squad stats, and claim digital VIP spectator passes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#standings" className="bg-[#c5a059] hover:bg-[#b08943] text-black font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-[#c5a059]/10 text-sm">
            View Live Standings
          </a>
          <a href="/tickets" className="bg-zinc-900 hover:bg-zinc-800 text-slate-200 border border-zinc-700 font-bold px-8 py-3.5 rounded-xl transition text-sm">
            Generate VIP Ticket
          </a>
        </div>
      </section>

      {/* Community Predictor & Opening Match Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="max-w-xl mx-auto">
          <MatchPredictor
            matchId={openingMatch.id}
            homeTeam={openingMatch.home}
            awayTeam={openingMatch.away}
            date={openingMatch.date}
          />
        </div>
      </section>

      {/* Standings Table Section */}
      <section id="standings" className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white">Tournament Standings</h3>
          <p className="text-slate-400 text-sm">Official Group Stage Points & Goal Differences</p>
        </div>
        <StandingsTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-slate-500 font-mono">
        KFC95 Hub (Keeper Of The Nation) • Built for Manganeng Soccer Tournament 2026
      </footer>
    </main>
  )
}
