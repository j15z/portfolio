import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Eye, Calendar } from "lucide-react";
import { client, projectQueries } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { getConsistentFallbackImage } from "@/lib/fallback-images";

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  let project = null;

  try {
    project = await client.fetch(projectQueries.getProjectBySlug, {
      slug: params.slug,
    });
  } catch (error) {
    console.error("Error fetching project for metadata:", error);
    return {
      title: "Project Not Found",
    };
  }

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.title;
  const description = project.description;

  return {
    title: `${title} | Portfolio`,
    description,
    openGraph: {
      title: `${title} | Portfolio`,
      description,
      type: "website",
      images: project.mainImage?.asset?.url
        ? [project.mainImage.asset.url]
        : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  let project = null;

  try {
    project = await client.fetch(projectQueries.getProjectBySlug, {
      slug: params.slug,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    notFound();
  }

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Safe access to nested properties
  const imageUrl = project.mainImage?.asset?.url;
  const imageAlt = project.mainImage?.asset?.altText || project.title;
  const technologies = project.technologies || [];
  const categories = project.categories || [];

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto p-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Link href="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {categories.map((category: any, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                style={
                  category.color ? { backgroundColor: category.color } : {}
                }
              >
                {category.title}
              </Badge>
            ))}
            {project.featured && <Badge variant="outline">Featured</Badge>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Published {formatDate(project.publishedAt)}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <Image
            src={
              imageUrl || getConsistentFallbackImage(project._id, "portfolio")
            }
            alt={imageAlt}
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {project.body && (
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <PortableText value={project.body} />
              </div>
            )}

            {/* If no body content, show a placeholder */}
            {!project.body && (
              <div className="mb-8">
                {project.learnMoreUrl ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <p className="text-blue-800 dark:text-blue-200 text-lg mb-4">
                      📖 For detailed information about this project, check out
                      the full case study.
                    </p>
                    <Button asChild variant="default">
                      <a
                        href={project.learnMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Full Case Study
                      </a>
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    More details about this project will be available soon.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Links
                </h3>

                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </a>
                  </Button>
                )}

                {project.liveUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start dark:text-white"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}

                {project.learnMoreUrl && (
                  <Button
                    asChild
                    variant="default"
                    className="w-full justify-start"
                  >
                    <a
                      href={project.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Case Study
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
