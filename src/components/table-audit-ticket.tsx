"use client";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function AuditTicketsByTicketTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
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
                    <Select
                        onValueChange={(value: string) =>
                            table
                                .getColumn("action")
                                ?.setFilterValue(value !== "all" ? value : "")
                        }
                        defaultValue="all">
                        <SelectTrigger
                            className="w-full"
                            value={table.getColumn("action")?.getFilterValue() as string}>
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="created">Created</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>
            <div className="flex justify-between items-center px-2">
                <div>
                    Data {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getState().pagination.pageSize}
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <ChevronLeft size={16} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        <ChevronRight size={16} />
                    </Button>
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
                                            className={`px-4 ${
                                                header.column.columnDef.header === "Action"
                                                    ? "text-center"
                                                    : ""
                                            }
                                            ${
                                                header.column.columnDef.header === "Old Value" ||
                                                header.column.columnDef.header === "New Value" ||
                                                header.column.columnDef.header === "Changes"
                                                    ? "max-w-32"
                                                    : ""
                                            }
                                            `}>
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
                                            className={`px-4 ${
                                                cell.column.columnDef.header === "Actions" &&
                                                "text-center"
                                            }
                                            ${
                                                cell.column.columnDef.header === "Old Value" ||
                                                cell.column.columnDef.header === "New Value" ||
                                                cell.column.columnDef.header === "Changes"
                                                    ? "max-w-32 overflow-clip"
                                                    : ""
                                            }
                                            `}>
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
                                    className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
