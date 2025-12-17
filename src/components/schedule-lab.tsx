"use client";

import { ColumnDef } from "@tanstack/react-table";
import ScheduleMonth from "./schedule-month";
import ScheduleWeek from "./schedule-week";
import { MergeSchedultType } from "./type";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import ScheduleList from "./schedule-list";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { InitialIconWithName } from "./initial-icon";

const tableHeader: ColumnDef<MergeSchedultType>[] = [
	{
		accessorKey: "title",
		header: "Title Event",
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "user",
		header: "Contact",
		cell: ({ row }) => <InitialIconWithName title={row.original.user.email} />,
	},
	{
		accessorKey: "kategori",
		header: "Category",
	},
	{
		accessorKey: "startDate",
		header: "Start Time",
		cell: ({ row }) => {
			return new Date(row.original.startDate).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		}
	},
	{
		accessorKey: "endDate",
		header: "End Time",
		cell: ({ row }) => {
			return new Date(row.original.endDate).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			});
		}
	}
]

export default function ScheduleLab({mergedSchedules}: {mergedSchedules: MergeSchedultType[]}) {
	const [scheduleType, setScheduleType] = useState('week');

	const handleScheduleTypeChange = (value: string) => {
		setScheduleType(value);
	};

	// const [token, setToken] = useState<string>(localStorage.getItem("access_token") || "");
	// const user = useUser();
	// const mergedSchedules: MergeSchedultType[] = [];
	
	// useEffect(() => {
	// 	const storedToken = localStorage.getItem("access_token") || "";
	// 	setToken(storedToken);
	// 	const userData = localStorage.getItem("user");
	// 	if (userData) {
	// 		try {
	// 			user.setUser(JSON.parse(userData));
	// 		} catch (error) {
	// 			console.error("Failed to parse user data:", error);
	// 		}
	// 	}
	// }, []);
	
	// const schedules = useSchedule(token);
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		schedules.handleGetAllRegulerSchedules();
	// 		schedules.handleGetAllTicketSchedules();
	// 	};
	// 	fetchData();
	// }, [mergedSchedules.length, ]);

	// schedules.handleGetAllAcceptedSchedules(
	// 	schedules.ticketSchedules,
	// 	schedules.regulerSchedules
	// ).map((item) => mergedSchedules.push(item));

	// schedules.ticketSchedules.forEach((ticketSchedule) => {
	// 	mergedSchedules.push({
	// 		idSchedule: ticketSchedule.idSchedule,
	// 		title: ticketSchedule.title,
	// 		startDate: new Date(ticketSchedule.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	// 		endDate: new Date(ticketSchedule.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	// 		date: new Date(ticketSchedule.startDate),
	// 		day: new Date(ticketSchedule.startDate).toLocaleDateString('en-US', { weekday: 'long' }),
	// 		userId: ticketSchedule.userId,
	// 		kategori: ticketSchedule.kategori,
	// 		description: ticketSchedule.description,
	// 		createdAt: ticketSchedule.createdAt,
	// 		updatedAt: ticketSchedule.updatedAt,
	// 		user: ticketSchedule.user,
	// 		tickets: ticketSchedule.tickets,
	// 		status: ticketSchedule.tickets?.[0].status || "Pending",
	// 		isReguler: false,
	// 	});
	// });
	// schedules.regulerSchedules.forEach((regulerSchedule) => {
	// 	mergedSchedules.push({
	// 		idSchedule: regulerSchedule.idSchedule,
	// 		title: regulerSchedule.title,
	// 		startDate: new Date(regulerSchedule.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	// 		endDate: new Date(regulerSchedule.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	// 		date: new Date(regulerSchedule.startDate),
	// 		day: new Date(regulerSchedule.startDate).toLocaleDateString('en-US', { weekday: 'long' }),
	// 		userId: regulerSchedule.userId,
	// 		kategori: regulerSchedule.kategori,
	// 		description: regulerSchedule.description,
	// 		createdAt: regulerSchedule.createdAt,
	// 		updatedAt: regulerSchedule.updatedAt,
	// 		user: regulerSchedule.user,
	// 		status: "Accepted",
	// 		isReguler: true,
	// 	});
	// });

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
					<Link href="/app/requests">
					<Button className="bg-blue-400">Request Schedule +</Button>
					</Link>
					{/* <RequestDialog /> */}
				</div>
			</div>

			{scheduleType === "week" && <ScheduleWeek data={mergedSchedules} />}
			{scheduleType === "month" && <ScheduleMonth data={mergedSchedules} />}
			{scheduleType === "list" && (
				<ScheduleList columns={tableHeader} data={mergedSchedules} />
			)}
		</div>
	);
}
