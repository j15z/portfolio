import { Metadata } from "next";
import PortfolioGrid from "@/components/portfolio-grid";
import { client, projectQueries } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Portfolio | Your Name",
  description: "A collection of my recent projects and work",
  openGraph: {
    title: "Portfolio | Your Name",
    description: "A collection of my recent projects and work",
    type: "website",
  },
};

export default async function PortfolioPage() {
  // Fetch initial data for SSR
  let initialProjects = [];
  let categories = [];

  try {
    const [projectsData, categoriesData] = await Promise.all([
      client.fetch(projectQueries.getAllProjects),
      client.fetch(projectQueries.getAllCategories),
    ]);

    initialProjects = projectsData || [];
    categories = categoriesData || [];
  } catch (error) {
    console.error("Error fetching initial portfolio data:", error);
    initialProjects = [];
    categories = [];
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <PortfolioGrid
        initialProjects={initialProjects}
        categories={categories}
      />
    </main>
  );
}
