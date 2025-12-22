"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { UnblockingResponse } from "./type";
import { useTranslations } from "next-intl";

interface DataTableProps<TData extends UnblockingResponse, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function UnblockingTable<TData extends UnblockingResponse, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const t = useTranslations("bookingWindow");
    const tCommon = useTranslations("common");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="overflow-hidden rounded-md flex flex-col gap-4">
            <Card className="p-2">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder={t("searchBookingWindows")}
                        className="flex-1"
                        value={(table.getColumn("startDate")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("startDate")?.setFilterValue(event.target.value)
                        }
                    />
                </div>
            </Card>
            <div className="flex justify-between items-center px-2">
                <div>
                    {tCommon("page")} {table.getState().pagination.pageIndex + 1} {tCommon("of")}{" "}
                    {table.getPageCount() || 1}
                </div>
                <div className="flex gap-4">
                </div>
            </div>
            <Card className="p-0">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={`px-4`}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={`hover:bg-muted/50`}
                                    data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`px-4`}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground">
                                    {t("noBookingWindows")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}