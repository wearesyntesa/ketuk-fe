import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";

export default function LandingNav() {
	return (
		<nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-2">
						<CheckSquare className="h-8 w-8 text-primary" />
						<span className="text-xl font-bold">Ketuk</span>
					</div>

					<div className="flex items-center space-x-4">
						<Button variant="ghost" asChild>
							<Link href="/app">Login</Link>
						</Button>
						<Button asChild>
							<Link href="/app">Get started</Link>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
