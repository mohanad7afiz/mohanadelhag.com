import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page is public — skip shell wrapper
  if (!user) {
    return <>{children}</>;
  }

  // Defensive redirect (middleware should catch this, but just in case)
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
