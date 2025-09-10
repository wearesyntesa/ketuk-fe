import {
	EllipsisVertical,
	HelpCircle,
	SettingsIcon,
	Ticket,
} from "lucide-react";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavFooter() {
	return (
		<SidebarFooter className="mt-auto">
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/app/your-requests">
							<Ticket />
							<span className="font-semibold">Your Requests</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<a href="/help">
							<HelpCircle />
							<span className="font-semibold">Support</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/app/settings">
							<SettingsIcon />
							<span className="font-semibold">Settings</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<Separator />
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<div className="h-12 flex justify-between items-center px-2">
							<div className="flex gap-2 justify-center items-center">
								<div
									className={`w-10 h-10 px-4 rounded-full flex items-center justify-center font-medium bg-orange-100 text-orange-700`}>
									U
								</div>
								<span className="font-semibold">Account</span>
							</div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger className="p-2 flex justify-center items-center rounded-md hover:bg-accent/50 w-fit">
										<EllipsisVertical className="h-5 w-5 cursor-pointer text-muted-foreground" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>Edit</DropdownMenuItem>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
