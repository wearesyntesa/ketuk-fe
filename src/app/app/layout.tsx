"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import WarningEmail from "@/components/warning-email";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import AppHeader from "@/components/app-header";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const pathname = usePathname();
	const [loading, setLoading] = useState(true);
	const [header, setHeader] = useState("Dashboard");
	const user = useUser();

	useEffect(() => {
		// Check if user is authenticated
		setHeader(() => {
			if (pathname.includes("/app/requests")) return "Request Schedule";
			if (pathname.includes("/app/your-requests")) return "Requests History";
			if (pathname.includes("/app/inventory")) return "Inventory";
			if (pathname.includes("/app/user-management")) return "User Management";
			if (pathname.includes("/app/unblocking")) return "Unblocking";
			return "Dashboard";
		});
		const token = localStorage.getItem("access_token");
		const userData = localStorage.getItem("user");

		if (!token || !userData) {
			// Not authenticated, redirect to login
			// window.location.href = "/auth/login";
			router.push("/auth/login");
			return;
		}

		try {
			user.setUser(JSON.parse(userData));
		} catch (error) {
			console.error("Failed to parse user data:", error);
			// window.location.href = "/auth/login";
			// return;
			router.push("/auth/login");
		}

		setLoading(false);
	}, [router, pathname]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
			</div>
		);
	}

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
			className="bg-sidebar">
			<AppSidebar role={user.user?.role || ""} variant="inset" />
			<SidebarInset>
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 md:gap-6">
							<AppHeader title={header} />
							{children}
							{/* <Toaster position="bottom-right" /> */}
							<WarningEmail email={user.user?.email || ""} />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
