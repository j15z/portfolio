import { NextRequest, NextResponse } from "next/server";
import { client, projectQueries } from "@/lib/sanity";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Project slug is required" },
        { status: 400 }
      );
    }

    const project = await client.fetch(projectQueries.getProjectBySlug, {
      slug,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
