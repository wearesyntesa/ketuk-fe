'use client';

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Shadows_Into_Light, Nothing_You_Could_Do } from "next/font/google";
import { MergeSchedultType } from "./type";

const shadowIntoLight = Shadows_Into_Light({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-shadow-into-light",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-nothing-you-could-do",
});

export default function ScheduleMonth({data}: {data: MergeSchedultType[]}) {
	const [displayDate, setDisplayDate] = useState(new Date());
	const currentMonth = displayDate.getMonth();
	const currentYear = displayDate.getFullYear();
	const events = data.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getMonth() === currentMonth &&
			eventDate.getFullYear() === currentYear
		);
	});

	const nextMonth = () => {
		setDisplayDate((prev) => {
			const d = new Date(prev);
			d.setMonth(d.getMonth() + 1);
			return d;
		});
	};

	const baseDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const prevMonth = () => {
		setDisplayDate((prev) => {
			const d = new Date(prev);
			d.setMonth(d.getMonth() - 1);
			return d;
		});
	};

	return (
		<div>
			<div className="grid grid-cols-7 gap-2">
				<div className="flex gap-2 py-4 font-semibold w-full items-center">
					<span className="flex text-nowrap">
						{displayDate.toLocaleString("default", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<div
						className="bg-slate-50 border border-slate-300 p-1 rounded-md cursor-pointer"
						onClick={prevMonth}>
						<ChevronLeft />
					</div>
					<div
						className="bg-slate-50 border border-slate-300 p-1 rounded-md cursor-pointer"
						onClick={nextMonth}>
						<ChevronRight />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-7 gap-2">
				{baseDays.map((day) => (
					<div
						key={day}
						className="font-semibold text-center md:text-base text-xs">
						<div className="md:hidden block">{day.slice(0, 3)}</div>
						<div className="md:block hidden">{day}</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2">
				{(() => {
					const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
					const daysInMonth = new Date(
						currentYear,
						currentMonth + 1,
						0
					).getDate();
					const totalCells = firstDayIndex + daysInMonth;

					return Array.from({ length: totalCells }).map((_, i) => {
						// empty cells before the month starts or after it ends (to keep 6 rows)
						if (i < firstDayIndex || i >= firstDayIndex + daysInMonth) {
							return (
								<div key={`empty-${i}`} className="min-h-[80px] p-1">
									{/* <span className="text-gray-400">Empty</span> */}
								</div>
							);
						}

						const dayNum = i - firstDayIndex + 1;
						const eventsForDay = events.filter(
							(e) => new Date(e.date).getDate() === dayNum
						);

						return (
							<Dialog key={`day-${dayNum}`}>
								<DialogTrigger className="md:min-h-28 min-h-12 p-2 border rounded items-start flex flex-col hover:bg-accent cursor-pointer">
									<div className="text-sm font-medium">{dayNum}</div>
									{eventsForDay.slice(0, 2).map((ev, id) => (
										<div
											key={id}
											className="mt-1 text-xs rounded px-1 w-full text-left gap-2 items-center xl:flex hidden">
											<span className="flex h-2 w-2 bg-blue-200 rounded-full" />
											{ev.title}
										</div>
									))}
									{eventsForDay.length > 2 && (
										<div className="mt-1 text-xs bg-blue-200 rounded-full p-1 xl:block hidden">
											+{eventsForDay.length - 2}
										</div>
									)}
									{eventsForDay.length !=0 && (
										<div className="mt-1 text-xs bg-blue-200 rounded-full p-1 xl:hidden block">
											{eventsForDay.length}
										</div>
									)}
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle className="text-2xl">
											Events on {currentMonth + 1}/{dayNum}/{currentYear}
										</DialogTitle>
										<div className="flex flex-col gap-4 mt-4">
											{eventsForDay.length === 0 ? (
												<p>No events for this day.</p>
											) : (
												eventsForDay.map((event, index) => (
													<div
														key={index}
														className="p-4 border rounded-lg shadow-sm">
														<h3 className="text-lg font-medium">
															{event.title}
														</h3>
														<p className="text-sm text-muted-foreground">
															{event.startDate} - {event.endDate}
														</p>
														<p className="text-sm">{event.description}</p>
													</div>
												))
											)}
										</div>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						);
					});
				})()}
			</div>
		</div>
	);
}

export function ScheduleMonthLanding() {
	const displayDate = new Date();
	const currentMonth = displayDate.getMonth();
	const currentYear = displayDate.getFullYear();
	const baseDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<div className="max-w-6xl w-full  bg-white p-4 border rounded-lg shadow-xl relative overflow-hidden">
			<div className="absolute top-30 -left-7 z-10 rotate-12 w-72 h-72 bg-amber-200 p-8 border border-amber-400">
				<h3
					className={`${shadowIntoLight.className} md:text-4xl text-xl font-bold`}>
					Event Today
				</h3>
				<ul className="list-disc list-inside md:text-xl text-lg">
					<li>Practicum Data Structure</li>
					<li>Data bases class 24F</li>
				</ul>
			</div>
			<div className="absolute bottom-10 -right-10 z-10 -rotate-12 w-72 h-72 bg-amber-200 p-8 border border-amber-400">
				<h3
					className={`${nothingYouCouldDo.className} md:text-4xl text-xl font-bold`}>
					Event Tomorrow
				</h3>
				<ul className="list-disc list-inside md:text-xl text-lg">
					<li>Practicum Algorithm and Programming</li>
					<li>Web Development Class 25C</li>
				</ul>
			</div>
			<div className="absolute top-35 left-6 rotate-6 w-[250px] h-72 bg-slate-200/50"></div>
			<div className="absolute bottom-4 right-2 -rotate-6 w-[250px] h-72 bg-slate-200/50"></div>
			<div className="grid grid-cols-7 gap-2">
				<div className="flex gap-2 py-4 font-semibold w-full items-center">
					{/*6 <span className="flex text-nowrap">
						{displayDate.toLocaleString("default", {
							month: "long",	6						year: "numeric",
						})}
					</span>
					<div
						className="bg-slate-50 border border-slate-300 p-1 rounded-md cursor-pointer"
						onClick={prevMonth}>
						<ChevronLeft />
					</div>
					<div
						className="bg-slate-50 border border-slate-300 p-1 rounded-md cursor-pointer"
						onClick={nextMonth}>
						<ChevronRight />
					</div> */}
				</div>
			</div>
			<div className="grid grid-cols-7 gap-2">
				{baseDays.map((day) => (
					<div
						key={day}
						className="font-semibold text-center md:text-base text-xs">
						<div className="md:hidden block">{day.slice(0, 3)}</div>
						<div className="md:block hidden">{day}</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2">
				{(() => {
					const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
					const daysInMonth = new Date(
						currentYear,
						currentMonth + 1,
						0
					).getDate();
					const totalCells = firstDayIndex + daysInMonth;

					return Array.from({ length: totalCells }).map((_, i) => {
						// empty cells before the month starts or after it ends (to keep 6 rows)
						if (i < firstDayIndex || i >= firstDayIndex + daysInMonth) {
							return (
								<div key={`empty-${i}`} className="min-h-20 p-1">
									{/* <span className="text-gray-400">Empty</span> */}
								</div>
							);
						}

						const dayNum = i - firstDayIndex + 1;

						return (
							<div key={`day-${dayNum}`}>
								<div className="min-h-28 p-2 border rounded items-start flex flex-col hover:bg-accent cursor-pointer">
									<div className="text-sm font-medium">{dayNum}</div>
								</div>
							</div>
						);
					});
				})()}
			</div>
		</div>
	);
}