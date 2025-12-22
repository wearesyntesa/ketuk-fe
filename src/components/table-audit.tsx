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
import { Input } from "./ui/input";
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
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function AuditUserTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const t = useTranslations("audit");
	const tCommon = useTranslations("common");
	const tUsers = useTranslations("users");
	
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
						placeholder={tUsers("searchUsers")}
						className="flex-1"
						value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("name")?.setFilterValue(event.target.value)
						}
					/>
					<Select
						onValueChange={(value: string) =>
							table
								.getColumn("role")
								?.setFilterValue(value !== "all" ? value : "")
						}
						defaultValue="all">
						<SelectTrigger
							className="w-48"
							value={table.getColumn("role")?.getFilterValue() as string}>
							<SelectValue placeholder={tUsers("filterByRole")} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{tUsers("allRoles")}</SelectItem>
							<SelectItem value="admin">{tUsers("admin")}</SelectItem>
							<SelectItem value="user">{tUsers("user")}</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</Card>
			<div className="flex justify-between items-center px-2">
				<div>
					{tCommon("page")} {table.getState().pagination.pageIndex + 1} {tCommon("of")}{" "}
					{table.getPageCount() || 1}
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
											}`}>
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
											}`}>
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
									{t("noLogsFound")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
