import {
	HomeIcon,
	Container,
	Database,
	Layers,
	Gpu,
	CalendarDays,
	BookCheck,
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

// Menu items.
const items: SideBarItem[] = [
	{
		title: "Overview",
		url: "/app",
		icon: CalendarDays,
		child: [],
	},
	{
		title: "Lab Requests",
		url: "/requests",
		icon: BookCheck,
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
							<SidebarMenuButton
								asChild
								className="data-[slot=sidebar-menu-button]:!p-1.5">
								<a href="/dashboard" className="py-10">
									<div className="flex h-5 w-5">
										<HomeIcon className="!size-6" />
									</div>
									<span className="text-xl font-semibold">Ketuk</span>
								</a>
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
