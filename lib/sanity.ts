import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production
  apiVersion: "2024-01-01", // Use current date (YYYY-MM-DD) for latest API version
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}

// GROQ queries for projects
export const projectQueries = {
  // Get all published projects with basic info
  getAllProjects: `*[_type == "project" && defined(slug.current)] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    technologies,
    categories[]-> {
      title,
      color
    },
    githubUrl,
    liveUrl,
    learnMoreUrl,
    featured
  }`,

  // Get a single project by slug
  getProjectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    body,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    technologies,
    categories[]-> {
      title,
      color
    },
    githubUrl,
    liveUrl,
    learnMoreUrl,
    featured
  }`,

  // Get featured projects
  getFeaturedProjects: `*[_type == "project" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    technologies,
    categories[]-> {
      title,
      color
    },
    githubUrl,
    liveUrl,
    learnMoreUrl,
    featured
  }`,

  // Get all categories (reuse from blog)
  getAllCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    color,
    description
  }`,
};

// GROQ queries for blog posts
export const blogQueries = {
  // Get all published blog posts with basic info
  getAllPosts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    categories[]-> {
      title,
      color
    },
    publishedAt,
    author-> {
      name,
      image {
        asset-> {
          url
        }
      }
    },
    estimatedReadingTime
  }`,

  // Get a single post by slug
  getPostBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    categories[]-> {
      title,
      color
    },
    publishedAt,
    author-> {
      name,
      bio,
      image {
        asset-> {
          url
        }
      }
    },
    estimatedReadingTime,
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }`,

  // Get all categories
  getAllCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    color,
    description
  }`,

  // Get related posts (same categories, excluding current post)
  getRelatedPosts: `*[_type == "post" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    categories[]-> {
      title,
      color
    },
    publishedAt,
    author-> {
      name
    }
  }`,

  // Get featured posts (latest posts for homepage)
  getFeaturedPosts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    categories[]-> {
      title,
      color
    },
    publishedAt,
    author-> {
      name,
      image {
        asset-> {
          url
        }
      }
    },
    estimatedReadingTime
  }`,

  // Search posts by title or content
  searchPosts: `*[_type == "post" && (title match $searchQuery || excerpt match $searchQuery || body[].children[].text match $searchQuery)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        url,
        altText
      }
    },
    categories[]-> {
      title,
      color
    },
    publishedAt,
    author-> {
      name
    }
  }`,
};

// Helper function to calculate reading time
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to format Sanity date
export function formatSanityDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
