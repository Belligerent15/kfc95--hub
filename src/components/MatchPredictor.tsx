'use client'

import React, { useState } from 'react'

interface MatchPredictorProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  date: string
}

export default function MatchPredictor({ matchId, homeTeam, awayTeam, date }: MatchPredictorProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState({ home: 0, draw: 0, away: 0 })
  const [userChoice, setUserChoice] = useState<string | null>(null)

  const totalVotes = votes.home + votes.draw + votes.away

  const handleVote = (choice: 'home' | 'draw' | 'away') => {
    if (hasVoted) return
    setVotes((prev) => ({ ...prev, [choice]: prev[choice] + 1 }))
    setUserChoice(choice)
    setHasVoted(true)
  }

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0
    return Math.round((count / totalVotes) * 100)
  }

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-[#c5a059] px-3 py-1 rounded-full uppercase font-bold">
          Fan Predictor
        </span>
        <span className="text-xs text-slate-400 font-mono">{date}</span>
      </div>

      <h3 className="text-lg font-black text-white mb-6">Who will take the victory?</h3>

      <div className="flex justify-between items-center mb-6 px-4">
        <div className="text-left">
          <h4 className="font-extrabold text-white text-base md:text-lg">{homeTeam}</h4>
          <span className="text-xs text-[#c5a059] font-mono">{totalVotes > 0 ? `${getPercentage(votes.home)}%` : '0%'}</span>
        </div>
        <span className="text-xs text-slate-500 font-mono uppercase px-3 py-1 bg-zinc-900 rounded-lg">vs</span>
        <div className="text-right">
          <h4 className="font-extrabold text-white text-base md:text-lg">{awayTeam}</h4>
          <span className="text-xs text-[#c5a059] font-mono">{totalVotes > 0 ? `${getPercentage(votes.away)}%` : '0%'}</span>
        </div>
      </div>

      {!hasVoted ? (
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleVote('home')}
            className="py-3 rounded-xl bg-zinc-900 hover:bg-[#c5a059] hover:text-black text-slate-300 border border-zinc-800 text-xs font-bold transition"
          >
            {homeTeam.split(' ')[0]} Win
          </button>
          <button
            onClick={() => handleVote('draw')}
            className="py-3 rounded-xl bg-zinc-900 hover:bg-[#c5a059] hover:text-black text-slate-300 border border-zinc-800 text-xs font-bold transition"
          >
            Draw
          </button>
          <button
            onClick={() => handleVote('away')}
            className="py-3 rounded-xl bg-zinc-900 hover:bg-[#c5a059] hover:text-black text-slate-300 border border-zinc-800 text-xs font-bold transition"
          >
            {awayTeam.split(' ')[0]} Win
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden flex border border-zinc-800">
            <div style={{ width: `${getPercentage(votes.home)}%` }} className="bg-[#c5a059] transition-all duration-500" />
            <div style={{ width: `${getPercentage(votes.draw)}%` }} className="bg-zinc-600 transition-all duration-500" />
            <div style={{ width: `${getPercentage(votes.away)}%` }} className="bg-amber-700 transition-all duration-500" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>{homeTeam.split(' ')[0]}: {getPercentage(votes.home)}%</span>
            <span>Draw: {getPercentage(votes.draw)}%</span>
            <span>{awayTeam.split(' ')[0]}: {getPercentage(votes.away)}%</span>
          </div>
          <p className="text-xs text-[#c5a059] font-mono mt-2">
            ✓ Prediction logged! ({totalTotalVotesTxt(totalVotes)})
          </p>
        </div>
      )}
    </div>
  )
}

function totalTotalVotesTxt(total: number) {
  return `${total} total vote${total === 1 ? '' : 's'}`
}
