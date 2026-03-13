import Link from "next/link";
import { Container } from "@/components/ui/container";
import { AnimateIn } from "@/components/ui/animate-in";

export function AboutSnippet() {
  return (
    <section className="py-20">
      <Container size="narrow">
        <AnimateIn>
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            A bit about me
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a senior frontend engineer with 9+ years of experience
              building web applications that serve millions of users. Currently
              at Salla, where I work on the platform that powers thousands of
              e-commerce stores.
            </p>
            <p>
              I care deeply about developer experience, performance, and
              building products that make a real difference. When I&apos;m not
              coding, I&apos;m writing about what I learn and sharing it with
              the community.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
          >
            Learn more about me &rarr;
          </Link>
        </AnimateIn>
      </Container>
    </section>
  );
}
