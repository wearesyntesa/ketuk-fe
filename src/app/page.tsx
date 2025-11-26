import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";
import { schedules } from "./app/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ScheduleCard from "@/components/schedule-card";
import { auth } from "./auth";

export default async function Home() {
	const session = await auth();
	return (
		<div className="min-h-screen">
			<LandingNav isLogin={session ? true : false} />
			<LandingHero isLogin={session ? true : false} />
			<div className="px-4 gap-4 lg:px-6 flex flex-col">
				<ScrollArea className="rounded-lg w-full">
					<div className="flex gap-4 w-full">
						{schedules.map((schedule, index) => (
							<ScheduleCard key={index} {...schedule} />
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
}
