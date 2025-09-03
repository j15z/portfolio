import PortfolioCard from "@/components/portfolio-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Project } from "@/components/portfolio-card";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 pt-8">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Here&apos;s what I&apos;ve been working on recently
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link href="/portfolio">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-4 justify-between">
        {projects.map((project) => (
          <div
            key={project._id}
            className="w-full md:w-[calc(50%-0.5rem)] [@media(min-width:1300px)]:w-[calc(33.333%-0.67rem)] self-start"
          >
            <PortfolioCard project={project} showFeatured={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
