"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/mohanad7afiz" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohanad7afiz" },
  { label: "X", href: "https://x.com/mohanad7afiz" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="site-footer">
      <div className="container-main">
        <div className="site-footer__content">
          <p className="site-footer__copy">
            &copy; {new Date().getFullYear()} Mohanad Elhag
          </p>
          <div className="site-footer__links">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
