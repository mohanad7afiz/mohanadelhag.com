import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrismPlus from "rehype-prism-plus";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { formatDate, extractHeadings } from "@/lib/utils";
import { TableOfContents } from "./table-of-contents";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Not Found" };
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const headings = post.type === "article" ? extractHeadings(post.content) : [];

  return (
    <div className="py-20">
      <Container size="narrow">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3 text-sm text-muted">
            <Badge className="border-accent/30 text-accent">
              {post.type === "article" ? "Article" : "Note"}
            </Badge>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-lg text-muted">{post.description}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </header>

        {/* Content with optional TOC */}
        <div className="relative">
          {post.type === "article" && headings.length > 0 && (
            <aside className="mb-10 rounded-lg border border-border p-5 lg:absolute lg:-right-64 lg:mb-0 lg:w-56 lg:border-0 lg:p-0">
              <TableOfContents headings={headings} />
            </aside>
          )}

          <article className="prose max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true }]],
                },
              }}
            />
          </article>
        </div>

        {/* Prev/Next navigation */}
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-accent/30"
            >
              <p className="text-sm text-muted">&larr; Previous</p>
              <p className="mt-1 font-medium group-hover:text-accent">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-accent/30"
            >
              <p className="text-sm text-muted">Next &rarr;</p>
              <p className="mt-1 font-medium group-hover:text-accent">
                {nextPost.title}
              </p>
            </Link>
          )}
        </nav>
      </Container>
    </div>
  );
}
