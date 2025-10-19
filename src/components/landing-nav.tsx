import { DoorOpen } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { auth } from "@/app/auth";
import { SignOutButton } from "./signout-button";

export default async function LandingNav(isLogin: { isLogin: boolean }) {
	const session = await auth();
	return (
		<nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-2">
						<DoorOpen className="h-8 w-8 text-primary" />
						<span className="text-xl font-bold">Ketuk</span>
					</div>

					{/* <div className="flex items-center space-x-4">
						<Button variant="ghost" asChild>
							<Link href="/app">Login</Link>
						</Button>
						<Button asChild>
							<Link href="/app">Get started</Link>
						</Button>
					</div> */}
					{isLogin.isLogin && (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Image
									src={session?.user?.image || "/default-avatar.png"}
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full border border-slate-300 shadow"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem className="w-full">
									<SignOutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</div>
		</nav>
	);
}
