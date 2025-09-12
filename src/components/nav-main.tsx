import { ChevronDown } from "lucide-react";
import { SideBarItem } from "./type";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from "./ui/sidebar";
import Link from "next/link";

export default function NavMain(data: { data: SideBarItem[] }) {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{data.data &&
						data.data.map((item) =>
							item.child.length <= 0 ? (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span className="font-semibold">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							) : (
								<Collapsible
									key={item.title}
									className="group group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger className="flex items-center justify-between w-full group-data-[state=open]:bg-muted pr-2 hover:bg-muted">
											<div className="flex items-center gap-2 p-2">
												<item.icon className="h-4 w-4" />
												<span className="font-semibold">{item.title}</span>
											</div>
											<ChevronDown className="h-4 w-4 transition-transform -rotate-90 group-data-[state=open]:rotate-0" />
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.child.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuButton asChild>
															<Link href={subItem.url}>
																<subItem.icon />
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							)
						)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
