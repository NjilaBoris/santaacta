import { createClient } from "@/lib/supabase/server";
import LatestNewsClient, { NewsArticle } from "./NewsClient";

export default async function LatestNews() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, slug, cover_image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to fetch news posts:", error.message);
  }

  const articles: NewsArticle[] = (data ?? []).map((post) => ({
    id: post.id,
    category: "News",
    date: new Date(post.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    title: post.title,
    image: post.cover_image_url ?? "/placeholder.jpg",
    href: `/news/${post.slug}`,
  }));

  return <LatestNewsClient articles={articles} />;
}