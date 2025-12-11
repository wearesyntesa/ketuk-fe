"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Calendar22({
	label,
	setDateState,
	valDateState,
}: {
	label?: boolean;
	setDateState: React.Dispatch<React.SetStateAction<Date | undefined>>;
	valDateState: Date | undefined;
}) {
	const [open, setOpen] = React.useState(false);

	console.log("valDateState", valDateState);
	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className={`px-1 ${label ? "visible" : "hidden"}`}>
				Tanggal Peminjaman
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal">
						{valDateState ? valDateState.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={valDateState}
						captionLayout="dropdown"
						onSelect={(valDateState) => {
							setDateState?.(valDateState);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
