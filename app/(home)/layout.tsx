"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <MobileNavbar />
      <SidebarInset className="min-h-svh pt-16 md:pt-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
