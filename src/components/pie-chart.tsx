"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CategoryChartData } from "./type"

export const description = "A simple pie chart"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

const chartConfig = {
  category: {
    label: "Category",
  },
  praktikum: {
    label: "Praktikum",
    color: "var(--chart-1)",
  },
  kelas: {
    label: "Kelas",
    color: "var(--chart-2)",
  },
  skripsi: {
    label: "Skripsi",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function ChartPieSimple({data}: {data: CategoryChartData[]}) {
  console.log("Pie Data:", data);
  return (
		<Card className="flex flex-col w-full xl:col-span-1 col-span-3">
			<CardHeader className="items-center pb-0">
				<CardTitle>Most request Category</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Pie data={data} dataKey="totalRequest" nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Total requests increased by 12% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Request distribution by category
        </div> */}
        <div className="text-muted-foreground leading-none text-xs mt-2">
          Visualisasi ini menampilkan distribusi permintaan peminjaman laboratorium berdasarkan kategori kegiatan (Praktikum, Kelas, dan Skripsi). Data membantu dalam memahami pola penggunaan fasilitas lab untuk perencanaan dan manajemen sumber daya yang lebih baik.
        </div>
			</CardFooter>
		</Card>
	);
}
