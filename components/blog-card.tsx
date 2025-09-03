"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User } from "lucide-react";
import { getConsistentFallbackImage } from "@/lib/fallback-images";

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
  categories?: Array<{
    title: string;
    color?: string;
  }>;
  publishedAt: string;
  author?: {
    name: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
  };
  estimatedReadingTime?: number;
}

export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export interface BlogCardSkeletonProps {
  className?: string;
}

export function BlogCardSkeleton({ className = "" }: BlogCardSkeletonProps) {
  return (
    <CardContainer
      className={`inter-var w-full ${className}`}
      containerClassName="py-8"
    >
      <CardBody className="flex flex-col bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-120 rounded-xl p-4 border">
        {/* Header Image Skeleton */}
        <CardItem translateZ="20" className="w-full mb-4">
          <Skeleton className="h-48 w-full rounded-xl" />
        </CardItem>

        {/* Title Skeleton */}
        <CardItem translateZ="20" className="mb-2">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </CardItem>

        {/* Description Skeleton */}
        <CardItem translateZ="20" className="mb-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardItem>

        {/* Tags Skeleton */}
        <CardItem translateZ="20" className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardItem>

        {/* Meta Info Skeleton */}
        <div className="flex justify-between items-end mt-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default function BlogCard({ post, className = "" }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Safe access to nested properties with fallbacks
  const originalImageUrl = post.mainImage?.asset?.url;
  const fallbackImageUrl = getConsistentFallbackImage(post._id, "blog");
  const imageUrl = originalImageUrl || fallbackImageUrl;
  const imageAlt = post.mainImage?.asset?.altText || post.title;
  const categories = post.categories || [];
  const authorName = post.author?.name || "Unknown Author";

  return (
    <CardContainer
      className={`inter-var w-full ${className}`}
      containerClassName="py-8"
    >
      <Link href={`/blog/${post.slug.current}`} className="block w-full">
        <CardBody className="flex flex-col bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-120 rounded-xl p-4 border cursor-pointer hover:shadow-lg transition-shadow duration-300">
          {/* Header Image */}
          <CardItem translateZ="20" className="w-full mb-4">
            {imageError ? (
              <div className="h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Image unavailable
                </span>
              </div>
            ) : (
              <Image
                src={imageUrl}
                height={400}
                width={600}
                className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-shadow duration-300"
                alt={imageAlt}
                priority={false}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 25vw"
                onError={() => setImageError(true)}
              />
            )}
          </CardItem>

          {/* Title */}
          <CardItem
            translateZ="20"
            className="text-xl font-bold text-neutral-600 dark:text-white mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
          >
            {post.title}
          </CardItem>

          {/* Description */}
          <CardItem
            as="p"
            translateZ="20"
            className="text-neutral-500 text-sm mb-4 dark:text-neutral-300 line-clamp-3"
          >
            {post.excerpt || "This post doesn't have an excerpt yet."}
          </CardItem>

          {/* Categories */}
          <CardItem translateZ="20" className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs"
                    style={
                      category.color ? { backgroundColor: category.color } : {}
                    }
                  >
                    {category.title}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Uncategorized
                </Badge>
              )}
            </div>
          </CardItem>

          {/* Meta Information */}
          <div className="flex justify-between items-end mt-auto">
            <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <User className="w-3 h-3" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
              {post.estimatedReadingTime && (
                <>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{post.estimatedReadingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Link>
    </CardContainer>
  );
}
