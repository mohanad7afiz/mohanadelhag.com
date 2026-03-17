"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else if (res.status === 409) {
        setStatus("duplicate");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
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
            disabled={status === "loading"}
            className="newsletter-input"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="newsletter-btn"
          >
            {status === "loading" ? "Subscribing..." : "Notify me"}
          </button>
        </form>
        {status === "success" && (
          <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }} role="status">
            Thanks! You will be the first to know.
          </p>
        )}
        {status === "duplicate" && (
          <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-sm)", color: "var(--fg-muted)" }} role="status">
            You are already subscribed!
          </p>
        )}
        {status === "error" && (
          <p style={{ marginTop: "var(--space-md)", fontSize: "var(--text-sm)", color: "#f97583" }} role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
