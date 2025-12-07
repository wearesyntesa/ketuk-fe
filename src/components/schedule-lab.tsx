"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RequestDialog } from "./request-dialog";
import ScheduleMonth from "./schedule-month";
import ScheduleWeek from "./schedule-week";
import { MonthlyEvent } from "./type";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import ScheduleList from "./schedule-list";
import { monthlySchedule } from "@/app/app/data";
import { useState } from "react";

const tableHeader: ColumnDef<MonthlyEvent>[] = [
	{
		accessorKey: "title",
		header: "Title Event",
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "contact",
		header: "Contact",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "startTime",
		header: "Start Time",
	},
	{
		accessorKey: "endTime",
		header: "End Time",
	}
]

export default function ScheduleLab() {
	const [scheduleType, setScheduleType] = useState('week');

	const handleScheduleTypeChange = (value: string) => {
		setScheduleType(value);
	};

	return (
		<div>
			<div className="flex md:flex-row flex-col justify-between mb-4">
				<h1 className="text-2xl font-bold">
					This{" "}
					{scheduleType === "week"
						? "Week"
						: scheduleType === "month"
						? "Month"
						: "List"}{" "}
					Schedule
				</h1>
				{/* <Button className="bg-blue-400">Request Lab +</Button> */}
				<div className="flex justify-end gap-4">
					<Select onValueChange={handleScheduleTypeChange} defaultValue="week">
						<SelectTrigger className="sm:w-[180px] w-full" value={scheduleType}>
							{/* <SelectValue placeholder="This Week" /> */}
							<SelectValue placeholder="Schedule Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="week">Week</SelectItem>
							<SelectItem value="month">Month</SelectItem>
							<SelectItem value="list">List</SelectItem>
						</SelectContent>
					</Select>
					<RequestDialog />
				</div>
			</div>

			{scheduleType === "week" && <ScheduleWeek />}
			{scheduleType === "month" && <ScheduleMonth />}
			{scheduleType === "list" && (
				<ScheduleList columns={tableHeader} data={monthlySchedule} />
			)}
		</div>
	);
}
