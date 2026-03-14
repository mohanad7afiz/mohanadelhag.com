import type { Metadata } from "next";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Sign up to be notified when Mohanad Elhag launches his newsletter on frontend engineering, architecture, and building products.",
};

export default function NewsletterPage() {
  return (
    <div className="flex min-h-[60vh] items-center">
      <Newsletter />
    </div>
  );
}
