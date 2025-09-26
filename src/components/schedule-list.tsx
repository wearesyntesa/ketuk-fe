import { RequestDialog } from "./request-dialog";
import ScheduleCard from "./schedule-card";
import { ScheduleProps } from "./type";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function ScheduleList({
	schedules,
}: {
	schedules: ScheduleProps[];
}) {
	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">This Weeks Schedule</h1>
				{/* <Button className="bg-blue-400">Request Lab +</Button> */}
				<RequestDialog />
			</div>

			<ScrollArea className="rounded-lg w-full">
				<div className="flex gap-4 w-full">
					{schedules.map((schedule, index) => (
						<ScheduleCard key={index} {...schedule} />
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
