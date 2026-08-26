
import { NewsPostForm } from "@/components/News/Form";


export default function NewsPostPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-8 text-center text-2xl font-semibold text-ink sm:text-3xl">
        News  post
      </h1>
      <NewsPostForm />
    </div>
  )
}