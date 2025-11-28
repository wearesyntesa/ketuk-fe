import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Bell } from "lucide-react";
import Link from "next/link";

const AnnouncementItem = [
	{
		title: "New feature released",
		time: "2 hours ago",
		url: "#",
	},
	{
		title: "Scheduled maintenance",
		time: "1 day ago",
		url: "#",
	},
	{
		title: "Welcome to the platform",
		time: "3 days ago",
		url: "#",
	},
	{
		title: "Security update",
		time: "1 week ago",
		url: "#",
	}
]

export default function AppHeader({ title }: { title: string }) {
	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1 w-6 h-6" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<h1 className="text-xl font-medium">{title}</h1>
				<div className="flex ml-auto gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger className="p-1 rounded-full border border-slate-300 shadow">
							<Bell className="min-w-7 min-h-7" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>Announcements</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{AnnouncementItem.map((item, index) => (
								<DropdownMenuItem key={index} className="flex items-start">
									<div className="mr-2 mt-1 p-2 border rounded-full bg-primary/10 text-primary">
										<Bell className="size-4 flex-shrink-0" />
									</div>
									<div className="flex flex-col">
										<Link href={item.url} className="font-medium">
											{item.title}
										</Link>
										<span className="text-xs text-muted-foreground">
											{item.time}
										</span>
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}