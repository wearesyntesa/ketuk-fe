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

const items: SideBarItem[] = [
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

export default function NavMain() {
	const pathname = usePathname();
	console.log("Current Pathname:", pathname);

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className="gap-4">
					{items &&
						items.map(
							(item) => (
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
							)
							// item.child.length <= 0 ? (
							// ) : (
							// 	<Collapsible
							// 		key={item.title}
							// 		className="group group/collapsible">
							// 		<SidebarMenuItem>
							// 			<CollapsibleTrigger className="flex items-center justify-between w-full group-data-[state=open]:bg-muted pr-2 hover:bg-muted">
							// 				<div className="flex items-center gap-2 p-2">
							// 					{item.icon}
							// 					<span className="font-semibold">{item.title}</span>
							// 				</div>
							// 				<ChevronDown className="h-4 w-4 transition-transform -rotate-90 group-data-[state=open]:rotate-0" />
							// 			</CollapsibleTrigger>
							// 			<CollapsibleContent>
							// 				<SidebarMenuSub>
							// 					{item.child.map((subItem) => (
							// 						<SidebarMenuSubItem key={subItem.title}>
							// 							<SidebarMenuButton asChild>
							// 								<Link href={subItem.url}>
							// 									<subItem.icon />
							// 									<span>{subItem.title}</span>
							// 								</Link>
							// 							</SidebarMenuButton>
							// 						</SidebarMenuSubItem>
							// 					))}
							// 				</SidebarMenuSub>
							// 			</CollapsibleContent>
							// 		</SidebarMenuItem>
							// 	</Collapsible>
							// )
						)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
