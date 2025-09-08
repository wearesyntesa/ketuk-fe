import { HelpCircle, SettingsIcon } from "lucide-react";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function NavFooter() {
    return (
        <SidebarFooter className="mt-auto">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/dashboard/settings">
									<SettingsIcon />
									<span className="font-semibold">Settings</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<Separator />
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<a href="/help">
									<HelpCircle />
									<span className="font-semibold">Support</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
    )
}