import {
	CalendarDays,
	BookCheck,
	Archive,
	DoorOpen,
	Ticket,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import React from "react";
import { Separator } from "./ui/separator";
import { SideBarItem } from "@/components/type";
import NavMain from "./nav-main";
import NavFooter from "./nav-footer";
import Link from "next/link";

// Menu items.
const items: SideBarItem[] = [
	{
		title: "Overview",
		url: "/app",
		icon: CalendarDays,
		child: [],
	},
	{
		title: "Requests Schedule",
		url: "/app/requests",
		icon: BookCheck,
		child: [],
	},
	{
		title: "Inventory",
		url: "/app/inventory",
		icon: Archive,
		child: [],
	},
	{
		title: "Requests History",
		url: "/app/your-requests",
		icon: Ticket,
		child: [],
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			{/* <SidebarHeader /> */}
			<SidebarContent>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/app" className="flex items-center">
									<div className="flex h-5 w-5">
										<DoorOpen className="!size-6" />
									</div>
									<span className="text-lg font-semibold mb-0">Ketuk</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<Separator />
				<NavMain data={items} />
				<NavFooter />
			</SidebarContent>
		</Sidebar>
	);
}
