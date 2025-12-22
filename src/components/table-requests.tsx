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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { MergeSchedultType } from "./type";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { useTranslations } from "next-intl";

interface DataTableProps<TData extends MergeSchedultType, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function RequestsTable<TData extends MergeSchedultType, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations("requests");
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder={t("searchRequests")}
            className="pl-9 h-10 bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          />
        </div>

        <Select
          onValueChange={(value: string) => table.getColumn("status")?.setFilterValue(value !== "all" ? value : "")}
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px] h-10 bg-white border-slate-200">
            <div className="flex items-center gap-2 text-slate-600">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder={t("filterByStatus")} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="Pending">{t("pending")}</SelectItem>
            <SelectItem value="Accepted">{t("approved")}</SelectItem>
            <SelectItem value="Rejected">{t("rejected")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-slate-200 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`
                            h-12 px-6 text-xs font-bold uppercase tracking-wider text-slate-500
                            ${header.column.columnDef.header === "Actions" || header.column.columnDef.header === "Is Reguler" ? "text-center" : ""}
                        `}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`
                            px-6 py-4 text-sm text-slate-700
                            ${cell.column.columnDef.header === "Actions" || cell.column.columnDef.header === "Is Reguler" ? "text-center" : ""}
                        `}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-500">
                  {t("noRequestsFound")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <div className="text-xs text-slate-500 font-medium">
            {tCommon("page")} {table.getState().pagination.pageIndex + 1} {tCommon("of")} {table.getPageCount() || 1}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white border-slate-200 hover:bg-slate-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white border-slate-200 hover:bg-slate-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
