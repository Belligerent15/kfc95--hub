'use client'

import React, { useState, useEffect } from 'react'

interface Shoutout {
  id: string
  author: string
  team: string
  message: string
  timestamp: string
  isAnnouncement?: boolean
}

const INITIAL_SHOUTOUTS: Shoutout[] = [
  {
    id: '1',
    author: 'Coach Seloga',
    team: 'Stars of Mmabatho',
    message: 'Stars of Mmabatho are ready for opening match against Makola FC! Bring the energy!',
    timestamp: 'Just now',
    isAnnouncement: true,
  },
  {
    id: '2',
    author: 'Kagiso M.',
    team: 'Manganeng Brazil',
    message: 'Group P is going to be intense. Brazil all the way to the finals! 🏆',
    timestamp: '10m ago',
    isAnnouncement: false,
  },
  {
    id: '3',
    author: 'Tournament Committee',
    team: 'KFC95 Hub',
    message: 'Gates open at 09:00 AM on Dec 19. Ensure you have your digital VIP spectator passes ready!',
    timestamp: '1h ago',
    isAnnouncement: true,
  },
]

export default function CommunityHub() {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>(INITIAL_SHOUTOUTS)
  const [author, setAuthor] = useState('')
  const [team, setTeam] = useState('Stars of Mmabatho')
  const [message, setMessage] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setShoutouts(data)
        }
      })
      .catch((err) => console.error('Using initial shoutouts:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !message.trim()) return
    setPosting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, team, message }),
      })

      if (res.ok) {
        const newPost = await res.json()
        setShoutouts([newPost, ...shoutouts])
        setMessage('')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-white">Community Fan Hub</h3>
          <p className="text-xs text-[#c5a059] font-mono mt-1">Official Announcements & Tournament Fan Wall</p>
        </div>
        <span className="text-xs font-mono bg-zinc-900 border border-zinc-800 text-slate-400 px-3 py-1.5 rounded-xl">
          💬 Live Discussion
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shoutout Form */}
        <form onSubmit={handleSubmit} className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-white mb-2">Leave a Match Prediction or Shoutout</h4>
          
          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1">YOUR NAME</label>
            <input
              type="text"
              required
              placeholder="e.g. Kagiso M."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1">SUPPORTING CLUB</label>
            <input
              type="text"
              placeholder="e.g. Manganeng Brazil"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1">MESSAGE / PREDICTION</label>
            <textarea
              required
              rows={3}
              placeholder="Share your thoughts on the upcoming fixtures..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a059] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={posting}
            className="w-full bg-[#c5a059] hover:bg-[#b08943] text-black font-extrabold py-2.5 rounded-xl transition text-xs shadow-md"
          >
            {posting ? 'Posting...' : 'Post to Fan Wall 🚀'}
          </button>
        </form>

        {/* Live Feed */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
          {shoutouts.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition ${
                item.isAnnouncement
                  ? 'bg-zinc-900/90 border-[#c5a059]/40'
                  : 'bg-zinc-900/40 border-zinc-800/80'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{item.author}</span>
                  <span className="text-[10px] font-mono bg-zinc-800 text-[#c5a059] px-2 py-0.5 rounded border border-zinc-700">
                    {item.team}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
