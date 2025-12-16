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
import { Calendar22 } from "./date-picker";
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
import { ScheduleDataTicket, ScheduleRegulerDataTicket } from "./type";
import { useUser } from "@/hooks/use-user";
import { useReguler } from "@/hooks/use-reguler";

export function RequestForm({
	border,
	className,
}: {
	border?: boolean;
	className?: string;
}) {
	const user = useUser();
	const tickets = useTickets();
	const [token, setToken] = useState("");

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
	}, [])

	const postTicket = (data: ScheduleDataTicket) => {
		// console.log("Submitting ticket:", data);
		return tickets.handlePostTicket(data, token);
	}
	// Form state
	const [eventName, setEventName] = useState("");
	const [startTime, setStartTime] = useState("");
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [endTime, setEndTime] = useState("");
	const [eventType, setEventType] = useState("");
	const [lecturer, setLecturer] = useState("");
	const [description, setDescription] = useState("");

	// Form value change handlers
	const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventName(e.target.value);
	};
	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStartTime(e.target.value);
	};
	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEndTime(e.target.value);
	};
	const handleTypeChange = (value: string) => {
		setEventType(value);
	};
	const handleLecturerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLecturer(e.target.value);
	};
	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const ticketData: ScheduleDataTicket = {
		description: description,
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
			: new Date(),
		category: eventType,
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
									value={eventName}
									onChange={handleEventNameChange}
									placeholder="Praktikum Pemrograman Dasar"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Calendar22 label setDateState={setDate} valDateState={date} />
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
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="event-type">Event Type</Label>
								</div>
								<Select onValueChange={(value) =>{handleTypeChange(value); console.log(value)}}>
									<SelectTrigger
										value={eventType}
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
									value={lecturer}
									onChange={handleLecturerChange}
									placeholder="Nama Dosen"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="description">Event Description</Label>
								</div>
								<Textarea
									value={description}
									onChange={handleDescriptionChange}
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
		setStartTime(e.target.value);
	};
	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEndTime(e.target.value);
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
				<form>
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
								<Calendar22 label setDateState={setDate} valDateState={date} />
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
