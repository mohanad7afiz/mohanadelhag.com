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
    <section className="border-t border-border py-20">
      <Container size="narrow">
        <AnimateIn>
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Stay in the loop
            </h2>
            <p className="mb-8 text-muted">
              Get notified when I publish new articles and notes. No spam, ever.
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
                required
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            {submitted && (
              <p className="mt-4 text-sm text-accent">
                Coming soon — stay tuned!
              </p>
            )}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
