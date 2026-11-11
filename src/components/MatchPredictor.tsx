'use client'

import React, { useState } from 'react'

interface MatchPredictorProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  date: string
}

export default function MatchPredictor({ matchId, homeTeam, awayTeam, date }: MatchPredictorProps) {
  const [votes, setVotes] = useState({ home: 65, draw: 15, away: 20 })
  const [userVote, setUserVote] = useState<'home' | 'draw' | 'away' | null>(null)

  const handleVote = (option: 'home' | 'draw' | 'away') => {
    if (userVote) return

    setUserVote(option)
    setVotes((prev) => {
      const total = prev.home + prev.draw + prev.away + 1
      return {
        home: option === 'home' ? Math.round(((prev.home + 1) / total) * 100) : Math.round((prev.home / total) * 100),
        draw: option === 'draw' ? Math.round(((prev.draw + 1) / total) * 100) : Math.round((prev.draw / total) * 100),
        away: option === 'away' ? Math.round(((prev.away + 1) / total) * 100) : Math.round((prev.away / total) * 100),
      }
    })
  }

  return (
    <div className="bg-[#121212] border border-zinc-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider bg-[#c5a059]/10 border border-[#c5a059]/30 px-2.5 py-0.5 rounded-full font-bold">
          Fan Predictor
        </span>
        <span className="text-xs text-slate-400 font-mono">{date}</span>
      </div>

      <h4 className="text-sm font-bold text-slate-300 text-center mb-4">Who will take the victory?</h4>

      <div className="flex justify-between items-center text-center mb-6">
        <div className="w-2/5">
          <p className="font-extrabold text-white text-base">{homeTeam}</p>
        </div>
        <span className="text-xs font-mono text-slate-500 font-bold px-2">VS</span>
        <div className="w-2/5">
          <p className="font-extrabold text-white text-base">{awayTeam}</p>
        </div>
      </div>

      {/* Voting Buttons */}
      {!userVote ? (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleVote('home')}
            className="bg-zinc-900 hover:bg-[#c5a059] hover:text-black text-slate-200 border border-zinc-800 font-bold py-2.5 rounded-xl text-xs transition"
          >
            {homeTeam.split(' ')[0]} Win
          </button>
          <button
            onClick={() => handleVote('draw')}
            className="bg-zinc-900 hover:bg-zinc-800 text-slate-300 border border-zinc-800 font-bold py-2.5 rounded-xl text-xs transition"
          >
            Draw
          </button>
          <button
            onClick={() => handleVote('away')}
            className="bg-zinc-900 hover:bg-[#c5a059] hover:text-black text-slate-200 border border-zinc-800 font-bold py-2.5 rounded-xl text-xs transition"
          >
            {awayTeam.split(' ')[0]} Win
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Results Bar */}
          <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden flex">
            <div style={{ width: `${votes.home}%` }} className="bg-[#c5a059] h-full" />
            <div style={{ width: `${votes.draw}%` }} className="bg-slate-600 h-full" />
            <div style={{ width: `${votes.away}%` }} className="bg-amber-700 h-full" />
          </div>

          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>{homeTeam.split(' ')[0]}: <strong className="text-white">{votes.home}%</strong></span>
            <span>Draw: <strong className="text-white">{votes.draw}%</strong></span>
            <span>{awayTeam.split(' ')[0]}: <strong className="text-white">{votes.away}%</strong></span>
          </div>

          <p className="text-center text-[10px] text-[#c5a059] font-mono mt-2">
            ✓ Prediction logged! Share with your friends to see their predictions.
          </p>
        </div>
      )}
    </div>
  )
}
