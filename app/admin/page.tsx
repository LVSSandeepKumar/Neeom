"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { use } from "react";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/admin/login");
  }

  return <AdminDashboard />;
}
