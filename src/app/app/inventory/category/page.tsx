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
import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";

export default function DetailCategoryItem() {
    const token = localStorage.getItem("access_token") || "";
    const searchParams = useSearchParams();
    const idFromQuery: number = Number(searchParams.get("categoryId"));
    const items = useItems();
    const categories = useCategories();
	const [categoryName, setCategoryName] = useState<string>("");
    const t = useTranslations("inventory");

    const tableDetail: ColumnDef<ItemDetail>[] = useMemo(() => [
        {
            accessorKey: "id",
            header: t("id"),
        },
        {
            accessorKey: "name",
            header: t("itemName"),
        },
        {
            accessorKey: "year",
            header: t("procurementYear"),
        },
        {
            accessorKey: "kondisi",
            header: t("condition"),
        },
        {
            accessorKey: "note",
            header: t("note"),
        },
        {
            accessorKey: "categoryId",
            header: t("action"),
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
    ], [t]);

    const fetchItemsCategory = () => {
		if (token) {
			items.handleGetItemCategory(token, idFromQuery).then((data) => {
				categories.setItemCategories(data);
				if (data.length > 0) {
					setCategoryName(data[0].category.categoryName);
				}
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
					<h1 className="text-2xl font-bold">{t("category")} : {categoryName}</h1>
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