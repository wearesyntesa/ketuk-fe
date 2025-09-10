import { Button } from "@/components/ui/button";

export default function LandingHero() {
	return (
		<section className="relative min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
			<div className="container mx-auto px-4 py-20 text-center">
				<div className="max-w-4xl mx-auto space-y-8">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
						Take control of
						<br />
						<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							Lab Management
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Ketuk platform that helps streamline lab management.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
						<Button size="lg" className="text-lg px-8 py-4 h-auto">
							Get started
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
