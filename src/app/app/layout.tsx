"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AppHeader from "@/components/app-header";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { toast, Toaster } from "sonner";
import { useTranslations } from "next-intl";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const tNav = useTranslations("nav");

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/app") return tNav("overview");
    if (pathname.includes("/app/requests")) return tNav("allRequests");
    if (pathname.includes("/app/your-requests")) return tNav("myHistory");
    if (pathname.includes("/app/inventory")) return tNav("inventory");
    if (pathname.includes("/app/user-management")) return tNav("userManagement");
    if (pathname.includes("/app/unblocking")) return tNav("bookingWindows");
    if (pathname.includes("/app/audit")) return tNav("auditLogs");
    return tNav("overview");
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Not authenticated, redirect to login
      router.push("/auth/login");
      return;
    }

    try {
      user.setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      router.push("/auth/login");
    }

    setLoading(false);
  }, [router, pathname]);

  const protectedRoutes = [
    "/app/inventory",
    "/app/user-management",
    "/app/unblocking",
    "/app/audit",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user") || "{}";
    
    // Check if user is authenticated before role checks
    if (!userData || userData === "{}") {
      router.push("/auth/login");
      return;
    }
    
    if (JSON.parse(userData).role != "admin") {
      if (protectedRoutes.some((route) => pathname.includes(route))) {
        router.push("/app");
      }
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
          "--header-height": "4rem",
        } as React.CSSProperties
      }
      className="bg-slate-50"
    >
      <AppSidebar role={user.user?.role || ""} />

      <SidebarInset className="bg-transparent overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
          <AppHeader title={getPageTitle()} />
          <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">{children}</div>

          <Toaster richColors position="bottom-right" theme="light" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
