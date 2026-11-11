'import React, { useEffect, useState } from 'react'

interface Team {
  id: string
  name: string
  groupName: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export default function StandingsTable() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTeams(data)
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-slate-400 font-mono text-sm">Loading official tournament standings...</div>
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#121212]/90 backdrop-blur-md shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60 text-xs font-mono text-[#c5a059] uppercase tracking-wider">
            <th className="py-4 px-4">Pos & Team</th>
            <th className="py-4 px-3 text-center">P</th>
            <th className="py-4 px-3 text-center">W</th>
            <th className="py-4 px-3 text-center">D</th>
            <th className="py-4 px-3 text-center">L</th>
            <th className="py-4 px-3 text-center">GD</th>
            <th className="py-4 px-4 text-center font-bold">PTS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900 text-sm">
          {teams.map((team, index) => {
            const goalDiff = team.goalsFor - team.goalsAgainst
            return (
              <tr key={team.id} className="hover:bg-zinc-800/40 transition">
                <td className="py-4 px-4 font-medium text-white flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${index < 4 ? 'bg-[#c5a059] text-black font-bold' : 'bg-zinc-800 text-slate-400'}`}>
                    {index + 1}
                  </span>
                  <div>
                    <span>{team.name}</span>
                    <span className="block text-xs text-slate-500 font-mono">{team.groupName}</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.played}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.won}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.drawn}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.lost}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{goalDiff > 0 ? `+${goalDiff}` : goalDiff}</td>
                <td className="py-4 px-4 text-center font-mono font-extrabold text-[#c5a059] text-base">{team.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
