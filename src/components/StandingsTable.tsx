'use client'

import React, { useEffect, useState } from 'react'

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

const STATIC_32_TEAMS: Team[] = [
  { id: '1', name: 'Stars of Mmabatho', groupName: 'Group A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '2', name: 'Makola FC', groupName: 'Group A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '3', name: 'Votex FC', groupName: 'Group B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '4', name: 'Maila United', groupName: 'Group B', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '5', name: 'Kwena Academy', groupName: 'Group C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '6', name: 'Mochadi FC', groupName: 'Group C', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '7', name: 'De Stars FC', groupName: 'Group D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '8', name: 'Mantwaleng Shakers', groupName: 'Group D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '9', name: 'Matsebeng Real Hearts', groupName: 'Group E', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '10', name: 'PSG FC', groupName: 'Group E', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '11', name: 'Malegale Circuit', groupName: 'Group F', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '12', name: 'Gosebo FC', groupName: 'Group F', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '13', name: 'The Joint FC', groupName: 'Group G', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '14', name: 'Limpopo Express', groupName: 'Group G', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '15', name: 'Manganeng Barcelona', groupName: 'Group H', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '16', name: 'Ngwabe City Motors', groupName: 'Group H', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '17', name: 'Real Eagles', groupName: 'Group I', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '18', name: 'Team Galatasaray', groupName: 'Group I', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '19', name: 'Platinum City', groupName: 'Group J', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '20', name: 'Shaka United FC', groupName: 'Group J', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '21', name: 'Mmotong SA', groupName: 'Group K', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '22', name: 'Marizeburg FC', groupName: 'Group K', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '23', name: 'Dikakapa FC', groupName: 'Group L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '24', name: 'Leopard FC', groupName: 'Group L', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '25', name: 'Manyasa FC', groupName: 'Group M', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '26', name: 'Future FC', groupName: 'Group M', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '27', name: 'Moopong FC', groupName: 'Group N', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '28', name: 'Super Strikes FC', groupName: 'Group N', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '29', name: 'Mmakgari Stars', groupName: 'Group O', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '30', name: 'Mabule All Blacks', groupName: 'Group O', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '31', name: 'Manganeng Brazil', groupName: 'Group P', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
  { id: '32', name: 'Stars of Fetakgomo', groupName: 'Group P', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
]

export default function StandingsTable() {
  const [teams, setTeams] = useState<Team[]>(STATIC_32_TEAMS)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeams(data)
        }
      })
      .catch((err) => console.error('Using fallback static teams:', err))
  }, [])

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
            const goalDiff = (team.goalsFor || 0) - (team.goalsAgainst || 0)
            return (
              <tr key={team.id || index} className="hover:bg-zinc-800/40 transition">
                <td className="py-4 px-4 font-medium text-white flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${index < 4 ? 'bg-[#c5a059] text-black font-bold' : 'bg-zinc-800 text-slate-400'}`}>
                    {index + 1}
                  </span>
                  <div>
                    <span>{team.name}</span>
                    <span className="block text-xs text-slate-500 font-mono">{team.groupName}</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.played || 0}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.won || 0}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.drawn || 0}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{team.lost || 0}</td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">{goalDiff > 0 ? `+${goalDiff}` : goalDiff}</td>
                <td className="py-4 px-4 text-center font-mono font-extrabold text-[#c5a059] text-base">{team.points || 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
