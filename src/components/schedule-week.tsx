import { monthlySchedule } from "@/app/app/data";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import ScheduleCard from "./schedule-card";

export default function ScheduleWeek() {
	return (
		<ScrollArea className="rounded-lg w-full">
			<div className="flex gap-4 w-full">
				<ScheduleCard events={monthlySchedule} />
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
