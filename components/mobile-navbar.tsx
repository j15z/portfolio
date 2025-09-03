"use client";

import {
  Rss,
  GalleryVerticalEnd,
  User,
  Github,
  Linkedin,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useNavigation } from "@/contexts/navigationContext";

// Home menu items
const homeItems = [
  {
    title: "Bio",
    id: "bio",
    icon: User,
  },
  {
    title: "Portfolio",
    id: "portfolio",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Blog",
    id: "blog",
    icon: Rss,
  },
];

// Blog menu items
const blogItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
];

export function MobileNavbar() {
  const { sidebarState, currentPage } = useNavigation();
  const router = useRouter();

  // Get the section IDs from the home items array
  const sectionIds = homeItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  const handleSmoothScroll = (id: string) => {
    if (currentPage !== "home") {
      // If not on home page, navigate to home first
      router.push("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      // If on home page, just scroll
      scrollToSection(id);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // Height of the mobile navbar (4rem = 64px)
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {/* Home Navigation Items */}
          <div
            className={cn(
              "flex items-center space-x-1 transition-all duration-300 ease-in-out",
              sidebarState === "home"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            )}
          >
            {homeItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleSmoothScroll(item.id)}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  activeSection === item.id && currentPage === "home"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Blog Navigation Items */}
          <div
            className={cn(
              "flex items-center space-x-1 transition-all duration-300 ease-in-out",
              sidebarState === "blog"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            )}
          >
            {blogItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/justinblumencranz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/blumencranz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
