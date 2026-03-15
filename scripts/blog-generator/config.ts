export const TOPIC_POOLS = {
  "AI & Machine Learning": [
    "AI agents in production: what actually works vs what's hype",
    "Using LLMs as a developer tool without becoming dependent on them",
    "The economics of running AI features in production apps",
    "Code generation tools: where they save time and where they waste it",
    "Open source vs proprietary AI models: a practical comparison",
    "RAG patterns that actually scale in real applications",
    "Multimodal AI: practical use cases beyond demos",
    "Fine-tuning vs prompt engineering: when each makes sense",
    "Building AI-powered features that users actually want",
    "The hidden costs of integrating AI into existing products",
  ],
  "Frontend & Web Technology": [
    "Server-side rendering in 2026: what's changed and what hasn't",
    "WebAssembly for frontend developers: real-world applications",
    "Edge computing patterns for web applications",
    "Design systems that actually get adopted by teams",
    "Web performance patterns that move the needle",
    "React Server Components in practice: lessons learned",
    "Building accessible UIs without sacrificing developer experience",
    "The state of CSS in 2026: what you should actually be using",
    "TypeScript patterns that make frontend code maintainable",
    "Progressive enhancement in the age of SPAs",
  ],
  "Engineering Culture": [
    "Technical decision-making when there's no clear right answer",
    "The staff engineer mindset: thinking beyond your team",
    "Building for scale vs building for speed: a framework",
    "Writing technical specs that people actually read",
    "Code review culture that makes teams better, not slower",
    "Managing technical debt without stopping feature work",
    "Onboarding engineers to a complex codebase effectively",
    "When to refactor and when to rewrite: a practical guide",
    "Building engineering culture in fast-growing companies",
    "Incident response: what I learned from production failures",
  ],
} as const;

export type TopicCategory = keyof typeof TOPIC_POOLS;

export const EXCLUDED_TOPICS = [
  "blockchain",
  "crypto",
  "cryptocurrency",
  "NFT",
  "metaverse",
  "web3",
] as const;

export const VOICE_CONFIG = {
  persona:
    "Mohanad Elhag, a senior software engineer with 9+ years of experience. Built and scaled e-commerce platforms at Salla (Saudi Arabia's largest e-commerce platform). Works across the full stack but specializes in frontend architecture with TypeScript, React, Vue, and Next.js.",
  tone: [
    "Pragmatic and direct",
    "Opinionated but backs it up with evidence and experience",
    "Uses concrete examples from real projects",
    "No filler phrases or corporate buzzwords",
    "First person voice",
  ],
  style: [
    "Short, punchy paragraphs (2-4 sentences max)",
    "Bold claims followed by reasoning",
    "TypeScript/React/Next.js code examples when relevant",
    "Practical takeaways the reader can use immediately",
    "800-1500 words target length",
  ],
} as const;
