import { DoorOpen } from "lucide-react";

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
import NavMain from "./nav-main";
import NavFooter from "./nav-footer";
import Link from "next/link";

export function AppSidebar({
	role,
	...props
}: { role: string } & React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			{/* <SidebarHeader /> */}
			<SidebarContent>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/app" className="flex items-center">
									<div className="flex h-6 w-6">
										<DoorOpen className="min-h-7 min-w-7" />
									</div>
									<span className="text-2xl font-semibold mb-0">Ketuk</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<Separator />
				<NavMain role={role} />
				<NavFooter />
			</SidebarContent>
		</Sidebar>
	);
}
