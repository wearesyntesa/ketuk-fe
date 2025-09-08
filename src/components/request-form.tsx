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
import { useState } from "react";

export function RequestForm({ border }: { border?: boolean }) {
	const [eventName, setEventName] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [eventType, setEventType] = useState("");
	const [description, setDescription] = useState("");

	const [page, setPage] = useState(1);

	const handleNext = () => {
		setPage(page + 1);
	};

	const handleBack = () => {
		setPage(page - 1);
	};

	return (
		<Card className={`w-full ${border ? "border" : "border-0"}`}>
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
										placeholder="Praktikum Pemrograman Dasar"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Calendar22 />
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label>Waktu</Label>
									</div>
									<div className="flex gap-2">
										<Input
											type="time"
											step="1"
											defaultValue="10:30:00"
											className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-fit"
											required
										/>
										<Input
											type="time"
											step="1"
											defaultValue="10:30:00"
											className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-fit"
											required
										/>
									</div>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="event-type">Jenis Kegiatan</Label>
									</div>
									<Select>
										<SelectTrigger id="event-type" className="w-full">
											<SelectValue placeholder="Pilih jenis kegiatan" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Jenis Kegiatan</SelectLabel>
												<SelectItem value="praktikum">Praktikum</SelectItem>
												<SelectItem value="kelas">Kelas</SelectItem>
												<SelectItem value="skripsi">Skripsi</SelectItem>
												<SelectItem value="lainnya">Lainnya</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</>
						) : (
							<>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="pic">Penanggung Jawab</Label>
									</div>
									<Input
										id="pic"
										type="text"
										placeholder="Nama Penanggung Jawab"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="email">Email Unesa</Label>
									</div>
									<Input
										id="email"
										type="email"
										placeholder="Nama Penanggung Jawab"
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
										placeholder="Nama Penanggung Jawab"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="description">Deskripsi Kegiatan</Label>
									</div>
									<Textarea id="description" required />
								</div>
							</>
						)}
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				{page === 1 ? (
					<Button className="w-full" onClick={handleNext}>
						Next
					</Button>
				) : (
					<div className="grid grid-cols-2 w-full gap-2">
						<Button variant={"outline"} className="w-full" onClick={handleBack}>
							Back
						</Button>
						<Button type="submit" className="w-full">
							Submit Request
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
