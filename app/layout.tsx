import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SettingsProvider } from "@/contexts/settingsContext";
import { NavigationProvider } from "@/contexts/navigationContext";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";

export const metadata: Metadata = {
  title: "Justin Blumencranz - Programmer + Designer",
  description:
    "Software engineer and designer building thoughtful, user-centered systems. Full-stack web development, UI/UX, and interactive experiences.",
  keywords: [
    "software engineer",
    "web developer",
    "UI/UX designer",
    "React",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Justin Blumencranz" }],
  creator: "Justin Blumencranz",
  publisher: "Justin Blumencranz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://justinblumencranz.com",
    title: "Justin Blumencranz - Programmer + Designer",
    description:
      "Software engineer and designer building thoughtful, user-centered systems. Full-stack web development, UI/UX, and interactive experiences.",
    siteName: "Justin Blumencranz Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Justin Blumencranz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Blumencranz - Programmer + Designer",
    description:
      "Software engineer and designer building thoughtful, user-centered systems.",
    images: ["/profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/profile.jpeg" as="image" />
        <link rel="preload" href="/gloo.png" as="image" />
        <link rel="preload" href="/beam_search.png" as="image" />
        <link rel="preload" href="/clearing.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <NavigationProvider>
              <AnimatedThemeToggle />
              {children}
            </NavigationProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
