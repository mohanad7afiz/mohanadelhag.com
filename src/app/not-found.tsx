import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-bold tracking-tight text-accent">404</h1>
      <p className="mt-4 text-lg text-muted">
        This page does not exist. It may have been moved or removed.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="secondary" size="lg">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
