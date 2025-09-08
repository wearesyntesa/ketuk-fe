import { SectionCards } from "@/components/section-cards";
import AppHeader from "@/components/app-header";
import ScheduleList from "@/components/schedule-list";
import { schedules } from "./data";

export default function Dashboard() {
	return (
		<>
			<AppHeader title="Dashboard" />
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<ScheduleList schedules={schedules} />
				<div className="px-4 lg:gap-2 lg:px-6">
					{/* <ChartAreaInteractive /> */}
				</div>
			</div>
		</>
	);
}
