'use client'

import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

const ALL_32_TEAMS = [
  'Stars of Mmabatho', 'Makola FC', 'Votex FC', 'Maila United',
  'Kwena Academy', 'Mochadi FC', 'De Stars FC', 'Mantwaleng Shakers',
  'Matsebeng Real Hearts', 'PSG FC', 'Malegale Circuit', 'Gosebo FC',
  'The Joint FC', 'Limpopo Express', 'Manganeng Barcelona', 'Ngwabe City Motors',
  'Real Eagles', 'Team Galatasaray', 'Platinum City', 'Shaka United FC',
  'Mmotong SA', 'Marizeburg FC', 'Dikakapa FC', 'Leopard FC',
  'Manyasa FC', 'Future FC', 'Moopong FC', 'Super Strikes FC',
  'Mmakgari Stars', 'Mabule All Blacks', 'Manganeng Brazil', 'Stars of Fetakgomo'
]

export default function TicketsPage() {
  const [holderName, setHolderName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('Stars of Mmabatho')
  const [ticketTier, setTicketTier] = useState('VIP Pass')
  const [generatedTicket, setGeneratedTicket] = useState<{
    id: string
    name: string
    team: string
    tier: string
    issuedAt: string
  } | null>(null)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!holderName.trim()) return

    const randomId = 'KFC95-' + Math.floor(100000 + Math.random() * 900000)
    setGeneratedTicket({
      id: randomId,
      name: holderName,
      team: selectedTeam,
      tier: ticketTier,
      issuedAt: new Date().toLocaleDateString(),
    })
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-black text-white">VIP Spectator Pass</h1>
            <p className="text-sm text-[#c5a059] font-mono mt-1">
              7th Annual Soccer Tournament • Manganeng Mampuru Sport Ground
            </p>
          </div>
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white border border-zinc-800 px-4 py-2 rounded-xl transition"
          >
            ← Back to Home
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleGenerate}
            className="bg-[#121212] border border-zinc-800 p-6 rounded-2xl space-y-4"
          >
            <h2 className="text-lg font-bold text-white mb-2">Generate Digital Pass</h2>
            
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sipho Nkosi"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                SUPPORTING TEAM
              </label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059]"
              >
                {ALL_32_TEAMS.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                PASS TYPE
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['VIP Pass', 'Standard Spectator'].map((tier) => (
                  <button
                    type="button"
                    key={tier}
                    onClick={() => setTicketTier(tier)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                      ticketTier === tier
                        ? 'bg-[#c5a059] text-black border-[#c5a059]'
                        : 'bg-zinc-900 text-slate-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-[#c5a059]/10 text-sm mt-4"
            >
              Issue Digital Ticket
            </button>
          </form>

          {/* Pass Preview Card */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Live Pass Preview</h2>

            {generatedTicket ? (
              <div className="bg-gradient-to-br from-zinc-900 via-[#121212] to-black border-2 border-[#c5a059]/60 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 px-2.5 py-0.5 rounded-full font-bold">
                      {generatedTicket.tier}
                    </span>
                    <h3 className="text-xl font-black text-white mt-2">KFC95 HUB</h3>
                    <p className="text-xs text-slate-400">Keeper Of The Nation 2026</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl">
                    <QRCodeSVG
                      value={`https://kfc95-hub.onrender.com/tickets?id=${generatedTicket.id}`}
                      size={72}
                    />
                  </div>
                </div>

                <div className="space-y-3 border-t border-zinc-800 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">TICKET HOLDER</span>
                    <span className="text-white font-bold text-sm">{generatedTicket.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-slate-500 block text-[10px]">AFFILIATION</span>
                      <span className="text-[#c5a059] font-bold">{generatedTicket.team}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px]">TICKET ID</span>
                      <span className="text-slate-300 font-bold">{generatedTicket.id}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-zinc-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>Manganeng Mampuru Ground</span>
                  <span>Dec 19–29, 2026</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#121212] border border-dashed border-zinc-800 rounded-3xl p-12 text-center text-slate-500 text-xs">
                Fill out your details on the left to generate your custom digital ticket pass.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
