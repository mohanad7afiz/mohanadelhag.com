"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export function AdminShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link href="/admin" className="admin-sidebar__logo">
            Admin
          </Link>
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link${
                pathname === item.href ? " active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <span className="admin-sidebar__email">{user.email}</span>
          <button onClick={handleSignOut} className="admin-sidebar__signout">
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
