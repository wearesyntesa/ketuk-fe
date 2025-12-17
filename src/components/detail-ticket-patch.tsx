"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ItemDialogProps, PatchTicketStatus, UserType } from "./type";
import { useTickets } from "@/hooks/use-tickets";

interface DetailItemProps {
	id: number;
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

export default function DetailTicketPatch({ id }: DetailItemProps) {
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

	const tickets = useTickets();

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

	const approveTicket = () => {
		const data: PatchTicketStatus = {
			status: "accepted",
			reason: ticketData.reason,
		};
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
				<DialogContent>
					<DialogTitle>Approve Ticket</DialogTitle>
					<DialogDescription>
						Are you sure you want to approve this ticket?
					</DialogDescription>
					<form onSubmit={() => approveTicket}>
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
								<Button>Approve</Button>
							</div>
						</div>
					</form>
				</DialogContent>
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
						<div className="flex gap-2">
							<DialogClose className="flex-1 p-1 border rounded-md">
								Cancel
							</DialogClose>
							<Button className="flex-1" onClick={() => rejectTicket}>
								Confirm
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
