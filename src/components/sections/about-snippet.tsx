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
              Engineering Leader with 9+ years of experience building scalable
              web platforms across ecommerce, healthcare, and government sectors.
              I combine deep frontend architecture expertise with strong
              leadership in engineering delivery and team development.
            </p>
            <p>
              Currently at Salla, where I lead the frontend architecture for the
              merchant dashboard powering thousands of online stores across the
              MENA region.
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
