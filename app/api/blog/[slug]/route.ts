import { NextRequest, NextResponse } from "next/server";
import { client, blogQueries } from "@/lib/sanity";

export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Fetch the blog post
    const post = await client.fetch(blogQueries.getPostBySlug, { slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Fetch related posts
    const categoryIds = post.categories?.map((cat: any) => cat._id) || [];
    const relatedPosts = await client.fetch(blogQueries.getRelatedPosts, {
      currentId: post._id,
      categoryIds,
    });

    const response = NextResponse.json({
      post,
      relatedPosts,
    });

    // Add caching headers
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return response;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
