"use client";

import { Archive, BookCheck, CalendarDays, Ticket } from "lucide-react";
import { SideBarItem } from "./type";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const itemsAdmin: SideBarItem[] = [
	{
		title: "Overview",
		url: "/app",
		icon: CalendarDays,
		child: [],
		bgGradient: "bg-linear-to-r from-amber-300 to-amber-50",
	},
	{
		title: "Requests Schedule",
		url: "/app/requests",
		icon: BookCheck,
		child: [],
		bgGradient: "bg-linear-to-r from-cyan-300 to-cyan-50",
	},
	{
		title: "Requests History",
		url: "/app/your-requests",
		icon: Ticket,
		child: [],
		bgGradient: "bg-linear-to-r from-lime-300 to-lime-50",
	},
	{
		title: "Inventory",
		url: "/app/inventory",
		icon: Archive,
		child: [],
		bgGradient: "bg-linear-to-r from-violet-300 to-violet-50",
	},
];

const itemsUser: SideBarItem[] = [
	{
		title: "Overview",
		url: "/app",
		icon: CalendarDays,
		child: [],
		bgGradient: "bg-linear-to-r from-amber-300 to-amber-50",
	},
	{
		title: "Requests Schedule",
		url: "/app/requests",
		icon: BookCheck,
		child: [],
		bgGradient: "bg-linear-to-r from-cyan-300 to-cyan-50",
	},
	{
		title: "Requests History",
		url: "/app/your-requests",
		icon: Ticket,
		child: [],
		bgGradient: "bg-linear-to-r from-lime-300 to-lime-50",
	},
];

export default function NavMain({ role }: { role: string }) {
	const pathname = usePathname();

	const items = role === "admin" ? itemsAdmin : itemsUser;

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className="gap-4">
					{items &&
						items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton
									asChild
									className={`h-10 ${
										pathname === item.url
											? "bg-none data-[state=open]:hover:bg-white"
											: ""
									}`}>
									<Link
										href={item.url}
										className={`${
											pathname === item.url ? "relative z-10" : ""
										} gap-4`}>
										<item.icon className="min-w-6 min-h-6" />
										<span className="font-semibold text-xl hover:text-primary">
											{item.title}
										</span>
										<div
											className={`${
												pathname === item.url
													? `absolute w-48 h-5 ${item.bgGradient} top-4 z-[-1]`
													: ""
											}`}
										/>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
