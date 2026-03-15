import Link from "next/link";

export function AboutSnippet() {
  return (
    <section className="about-snippet">
      <div className="container-main">
        <p className="about-snippet__text" data-reveal>
          Technologist with 9+ years building platforms that serve millions. I care about <em>architecture that scales</em>, developer experience, and code that lasts.
        </p>
        <Link href="/about" className="about-snippet__link" data-reveal>
          More about me
        </Link>
      </div>
    </section>
  );
}
