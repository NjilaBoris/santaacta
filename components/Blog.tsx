import { createClient } from "@/lib/supabase/server";
import PoliticsFeedClient, { Story } from "./Politicsfeed";

export default async function PoliticsFeed() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, cover_image_url, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Failed to fetch blog posts:", error.message);
  }

  const stories: Story[] = (data ?? []).map((post) => ({
    id: post.id,
    category: "Blog",
    date: new Date(post.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    title: post.title,
    image: post.cover_image_url ?? "/placeholder.jpg",
    href: `/blog/${post.slug}`,
  }));

  return <PoliticsFeedClient stories={stories} />;
}