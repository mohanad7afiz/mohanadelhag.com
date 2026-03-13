# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Mohanad Elhag — a professional branding + thought leadership platform built as a bold editorial-style site (not a generic dev portfolio). See `2026-03-13-personal-website-design.md` for the full design spec.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **Animations:** Framer Motion
- **Content:** MDX via next-mdx-remote + gray-matter (files in repo, statically generated)
- **Code highlighting:** rehype-prism-plus
- **Package manager:** pnpm
- **Deployment:** Railway (standalone output mode)

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (standalone output)
pnpm lint         # Run ESLint
```

## Architecture

### Content System
- MDX files in `src/content/blog/` (articles) and `src/content/notes/` (short-form)
- Both route to `/blog/[slug]` — `generateStaticParams` scans both directories
- Slug derived from filename: `my-post.mdx` → `/blog/my-post`
- `published: false` hides from production but visible in `next dev`
- Reading time computed at build time (~200 wpm), not stored in frontmatter
- `src/lib/mdx.ts` handles all MDX parsing (gray-matter + next-mdx-remote)

### Data Flow
All content is statically generated at build time — no client-side data fetching for content. Projects data lives in `src/data/projects.ts` as a static TypeScript file.

### Key Directories
- `src/components/ui/` — reusable primitives (Button, Card, Badge)
- `src/components/sections/` — page sections (Hero, etc.)
- `src/components/layout/` — Navbar, Footer
- `src/types/index.ts` — shared type definitions

### Design Decisions
- **Dark mode default** with light mode toggle
- **Accent color:** Electric blue (`#3B82F6`) via CSS variable `--color-accent`
- **Typography:** Inter/Geist Sans for body, Geist Mono for code
- **Content width:** ~768px for blog posts, ~1200px for other pages
- **Navigation:** Sticky top navbar, mobile slide-in menu (Framer Motion)
- SEO via Next.js `generateMetadata` on all pages with Open Graph + Twitter Card tags

### Newsletter (v1)
UI-only email capture component — no backend. Shows "Coming soon" toast on submit.
