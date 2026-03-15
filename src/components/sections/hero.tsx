import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="container-main">
        <div className="hero__content">
          <p className="hero__greeting" data-reveal>Software Engineer</p>
          <h1 className="hero__name" data-reveal>
            Building scalable<br />web <em>platforms</em>
          </h1>
          <p className="hero__description" data-reveal>
            I build frontend architecture across ecommerce, healthcare, and government platforms. Currently shaping the merchant experience at Salla.
          </p>
          <div className="hero__links" data-reveal>
            <Link href="/blog" className="hero__link">
              Read the blog
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 12l4-4-4-4" />
              </svg>
            </Link>
            <Link href="/about" className="hero__link">
              About me
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 12l4-4-4-4" />
              </svg>
            </Link>
            <a href="https://github.com/mohanad7afiz" target="_blank" rel="noopener noreferrer" className="hero__link">
              GitHub
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12l8-8M12 4v8M12 4H4" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
