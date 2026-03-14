"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";

function Heading({
  level,
  children,
  ...props
}: {
  level: 2 | 3 | 4;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded-md border border-border bg-background/50 px-2 py-1 text-xs text-muted opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 cursor-pointer"
      aria-label="Copy code"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const codeElement = children as React.ReactElement<{
    children?: string;
  }>;
  const code =
    typeof codeElement?.props?.children === "string"
      ? codeElement.props.children
      : "";

  return (
    <div className="group relative">
      <CopyButton code={code} />
      <pre {...props}>{children}</pre>
    </div>
  );
}

function ExternalLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={2} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={3} {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={4} {...props} />
  ),
  pre: Pre,
  a: ExternalLink,
};
