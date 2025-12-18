"use client"

import InventoryTable from "@/components/table-inventory";
import { ColumnDef } from "@tanstack/react-table";
import { ItemCategories } from "@/components/type";
import { useCategories } from "@/hooks/use-categories";
import { useEffect } from "react";
import DetailItemCategories from "@/components/detail-item-categories";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const tableHeader: ColumnDef<ItemCategories>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ID
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue("id")}</div>,
	},
	{
		accessorKey: "categoryName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Name
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div>{row.getValue("categoryName")}</div>,
	},
	{
		accessorKey: "specification",
		header: "Specification",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => (
			<div className="flex justify-center">
				{row.getValue("quantity") ? row.getValue("quantity") : 0}
			</div>
		),
	},
	// {
	// 	header: "Condition",
	// 	cell: ({ row }) => {
	// 		return (
	// 			<div className="flex flex-col gap-2 w-14">
	// 				<Badge className="mr-2 bg-green-100 text-green-800 w-full">
	// 					Good: {row.original.goodCondition}
	// 				</Badge>
	// 				<Badge className="bg-yellow-100 text-yellow-800 w-full">
	// 					Poor: {row.original.poorCondition}
	// 				</Badge>
	// 			</div>
	// 		);
	// 	},
	// },
	{
		header: "Action",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical className="cursor-pointer" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<div className="flex justify-start w-full text-sm">
							<DetailItemCategories
								name={row.getValue("categoryName")}
								specification={row.getValue("specification")}
								id={row.getValue("id")}
								qty={row.getValue("quantity") ?? 0}
							/>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function InventoryPage() {
	const token = localStorage.getItem("access_token");
	const categories = useCategories();

	useEffect(() => {
		categories.handleGetAllInventory(token || "").then((data) => {
			categories.setItemsCategories(data);
		});
	}, []);

	return (
		<>
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
					{/* <ChartAreaInteractive /> */}
					<InventoryTable
						columns={tableHeader}
						data={categories.itemsCategories}
					/>
				</div>
			</div>
		</>
	);
}