import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";
import ScheduleList from "@/components/schedule-list";
import { schedules } from "./app/data";

export default function Home() {
	return (
		<div className="min-h-screen">
			<LandingNav />
			<LandingHero />
			<div className="px-4 gap-4 lg:px-6 flex flex-col">
				<ScheduleList schedules={schedules} />
			</div>
		</div>
	);
}
