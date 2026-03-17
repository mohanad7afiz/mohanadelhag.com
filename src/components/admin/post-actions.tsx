"use client";

import { useState } from "react";

interface PostActionsProps {
  slug: string;
  published: boolean;
  title: string;
  onToggle: (slug: string, published: boolean) => void;
}

export function PostActions({
  slug,
  published,
  title,
  onToggle,
}: PostActionsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const siteUrl = "https://mohanadelhag.me";

  const handleToggle = () => {
    onToggle(slug, !published);
  };

  const copyLinkedIn = async () => {
    const text = `${title}\n\n${siteUrl}/blog/${slug}`;
    await navigator.clipboard.writeText(text);
    setCopied("linkedin");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyTwitter = async () => {
    const url = `https://x.com/intent/tweet?url=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}&text=${encodeURIComponent(title)}`;
    await navigator.clipboard.writeText(url);
    setCopied("twitter");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="admin-post-actions">
      <button
        onClick={handleToggle}
        className={`admin-post-actions__toggle ${published ? "published" : "draft"}`}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={copyLinkedIn}
        className="admin-post-actions__share"
        title="Copy LinkedIn text"
      >
        {copied === "linkedin" ? "Copied!" : "LI"}
      </button>
      <button
        onClick={copyTwitter}
        className="admin-post-actions__share"
        title="Copy Twitter share URL"
      >
        {copied === "twitter" ? "Copied!" : "X"}
      </button>
    </div>
  );
}
