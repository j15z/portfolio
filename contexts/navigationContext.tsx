"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type PageType = "home" | "blog" | "blog-post" | "other";

interface NavigationContextType {
  currentPage: PageType;
  isTransitioning: boolean;
  sidebarState: "home" | "blog" | "transitioning";
  startTransition: (targetPage: PageType) => void;
  endTransition: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarState, setSidebarState] = useState<
    "home" | "blog" | "transitioning"
  >("home");

  // Determine page type from pathname
  useEffect(() => {
    let pageType: PageType = "other";

    if (pathname === "/") {
      pageType = "home";
    } else if (pathname === "/blog") {
      pageType = "blog";
    } else if (pathname.startsWith("/blog/")) {
      pageType = "blog-post";
    }

    if (pageType !== currentPage && !isTransitioning) {
      setCurrentPage(pageType);
      updateSidebarState(pageType);
    }
  }, [pathname, currentPage, isTransitioning]);

  const updateSidebarState = (pageType: PageType) => {
    if (pageType === "home") {
      setSidebarState("home");
    } else if (pageType === "blog" || pageType === "blog-post") {
      setSidebarState("blog");
    }
  };

  const startTransition = (targetPage: PageType) => {
    setIsTransitioning(true);
    setSidebarState("transitioning");

    // Transition duration should match CSS animation duration
    setTimeout(() => {
      setCurrentPage(targetPage);
      updateSidebarState(targetPage);
      setIsTransitioning(false);
    }, 300); // 300ms transition
  };

  const endTransition = () => {
    setIsTransitioning(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        isTransitioning,
        sidebarState,
        startTransition,
        endTransition,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
