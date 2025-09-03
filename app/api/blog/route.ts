import { NextRequest, NextResponse } from "next/server";
import { client, blogQueries } from "@/lib/sanity";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    let query = blogQueries.getAllPosts;
    let params: any = {};

    // Handle search
    if (search) {
      query = blogQueries.searchPosts;
      params.searchQuery = `*${search}*`;
    }

    // Handle category filter
    if (category && category !== "all") {
      query = `*[_type == "post" && defined(slug.current) && "${category}" in categories[]->title] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage {
          asset-> {
            url,
            altText
          }
        },
        categories[]-> {
          title,
          color
        },
        publishedAt,
        author-> {
          name,
          image {
            asset-> {
              url
            }
          }
        },
        estimatedReadingTime
      }`;
    }

    // Handle limit
    if (limit) {
      query += `[0...${parseInt(limit)}]`;
    }

    const posts = await client.fetch(query, params);

    // Also fetch categories for the filter
    const categories = await client.fetch(blogQueries.getAllCategories);

    const response = NextResponse.json({
      posts,
      categories,
      total: posts.length,
    });

    // Add caching headers
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return response;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
