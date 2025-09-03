"use client";

import { PortfolioSidebar } from "@/components/portfolio-sidebar";
import { MobileNavbar } from "@/components/mobile-navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <PortfolioSidebar />
      <MobileNavbar />
      <SidebarInset className="min-h-svh pt-16 md:pt-0">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
