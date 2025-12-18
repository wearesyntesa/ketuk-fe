"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { CalendarRequestForm } from "./date-picker";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import React, { useEffect, useState } from "react";
import { useTickets } from "@/hooks/use-tickets";
import { MergeSchedultType, ScheduleDataTicket, ScheduleRegulerDataTicket } from "./type";
import { useUser } from "@/hooks/use-user";
import { useReguler } from "@/hooks/use-reguler";
import { useSchedule } from "@/hooks/use-schedule";
import { toast } from "sonner";

export function RequestForm({
	border,
	className,
}: {
	border?: boolean;
	className?: string;
}) {
	const user = useUser();
	const tickets = useTickets();
	const [token, setToken] = useState(localStorage.getItem("access_token") || "");
	const schedules = useSchedule(token);
	const mergedSchedules: MergeSchedultType[] = [];

	useEffect(() => {
		const fetchData = async () => {
			schedules.handleGetAllRegulerSchedules();
			schedules.handleGetAllTicketSchedules();
		};
		fetchData();
	}, [])

	schedules.handleGetAllAcceptedSchedules(
		schedules.ticketSchedules,
		schedules.regulerSchedules
	).forEach((item) => mergedSchedules.push(item));

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
	}, [])

	const postTicket = (data: ScheduleDataTicket) => {
		// console.log("Submitting ticket:", data);
		if (mergedSchedules.length != 0) {
			const hasConflict = mergedSchedules.some((schedule) => {
				return (
					data.startDate.getDate() === new Date(schedule.startDate).getDate() &&
					data.startDate.getHours() < new Date(schedule.endDate).getHours() &&
					data.endDate.getHours() > new Date(schedule.startDate).getHours()
				);
			});
			if (hasConflict) {
				// alert("Jadwal bertabrakan dengan jadwal lain. Silakan pilih hari lain.");
				toast.error("Schedule conflicts with another schedule. Please choose another time.");
				return;
			} else {
				console.log("No conflicts found, submitting ticket.", data);
				return tickets.handlePostTicket(data, token);
			}
		}

		return tickets.handlePostTicket(data, token);
	}

	// const checkConflict = (data: ScheduleDataTicket) => {
	// 	const hasConflict = mergedSchedules.some((schedule) => {
	// 		return (
	// 			data.startDate.getDate() === new Date(schedule.startDate).getDate() &&
	// 			data.startDate.getHours() < new Date(schedule.endDate).getHours() &&
	// 			data.endDate.getHours() > new Date(schedule.startDate).getHours()
	// 		);
	// 	});

	// 	return hasConflict;
	// }

	// Form state
	const [form, setForm] = useState({
		eventName: "",
		startTime: "",
		endTime: "",
		eventType: "",
		lecturer: "",
		description: "",
	})
	const [date, setDate] = useState<Date | undefined>(undefined);

	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		console.log(new Date().toTimeString().slice(0,5))
		if (e.target.value < new Date().toTimeString().slice(0,5)) {
			toast.error("Start time cannot be in the past.");
			setForm({...form, startTime: ""});
		} else if (form.endTime && e.target.value >= form.endTime) {
			toast.error("Start time must be earlier than end time.");
			setForm({...form, startTime: ""});
		} else if (!form.endTime){
			setForm({...form, startTime: e.target.value});
		} else {
			setForm({...form, startTime: e.target.value});
		}
	};
	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value < new Date().toTimeString().slice(0,5)) {
			toast.error("End time cannot be in the past.");
			setForm({...form, endTime: ""});
		} else if (form.startTime && e.target.value <= form.startTime && e.target.value < new Date().toTimeString().slice(0,5)) {
			toast.error("End time must be later than start time.");
			setForm({...form, endTime: ""});
		} else if(!form.startTime){
			setForm({...form, endTime: e.target.value});
		} else {
			console.log(e.target.value, form.startTime);
			setForm({...form, endTime: e.target.value});
		}
	};

	const ticketData: ScheduleDataTicket = {
		description: form.description,
		title: form.eventName,
		userId: user.user?.id || 0,
		startDate: date
			? new Date(
					`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${form.startTime}:00`
			  )
			: new Date(),
		endDate: date
			? new Date(
					`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${form.endTime}:00`
			  )
			: new Date(),
		category: form.eventType,
	}

	return (
		<Card
			className={`${border ? "border" : "border-0 shadow-none"} ${
				className ? className : "w-full"
			}`}>
			<CardHeader>
				<CardTitle>Request Lab</CardTitle>
				<CardDescription>Insert your event information bellow.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={() =>postTicket(
									ticketData
								)}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="event-name">Event Name</Label>
								<Input
									id="event-name"
									type="text"
									value={form.eventName}
									onChange={(e) => setForm({...form, eventName: e.target.value})}
									placeholder="Praktikum Pemrograman Dasar"
									required
								/>
							</div>
							<div className="grid gap-2">
								<CalendarRequestForm label setDateState={setDate} valDateState={date} />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label>Time</Label>
								</div>
								<div className="flex gap-2">
									<Input
										type="time"
										value={form.startTime}
										onChange={(e) => handleStartTimeChange(e)}
										className="bg-background appearance-none w-fit"
										required
									/>
									<span className="flex items-center">-</span>
									<Input
										type="time"
										value={form.endTime}
										onChange={(e) => handleEndTimeChange(e)}
										className="bg-background appearance-none w-fit"
										required
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="event-type">Event Type</Label>
								</div>
								<Select onValueChange={(value) =>{setForm({...form, eventType: value}); console.log(value)}}>
									<SelectTrigger
										value={form.eventType}
										id="event-type"
										className="w-full">
										<SelectValue placeholder="Pilih jenis kegiatan" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Event Type</SelectLabel>
											<SelectItem value="Praktikum">Praktikum</SelectItem>
											<SelectItem value="Kelas">Class</SelectItem>
											<SelectItem value="Skripsi">Skripsi</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="lecturer">Lecture Name</Label>
								</div>
								<Input
									id="lecturer"
									type="text"
									value={form.lecturer}
									onChange={(e) => setForm({...form, lecturer: e.target.value})}
									placeholder="Nama Dosen"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="description">Event Description</Label>
								</div>
								<Textarea
									value={form.description}
									onChange={(e) => setForm({...form, description: e.target.value})}
									id="description"
									required
								/>
							</div>
							<div className="flex justify-end w-full gap-2">
								<Button type="submit">Submit Request</Button>
							</div>
						</div>
						{/* <div className="flex flex-col gap-6">
						</div> */}
				</form>
				{/* <Button onClick={() => console.log(new Date(
					`${date?.getFullYear()}-${String(date ? date.getMonth() + 1 : 0).padStart(2, "0")}-${String(date?.getDate()).padStart(2, "0")}T${form.startTime}:00`
			  ), ticketData)}>Submit Request</Button> */}

			</CardContent>
		</Card>
	);
}

export function RequestRegulerForm({
	border,
	className,
}: {
	border?: boolean;
	className?: string;
}) {
	const user = useUser();
	const [token, setToken] = useState(localStorage.getItem("access_token") || "");

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
	}, [])

	const reguler = useReguler(token);

	const postReguler = (data: ScheduleRegulerDataTicket[]) => {
		data.map(async (ticket) => {
			const response = await reguler.handlePostReguler(ticket);
			return response;
		})
	}

	// Form state
	const [eventName, setEventName] = useState("");
	// const [semester, setSemester] = useState("");
	const [startTime, setStartTime] = useState("");
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState("");
	// const [lecturer, setLecturer] = useState("");

	// Form value change handlers
	const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventName(e.target.value);
	};
	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (endTime && e.target.value >= endTime) {
			setStartTime(e.target.value);
		} else {
			toast.error("Start time must be earlier than end time.");
		}
	};
	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (startTime && e.target.value <= startTime) {
			console.log(e.target.value, startTime);
			setEndTime(e.target.value);
		} else {
			toast.error("End time must be later than start time.");
		}
	};

	const ticketData: ScheduleRegulerDataTicket = {
		title: eventName,
		userId: user.user?.id || 0,
		startDate: date
			? new Date(
					`${date.toISOString().split("T")[0]}T${startTime}:00`
			  )
			: new Date(),
		endDate: date
			? new Date(
					`${date.toISOString().split("T")[0]}T${endTime}:00`
			  )
			: new Date()
	}

	const arrRequest = 
	Array.from({ length: 16 }, (_, i) => ({
		...ticketData,
		startDate: new Date(ticketData.startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
		endDate: new Date(ticketData.endDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
	}))
    //this is function onsubmit for schedule reguler form
	// onSubmit={() => postReguler (arrRequest)}

	return (
		<Card
			className={`${border ? "border" : "border-0 shadow-none"} ${
				className ? className : "w-full"
			}`}>
			<CardHeader>
				<CardTitle>Request Reguler Schedule</CardTitle>
				<CardDescription>
					Masukkan informasi kegiatan Anda di bawah ini.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form >
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="event-name">Nama Kegiatan</Label>
							<Input
								id="event-name"
								type="text"
								value={eventName}
								onChange={handleEventNameChange}
								placeholder="Praktikum Pemrograman Dasar"
								required
							/>
						</div>
						<div className="grid gap-2">
								<CalendarRequestForm label setDateState={setDate} valDateState={date} />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label>Time</Label>
								</div>
								<div className="flex gap-2">
									<Input
										type="time"
										value={startTime}
										onChange={handleStartTimeChange}
										className="bg-background appearance-none w-fit"
										required
									/>
									<span className="flex items-center">-</span>
									<Input
										type="time"
										value={endTime}
										onChange={handleEndTimeChange}
										className="bg-background appearance-none w-fit"
										required
									/>
								</div>
							</div>
					</div>
					<div className="flex justify-end w-full gap-2">
						<Button type="submit">Submit Request</Button>
					</div>
				</form>
			</CardContent>
			{/* <div className="flex justify-end w-full gap-2">
				<Button onClick={() => {console.log(arrRequest)}} type="submit">Submit Request</Button>
			</div> */}
		</Card>
	);
}
