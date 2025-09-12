import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";

export default function Home() {
	return (
		<div className="min-h-screen">
			<LandingNav />
			<LandingHero />
		</div>
	);
}
