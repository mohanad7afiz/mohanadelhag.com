# Personal Website — Design Spec

## Overview

Rebuild Mohanad Elhag's personal website from scratch as a professional branding + thought leadership platform. The site markets Mohanad as a senior frontend engineer and provides a content platform for sharing knowledge and opinions through long-form articles and short-form notes.

## Goals

1. **Professional branding** — position Mohanad as a senior frontend engineer, attract opportunities
2. **Thought leadership** — share opinions, articles, and quick takes with the world
3. **Eye-catching design** — bold editorial aesthetic that stands out from generic dev portfolios

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **Animations:** Framer Motion
- **Content:** MDX via next-mdx-remote + gray-matter (files in repo)
- **Content utilities:** reading-time (word count / 200 wpm)
- **Code highlighting:** rehype-prism-plus (all languages included by default)
- **Package manager:** pnpm
- **Deployment:** Railway (standalone output mode)
- **Content format:** MDX files with YAML frontmatter

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (hero + highlights)
│   ├── about/page.tsx        # About page
│   ├── blog/page.tsx         # Blog listing (articles + notes)
│   ├── blog/[slug]/page.tsx  # Individual post
│   ├── projects/page.tsx     # Projects showcase
│   ├── layout.tsx            # Root layout + nav + footer
│   └── globals.css
├── components/
│   ├── ui/                   # Reusable primitives (Button, Card, Badge, etc.)
│   ├── sections/             # Page sections (Hero, etc.)
│   └── layout/               # Navbar, Footer
├── content/
│   ├── blog/                 # Long-form .mdx articles
│   └── notes/                # Short-form .mdx notes/thoughts
├── lib/
│   ├── mdx.ts                # MDX parsing utilities
│   └── utils.ts
├── data/
│   └── projects.ts           # Projects data file
└── types/
    └── index.ts
```

## Content Model

### Blog Post / Note Frontmatter

```yaml
---
title: "Post Title"
date: 2026-03-10
tags: [react, architecture]
type: article  # "article" for long-form, "note" for short-form
description: "Brief description for SEO and previews"
published: true
---
```

- Articles and notes live in separate directories (`content/blog/`, `content/notes/`)
- The `type` field distinguishes them in listings
- Both articles and notes route to `/blog/[slug]` — `generateStaticParams` scans both `content/blog/` and `content/notes/` directories
- Slugs are derived from the filename (e.g., `my-post.mdx` → `/blog/my-post`)
- `published: false` hides content from production builds but is visible in development (`next dev`) for previewing drafts
- **Reading time** is computed at build time using the `reading-time` library (~200 wpm), not stored in frontmatter

## Pages

### Home (`/`)

- **Hero:** Name, title, compelling one-liner. Eye-catching, not gimmicky.
- **Latest posts:** 3 most recent blog posts/notes
- **Featured projects:** 2-3 highlighted projects
- **About snippet:** Quick intro with link to full about page
- **Newsletter CTA:** Email capture component

### About (`/about`)

- Personal story — 9+ years in frontend, Salla, e-commerce at scale
- What Mohanad cares about (building products, sharing knowledge)
- Tech stack — visual representation, not a boring list
- Experience timeline — career history as a timeline section
- Social links (GitHub, LinkedIn, X/Twitter)

### Blog (`/blog`)

- Lists both articles and notes together, sorted by date (newest first)
- Filterable by tag
- Articles show: title, description, date, reading time, tags
- Notes show: title, date, tags (more compact)
- Type filter toggle (All / Articles / Notes)

### Blog Post (`/blog/[slug]`)

- Full MDX content with:
  - Syntax-highlighted code blocks (dark theme)
  - Reading time
  - Date and tags
  - Table of contents (for articles) — auto-generated from h2/h3 headings via rehype plugin at build time
  - Previous/Next post navigation
- Notes render in a more compact layout

### Projects (`/projects`)

- Card grid layout
- Each card: screenshot/image, title, description, tech tags, links (live + source)
- Data sourced from `src/data/projects.ts`

#### Project Type

```ts
interface Project {
  title: string;
  description: string;
  image?: string;           // Path to screenshot in /public/projects/
  tags: string[];            // Tech used (e.g., ["Next.js", "TypeScript"])
  liveUrl?: string;          // Live demo link
  sourceUrl?: string;        // GitHub repo link
  featured: boolean;         // Show on home page
}
```

### Contact

- Not a separate page
- Footer CTA with social links
- Optional: simple contact form (future enhancement)

### Newsletter

- Reusable email capture component placed on Home and Blog pages
- Backend integration deferred (Buttondown, Resend, or similar) — UI only for v1
- On submit: show a "Coming soon — stay tuned!" success toast. No data is stored or sent.

## Visual Design

### Aesthetic: Bold Editorial

- **Not** a generic dev portfolio with floating particles
- **Not** a terminal/hacker theme
- Clean, editorial feel with personality

### Theme

- Dark mode default with light mode toggle
- High contrast — dark background, bright accent color
- Accent color: **Electric blue** (`#3B82F6` / Tailwind `blue-500`) — energetic, professional, high contrast on dark backgrounds. CSS variable: `--color-accent`

### Typography

- **Body:** Inter or Geist Sans — clean, modern
- **Code:** Geist Mono — for code blocks and inline code accents
- **Headings:** Large, bold — editorial, not corporate
- **Line height:** Generous spacing for readability

### Layout

- Max-width content: ~768px for blog posts, ~1200px for other pages
- Plenty of whitespace
- Mobile-first responsive design

### Navigation

- Clean top navbar: logo/name + page links + theme toggle
- Sticky on scroll
- Mobile: slide-in menu from the right (Framer Motion animated)

### Animations

- Subtle scroll-triggered animations (Framer Motion)
- Smooth page transitions
- Hover effects on interactive elements
- Nothing flashy — polished and intentional

### Code Blocks

- Syntax highlighting via rehype-prism-plus
- Dark theme consistent with site palette
- Copy button on code blocks

## SEO & Metadata

- Use Next.js `generateMetadata` on all pages for dynamic `<head>` tags
- **Open Graph** tags on every page (title, description, image)
- **Twitter Card** tags (summary_large_image)
- Blog posts generate OG metadata from frontmatter (title, description)
- Default OG image in `/public/og-default.png` — posts can override with a `cover` frontmatter field
- Semantic HTML throughout (`<article>`, `<nav>`, `<main>`, `<section>`)

## Error Pages

- Custom `not-found.tsx` (404) consistent with site design — minimal message with link back to home
- Default Next.js error boundary for 500s (acceptable for v1)

## Data Flow

```
MDX files (content/blog/, content/notes/)
    ↓
lib/mdx.ts (gray-matter + next-mdx-remote)
    ↓
Static generation at build time (generateStaticParams)
    ↓
Pages render with full MDX content + components
```

- All content is statically generated at build time
- No client-side data fetching for content
- Projects data is a static TypeScript file

## Deployment

- **Platform:** Railway
- **Build:** `next build` with `output: "standalone"` in next.config.ts
- **Trigger:** Auto-deploy on push to main branch

## Out of Scope (v1)

- Notion sync for drafting
- Newsletter backend integration
- Contact form backend
- Analytics (can add later)
- RSS feed (can add later)
- i18n / Arabic version
