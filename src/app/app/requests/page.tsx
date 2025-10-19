"use client";

import AppHeader from "@/components/app-header";
import { RequestForm, RequestRegulerForm } from "@/components/request-form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function RequestsPage() {
	const [isReguler, setIsRegular] = useState(false);

	const handleToggle = () => {
		setIsRegular(!isReguler);
	};

	return (
		<>
			<AppHeader title="Request Schedule" />
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6">
					{/* <ChartAreaInteractive /> */}
					<div className="border">
						<div className="md:w-3/4 w-full flex justify-end items-center gap-4 p-4 m-auto">
							<span>Check if you want to request a regular schedule</span>
							<Switch checked={isReguler} onCheckedChange={handleToggle} />
						</div>
						{isReguler ? (
							<RequestRegulerForm className="md:w-3/4 w-full px-4 m-auto" />
						) : (
							<RequestForm className="md:w-3/4 w-full px-4 m-auto" />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
