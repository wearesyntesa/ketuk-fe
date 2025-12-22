"use client"

import { Pie, PieChart } from "recharts"
import { useTranslations } from "next-intl"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CategoryChartData } from "./type"

export const description = "A simple pie chart"

export function ChartPieSimple({data}: {data: CategoryChartData[]}) {
  const t = useTranslations("dashboard");
  
  const chartConfig = {
    category: {
      label: "Category",
    },
    praktikum: {
      label: t("labSession"),
      color: "var(--chart-1)",
    },
    kelas: {
      label: t("class"),
      color: "var(--chart-2)",
    },
    skripsi: {
      label: t("thesis"),
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  console.log("Pie Data:", data);
  return (
		<Card className="flex flex-col w-full xl:col-span-1 col-span-3">
			<CardHeader className="items-center pb-0">
				<CardTitle>{t("requestsByType")}</CardTitle>
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
					</PieChart>
				</ChartContainer>
          <div className="flex gap-4">
            <div className="flex gap-2">
              <div className="bg-[var(--chart-1)] w-4 h-4 rounded"></div>
              {t("thesis")}
            </div>
            <div className="flex gap-2">
              <div className="bg-[var(--chart-4)] w-4 h-4 rounded"></div>
              {t("labSession")}
            </div>
            <div className="flex gap-2">
              <div className="bg-[var(--chart-3)] w-4 h-4 rounded"></div>
              {t("class")}
            </div>
          </div>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none text-xs mt-2">
          {t("noDataAvailable")}
        </div>
			</CardFooter>
		</Card>
	);
}
