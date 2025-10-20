"use client";

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function ScheduleList<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div className="overflow-hidden rounded-md flex flex-col gap-4">
			<Card className="p-2">
				<div className="flex items-center">
					<Input placeholder="Search inventory..." className="flex-1" />
					{/* <InventoryDialog /> */}
					{/* <Button
                        variant="outline"
                        className="ml-2 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-white">
                        Add Item +
                    </Button> */}
				</div>
			</Card>
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
										<TableCell key={cell.id} className={`px-4`}>
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
