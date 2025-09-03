import Image from "next/image";
import Link from "next/link";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, ExternalLink, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsistentFallbackImage } from "@/lib/fallback-images";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage?: {
    asset?: {
      url?: string;
      altText?: string;
    };
  };
  technologies?: string[];
  categories?: Array<{
    title: string;
    color?: string;
  }>;
  githubUrl?: string;
  liveUrl?: string;
  learnMoreUrl?: string;
  featured?: boolean;
}

export interface PortfolioCardProps {
  project: Project;
  className?: string;
  showFeatured?: boolean;
}

export interface PortfolioCardSkeletonProps {
  className?: string;
}

export function PortfolioCardSkeleton({
  className = "",
}: PortfolioCardSkeletonProps) {
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

        {/* Action Buttons Skeleton */}
        <div className="flex justify-between items-end mt-auto">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default function PortfolioCard({
  project,
  className = "",
  showFeatured = true,
}: PortfolioCardProps) {
  // Safe access to nested properties with fallbacks
  const imageUrl =
    project.mainImage?.asset?.url ||
    getConsistentFallbackImage(project._id, "portfolio");
  const imageAlt = project.mainImage?.asset?.altText || project.title;
  const technologies = project.technologies || [];

  return (
    <CardContainer
      className={`inter-var w-full ${className}`}
      containerClassName="py-8"
    >
      <CardBody className="flex flex-col bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-120 rounded-xl p-4 border">
        {/* Header Image */}
        <CardItem translateZ="20" className="w-full mb-4">
          <Image
            src={imageUrl}
            height={400}
            width={600}
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl transition-shadow duration-300"
            alt={imageAlt || "Project image"}
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 25vw"
          />
        </CardItem>

        {/* Title */}
        <CardItem
          translateZ="20"
          className="text-xl font-bold text-neutral-600 dark:text-white mb-2"
        >
          {project.title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="20"
          className="text-neutral-500 text-sm mb-4 dark:text-neutral-300 line-clamp-3"
        >
          {project.description || "No description available"}
        </CardItem>

        {/* Meta Information */}
        {showFeatured && project.featured && (
          <CardItem translateZ="20" className="mb-4">
            <div className="flex justify-end">
              <Badge variant="outline" className="text-xs">
                Featured
              </Badge>
            </div>
          </CardItem>
        )}

        {/* Technologies */}
        <CardItem translateZ="20" className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.length > 0 ? (
              technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" className="text-xs">
                No technologies listed
              </Badge>
            )}
          </div>
        </CardItem>

        {/* Action Buttons */}
        <div className="flex justify-between items-end mt-auto">
          {/* Left corner: GitHub and Live demo buttons */}
          <div className="flex gap-2">
            {project.githubUrl && (
              <CardItem translateZ={20} as="div">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              </CardItem>
            )}
            {project.liveUrl && (
              <CardItem translateZ={20} as="div">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="bg-white hover:bg-gray-100 border-gray-300 hover:border-gray-400 text-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-white"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </Button>
              </CardItem>
            )}
          </div>

          {/* Right corner: Learn More button */}
          <CardItem translateZ={20} as="div">
            <Button
              asChild
              variant="default"
              size="sm"
              className="text-xs bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200 h-9"
            >
              {project.learnMoreUrl ? (
                <a
                  href={project.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              ) : (
                <Link href={`/portfolio/${project.slug.current}`}>
                  Learn More
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              )}
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
