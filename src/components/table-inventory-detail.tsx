"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import AddItemDialog from "./add-item-dialog";
import { useTranslations } from "next-intl";

interface DataTableProps<TData, TValue> {
	categoryName?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	id: number;
}

export default function InventoryDetailTable<TData, TValue>({
	categoryName,
	columns,
	data,
	id,
}: DataTableProps<TData, TValue>) {
	const t = useTranslations("inventory");
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	// Check if a column is a centered column by its accessorKey
	const isCenteredColumn = (columnId: string) => {
		return columnId === "year" || columnId === "action" || columnId === "";
	};

	return (
		<div className="overflow-hidden rounded-md flex flex-col gap-4 w-full">
			<Card className="p-2">
				<div className="flex items-center">
					{data.length > 0 ?
					<Input placeholder={t("searchItem")} className="flex-1" /> 
					:
					<span className="flex-1">{t("noItemInCategory")} {categoryName}.</span>
					}
					<AddItemDialog id={id} />
				</div>
			</Card>
			{data.length > 0 && (
				<Card className="p-0 max-h-96">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												className={`px-4 ${
													isCenteredColumn(header.column.id)
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
													isCenteredColumn(cell.column.id)
														? "align-middle text-center place-items-center"
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
										{t("noResults")}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</Card>
			)}
		</div>
	);
}
