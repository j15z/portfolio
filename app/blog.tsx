import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogPost } from "@/components/blog-card";

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts = [] }: BlogProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 pt-8">
              Latest Posts
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Keep up with my adventures
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="flex flex-wrap gap-4 justify-between">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-full md:w-[calc(50%-0.5rem)] [@media(min-width:1300px)]:w-[calc(33.333%-0.67rem)] self-start"
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
