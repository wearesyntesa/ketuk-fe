'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartPieSimple } from "./pie-chart";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const chartData = [
	{ date: "2024-05-01", requests: 30 },
	{ date: "2024-05-02", requests: 45 },
	{ date: "2024-05-03", requests: 28 },
	{ date: "2024-05-04", requests: 60 },
	{ date: "2024-05-05", requests: 75 },
	{ date: "2024-05-06", requests: 50 },
	{ date: "2024-05-07", requests: 90 },
	{ date: "2024-05-08", requests: 100 },
	{ date: "2024-05-09", requests: 80 },
	{ date: "2024-05-10", requests: 120 },
];

const chartConfig: ChartConfig = {
	request: {
		label: "Requests",
		color: "#ffd230",
	},
} satisfies ChartConfig;

export default function DashboardChart() {
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
							<p className="text-2xl font-semibold">1,258</p>
						</div>
						<div className="flex flex-col items-center justify-center w-48 h-full">
							<h4>Accepted</h4>
							<p className="text-2xl font-semibold">1,024</p>
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
							data={chartData}
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
								dataKey="requests"
							/>
						</AreaChart>
					</ChartContainer>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
			<ChartPieSimple />
		</div>
	);
}