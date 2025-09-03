"use client";

import { Rss, GalleryVerticalEnd, User, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useActiveSection } from "@/hooks/use-active-section";

// Menu items.
const items = [
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

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  // Get the section IDs from the items array
  const sectionIds = items.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
      <SidebarContent className="flex flex-col justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => handleSmoothScroll(item.id)}
                    className="cursor-pointer"
                    tooltip={item.title}
                    isActive={activeSection === item.id}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-1",
            state !== "collapsed" ? "flex-row" : "flex-col"
          )}
        >
          <a
            href="https://www.linkedin.com/in/justinblumencranz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/blumencranz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
