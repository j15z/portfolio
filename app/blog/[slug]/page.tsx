import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client, blogQueries, urlFor, formatSanityDate } from "@/lib/sanity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import BlogCard, { BlogPost } from "@/components/blog-card";
import { PortableText } from "@portabletext/react";
import { getConsistentFallbackImage } from "@/lib/fallback-images";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await client.fetch(blogQueries.getPostBySlug, {
      slug,
    });

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    const title = post.seo?.metaTitle || post.title;
    const description = post.seo?.metaDescription || post.excerpt;

    return {
      title: `${title} | Your Name`,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        images: post.mainImage?.asset?.url
          ? [urlFor(post.mainImage).width(1200).height(630).url()]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: post.mainImage?.asset?.url
          ? [urlFor(post.mainImage).width(1200).height(630).url()]
          : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const [post] = await Promise.all([
      client.fetch(blogQueries.getPostBySlug, { slug }),
      client.fetch(blogQueries.getRelatedPosts, {
        currentId: "", // Will be set after we get the post
        categoryIds: [],
      }),
    ]);

    if (!post) {
      notFound();
    }

    // Get related posts with the actual post data
    const categoryIds =
      post.categories?.map((cat: Record<string, unknown>) => cat._id) || [];
    const actualRelatedPosts = await client.fetch(blogQueries.getRelatedPosts, {
      currentId: post._id,
      categoryIds,
    });

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
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map(
                  (category: Record<string, unknown>, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      style={
                        category.color
                          ? { backgroundColor: String(category.color) }
                          : undefined
                      }
                    >
                      {String(category.title)}
                    </Badge>
                  )
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                {post.author.image?.asset?.url && (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatSanityDate(post.publishedAt)}</span>
              </div>

              {post.estimatedReadingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <Image
                src={
                  post.mainImage?.asset?.url
                    ? urlFor(post.mainImage).width(1200).height(600).url()
                    : getConsistentFallbackImage(post._id, "blog")
                }
                alt={post.mainImage?.asset?.altText || post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded-xl shadow-lg"
                priority
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-6">
                  This blog post doesn&apos;t have content yet. Content will be
                  added soon.
                </p>
              </div>
            )}
          </div>

          {/* Author Bio */}
          {post.author.bio && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 mb-16">
              <div className="flex items-start gap-4">
                {post.author.image?.asset?.url && (
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {actualRelatedPosts && actualRelatedPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actualRelatedPosts.map(
                  (relatedPost: Record<string, unknown>) => (
                    <BlogCard
                      key={String(relatedPost._id)}
                      post={relatedPost as unknown as BlogPost}
                    />
                  )
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
