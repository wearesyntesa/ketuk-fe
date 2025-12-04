'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartPieSimple } from "./pie-chart";

const chartData = [
    { date: '2024-05-01', requests: 30 },
    { date: '2024-05-02', requests: 45 },
    { date: '2024-05-03', requests: 28 },
    { date: '2024-05-04', requests: 60 },
    { date: '2024-05-05', requests: 75 },
    { date: '2024-05-06', requests: 50 },
    { date: '2024-05-07', requests: 90 },
    { date: '2024-05-08', requests: 100 },
    { date: '2024-05-09', requests: 80 },
    { date: '2024-05-10', requests: 120 },
]

const chartConfig: ChartConfig = {
    request: {
        label: "Requests",
        color: "#ffd230",
    }
} satisfies ChartConfig;

export default function DashboardChart() {
    return (
			<div className="flex w-full justify-center gap-8">
				<div className="flex flex-col w-full bg-white border rounded-2xl p-2 shadow-sm">
					<div className="flex h-28 w-full justify-between items-center mb-4 px-4 py-2 rounded-md">
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
					<ChartContainer
						title="Requests Over Time"
						config={chartConfig}
						className="h-96 w-full p-4">
						<AreaChart accessibilityLayer data={chartData}>
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
				</div>
				<ChartPieSimple />
			</div>
		);
}