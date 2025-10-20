"use client"

import AppHeader from "@/components/app-header";
import InventoryTable from "@/components/inventory-table";
import { inventoryItem } from "../data";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryDetailItem, InventoryItem } from "@/components/type";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import InventoryDetailTable from "@/components/inventory-detail-table";
import { Badge } from "@/components/ui/badge";

const tableDetail: ColumnDef<InventoryDetailItem>[] = [
	{
		accessorKey: "serialNumber",
		header: "Serial Number",
	},
	{
		accessorKey: "procurementYear",
		header: "Procurement Year",
	},
	{
		accessorKey: "condition",
		header: "Condition",
	},
	{
		accessorKey: "note",
		header: "Note",
	},
	{
		header: "Action",
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MenuIcon className="cursor-pointer" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

const tableHeader: ColumnDef<InventoryItem>[] = [
	{
		accessorKey: "nameItem",
		header: "Name",
		cell: ({ row }) => (
			<Dialog>
				<DialogTrigger className="cursor-pointer">
					{row.getValue("nameItem")}
				</DialogTrigger>
				<DialogContent className="min-w-4xl">
					<AlertDialogHeader>
						<DialogTitle>{row.getValue("nameItem")}</DialogTitle>
						<DialogDescription>
							Detail information about the item can be displayed here.
						</DialogDescription>
					</AlertDialogHeader>
					<InventoryDetailTable
						columns={tableDetail}
						data={row.original.items}
					/>
					{/* <div className="h-96">
					</div> */}
				</DialogContent>
			</Dialog>
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
	{
		header: "Condition",
		cell: ({ row }) => {
			return (
				<div className="flex flex-col gap-2 w-14">
					<Badge className="mr-2 bg-green-100 text-green-800 w-full">
						Good: {row.original.goodCondition}
					</Badge>
					<Badge className="bg-yellow-100 text-yellow-800 w-full">
						Poor: {row.original.poorCondition}
					</Badge>
				</div>
			);
		},
	},
	{
		header: "Action",
		cell: ({ row }) => {
			return (
				<Dialog>
					<DialogTrigger className="cursor-pointer hover:font-semibold">
						Detail
					</DialogTrigger>
					<DialogContent className="min-w-4xl">
						<AlertDialogHeader>
							<DialogTitle>{row.getValue("nameItem")}</DialogTitle>
							<DialogDescription>
								Detail information about the item can be displayed here.
							</DialogDescription>
						</AlertDialogHeader>
						<InventoryDetailTable
							columns={tableDetail}
							data={row.original.items}
						/>
						{/* <div className="h-96">
						</div> */}
					</DialogContent>
				</Dialog>
			);
		},
	},
];

export default function InventoryPage() {
	return (
		<>
			<AppHeader title="Inventory" />
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
					{/* <ChartAreaInteractive /> */}
					<InventoryTable columns={tableHeader} data={inventoryItem} />
				</div>
			</div>
		</>
	);
}