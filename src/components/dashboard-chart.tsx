'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartPieSimple } from "./pie-chart";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { CategoryChartData, MergeSchedultType } from "./type";
import { useSchedule } from "@/hooks/use-schedule";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";

const chartConfig: ChartConfig = {
	request: {
		label: "Requests",
		color: "#ffd230",
	},
} satisfies ChartConfig;

interface DashboardLineChartProps {
	totalRequests: number;
	date: Date | string;
}

export default function DashboardChart({pieData}: {pieData: CategoryChartData[]}) {
	const [token, setToken] = useState(localStorage.getItem("access_token") || "");
	const mergedSchedules: MergeSchedultType[] = [];
	const filteredDataLineChart: DashboardLineChartProps[] = [
		{ date: "2025-12-15", totalRequests: 10 },
		{ date: "2025-12-16", totalRequests: 18 },
		{ date: "2025-12-17", totalRequests: 5 },
	];

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
	}, []);

	const schedules = useSchedule(token);
	const user = useUser();

	useEffect(() => {
		const fetchData = async () => {
			schedules.handleGetAllRegulerSchedules();
			schedules.handleGetAllTicketSchedules();
			user.handleGetAllUser(token);
		};
		fetchData();
	}, [])

	schedules.handleMergeSchedules(
		schedules.ticketSchedules,
		schedules.regulerSchedules,
		true
	).map((item) => mergedSchedules.push(item));

	mergedSchedules.forEach((item) => {
		const date = new Date(item.createdAt);
		const formattedDate = date.toISOString().split("T")[0];

		const existingEntry = filteredDataLineChart.find(
			(entry) => entry.date === formattedDate
		);
		
		if (existingEntry) {
			existingEntry.totalRequests += 1;
		} else {
			filteredDataLineChart.push({
				date: formattedDate,
				totalRequests: 1,
			});
		}
	});

	console.log("Filtered Data Line Chart:", filteredDataLineChart);


	// setTotalRequests(mergedSchedules.length);
	// setTotalUser(user.allUsers ? user.allUsers.length : 0);

	return (
		<div className="grid grid-cols-3 w-full justify-center gap-8">
			<div className="flex flex-col xl:col-span-2 col-span-3 w-full bg-white border rounded-2xl p-2 shadow-sm">
				<div className="flex lg:flex-row flex-col h-28 w-full justify-between lg:items-center mb-4 px-4 py-2 rounded-md gap-4">
					<div>
						<h3 className="text-xl font-semibold">Request Schedule Matrix</h3>
						<p className="text-sm text-muted-foreground">
							Overview of requests over the past 10 days.
						</p>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col items-center justify-center w-48 h-full">
							<h4>Total Request</h4>
							<p className="text-2xl font-semibold">{mergedSchedules.length}</p>
						</div>
						<div className="flex flex-col items-center justify-center w-48 h-full">
							<h4>Total User</h4>
							<p className="text-2xl font-semibold">{user.allUsers ? user.allUsers.length : 0}</p>
						</div>
					</div>
				</div>
				<ScrollArea>
					<ChartContainer
						title="Requests Over Time"
						config={chartConfig}
						className="max-h-96 w-[1200px] p-4">
						<AreaChart
							accessibilityLayer
							data={filteredDataLineChart}
							className="w-[825px]">
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
							/>
							<ChartTooltip content={<ChartTooltipContent />} />
							<Area
								fill="var(--color-request)"
								type="monotone"
								dataKey="totalRequests"
							/>
						</AreaChart>
					</ChartContainer>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
			<ChartPieSimple data={pieData} />
		</div>
	);
}