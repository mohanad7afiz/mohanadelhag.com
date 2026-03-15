import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrismPlus from "rehype-prism-plus";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";
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
    <div>
      <div className="container-narrow">
        {/* Header */}
        <header className="article-header">
          <div className="article-header__type" data-reveal>
            {post.type === "article" ? "Article" : "Note"}
          </div>
          <h1 className="article-header__title" data-reveal>{post.title}</h1>
          <div className="article-header__meta" data-reveal>
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="article-header__tags" data-reveal>
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* Content with optional TOC */}
        <div className="relative">
          {post.type === "article" && headings.length > 0 && (
            <aside className="mb-10 rounded-lg border border-[var(--border)] p-5 lg:absolute lg:-right-64 lg:mb-0 lg:w-56 lg:border-0 lg:p-0">
              <TableOfContents headings={headings} />
            </aside>
          )}

          <article className="prose max-w-none" data-reveal>
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
        {(prevPost || nextPost) && (
          <nav className="post-nav">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="post-nav__item">
                <p className="post-nav__direction">Previous</p>
                <p className="post-nav__title">{prevPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="post-nav__item" style={{ textAlign: "right" }}>
                <p className="post-nav__direction">Next</p>
                <p className="post-nav__title">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
