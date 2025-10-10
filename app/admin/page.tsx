"use client";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/admin/login");
  }

  return <AdminDashboard />;
}
