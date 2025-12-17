'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";

export default function BannerDashboard() {
	const date = new Date();
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		month: "long",
		day: "2-digit",
	};

	const user = useUser();

	const getTimeOfDay = () => {
		const hour = new Date().getHours();
		if (hour >= 5 && hour < 12) return "morning";
		if (hour >= 12 && hour < 17) return "afternoon";
		if (hour >= 17 && hour < 21) return "evening";
		return "night";
	};

	const iconClasses = {
		morning: "morning.svg",
		afternoon: "afternoon.svg",
		evening: "afternoon.svg",
		night: "night.svg",
	};

	const backgroundClasses = {
		morning: "from-blue-700 via-blue-500 to-cyan-400",
		afternoon: "from-yellow-500 via-orange-400 to-red-400",
		evening: "from-amber-500 to-indigo-700",
		night: "from-slate-900 via-slate-800 to-blue-900",
	};

	const timeOfDay = getTimeOfDay();
	const iconClass = iconClasses[timeOfDay as keyof typeof iconClasses];
	const bgClass =
		backgroundClasses[timeOfDay as keyof typeof backgroundClasses];

	const [time, setTime] = useState(
		new Date().toLocaleTimeString("en-ID", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
	);
	useEffect(() => {
		const interval = setInterval(() => {
			const newTime = new Date().toLocaleTimeString("en-ID", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			});
			// Update the time state
			setTime(newTime);
		}, 1000);

		return () => clearInterval(interval);
	}, []);
	return (
		<Card
			className={`w-full mx-auto sm:h-64 h-56 bg-linear-to-br ${bgClass} backdrop-blur-xl border-0 relative shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out overflow-hidden`}>
			{/* Animated Background Elements */}
			<div className="absolute -top-16 -left-16 w-40 h-40 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
			<div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

			<div className="w-full h-full flex justify-between items-stretch relative z-10">
				<CardHeader className="m-4 flex flex-col justify-between w-full">
					<CardTitle className="md:text-6xl sm:text-4xl text-lg font-bold text-white drop-shadow-lg">
						Welcome, {user.user?.name.split(" ")[0] || "User"}!
					</CardTitle>
					<div className="md:text-lg text-xs text-blue-50 font-medium">
						<p>Ketuk App</p>
						<p className="md:block hidden">Manage your requests efficiently</p>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 justify-between">
					<div className="flex justify-center items-center">
						<Image
							src={`/${iconClass}`}
							alt={timeOfDay}
							width={100}
							height={100}
							className="md:w-32 md:h-32 w-20 h-20"
						/>
					</div>
					<div className="flex flex-col gap-2 items-center justify-center">
						<span className="text-blue-50 md:text-sm text-xs font-medium text-center whitespace-nowrap">
							{date.toLocaleDateString("en-ID", options)}
						</span>
						<span className="text-white md:px-4 md:text-5xl text-3xl font-bold tracking-tight">
							{time}
						</span>
					</div>
				</CardContent>
			</div>
		</Card>
	);
}