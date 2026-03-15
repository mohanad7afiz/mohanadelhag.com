import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <h1 className="error-page__code">404</h1>
      <p className="error-page__message">
        This page does not exist. It may have been moved or removed.
      </p>
      <Link href="/" className="error-page__link">
        Go home
      </Link>
    </div>
  );
}
