"use client"

import AppHeader from "@/components/app-header";
import InventoryTable from "@/components/inventory-table";
import { ColumnDef } from "@tanstack/react-table";
import { ItemCategories } from "@/components/type";
import { useItems } from "@/hooks/use-items";
import { useEffect } from "react";
import DetailItemCategories from "@/components/detail-item-categories";

const tableHeader: ColumnDef<ItemCategories>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "categoryName",
		header: "Name",
		cell: ({ row }) => (
			<DetailItemCategories
				name={row.getValue("categoryName")}
				id={row.getValue("id")}
			/>
		),
	},
	{
		accessorKey: "specification",
		header: "Specification",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
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
				<DetailItemCategories
					name={row.getValue("categoryName")}
					id={row.getValue("id")}
				/>
			);
		},
	},
];

export default function InventoryPage() {
	const token = localStorage.getItem("access_token");
	const item = useItems();

	useEffect(() => {
		item.handleGetAllInventory(token || "").then((data) => {
			item.setItemsCategories(data);
		});
	}, []);

	return (
		<>
			<AppHeader title="Inventory" />
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
					{/* <ChartAreaInteractive /> */}
					<InventoryTable columns={tableHeader} data={item.itemsCategories} />
				</div>
			</div>
		</>
	);
}