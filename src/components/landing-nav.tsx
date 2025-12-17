"use client";

import { DoorOpen } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOutButton } from "./signout-button";
import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { Button } from "./ui/button";
import { InitialIcon } from "./initial-icon";

export default function LandingNav(isLogin: { isLogin: boolean }) {
	const user = useUser();

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				user.setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		}
	}, []);
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
								{/* <Image
									src={session?.user?.image || "/default-avatar.png"}
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full border border-slate-300 shadow"
								/> */}
								{InitialIcon(user.user?.name || "User")}
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem className="w-full">
									<SignOutButton />
								</DropdownMenuItem>
								<DropdownMenuItem className="w-full">
									<Link href="/app/app" className="w-full flex">
										<Button variant="default" className="w-full flex">
											Go to Dashboard
										</Button>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</div>
		</nav>
	);
}
