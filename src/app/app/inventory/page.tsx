"use client"

import AppHeader from "@/components/app-header";
import InventoryTable from "@/components/inventory-table";
import { inventoryItem } from "../data";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryItem } from "@/components/type";

const tableHeader: ColumnDef<InventoryItem>[] = [
    {
        accessorKey: "nameItem",
        header: "Name",
    },
    {
        accessorKey: "procurementYear",
        header: "Procurement Year",
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
        accessorKey: "goodCondition",
        header: "Good Condition",
    },
    {
        accessorKey: "fairCondition",
        header: "Fair Condition",
    },
    {
        accessorKey: "poorCondition",
        header: "Poor Condition",
    },
    {
        accessorKey: "note",
        header: "Note",
    },
]

export default function InventoryPage() {
    return (
            <>
                <AppHeader title="Inventory" />
                <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* <SectionCards /> */}
                    <div className="px-4 lg:gap-2 lg:px-6">
                        {/* <ChartAreaInteractive /> */}
                        <InventoryTable columns={tableHeader} data={inventoryItem} />
                    </div>
                </div>
            </>
        )
}