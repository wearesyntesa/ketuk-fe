"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MergeSchedultType, PatchTicketStatus, UserType } from "./type";
import { useTickets } from "@/hooks/use-tickets";
import { useSchedule } from "@/hooks/use-schedule";

interface DetailItemProps {
	id: number;
	startTime: string;
	endTime: string;
	date: string;
}

interface TicketData {
	id: number;
	idSchedule: number;
	reason: string;
	status: "pending" | "accepted" | "rejected";
	title: string;
	description: string;
	user: UserType;
}

export default function DetailTicketPatch({ id, startTime, endTime, date }: DetailItemProps) {
	const [ticketData, setTicketData] = useState<TicketData>({
		id: 0,
		idSchedule: 0,
		reason: "",
		status: "pending",
		title: "",
		description: "",
		user: {
			id: 0,
			name: "",
			email: "",
			role: "",
		},
	});
	const token = localStorage.getItem("access_token") || "";
	const schedules = useSchedule(token);
	const mergeAcceptedSchedules: MergeSchedultType[] = [];

	useEffect(() => {
		const fetchData = async () => {
			schedules.handleGetAllRegulerSchedules();
			schedules.handleGetAllTicketSchedules();
		};
		fetchData();
	}, [mergeAcceptedSchedules.length]);

	schedules.handleGetAllAcceptedSchedules(
		schedules.ticketSchedules,
		schedules.regulerSchedules
	).map((item) => mergeAcceptedSchedules.push(item));

	const tickets = useTickets();

	// console.log("this is ticket data", ticketData)

	useEffect(() => {
		tickets.handleGetTicketByID(id, token).then((data) => {
			setTicketData({
				id: data.id,
				idSchedule: data.idSchedule,
				reason: data.reason,
				status: data.status,
				title: data.title,
				description: data.description,
				user: data.user,
			});
		})
	}, [])

	const checkConflict = () => {
		const conflicts = mergeAcceptedSchedules.filter((schedule) => {
			const scheduleDate = new Date(schedule.date);
			const checkDate = new Date(date);
			return (
				schedule.startDate === startTime &&
				schedule.endDate === endTime &&
				scheduleDate.getFullYear() === checkDate.getFullYear() &&
				scheduleDate.getMonth() === checkDate.getMonth() &&
				scheduleDate.getDate() === checkDate.getDate()
			);
		});

		if (conflicts.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	const approveTicket = () => {
		const data: PatchTicketStatus = {
			status: "accepted",
			reason: ticketData.reason,
		};
		// console.log("this is the data:", data)
		// console.log("this is ticket id:", id)
		if (token) {
			tickets.handlePatchTicket(data, id, token).then(() => {
				console.log("Ticket approved");
			});
		}
	}

	const rejectTicket = () => {
		const data: PatchTicketStatus = {
			status: "rejected",
			reason: ticketData.reason,
		};
		if (token) {
			tickets.handlePatchTicket(data, id, token).then(() => {
				console.log("Ticket approved");
			});
		}
	}

	return (
		<div className="flex flex-col w-full gap-4 px-2 justify-start items-start">
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					Approve
				</DialogTrigger>
					{!checkConflict() ? (
						<DialogContent>
							<DialogTitle>Approve Ticket</DialogTitle>
							<DialogDescription>
								Are you sure you want to approve this ticket?
							</DialogDescription>
							<form onSubmit={approveTicket}>
								<div className="flex flex-col gap-6">
									<div className="grid gap-2">
										<Label htmlFor="item-name">Nama Ticket</Label>
										<Input
											id="item-name"
											type="text"
											placeholder="Lemari"
											value={ticketData.title}
											readOnly
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="specification">Note</Label>
										<Textarea
											id="specification"
											placeholder="Azko"
											value={ticketData.reason}
											onChange={(e) =>
												setTicketData({
													...ticketData,
													reason: e.target.value,
												})
											}
											required
										/>
									</div>
									<div className="w-full gap-4 grid grid-cols-2">
										<DialogClose className="border rounded-mb">Cancel</DialogClose>
										<Button type="submit">Approve</Button>
									</div>
								</div>
							</form>
						</DialogContent>
					) : (
						<DialogContent>
							<DialogTitle>Conflict Detected</DialogTitle>
							<DialogDescription>
								There is a scheduling conflict with the selected time slot. You cannot approve this ticket.
								<br/>
								This action will reject the ticket instead.
							</DialogDescription>
							<div className="grid gap-2">
								<Label htmlFor="specification">Note</Label>
								<Textarea
									id="specification"
									placeholder="Azko"
									value={"Your request conflicts with an existing schedule."}
									onChange={(e) =>
										setTicketData({
											...ticketData,
											reason: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="flex gap-2">
								<DialogClose className="flex-1 p-1 border rounded-md">
									Cancel
								</DialogClose>
								<Button className="flex-1" onClick={rejectTicket}>
									Confirm
								</Button>
							</div>
						</DialogContent>
					)}
			</Dialog>

			{/* Delete Data */}
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					Reject
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{ticketData.title}</DialogTitle>
						<DialogDescription>
							Are you sure you want to reject this ticket?
						</DialogDescription>
						<div className="grid gap-2">
							<Label htmlFor="specification">Note</Label>
							<Textarea
								id="specification"
								placeholder="Azko"
								value={ticketData.reason}
								onChange={(e) =>
									setTicketData({
										...ticketData,
										reason: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="flex gap-2">
							<DialogClose className="flex-1 p-1 border rounded-md">
								Cancel
							</DialogClose>
							<Button className="flex-1" onClick={rejectTicket}>
								Confirm
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
