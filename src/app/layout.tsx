import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohanadelhag.com"),
  title: {
    default: "Mohanad Elhag",
    template: "%s | Mohanad Elhag",
  },
  description:
    "Senior Frontend Engineer — building products, sharing knowledge.",
  openGraph: {
    title: "Mohanad Elhag",
    description:
      "Senior Frontend Engineer — building products, sharing knowledge.",
    url: "https://mohanadelhag.com",
    siteName: "Mohanad Elhag",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohanad Elhag",
    description:
      "Senior Frontend Engineer — building products, sharing knowledge.",
    images: ["/og-default.png"],
  },
};

// Inline script to prevent FOUC — reads theme from localStorage before paint.
// Content is fully static (no user input), so dangerouslySetInnerHTML is safe here.
const themeInitScript = `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t)})()`;

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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
