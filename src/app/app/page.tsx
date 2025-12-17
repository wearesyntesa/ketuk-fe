"use client";

import ScheduleLab from "@/components/schedule-lab";
import BannerDashboard from "@/components/banner-dashboard";
import DashboardChart from "@/components/dashboard-chart";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { CategoryChartData, MergeSchedultType } from "@/components/type";
import { useSchedule } from "@/hooks/use-schedule";

export default function Dashboard() {
	const [token, setToken] = useState<string>(localStorage.getItem("access_token") || "");
	const user = useUser();
	const mergedSchedules: MergeSchedultType[] = [];
	const pieData: CategoryChartData[] = [];
	
	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				user.setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		}
	}, []);
	
	const schedules = useSchedule(token);
	useEffect(() => {
		const fetchData = async () => {
			schedules.handleGetAllRegulerSchedules();
			schedules.handleGetAllTicketSchedules();
		};
		fetchData();
	}, [mergedSchedules.length, ]);

	schedules.handleGetAllAcceptedSchedules(
		schedules.ticketSchedules,
		schedules.regulerSchedules
	).map((item) => mergedSchedules.push(item));

	schedules.handlePieChartData(
		schedules.ticketSchedules,
		schedules.regulerSchedules
	).map((item) => pieData.push(item));

	return (
		<>
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 gap-4 lg:px-6 flex flex-col">
					{/* <ChartAreaInteractive /> */}
					<BannerDashboard />
					<DashboardChart pieData={pieData} />
					<ScheduleLab mergedSchedules={mergedSchedules} />
				</div>
			</div>
		</>
	);
}
