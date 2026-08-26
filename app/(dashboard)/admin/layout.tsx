import { Sidebar } from "@/components/Sidebar"
import { Topbar } from "@/components/Topbar"
import { getCurrentProfile } from "@/lib/getProfile"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile()

  return (
    <div className="min-h-screen bg-neutral-100">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar profile={profile} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}