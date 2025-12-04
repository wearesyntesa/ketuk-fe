"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RequestForm, RequestRegulerForm } from "./request-form";
import { useState } from "react";
import { Switch } from "./ui/switch";

export function RequestDialog() {
	const [isReguler, setIsRegular] = useState(false);

	const handleToggle = () => {
		setIsRegular(!isReguler);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-blue-400">Request Schedule +</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] p-0">
				<DialogHeader className="p-4 pb-0">
					<DialogTitle className="text-2xl"></DialogTitle>
				</DialogHeader>
				<div className="w-full flex justify-end items-center gap-4 px-4 pt-4 m-auto">
					<span>Check if you want to request a regular schedule</span>
					<Switch checked={isReguler} onCheckedChange={handleToggle} />
				</div>
				{isReguler ? (
					<RequestRegulerForm border={false} />
				) : (
					<RequestForm border={false} />
				)}
			</DialogContent>
		</Dialog>
	);
}
