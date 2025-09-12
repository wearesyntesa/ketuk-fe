"use client"

import AppHeader from "@/components/app-header";
import { eventRequestItem } from "../data";
import RequestsTable from "@/components/requests-table";
import { ColumnDef } from "@tanstack/react-table";
import { EventRequest } from "@/components/type";

const tableHeader: ColumnDef<EventRequest>[] = [
    {
        accessorKey: "title",
		header: "Title Event",
        cell: ({row}) => (
            <InitialIcon title={row.original.title} />
        ),
	},
    {
        accessorKey: "date",
        header: "Date",
    },
	{
		accessorKey: "time",
		header: "Time",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "pic",
		header: "Person In Charge",
        cell: ({row}) => (
				<InitialIcon title={row.original.pic} />
        ),
	},
	{
        accessorKey: "contact",
		header: "Contact",
	},
	{
        accessorKey: "category",
		header: "Category",
        cell: ({row}) => <EventTypeCell category={row.original.category} />,
	},
    {
        accessorKey: "note",
        header: "Note",
    },
];

export default function YourRequestsPage() {
    return (
        <>
        <AppHeader title="Your Requests" />
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* <SectionCards /> */}
                <div className="px-4 gap-4 lg:px-6 flex flex-col">
                    {/* <ChartAreaInteractive /> */}
                    {/* <RequestsList items={eventRequestItem} /> */}
                    <RequestsTable columns={tableHeader} data={eventRequestItem} />
                </div>
            </div>
        </>
    )
}

function InitialIcon({title}: {title: string}) {
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
	const colorClass = colors[Math.floor(Math.random() * colors.length)];
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