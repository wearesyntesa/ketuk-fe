'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function BannerDashboard() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: '2-digit' };

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
			<Card className="w-full max-w-3xl mx-auto h-60 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 backdrop-blur-lg border-0 relative shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
				{/* Background Circles */}
				<div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full">
					<div className="absolute top-4 left-4 w-20 h-20 bg-white/40 rounded-full"></div>
				</div>
				<div className="w-full h-full flex justify-between">
					<CardHeader className="m-2 flex flex-col w-full">
						<CardTitle className="text-5xl text-slate-50">Ketuk</CardTitle>
						<CardDescription className="text-lg text-slate-50">
							Manage Lab
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-1 items-center w-96 h-full justify-center bg-slate-50/20 rounded-md p-8 mr-4">
						<span className="text-slate-50 px-2 text-4xl font-semibold w-fit">
							{time}
						</span>
						<span className="italic text-slate-50">
							{date.toLocaleDateString("en-ID", options)}
						</span>
					</CardContent>
				</div>
			</Card>
		);
}