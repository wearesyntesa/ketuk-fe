"use client"

import RequestsTable from "@/components/table-requests";
import { ColumnDef } from "@tanstack/react-table";
import { MergeSchedultType } from "@/components/type";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { useSchedule } from "@/hooks/use-schedule";
import { InitialIconEmail, InitialIconWithName } from "@/components/initial-icon";
import DetailTicketPatch from "@/components/detail-ticket-patch";

const tableHeaderAdmin: ColumnDef<MergeSchedultType>[] = [
	{
		accessorKey: "idSchedule",
		header: "ID",
	},
	{
		accessorKey: "title",
		header: "Title Event",
		cell: ({ row }) => <InitialIconWithName title={row.original.title} />,
	},
	{
		accessorKey: "startDate",
		header: "Date",
		cell: ({ row }) => {
			return new Date(row.original.startDate).toLocaleDateString();
		},
	},
	{
		header: "Time",
		cell: ({ row }) => {
			return (
				<span>
					{new Date(row.original.startDate).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
					-{" "}
					{new Date(row.original.endDate).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		id: "personInCharge",
		header: "Person In Charge",
		cell: ({ row }) => <InitialIconWithName title={row.original.user.name} />,
	},
	{
		id: "contact",
		header: "Contact",
		cell: ({ row }) => <InitialIconEmail email={row.original.user.email} />,
	},
	{
		accessorKey: "kategori",
		header: "Category",
		cell: ({ row }) => <EventTypeCell category={row.original.kategori} />,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status =
				row.original.status.charAt(0).toUpperCase() +
					row.original.status.slice(1) || "Pending";
			const statusColor =
				status === "Accepted"
					? "text-green-500"
					: status === "Rejected"
					? "text-red-500"
					: "text-yellow-500";
			return <span className={statusColor}>{status}</span>;
		},
	},
	{
		header: "Is Reguler",
		cell: ({ row }) => {
			return (
				<span>
					{row.original.isReguler ? "✅" : "❌"}
				</span>
			);
		}
	},
	{
		header: "Actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						className={`btn btn-sm ${
							row.original.status.charAt(0).toUpperCase() +
								row.original.status.slice(1) ===
							"Pending"
								? ""
								: "hidden"
						}`}>
						<EllipsisVertical size={16} />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DetailTicketPatch startTime={row.original.startDate} endTime={row.original.endDate} date={row.original.startDate} id={row.original.tickets?.[0].id || 0} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const tableHeaderUser: ColumnDef<MergeSchedultType>[] = [
	{
		accessorKey: "title",
		header: "Title Event",
		cell: ({ row }) => <InitialIconWithName title={row.original.title} />,
	},
	{
		accessorKey: "startDate",
		header: "Date",
	},
	{
		header: "Time",
		cell: ({ row }) => {
			return (
				<span>
					{new Date(row.original.startDate).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}{" "}
					-{" "}
					{new Date(row.original.endDate).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		id: "personInCharge",
		header: "Person In Charge",
		cell: ({ row }) => <InitialIconWithName title={row.original.user.name} />,
	},
	{
		id: "contact",
		header: "Contact",
		cell: ({ row }) => <InitialIconEmail email={row.original.user.email} />,
	},
	{
		accessorKey: "kategori",
		header: "Category",
		cell: ({ row }) => <EventTypeCell category={row.original.kategori} />,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status =
				row.original.status.charAt(0).toUpperCase() +
					row.original.status.slice(1) || "Pending";
			const statusColor =
				status === "Accepted"
					? "text-green-500"
					: status === "Rejected"
					? "text-red-500"
					: "text-yellow-500";
			return (
				<span className={statusColor}>{status}</span>
			);
		},
	},
];

export default function YourRequestsPage() {
	const [token, setToken] = useState<string>(localStorage.getItem("access_token") || "");
	const user = useUser();
	const mergedSchedules: MergeSchedultType[] = [];
	
	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				user.setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		}
	}, []);
	
	const schedules = useSchedule(token);
	useEffect(() => {
		// schedules.handleGetAllSchedules();
		// console.log("Schedules fetched:", schedules.schedules);
		const userData = localStorage.getItem("user") || "";
		console.log("User Data:", JSON.parse(userData).role);
		const fetchData = async () => {
			if (JSON.parse(userData).role === "admin") {
				schedules.handleGetAllRegulerSchedules();
				schedules.handleGetAllTicketSchedules();
			} else {
				console.log("Fetching schedules for user ID:", JSON.parse(userData).id);
				schedules.handleScheduleByUserId(JSON.parse(userData).id || 0);
			}
		};
		fetchData();
	}, [mergedSchedules.length]);

	console.log("Schedules:", {
		ticketSchedules: schedules.ticketSchedules,
		regulerSchedules: schedules.regulerSchedules,
	});

	const regulerFiltered = schedules.regulerSchedules
	.filter((schedule, index, self) => 
		index === self.findIndex((s) => s.title === schedule.title)
	);

	schedules.handleMergeSchedules(
		schedules.ticketSchedules,
		regulerFiltered,
		user.user?.role === "admin"
	).forEach((item) => mergedSchedules.push(item));

	const header =
		user.user?.role === "admin" ? tableHeaderAdmin : tableHeaderUser;

	return (
		<>
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 gap-4 lg:px-6 flex flex-col">
					{/* <ChartAreaInteractive /> */}
					{/* <RequestsList items={eventRequestItem} /> */}
					<RequestsTable columns={header} data={mergedSchedules} />
				</div>
			</div>
		</>
	);
}

function EventTypeCell({ category }: { category: string }) {
	if(category == "" || category == null ){
		// console.log("passing schedule reguler")
	}else{
		const iconType = category.toLowerCase() === "kelas" ? "📅" : category.toLowerCase() === "praktikum" ? "🛠️" : category.toLowerCase() === "skripsi" ? "💻" : "❓";
		return (
      <span>
        {iconType} {category}
      </span>
    );

	}
    
}