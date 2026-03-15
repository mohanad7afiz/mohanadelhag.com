import type { Metadata } from "next";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Sign up to be notified when Mohanad Elhag launches his newsletter.",
};

export default function NewsletterPage() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Newsletter />
    </div>
  );
}
