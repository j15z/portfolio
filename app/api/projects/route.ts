import { NextRequest, NextResponse } from "next/server";
import { client, projectQueries } from "@/lib/sanity";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    let query;
    const params: Record<string, unknown> = {};

    if (search) {
      // Simple search query for projects
      query = `*[_type == "project" && (title match $searchQuery || description match $searchQuery || technologies[] match $searchQuery)] | order(featured desc, publishedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage {
          asset-> {
            url,
            altText
          }
        },
        technologies,
        categories[]-> {
          title,
          color
        },
        githubUrl,
        liveUrl,
        learnMoreUrl,
        featured,
        publishedAt
      }`;
      params.searchQuery = `*${search}*`;
    } else if (featured === "true") {
      query = projectQueries.getFeaturedProjects;
    } else {
      query = projectQueries.getAllProjects;
    }

    const projects = await client.fetch(query, params);

    // Filter by category if specified
    let filteredProjects = projects;
    if (category && category !== "all") {
      filteredProjects = projects.filter((project: Record<string, unknown>) =>
        (project.categories as Array<Record<string, unknown>>)?.some(
          (cat: Record<string, unknown>) => cat.title === category
        )
      );
    }

    return NextResponse.json({
      projects: filteredProjects,
      total: filteredProjects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
