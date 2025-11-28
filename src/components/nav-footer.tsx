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
import { auth } from "@/app/auth";
import Image from "next/image";
import { SignOutButton } from "./signout-button";

export default async function NavFooter() {
	const session = await auth();

	return (
		<SidebarFooter className="mt-auto">
			<SidebarMenu>
				{/* <SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/app/your-requests">
							<Ticket />
							<span className="font-semibold">Your Requests</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem> */}
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/help" className="gap-4">
							<HelpCircle className="min-w-6 min-h-6" />
							<span className="font-semibold text-xl">Support</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href="/app/settings" className="gap-4">
							<SettingsIcon className="min-w-6 min-h-6" />
							<span className="font-semibold text-xl">Settings</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<Separator />
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<div className="h-12 flex justify-between items-center px-2">
							<div className="flex gap-2 justify-center items-center">
								{/* <div
									className={`w-10 h-10 px-4 rounded-full flex items-center justify-center font-medium bg-orange-100 text-orange-700`}>
									U
								</div> */}
								<Image
									src={session?.user?.image ?? "/default-avatar.png"}
									width={40}
									height={40}
									alt="User Avatar"
									className="w-8 h-8 rounded-full"
								/>
								<span className="font-semibold text-xl">Account</span>
							</div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger className="p-2 flex justify-center items-center rounded-md hover:bg-accent/50 w-fit">
										<EllipsisVertical className="h-5 w-5 cursor-pointer text-muted-foreground" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>
											<SignOutButton />
										</DropdownMenuItem>
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
