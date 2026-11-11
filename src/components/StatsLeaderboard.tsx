'use client'

import React, { useState } from 'react'

const DEFAULT_PLAYERS = [
  { rank: 1, name: 'Sipho Nkosi', team: 'Stars of Mmabatho', goals: 0, assists: 0 },
  { rank: 2, name: 'Thabo Mampuru', team: 'Manganeng Brazil', goals: 0, assists: 0 },
  { rank: 3, name: 'Kagiso Makola', team: 'Makola FC', goals: 0, assists: 0 },
  { rank: 4, name: 'Junior Barca', team: 'Manganeng Barcelona', goals: 0, assists: 0 },
  { rank: 5, name: 'Tshepo Seloga', team: 'Votex FC', goals: 0, assists: 0 },
]

export default function StatsLeaderboard() {
  const [activeTab, setActiveTab] = useState<'goals' | 'assists'>('goals')

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-white">Player Performance Hub</h3>
          <p className="text-xs text-[#c5a059] font-mono mt-1">Official Tournament Individual Stats</p>
        </div>
        
        {/* Toggle Tabs */}
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              activeTab === 'goals'
                ? 'bg-[#c5a059] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ⚽ Golden Boot (Goals)
          </button>
          <button
            onClick={() => setActiveTab('assists')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              activeTab === 'assists'
                ? 'bg-[#c5a059] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👟 Playmakers (Assists)
          </button>
        </div>
      </div>

      {/* Stats Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-xs font-mono text-slate-400 uppercase">
              <th className="py-3 px-3">Rank & Player</th>
              <th className="py-3 px-3">Club</th>
              <th className="py-3 px-3 text-right">
                {activeTab === 'goals' ? 'Goals Scored' : 'Assists Provided'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-sm">
            {DEFAULT_PLAYERS.map((player) => (
              <tr key={player.rank} className="hover:bg-zinc-900/50 transition">
                <td className="py-3 px-3 font-medium text-white flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono text-[#c5a059]">
                    {player.rank}
                  </span>
                  <span className="font-bold">{player.name}</span>
                </td>
                <td className="py-3 px-3 text-xs text-slate-400 font-mono">{player.team}</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#c5a059] text-base">
                  {activeTab === 'goals' ? player.goals : player.assists}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-zinc-800 text-center text-[11px] text-slate-500 font-mono">
        ⏳ Stats will update live as soon as opening fixtures kick off on Dec 19, 2026.
      </div>
    </div>
  )
}
