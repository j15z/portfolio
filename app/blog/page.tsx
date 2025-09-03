import { Metadata } from "next";
import BlogGrid from "@/components/blog-grid";
import { client, blogQueries } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Blog | Justin Blumencranz",
  description: "Keep up with my adventures",
  openGraph: {
    title: "Blog | Justin Blumencranz",
    description: "Keep up with my adventures",
    type: "website",
  },
};

export default async function BlogPage() {
  // Fetch initial data for SSR
  let initialPosts = [];
  let categories = [];

  try {
    const [postsData, categoriesData] = await Promise.all([
      client.fetch(blogQueries.getAllPosts),
      client.fetch(blogQueries.getAllCategories),
    ]);

    initialPosts = postsData || [];
    categories = categoriesData || [];
  } catch (error) {
    console.error("Error fetching initial blog data:", error);
    // Continue with empty arrays - the component will handle loading states
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <BlogGrid initialPosts={initialPosts} categories={categories} />
    </main>
  );
}
