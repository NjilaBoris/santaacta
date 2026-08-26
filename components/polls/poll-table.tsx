type PollResult = {
  id: string
  label: string
  vote_count: number
  percent: number
}

export function PollsTable({ results }: { results: PollResult[] }) {
  const totalVotes = results.reduce((sum, r) => sum + r.vote_count, 0)

  return (
    <div className="rounded-lg border border-ink/10 bg-paper-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Parliament Priority Poll
        </h2>
        <span className="font-mono text-xs text-slate-500">
          {totalVotes} vote{totalVotes === 1 ? '' : 's'} total
        </span>
      </div>

      <div className="space-y-4">
        {results
          .slice()
          .sort((a, b) => b.vote_count - a.vote_count)
          .map((option) => (
            <div key={option.id}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{option.label}</span>
                <span className="font-mono text-xs text-slate-500">
                  {option.vote_count} vote{option.vote_count === 1 ? '' : 's'} &middot; {option.percent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
                <div
                  className="h-full rounded-full bg-wire transition-all"
                  style={{ width: `${option.percent}%` }}
                />
              </div>
            </div>
          ))}
      </div>

      {results.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">No votes recorded yet.</p>
      )}
    </div>
  )
}