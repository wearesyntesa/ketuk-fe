import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Ketuk Dashboard - Lab Management",
	description: "Manage your lab bookings and schedules",
};

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		redirect("/");
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
			<AppSidebar variant="inset" />
			<SidebarInset>
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 md:gap-6">{children}</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
