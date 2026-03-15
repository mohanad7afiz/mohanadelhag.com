import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mohanad Elhag, a Software Engineer with over 9 years building scalable web platforms.",
};

const capabilities = [
  {
    title: "Architecture",
    desc: "Designing scalable frontend systems, micro service ecosystems, and component architectures that support parallel team delivery.",
  },
  {
    title: "Engineering Delivery",
    desc: "Managing technical delivery from planning to production. Identifying risks early and implementing mitigation strategies.",
  },
  {
    title: "Team Development",
    desc: "Mentoring engineers through code reviews, architecture guidance, and career development. Establishing standards and best practices.",
  },
  {
    title: "Stakeholder Collaboration",
    desc: "Collaborating directly with stakeholders to translate business requirements into scalable technical solutions.",
  },
];

const experience = [
  {
    period: "2024 to Present",
    role: "Senior Frontend Engineer",
    company: "Salla",
    companyUrl: "https://salla.com",
    desc: "Led the architecture for Salla Merchant Dashboard (v4) using React and TypeScript, introducing a scalable micro service ecosystem enabling independent module ownership and parallel team delivery.",
  },
  {
    period: "2020 to 2023",
    role: "Senior Frontend Engineer",
    company: "LEAN",
    companyUrl: "https://lean.sa/",
    desc: "Directed architecture decisions across nationwide digital health platforms (Sehhaty & Seha) built with React and TypeScript. Designed component architecture and state management approaches for scalable systems.",
  },
  {
    period: "2019 to 2020",
    role: "Software Engineer",
    company: "Osloob",
    companyUrl: "https://osloob.com.sa/",
    desc: "Designed scalable solutions using component based architecture with Vue.js and TypeScript. Established reusable UI patterns and engineering standards.",
  },
  {
    period: "2015 to 2019",
    role: "Front End Developer",
    company: "Freelancer",
    desc: "Developed responsive web applications and reusable UI components using JavaScript and modern CSS.",
  },
  {
    period: "2012 to 2013",
    role: "Web Developer Intern",
    company: "Jazan University",
    companyUrl: "https://www.jazanu.edu.sa/en",
    desc: "Designed and implemented responsive web interfaces. Supported development and debugging of web features.",
  },
];

const techItems = [
  "TypeScript", "React", "Vue.js", "Next.js", "Nuxt", "Angular",
  "Tailwind CSS", "Sass", "CSS Modules",
  "Micro Frontends", "Design Systems", "State Management",
  "Vite", "Webpack", "Docker", "AWS", "CI/CD",
  "REST APIs", "GraphQL", "Node.js", "PostgreSQL",
  "Performance Profiling", "Accessibility (WCAG)", "Testing Strategies",
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="about-hero">
        <div className="container-main">
          <h1 className="about-hero__title" data-reveal>
            Technologist<br />building for scale
          </h1>
          <p className="about-hero__intro" data-reveal>
            I&apos;m Mohanad Elhag, a Software Engineer and Frontend Architect based in Riyadh, Saudi Arabia. For over 9 years, I&apos;ve been building scalable web platforms across ecommerce, healthcare, and government sectors.
          </p>
        </div>
      </section>

      {/* What I Do */}
      <section className="about-section" data-reveal>
        <div className="container-main">
          <h2 className="about-section__title">What I Do</h2>
          <div className="about-section__grid">
            {capabilities.map((item) => (
              <div key={item.title}>
                <h3 className="about-card__title">{item.title}</h3>
                <p className="about-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="about-section" data-reveal>
        <div className="container-main">
          <h2 className="about-section__title">Experience</h2>
          <div className="timeline">
            {experience.map((job) => (
              <div key={job.period} className="timeline-item">
                <div className="timeline-item__period">{job.period}</div>
                <div className="timeline-item__content">
                  <div className="timeline-item__role">{job.role}</div>
                  <div className="timeline-item__company">
                    {job.companyUrl ? (
                      <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </div>
                  <p className="timeline-item__desc">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="about-section" data-reveal>
        <div className="container-main">
          <h2 className="about-section__title">Tech</h2>
          <div className="tech-grid">
            {techItems.map((item) => (
              <span key={item} className="tech-item">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="about-section" data-reveal>
        <div className="container-main">
          <h2 className="about-section__title">Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-item__period">2015</div>
              <div className="timeline-item__content">
                <div className="timeline-item__role">B.Sc. in ICT, Software Engineering</div>
                <div className="timeline-item__company">
                  <a href="http://utp.edu.my/" target="_blank" rel="noopener noreferrer">
                    Universiti Teknologi PETRONAS
                  </a>, Malaysia
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="about-section" data-reveal>
        <div className="container-main">
          <h2 className="about-section__title">Connect</h2>
          <div style={{ display: "flex", gap: "var(--space-lg)" }}>
            <a href="https://github.com/mohanad7afiz" target="_blank" rel="noopener noreferrer" className="site-footer__link" style={{ fontSize: "var(--text-sm)" }}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/mohanad7afiz" target="_blank" rel="noopener noreferrer" className="site-footer__link" style={{ fontSize: "var(--text-sm)" }}>
              LinkedIn
            </a>
            <a href="https://x.com/mohanad7afiz" target="_blank" rel="noopener noreferrer" className="site-footer__link" style={{ fontSize: "var(--text-sm)" }}>
              X
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
