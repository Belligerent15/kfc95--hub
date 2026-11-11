'use client'

import React, { useState, useEffect } from 'react'

interface Team {
  id: string
  name: string
  groupName: string
}

const STATIC_32_TEAMS: Team[] = [
  { id: '1', name: 'Stars of Mmabatho', groupName: 'Group A' },
  { id: '2', name: 'Makola FC', groupName: 'Group A' },
  { id: '3', name: 'Votex FC', groupName: 'Group B' },
  { id: '4', name: 'Maila United', groupName: 'Group B' },
  { id: '5', name: 'Kwena Academy', groupName: 'Group C' },
  { id: '6', name: 'Mochadi FC', groupName: 'Group C' },
  { id: '7', name: 'De Stars FC', groupName: 'Group D' },
  { id: '8', name: 'Mantwaleng Shakers', groupName: 'Group D' },
  { id: '9', name: 'Matsebeng Real Hearts', groupName: 'Group E' },
  { id: '10', name: 'PSG FC', groupName: 'Group E' },
  { id: '11', name: 'Malegale Circuit', groupName: 'Group F' },
  { id: '12', name: 'Gosebo FC', groupName: 'Group F' },
  { id: '13', name: 'The Joint FC', groupName: 'Group G' },
  { id: '14', name: 'Limpopo Express', groupName: 'Group G' },
  { id: '15', name: 'Manganeng Barcelona', groupName: 'Group H' },
  { id: '16', name: 'Ngwabe City Motors', groupName: 'Group H' },
  { id: '17', name: 'Real Eagles', groupName: 'Group I' },
  { id: '18', name: 'Team Galatasaray', groupName: 'Group I' },
  { id: '19', name: 'Platinum City', groupName: 'Group J' },
  { id: '20', name: 'Shaka United FC', groupName: 'Group J' },
  { id: '21', name: 'Mmotong SA', groupName: 'Group K' },
  { id: '22', name: 'Marizeburg FC', groupName: 'Group K' },
  { id: '23', name: 'Dikakapa FC', groupName: 'Group L' },
  { id: '24', name: 'Leopard FC', groupName: 'Group L' },
  { id: '25', name: 'Manyasa FC', groupName: 'Group M' },
  { id: '26', name: 'Future FC', groupName: 'Group M' },
  { id: '27', name: 'Moopong FC', groupName: 'Group N' },
  { id: '28', name: 'Super Strikes FC', groupName: 'Group N' },
  { id: '29', name: 'Mmakgari Stars', groupName: 'Group O' },
  { id: '30', name: 'Mabule All Blacks', groupName: 'Group O' },
  { id: '31', name: 'Manganeng Brazil', groupName: 'Group P' },
  { id: '32', name: 'Stars of Fetakgomo', groupName: 'Group P' },
]

export default function AdminPage() {
  const [passkey, setPasskey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [teams, setTeams] = useState<Team[]>(STATIC_32_TEAMS)
  
  const [homeTeamId, setHomeTeamId] = useState(STATIC_32_TEAMS[0].id)
  const [awayTeamId, setAwayTeamId] = useState(STATIC_32_TEAMS[1].id)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)

  const [scorerName, setScorerName] = useState('')
  const [scorerTeamId, setScorerTeamId] = useState(STATIC_32_TEAMS[0].id)
  const [isAssist, setIsAssist] = useState(false)

  const [statusMsg, setStatusMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeams(data)
          setHomeTeamId(data[0].id)
          setAwayTeamId(data[1]?.id || data[0].id)
          setScorerTeamId(data[0].id)
        }
      })
      .catch((err) => console.error('Using fallback static teams for admin:', err))
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passkey === 'kfc95admin' || passkey === '1234') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid Admin Passkey!')
    }
  }

  const handleUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatusMsg('')

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passkey: passkey || 'kfc95admin',
          homeTeamId,
          awayTeamId,
          homeScore,
          awayScore,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatusMsg('✅ Match result recorded and group standings updated live!')
      } else {
        setStatusMsg('❌ Error: ' + (data.error || 'Failed to update match'))
      }
    } catch (err) {
      setStatusMsg('❌ Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePlayerStat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!scorerName.trim()) return
    setLoading(true)
    setStatusMsg('')

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passkey: passkey || 'kfc95admin',
          scorerName,
          scorerTeamId,
          isAssist,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatusMsg(`✅ ${isAssist ? 'Assist' : 'Goal'} logged for ${scorerName}!`)
        setScorerName('')
      } else {
        setStatusMsg('❌ Error: ' + (data.error || 'Failed to update player stat'))
      }
    } catch (err) {
      setStatusMsg('❌ Connection error')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050505] text-slate-100 flex items-center justify-center p-6 font-sans">
        <form onSubmit={handleLogin} className="bg-[#121212] border border-zinc-800 p-8 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
          <div className="text-center">
            <span className="text-3xl">🔐</span>
            <h1 className="text-2xl font-black text-white mt-2">KFC95 Admin Portal</h1>
            <p className="text-xs text-[#c5a059] font-mono mt-1">Tournament Match Control</p>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ENTER OPERATOR PIN</label>
            <input
              type="password"
              required
              placeholder="e.g. kfc95admin"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold py-3.5 rounded-xl transition shadow-lg text-sm"
          >
            Access Dashboard
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-black text-white">Match Day Operator Console</h1>
            <p className="text-sm text-[#c5a059] font-mono mt-1">Live Score Entry & Player Performance Tracker</p>
          </div>
          <a href="/" className="text-xs text-slate-400 hover:text-white border border-zinc-800 px-4 py-2 rounded-xl transition">
            View Live Web Hub →
          </a>
        </div>

        {statusMsg && (
          <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-[#c5a059]/40 text-sm font-mono text-[#c5a059]">
            {statusMsg}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 1: Submit Match Results */}
          <form onSubmit={handleUpdateMatch} className="bg-[#121212] border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              ⚽ Submit Match Result
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">HOME TEAM</label>
              <select
                value={homeTeamId}
                onChange={(e) => setHomeTeamId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} {team.groupName ? `(${team.groupName})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">HOME GOALS</label>
              <input
                type="number"
                min="0"
                value={homeScore}
                onChange={(e) => setHomeScore(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div className="pt-2 border-t border-zinc-900">
              <label className="block text-xs font-mono text-slate-400 mb-1">AWAY TEAM</label>
              <select
                value={awayTeamId}
                onChange={(e) => setAwayTeamId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name} {team.groupName ? `(${team.groupName})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">AWAY GOALS</label>
              <input
                type="number"
                min="0"
                value={awayScore}
                onChange={(e) => setAwayScore(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold py-3 rounded-xl transition text-sm mt-4"
            >
              {loading ? 'Updating Standings...' : 'Record Result & Update Table'}
            </button>
          </form>

          {/* Section 2: Log Player Goals/Assists */}
          <form onSubmit={handleUpdatePlayerStat} className="bg-[#121212] border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              👟 Log Goal / Assist
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">PLAYER FULL NAME</label>
              <input
                type="text"
                required
                placeholder="e.g. Sipho Nkosi"
                value={scorerName}
                onChange={(e) => setScorerName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">PLAYER CLUB</label>
              <select
                value={scorerTeamId}
                onChange={(e) => setScorerTeamId(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">STAT CATEGORY</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsAssist(false)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                    !isAssist
                      ? 'bg-[#c5a059] text-black border-[#c5a059]'
                      : 'bg-zinc-900 text-slate-400 border-zinc-800'
                  }`}
                >
                  ⚽ Goal Scored
                </button>
                <button
                  type="button"
                  onClick={() => setIsAssist(true)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                    isAssist
                      ? 'bg-[#c5a059] text-black border-[#c5a059]'
                      : 'bg-zinc-900 text-slate-400 border-zinc-800'
                  }`}
                >
                  👟 Assist Provided
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold py-3 rounded-xl transition text-sm mt-4 border border-zinc-700"
            >
              {loading ? 'Logging Stat...' : 'Log Player Stat'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
