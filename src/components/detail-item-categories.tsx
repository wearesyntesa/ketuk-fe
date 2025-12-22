'use client';

import { EllipsisVertical } from "lucide-react";
import InventoryDetailTable from "./table-inventory-detail";
import { AlertDialogHeader } from "./ui/alert-dialog";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCategories } from "@/hooks/use-categories";
import { ColumnDef } from "@tanstack/react-table";
import { ItemDetail } from "./type";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useItems } from "@/hooks/use-items";
import DetailItem from "./detail-item";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface DetailItemCategoriesProps {
	name: string;
	specification?: string;
	id: number;
	qty: number;
}

export default function DetailItemCategories({
	name,
	specification,
	id,
	qty,
}: DetailItemCategoriesProps) {
	const t = useTranslations("inventory");
	const tCommon = useTranslations("common");
	const token = localStorage.getItem("access_token");
	const categories = useCategories();
	const items = useItems();
	const [categoryData, setCategoryData] = useState({
		name: "",
		specification: "",
	});

	const tableDetail: ColumnDef<ItemDetail>[] = [
		{
			accessorKey: "id",
			header: t("id"),
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
	];

	const fetchItemsCategory = () => {
		if (token) {
			items.handleGetItemCategory(token, id).then((data) => {
				categories.setItemCategories(data);
			});
		}
	};

	const getCategory = () => {
		if (token) {
			categories.handleGetCategory(token, id).then((data) => {
				setCategoryData({
					name: data.categoryName,
					specification: data.specification,
				});
			});
		}
	};

	const updateCategory = () => {
		if (token) {
			categories.handleUpdateCategory(token, categoryData, id).then((data) => {
				console.log(data);
			});
		}
	};

	const deleteCategory = () => {
		console.log("Deleting category with ID:", id);
		if (token) {
			categories.handleDeleteCategory(token, id);
		}
	};

	return (
		<div className="flex flex-col w-full gap-4 px-2 justify-start items-start">
			{/* Detail data */}
			{qty > 0 ? (
				<Link
					onClick={() => fetchItemsCategory()}
					href={{
						pathname: `/app/inventory/category`,
						query: { categoryId: id },
					}}
					className="cursor-pointer hover:font-semibold w-full items-center justify-center flex">
					{t("detail")}
				</Link>
			) : (
				<Dialog>
					<DialogTrigger
						className="cursor-pointer hover:font-semibold w-full"
						onClick={() => fetchItemsCategory()}>
						{t("detail")}
					</DialogTrigger>
					<DialogContent>
						<AlertDialogHeader>
							<DialogTitle>{t("category")} : {name} <span className="text-sm text-slate-400">{specification && specification.length > 10 ? specification.substring(0, 10) + "..." : specification}</span></DialogTitle>
						</AlertDialogHeader>
						<InventoryDetailTable
							categoryName={name}
							columns={tableDetail}
							data={categories.itemCategories || []}
							id={id}
						/>
					</DialogContent>
				</Dialog>
			)}

			{/* Update data */}
			<Dialog>
				<DialogTrigger
					className="cursor-pointer hover:font-semibold w-full"
					onClick={() => getCategory()}>
					{t("update")}
				</DialogTrigger>
				<DialogContent>
					<AlertDialogHeader>
						<DialogTitle>{name}</DialogTitle>
						<DialogDescription>
							{t("detailInfoItem")}
						</DialogDescription>
					</AlertDialogHeader>
					<div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								updateCategory();
							}}>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="item-name">{t("itemName")}</Label>
									<Input
										id="item-name"
										type="text"
										placeholder={t("categoryPlaceholder")}
										value={categoryData.name}
										onChange={(e) =>
											setCategoryData({ ...categoryData, name: e.target.value })
										}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="specification">{t("specification")}</Label>
									<Input
										id="specification"
										type="text"
										placeholder="Azko"
										value={categoryData.specification}
										onChange={(e) =>
											setCategoryData({
												...categoryData,
												specification: e.target.value,
											})
										}
										required
									/>
								</div>

								<div className="w-full gap-4 grid grid-cols-2">
									<DialogClose className="flex-1 p-1 border rounded-md">
										{tCommon("cancel")}
									</DialogClose>
									<Button>{tCommon("submit")}</Button>
								</div>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>

			{/* Delete Data */}
			{qty === 0 && (
				<Dialog>
					<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
						{t("delete")}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{name}</DialogTitle>
							<DialogDescription>
								{t("confirmDeleteItem")}
							</DialogDescription>
							<div className="flex gap-2">
								<DialogClose className="flex-1 p-1 border rounded-md">
									{tCommon("cancel")}
								</DialogClose>
								<Button onClick={() => deleteCategory()} className="flex-1">
									{tCommon("confirm")}
								</Button>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
