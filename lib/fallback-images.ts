// Curated Unsplash images for fallback when no image is provided
// These images are high-quality, professional, and work well for both blog and portfolio content

export const FALLBACK_IMAGES = {
  // Technology and coding related
  tech: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
  ],
  // Design and creative
  design: [
    "https://picsum.photos/800/600?random=5",
    "https://picsum.photos/800/600?random=6",
    "https://picsum.photos/800/600?random=7",
    "https://picsum.photos/800/600?random=8",
  ],
  // Business and productivity
  business: [
    "https://picsum.photos/800/600?random=9",
    "https://picsum.photos/800/600?random=10",
    "https://picsum.photos/800/600?random=11",
    "https://picsum.photos/800/600?random=12",
  ],
  // Abstract and modern
  abstract: [
    "https://picsum.photos/800/600?random=13",
    "https://picsum.photos/800/600?random=14",
    "https://picsum.photos/800/600?random=15",
    "https://picsum.photos/800/600?random=16",
  ],
};

// Get a random fallback image based on content type
export function getFallbackImage(type: "blog" | "portfolio" = "blog"): string {
  const categories =
    type === "blog"
      ? ["tech", "design", "business"]
      : ["tech", "design", "abstract"];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const images =
    FALLBACK_IMAGES[randomCategory as keyof typeof FALLBACK_IMAGES];

  return images[Math.floor(Math.random() * images.length)];
}

// Get a consistent fallback image based on a seed (useful for consistent images per post/project)
export function getConsistentFallbackImage(
  seed: string,
  type: "blog" | "portfolio" = "blog"
): string {
  const categories =
    type === "blog"
      ? ["tech", "design", "business"]
      : ["tech", "design", "abstract"];

  // Use the seed to consistently pick the same image
  const hash = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const categoryIndex = Math.abs(hash) % categories.length;
  const randomCategory = categories[categoryIndex];
  const images =
    FALLBACK_IMAGES[randomCategory as keyof typeof FALLBACK_IMAGES];

  const imageIndex = Math.abs(hash) % images.length;
  return images[imageIndex];
}
