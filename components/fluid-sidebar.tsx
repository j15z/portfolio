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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
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
    title: "Back to Home",
    href: "/",
    icon: Home,
  },
];

export function FluidSidebar() {
  const { state } = useSidebar();

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
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // If on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 ease-in-out"
    >
      <SidebarRail />
      <SidebarContent className="flex flex-col justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home Navigation Items */}
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  sidebarState === "home"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                )}
              >
                {homeItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleSmoothScroll(item.id)}
                      className="cursor-pointer transition-all duration-200"
                      tooltip={item.title}
                      isActive={
                        activeSection === item.id && currentPage === "home"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              {/* Blog Navigation Items */}
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  sidebarState === "blog"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                )}
              >
                {blogItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="cursor-pointer transition-all duration-200"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </div>

              {/* Transitioning State - Show both with reduced opacity */}
              {sidebarState === "transitioning" && (
                <div className="absolute inset-0 flex flex-col justify-center">
                  <div className="opacity-50">
                    {homeItems.map((item) => (
                      <SidebarMenuItem key={`transition-${item.title}`}>
                        <SidebarMenuButton
                          className="cursor-pointer"
                          tooltip={item.title}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-1 transition-all duration-300",
            state !== "collapsed" ? "flex-row" : "flex-col"
          )}
        >
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
