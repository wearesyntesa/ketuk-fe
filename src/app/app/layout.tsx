"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import AppHeader from "@/components/app-header";
import { toast, Toaster } from "sonner";

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
	}, [router]);

	const updateUserData = (token: string, id: number) => {
		user.handleUserbyID(token, id).then((data) => {
			user.setUser(data);
			localStorage.setItem("user", JSON.stringify(data));
		})
	}

	const protectedRoutes = [
		"/app/requests",
		"/app/inventory",
		"/app/user-management",
		"/app/unblocking",
		"/app/audit",
		"/app/your-requests",
	];

	useEffect(() => {
		const userData = localStorage.getItem("user") || "{}";
		setHeader(() => {
			if (pathname.includes("/app/requests")) return "Request Schedule";
			if (pathname.includes("/app/inventory")) return "Inventory";
			if (pathname.includes("/app/user-management")) return "User Management";
			if (pathname.includes("/app/unblocking")) return "Unblocking";
			if (pathname.includes("/app/audit")) return "Audit Logs";
			return "Dashboard";
		});
		if (JSON.parse(userData).name != "" || JSON.parse(userData).name != undefined ) {
			updateUserData(
				localStorage.getItem("access_token") || "",
				JSON.parse(userData).id
			);
		}
		if (JSON.parse(userData).role != "admin") {
			if (protectedRoutes.some((route) => pathname.includes(route))) {
				// window.location.href = "/app";
				router.push("/app");
			}
		}
		if (
			JSON.parse(userData).role === "admin" &&
			pathname.includes("/app/your-requests")
		) {
			setHeader("Requests List");
		}
		if (
			JSON.parse(userData).role !== "admin" &&
			pathname.includes("/app/your-requests")
		) {
			setHeader("Requests History");
		}
		console.log("Pathname changed:", user.user?.role);
	}, [pathname]);

	useEffect(() => {
		if (user.user && user.user?.email.includes("unesa.ac.id") === false) {
			console.log("Non-UNESA email detected");
			toast.warning("You are using a non-UNESA email address. Please sign in with your UNESA email to access all features.", {
				duration: 8000,
			});
		}
	}, [user.user?.email]);

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
							{/* <WarningEmail email={user.user?.email || ""} /> */}
							<Toaster richColors position="bottom-right" />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
