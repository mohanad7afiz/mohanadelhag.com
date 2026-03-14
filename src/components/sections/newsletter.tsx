"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="border-t border-border py-16">
      <Container size="narrow">
        <AnimateIn>
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Newsletter coming soon
            </h2>
            <p className="mb-8 text-muted">
              I am working on a newsletter. Leave your email and I will notify you when it launches.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                required
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button type="submit">Notify me</Button>
            </form>
            {submitted && (
              <p className="mt-4 text-sm text-accent" role="status">
                Thanks! You will be the first to know.
              </p>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
