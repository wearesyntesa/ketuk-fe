"use client"

import RequestsTable from "@/components/table-requests";
import { ColumnDef } from "@tanstack/react-table";
import { MergeSchedultType } from "@/components/type";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { useSchedule } from "@/hooks/use-schedule";

const tableHeaderAdmin: ColumnDef<MergeSchedultType>[] = [
	{
		accessorKey: "title",
		header: "Title Event",
		cell: ({ row }) => <InitialIcon title={row.original.title} />,
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
		cell: ({ row }) => <InitialIcon title={row.original.user.name} />,
	},
	{
		id: "contact",
		header: "Contact",
		cell: ({ row }) => <InitialIcon title={row.original.user.email} />,
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
						<DropdownMenuItem>Approve</DropdownMenuItem>
						<DropdownMenuItem>Reject</DropdownMenuItem>
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
		cell: ({ row }) => <InitialIcon title={row.original.title} />,
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
		cell: ({ row }) => <InitialIcon title={row.original.user.name} />,
	},
	{
		id: "contact",
		header: "Contact",
		cell: ({ row }) => <InitialIcon title={row.original.user.email} />,
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
		const fetchData = async () => {
			if (JSON.parse(userData).role === "admin") {
				schedules.handleGetAllRegulerSchedules();
				schedules.handleGetAllTicketSchedules();
			} else {
				schedules.handleScheduleByUserId(JSON.parse(userData).id || 0);
			}
		};
		fetchData();
	}, [mergedSchedules.length, ]);


	schedules.ticketSchedules.forEach((ticketSchedule) => {
		mergedSchedules.push({
			idSchedule: ticketSchedule.idSchedule,
			title: ticketSchedule.title,
			startDate: ticketSchedule.startDate,
			endDate: ticketSchedule.endDate,
			userId: ticketSchedule.userId,
			kategori: ticketSchedule.kategori,
			description: ticketSchedule.description,
			createdAt: ticketSchedule.createdAt,
			updatedAt: ticketSchedule.updatedAt,
			user: ticketSchedule.user,
			tickets: ticketSchedule.tickets,
			status: ticketSchedule.tickets?.[0].status || "Pending",
			isReguler: false,
		});
	});
	if(user.user?.role === "admin") {
		schedules.regulerSchedules.forEach((regulerSchedule) => {
			mergedSchedules.push({
				idSchedule: regulerSchedule.idSchedule,
				title: regulerSchedule.title,
				startDate: regulerSchedule.startDate,
				endDate: regulerSchedule.endDate,
				userId: regulerSchedule.userId,
				kategori: regulerSchedule.kategori,
				description: regulerSchedule.description,
				createdAt: regulerSchedule.createdAt,
				updatedAt: regulerSchedule.updatedAt,
				user: regulerSchedule.user,
				status: "Accepted",
				isReguler: true,
			});
		});
	}

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

function InitialIcon({ title }: { title: string }) {
	const initial = title
		.split(" ")
		.filter((_, index) => index < 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
	const colors = [
		"bg-red-100 text-red-700",
		"bg-green-100 text-green-700",
		"bg-blue-100 text-blue-700",
		"bg-yellow-100 text-yellow-700",
		"bg-purple-100 text-purple-700",
		"bg-pink-100 text-pink-700",
		"bg-indigo-100 text-indigo-700",
		"bg-teal-100 text-teal-700",
		"bg-orange-100 text-orange-700",
	];
	function hashString(str: string) {
		let h = 0;
		for (let i = 0; i < str.length; i++) {
			h = (h << 5) - h + str.charCodeAt(i);
			h |= 0;
		}
		return Math.abs(h);
	}

	const colorClass = colors[hashString(title) % colors.length];
	return (
		<div className="flex items-center gap-3">
			<div>
				<div
					className={`w-8 h-8 px-4 rounded-full flex items-center justify-center font-medium ${colorClass}`}>
					{initial}
				</div>
			</div>
			<span>{title}</span>
		</div>
	);
}

function EventTypeCell({ category }: { category: string }) {
    const iconType = category.toLowerCase() === "kelas" ? "📅" : category.toLowerCase() === "praktikum" ? "🛠️" : category.toLowerCase() === "skripsi" ? "💻" : "❓";
    return <span>{iconType} {category}</span>;
}