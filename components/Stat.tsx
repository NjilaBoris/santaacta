type Stat = { label: string; value: string }

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-ink/10 bg-paper-white p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}