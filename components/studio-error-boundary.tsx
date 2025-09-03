"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class StudioErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Studio Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Studio Configuration Error
            </h2>
            <p className="text-muted-foreground mb-4">
              The Sanity Studio is not properly configured. Please check that
              the following environment variables are set:
            </p>
            <ul className="text-left text-sm text-muted-foreground space-y-2 mb-4">
              <li>• NEXT_PUBLIC_SANITY_PROJECT_ID</li>
              <li>• NEXT_PUBLIC_SANITY_DATASET</li>
              <li>• NEXT_PUBLIC_SANITY_API_VERSION</li>
            </ul>
            <p className="text-sm text-muted-foreground mb-4">
              Create a <code className="bg-muted px-1 rounded">.env.local</code>{" "}
              file in your project root with these variables.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
