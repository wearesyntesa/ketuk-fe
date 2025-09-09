'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function BannerDashboard() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: '2-digit' };

    const [time, setTime] = useState(new Date().toLocaleTimeString('en-ID', { hour: '2-digit', minute: '2-digit', hour12: false }));
    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = new Date().toLocaleTimeString('en-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
            // Update the time state
            setTime(newTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <Card className="w-full max-w-xl mx-auto h-56 flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 backdrop-blur-lg border-0 relative shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full">
                <div className="absolute top-4 left-4 w-20 h-20 bg-white/40 rounded-full"></div>
            </div>
			<CardHeader className="m-2">
				<CardTitle className="text-5xl text-slate-50">Ketuk</CardTitle>
			</CardHeader>
			<CardContent className="m-2 flex flex-col gap-1">
				<CardDescription className="text-lg text-slate-50">Manage Lab</CardDescription>
                <div className="flex gap-4 text-lg">
                    <span className="italic text-slate-50">{date.toLocaleDateString('en-ID', options)}</span>
                    <span className="bg-white/40 rounded-sm text-blue-800 px-2 font-semibold">{time}</span>
                </div>
			</CardContent>
		</Card>
    )
}