import { PodcastForm } from "@/components/podcasts/podcasts-form";


export default function NewPodcastPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">New episode</h1>
        <p className="mt-1 text-sm text-slate-500">Add a new podcast episode to Dispatch.</p>
      </div>
      <PodcastForm />
    </div>
  )
}