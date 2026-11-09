export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-gradient-to-b from-slate-950 via-zinc-900 to-black text-amber-400">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-amber-500/20 bg-black/80 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-900/50 lg:p-4">
          ⚽ KFC95 Hub &nbsp;<code className="font-bold text-amber-200">Keeper Of The Nation</code>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          7th Annual <span className="text-amber-400">Soccer Tournament</span> 2026
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
          Manganeng Mampuru Sport Ground | December 19–29, 2026. Live standings, fixtures, community tipping, and VIP tickets.
        </p>
        <div className="flex gap-4">
          <a href="#fixtures" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-amber-500/20">
            View Fixtures
          </a>
          <a href="#standings" className="border border-amber-500/40 hover:bg-amber-500/10 text-amber-300 font-bold px-6 py-3 rounded-xl transition">
            Check Standings
          </a>
        </div>
      </div>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 lg:text-left gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">16 Teams</h2>
          <p className="text-slate-400 text-sm">Full squad rosters, player stats, and club profiles from Stars of Mmabatho to Manganeng Brazil.</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">Live Scores</h2>
          <p className="text-slate-400 text-sm">Real-time match simulation ticker, goal updates, and group stage points tables.</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-amber-500/20">
          <h2 className="text-2xl font-bold text-white mb-2">VIP Tickets</h2>
          <p className="text-slate-400 text-sm">Instant digital passes with unique QR codes for community supporters and VIPs.</p>
        </div>
      </div>
    </main>
  )
}
