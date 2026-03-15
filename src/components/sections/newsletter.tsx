"use client";

import { useState } from "react";

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
    <section className="newsletter-section" style={{ width: "100%" }}>
      <div className="container-narrow">
        <h2 className="newsletter-section__title" data-reveal>Newsletter coming soon</h2>
        <p className="newsletter-section__desc" data-reveal>
          I am working on a newsletter. Leave your email and I will notify you when it launches.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form" data-reveal>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            required
            className="newsletter-input"
          />
          <button type="submit" className="newsletter-btn">Notify me</button>
        </form>
        {submitted && (
          <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }} role="status">
            Thanks! You will be the first to know.
          </p>
        )}
      </div>
    </section>
  );
}
