export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  type: "article" | "note";
  description: string;
  published: boolean;
  readingTime: string;
  content: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}
