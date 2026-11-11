'use client'

import React, { useState } from 'react'
import StandingsTable from '@/components/StandingsTable'
import MatchPredictor from '@/components/MatchPredictor'

const ALL_16_TEAMS = [
  { name: 'Stars of Mmabatho', group: 'Group A', coach: 'Coach Seloga' },
  { name: 'Makola FC', group: 'Group A', coach: 'Coach Makola' },
  { name: 'Votex FC', group: 'Group A', coach: 'Coach Votex' },
  { name: 'Maila United', group: 'Group A', coach: 'Coach Maila' },
  { name: 'Manganeng Brazil', group: 'Group B', coach: 'Coach Mampuru' },
  { name: 'Manganeng Barcelona', group: 'Group B', coach: 'Coach Barca' },
  { name: 'Kwena Academy', group: 'Group B', coach: 'Coach Kwena' },
  { name: 'Mochadi FC', group: 'Group B', coach: 'Coach Mochadi' },
  { name: 'Ngwabe City Motors', group: 'Group C', coach: 'Coach City' },
  { name: 'De Stars FC', group: 'Group C', coach: 'Coach De Stars' },
  { name: 'Platinum City', group: 'Group C', coach: 'Coach Platinum' },
  { name: 'Phooko Swallows', group: 'Group C', coach: 'Coach Phooko' },
  { name: 'Mapangene Lions', group: 'Group D', coach: 'Coach Lions' },
  { name: 'Jane Furse Eleven', group: 'Group D', coach: 'Coach Eleven' },
  { name: 'Tafelkop Eleven', group: 'Group D', coach: 'Coach Tafelkop' },
  { name: 'Manganeng All Stars', group: 'Group D', coach: 'Coach All Stars' },
]

export default function Home() {
  const [showTeamsModal, setShowTeamsModal] = useState(false)
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('ALL')

  const filteredTeams = selectedGroupFilter === 'ALL' 
    ? ALL_16_TEAMS 
    : ALL_16_TEAMS.filter(t => t.group === selectedGroupFilter)

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-[#c5a059]/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="font-bold text-white tracking-wide text-lg">KFC95 HUB</h1>
              <p className="text-xs text-[#c5a059] tracking-wider uppercase font-semibold">Keeper Of The Nation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTeamsModal(true)}
              className="text-xs font-bold text-slate-300 hover:text-white border border-zinc-800 px-3.5 py-2 rounded-xl transition"
            >
              16 Teams
            </button>
            <a
              href="/tickets"
              className="bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-[#c5a059]/20"
            >
              VIP Pass 🎟️
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
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
      </section>

      {/* Interactive Feature Cards Section */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: 16 Teams (Clicks to open modal) */}
          <button
            onClick={() => setShowTeamsModal(true)}
            className="text-left p-6 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-[#c5a059]/60 transition group cursor-pointer shadow-xl"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition transform">🏆</div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
              16 Teams <span className="text-xs text-[#c5a059] font-mono">View All →</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Click to view all squads, coaches, and club profiles from Stars of Mmabatho to Manganeng Brazil.
            </p>
          </button>

          {/* Card 2: Live Updates (Clicks to scroll to standings) */}
          <a
            href="#standings"
            className="text-left p-6 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-[#c5a059]/60 transition group cursor-pointer shadow-xl block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition transform">⚡</div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
              Live Updates <span className="text-xs text-[#c5a059] font-mono">Standings ↓</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real-time match scores, goal alerts, and instant group table standings.
            </p>
          </a>

          {/* Card 3: VIP Passes (Clicks to go to /tickets) */}
          <a
            href="/tickets"
            className="text-left p-6 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-[#c5a059]/60 transition group cursor-pointer shadow-xl block"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition transform">🎟️</div>
            <h4 className="text-lg font-bold text-white mb-1 flex items-center justify-between">
              VIP Passes <span className="text-xs text-[#c5a059] font-mono">Get Pass →</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Generate digital spectator tickets with embedded QR verification codes for gate entry.
            </p>
          </a>
        </div>
      </section>

      {/* Match Predictor Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-zinc-900">
        <div className="max-w-xl mx-auto">
          <MatchPredictor
            matchId="m1"
            homeTeam="Stars of Mmabatho"
            awayTeam="Makola FC"
            date="Dec 19, 2026 • 14:00"
          />
        </div>
      </section>

      {/* Standings Table */}
      <section id="standings" className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-900">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white">Live Group Standings</h3>
          <p className="text-slate-400 text-sm">Calculated dynamically based on real match outcomes</p>
        </div>
        <StandingsTable />
      </section>

      {/* 16 Teams Modal */}
      {showTeamsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">Tournament Roster</h3>
                <p className="text-xs text-[#c5a059] font-mono">16 Participating Clubs</p>
              </div>
              <button
                onClick={() => setShowTeamsModal(false)}
                className="text-slate-400 hover:text-white bg-zinc-900 border border-zinc-800 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Group Filter Buttons */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['ALL', 'Group A', 'Group B', 'Group C', 'Group D'].map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroupFilter(group)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition border ${
                    selectedGroupFilter === group
                      ? 'bg-[#c5a059] text-black border-[#c5a059]'
                      : 'bg-zinc-900 text-slate-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Team Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredTeams.map((team, i) => (
                <div key={i} className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#c5a059]/40 transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg">🛡️</span>
                    <span className="text-[10px] font-mono bg-zinc-800 text-[#c5a059] px-2 py-0.5 rounded border border-zinc-700">
                      {team.group}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{team.name}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-1">{team.coach}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-slate-500 font-mono">
        KFC95 Hub (Keeper Of The Nation) • Built for Manganeng Soccer Tournament 2026
      </footer>
    </main>
  )
}
