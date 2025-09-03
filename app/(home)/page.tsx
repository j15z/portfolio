import Image from "next/image";
import Bio from "../bio";
import Projects from "../projects";
import Blog from "../blog";
import { client, projectQueries, blogQueries } from "@/lib/sanity";

export default async function Home() {
  // Fetch featured projects and blog posts from Sanity
  let featuredProjects = [];
  let featuredPosts = [];

  try {
    const [projectsData, postsData] = await Promise.all([
      client.fetch(projectQueries.getFeaturedProjects),
      client.fetch(blogQueries.getFeaturedPosts),
    ]);
    featuredProjects = projectsData || [];
    featuredPosts = postsData || [];
  } catch (error) {
    console.error("Error fetching featured data from Sanity:", error);
    featuredProjects = [];
    featuredPosts = [];
  }
  return (
    <div className="min-h-screen p-8">
      {/* Bio Section */}
      <section id="bio" className="min-h-screen">
        <div className="w-full">
          <Bio />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen">
        <div className="w-full">
          <Projects projects={featuredProjects} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen">
        <div className="w-full">
          <Blog posts={featuredPosts} />
        </div>
      </section>
    </div>
  );
}
