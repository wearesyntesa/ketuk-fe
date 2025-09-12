import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";
import WeeklySchedulerWireframe from "@/components/weekly-scheduler-wireframe";

export default function Home() {
	return (
		<div className="min-h-screen">
			<LandingNav />
			<LandingHero />
			<WeeklySchedulerWireframe />
		</div>
	);
}
