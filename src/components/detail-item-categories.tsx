'use client';

import { MenuIcon } from "lucide-react";
import InventoryDetailTable from "./inventory-detail-table";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useItems } from "@/hooks/use-items";
import { ColumnDef } from "@tanstack/react-table";
import { ItemDetail } from "./type";

const tableDetail: ColumnDef<ItemDetail>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "year",
		header: "Procurement Year",
	},
	{
		accessorKey: "kondisi",
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

interface DetailItemCategoriesProps {
    name: string;
    id: number;
}

export default function DetailItemCategories({name, id}: DetailItemCategoriesProps) {
    const token = localStorage.getItem("access_token");
    const item = useItems();

    const fetchItem = () => {
        if (token) {
            item.handleGetItemCategory(token, id).then((data) => {
                item.setItemCategories(data);
            });
        }
    }
    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer hover:font-semibold" onClick={() => fetchItem()}>
                Detail
            </DialogTrigger>
            <DialogContent>
                <AlertDialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>
                        Detail information about the item can be displayed here.
                    </DialogDescription>
                </AlertDialogHeader>
                <InventoryDetailTable
                    columns={tableDetail}
                    data={item.itemCategories || []}
                />
                {/* <div className="h-96">
                </div> */}
            </DialogContent>
        </Dialog>
    )
}