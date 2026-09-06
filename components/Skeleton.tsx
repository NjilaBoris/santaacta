export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      ))}
    </div>
  );
}