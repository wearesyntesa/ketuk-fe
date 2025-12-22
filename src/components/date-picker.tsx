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
import { DateRange } from "react-day-picker"
import { useTranslations } from "next-intl"

export function CalendarRequestForm({
	label,
	valDateState,
	onChange,
}: {
	label?: boolean;
	valDateState: Date | undefined;
	onChange: (date: Date | undefined) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const t = useTranslations("schedule");

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className={`px-1 ${label ? "visible" : "hidden"}`}>
				{t("selectDate")}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal">
						{valDateState ? valDateState.toLocaleDateString() : t("selectDate")}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={valDateState}
						onSelect={(valDateState) => {
							onChange(valDateState);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export function CalendarRange({
	label,
	use,
	valDateState,
	onChange,
}: {
	label?: boolean;
	use?: "unblock" | "request";
	valDateState: DateRange | undefined;
	onChange: (date: DateRange | undefined) => void;
}) {
	const t = useTranslations("schedule");
	const tBooking = useTranslations("bookingWindow");

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className={`px-1 ${label ? "visible" : "hidden"}`}>
				{use === "unblock" ? tBooking("dateRange") : t("selectDate")}
			</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal">
						{valDateState ? `${valDateState.from?.toLocaleDateString()} - ${valDateState.to?.toLocaleDateString()}` : t("selectDate")}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="range"
						selected={valDateState}
						numberOfMonths={2}
						className="md:block hidden"
						onSelect={(valDateState) => {
							onChange(valDateState);
						}}
					/>
					<Calendar
						mode="range"
						selected={valDateState}
						numberOfMonths={1}
						className="md:hidden block"
						onSelect={(valDateState) => {
							onChange(valDateState);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export function CalendarUnblockForm({
	label,
	setDateState,
	valDateState,
}: {
	label?: boolean;
	setDateState: React.Dispatch<React.SetStateAction<Date | undefined>>;
	valDateState: Date | undefined;
}) {
	const [open, setOpen] = React.useState(false);
	const t = useTranslations("schedule");

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className={`px-1 ${label ? "visible" : "hidden"}`}>
				{t("selectDate")}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal">
						{valDateState ? valDateState.toLocaleDateString() : t("selectDate")}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={valDateState}
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
