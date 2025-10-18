import { Button } from "@/components/ui/button";
import SignInButton from "./signin-button";
import Link from "next/link";

export default function LandingHero(isLogin: { isLogin: boolean }) {
	return (
		<section className="relative min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
			<div className="bg-green-500/10 absolute top-50 right-1/2 aspect-square w-[24rem] rounded-full blur-3xl mix-blend-multiply"></div>
			<div className="bg-blue-400/15 absolute top-80 right-1/3 aspect-square w-[30rem] rounded-full blur-2xl mix-blend-multiply"></div>
			<div
				className="absolute inset-0 opacity-20"
				style={{
					WebkitMaskImage:
						"radial-gradient(circle at 50% 50%, white 40%, transparent 70%)",
					maskImage:
						"radial-gradient(circle at 50% 50%, white 40%, transparent 70%)",
				}}>
				<div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[length:20px_20px]" />
			</div>
			<div className="container mx-auto px-4 py-20 z-10 text-center">
				<div className="max-w-4xl mx-auto space-y-8">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
						Take control of
						<br />
						<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							Lab Management
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Ketuk platform that helps streamline lab management for RPL.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
						{/* <Button size="lg" className="text-lg px-8 py-4 h-auto">
							Get started
						</Button> */}
						{!isLogin.isLogin ? (
							<SignInButton />
						) : (
							<Link href="/app">
								<Button>Go to App</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
