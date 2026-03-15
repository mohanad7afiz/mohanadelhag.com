import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Dock } from "@/components/layout/dock";
import { Footer } from "@/components/layout/footer";
import { RevealProvider } from "@/components/reveal-provider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohanadelhag.me"),
  title: {
    default: "Mohanad Elhag",
    template: "%s | Mohanad Elhag",
  },
  description:
    "Software Engineer building scalable web platforms across ecommerce, healthcare, and government sectors.",
  openGraph: {
    title: "Mohanad Elhag",
    description:
      "Software Engineer building scalable web platforms across ecommerce, healthcare, and government sectors.",
    url: "https://mohanadelhag.me",
    siteName: "Mohanad Elhag",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohanad Elhag",
    description:
      "Software Engineer building scalable web platforms across ecommerce, healthcare, and government sectors.",
    images: ["/og-default.png"],
  },
};

// Inline script to prevent FOUC. Sets data-theme before first paint.
// Content is a static string constant (no user input), so dangerouslySetInnerHTML is safe.
const themeInitScript = `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t)})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>
          <RevealProvider>
            <main>{children}</main>
            <Footer />
          </RevealProvider>
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  );
}
