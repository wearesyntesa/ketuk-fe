import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	ColumnFiltersState,
	getFilteredRowModel,
	getPaginationRowModel,
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
import InventoryDialog from "./inventory-dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function InventoryTable<TData, TValue>({
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

	console.log(table.getColumn("nameItem")?.getFilterValue());

	return (
		<div className="overflow-hidden rounded-md flex flex-col gap-4">
			<Card className="p-2">
				<div className="flex items-center">
					<Input
						id="search-inventory"
						type="text"
						placeholder="Search inventory..."
						className="flex-1"
						value={
							(table.getColumn("nameItem")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) => {
							table.getColumn("nameItem")?.setFilterValue(event.target.value);
						}}
					/>
					<InventoryDialog />
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
												header.column.columnDef.header === "Action" ||
												header.column.columnDef.header === "Quantity" ||
												header.column.columnDef.header === "Good Condition" ||
												header.column.columnDef.header === "Poor Condition"
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
												cell.column.columnDef.header === "Quantity" ||
												cell.column.columnDef.header === "Good Condition" ||
												cell.column.columnDef.header === "Poor Condition" ||
												cell.column.columnDef.header === "Action"
													? "align-middle text-center"
													: ""
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
