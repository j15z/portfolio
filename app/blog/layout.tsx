"use client";

import { BlogSidebar } from "@/components/blog-sidebar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <BlogSidebar />
      <MobileNavbar />
      <SidebarInset className="min-h-svh pt-16 md:pt-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
