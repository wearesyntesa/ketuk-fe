"use client";

import DetailItem from "@/components/detail-item";
import InventoryDetailTable from "@/components/table-inventory-detail";
import { ItemDetail } from "@/components/type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCategories } from "@/hooks/use-categories";
import { useItems } from "@/hooks/use-items";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const tableDetail: ColumnDef<ItemDetail>[] = [
    // {
    //     accessorKey: "categoryId",
    //     header: "Category ID",
    // },
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
        accessorKey: "categoryId",
		header: "Action",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical className="cursor-pointer" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DetailItem itemId={row.getValue("id")} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function DetailCategoryItem() {
    const token = localStorage.getItem("access_token") || "";
    const searchParams = useSearchParams();
    const idFromQuery: number = Number(searchParams.get("categoryId"));
    const items = useItems();
    const categories = useCategories();

    const fetchItemsCategory = () => {
		if (token) {
			items.handleGetItemCategory(token, idFromQuery).then((data) => {
				categories.setItemCategories(data);
			});
		}
	};

    useEffect(() => {
        fetchItemsCategory();
    }, [idFromQuery]);

    console.log("items category:", categories.itemCategories);
    return (
        <>
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* <SectionCards /> */}
                <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
                    <InventoryDetailTable
                        columns={tableDetail}
                        data={categories.itemCategories || []}
                        id={idFromQuery}
                    />
                </div>
            </div>
        </>
    );
}