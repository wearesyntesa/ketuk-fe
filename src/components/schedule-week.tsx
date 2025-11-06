"use client";

import { monthlySchedule } from "@/app/app/data";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import ScheduleCard from "./schedule-card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function ScheduleWeek() {
	const baseDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const todayDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
	const startIndex = todayDay === 0 || todayDay === 6 ? 0 : todayDay - 1;
	const days = baseDays.slice(startIndex).concat(baseDays.slice(0, startIndex));

	return (
		<ScrollArea className="rounded-lg w-full">
			<div className="flex flex-col gap-4 w-full">
				{/* <ScheduleCard events={monthlySchedule} /> */}
				<Tabs defaultValue={days[0]} className="flex flex-row w-full">
					<TabsList className="flex flex-col h-full">
						{days.map((day, id) => (
							<TabsTrigger
								key={id}
								value={day}
								className="flex min-h-20 md:w-fit">
								<div className="flex flex-col items-start">
									<span className="font-medium">{day}</span>
									<span className="text-sm text-muted-foreground">
										{(() => {
											const now = new Date();
											// normalize getDay(): Mon=1 .. Sun=7
											const currWeekday = now.getDay() === 0 ? 7 : now.getDay();
											// baseDays index -> weekday number (Monday = 1)
											const targetWeekday = startIndex + 1;
											// date for the first item (corresponding to baseDays[startIndex])
											const firstDate = new Date(now);
											firstDate.setDate(
												now.getDate() + (targetWeekday - currWeekday)
											);
											// date for this entry
											const dayDate = new Date(firstDate);
											dayDate.setDate(firstDate.getDate() + id);
											return dayDate.toLocaleString("en-US", {
												day: "numeric",
												month: "short",
												year: "numeric",
											});
										})()}
									</span>
								</div>
							</TabsTrigger>
						))}
					</TabsList>
					{days.map((day, id) => (
						<ScheduleCard events={monthlySchedule} day={day} id={id} key={id} />
					))}
				</Tabs>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
