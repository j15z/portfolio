/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { useState, useEffect } from "react";
import StudioAuth from "../../../components/studio-auth";
import StudioErrorBoundary from "../../../components/studio-error-boundary";

export const dynamic = "force-static";

export default function StudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated via cookie
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/studio/auth", {
          method: "GET",
        });
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Authentication failed, show login form
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <StudioAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <StudioErrorBoundary>
      <NextStudio config={config} />
    </StudioErrorBoundary>
  );
}
