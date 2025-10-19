"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function RequestForm({
	border,
	className,
}: {
	border?: boolean;
	className?: string;
}) {
	// Form state
	const [eventName, setEventName] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [eventType, setEventType] = useState("");
	const [lecturer, setLecturer] = useState("");
	// const [email, setEmail] = useState("");
	// const [contact, setContact] = useState("");
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
	// const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setEmail(e.target.value);
	// };
	// const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setContact(e.target.value);
	// };
	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	// Pagination state
	const [page, setPage] = useState(1);

	const handleNext = () => {
		setPage(page + 1);
	};

	const handleBack = () => {
		setPage(page - 1);
	};

	return (
		<Card
			className={`${border ? "border" : "border-0 shadow-none"} ${
				className ? className : "w-full"
			}`}>
			<CardHeader>
				<CardTitle>Request Lab</CardTitle>
				<CardDescription>
					Masukkan informasi kegiatan Anda di bawah ini.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						{page === 1 ? (
							<>
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
									<Calendar22 label />
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label>Waktu</Label>
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
										<Label htmlFor="event-type">Jenis Kegiatan</Label>
									</div>
									<Select onValueChange={setEventType}>
										<SelectTrigger
											value={eventType}
											onChange={(e) =>
												handleTypeChange((e.target as HTMLSelectElement).value)
											}
											id="event-type"
											className="w-full">
											<SelectValue placeholder="Pilih jenis kegiatan" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Jenis Kegiatan</SelectLabel>
												<SelectItem value="praktikum">Praktikum</SelectItem>
												<SelectItem value="kelas">Kelas</SelectItem>
												<SelectItem value="skripsi">Skripsi</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</>
						) : (
							<>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="lecturer">Nama Dosen</Label>
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
								{/* <div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="email">Email Unesa</Label>
									</div>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={handleEmailChange}
										placeholder="Email Unesa"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="contact">Nomor Telepon</Label>
									</div>
									<Input
										id="contact"
										type="text"
										value={contact}
										onChange={handleContactChange}
										placeholder="Nomor Telepon"
										required
									/>
								</div> */}
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="description">Deskripsi Kegiatan</Label>
									</div>
									<Textarea
										value={description}
										onChange={handleDescriptionChange}
										id="description"
										required
									/>
								</div>
							</>
						)}
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				{page === 1 ? (
					<div className="w-full flex justify-end">
						<Button
							variant={"secondary"}
							className="w-fit"
							onClick={handleNext}>
							Next <ArrowRight className="ml-2" />
						</Button>
					</div>
				) : (
					<div className="flex justify-end w-full gap-2">
						<Button variant={"outline"} onClick={handleBack}>
							<ArrowLeft /> Back
						</Button>
						<Button type="submit">Submit Request</Button>
					</div>
				)}
			</CardFooter>
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
	// Form state
	const [eventName, setEventName] = useState("");
	const [semester, setSemester] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [lecturer, setLecturer] = useState("");

	// Form value change handlers
	const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventName(e.target.value);
	};
	const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSemester(e.target.value);
	};
	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStartDate(e.target.value);
	};
	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEndDate(e.target.value);
	};
	const handleLecturerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLecturer(e.target.value);
	};

	return (
		<Card
			className={`${border ? "border" : "border-0 shadow-none"} ${
				className ? className : "w-full"
			}`}>
			<CardHeader>
				<CardTitle>Request Lab</CardTitle>
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
							<Label htmlFor="semester">Semester</Label>
							<Input
								id="semester"
								type="text"
								value={semester}
								onChange={handleSemesterChange}
								placeholder="Praktikum Pemrograman Dasar"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label>Waktu</Label>
							</div>
							<div className="flex items-center gap-2">
								<Calendar22 />
								{/* <Input
									type="time"
									value={startTime}
									onChange={handleStartTimeChange}
									className="bg-background appearance-none w-fit"
									required
									/> */}
								<span className="flex items-center">-</span>
								<Calendar22 />
								{/* <Input
									type="time"
									value={endTime}
									onChange={handleEndTimeChange}
									className="bg-background appearance-none w-fit"
									required
								/> */}
							</div>
						</div>

						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="lecturer">Nama Dosen</Label>
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
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<div className="flex justify-end w-full gap-2">
					<Button type="submit">Submit Request</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
