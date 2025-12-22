"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useItems } from "@/hooks/use-items";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ItemDialogProps } from "./type";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface DetailItemProps {
	itemId: number;
}

export default function DetailItem({ itemId }: DetailItemProps) {
	const t = useTranslations("inventory");
	const tCommon = useTranslations("common");
	
	const [categoryData, setCategoryData] = useState<ItemDialogProps>({
		categoryId: 0,
		name: "",
		note: "",
		condition: "Good",
	});
	const token = localStorage.getItem("access_token") || "";

	const items = useItems();

	useEffect(() => {
		items.handleGetItem(token, itemId).then((data) => {
			setCategoryData({
				categoryId: data.category_id,
				name: data.name,
				note: data.note,
				condition: data.kondisi,
			});
		});
	}, []);

	const updateItem = () => {
		if (token) {
			items.handleUpdateItem(token, categoryData, itemId).then(() => {
				console.log("Item updated");
			});
		}
	};

	const deleteItem = () => {
		if (token) {
			items.handleDeleteItem(token, itemId).then(() => {
				console.log("Item deleted");
			});
		}
	};

	return (
		<div className="flex flex-col w-full gap-4 px-2 justify-start items-start">
			<Link
				href={{
					pathname: `/app/inventory/category/item`,
					query: { itemId: itemId },
				}}
				className="cursor-pointer flex justify-center hover:font-semibold w-full">
				{t("viewDetails")}
			</Link>
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					{t("editItem")}
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>{t("editItem")}</DialogTitle>
					<DialogDescription>
						{t("editItemDescription")}
					</DialogDescription>
					<form onSubmit={updateItem}>
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
								<Textarea
									id="specification"
									placeholder="Azko"
									value={categoryData.note}
									onChange={(e) =>
										setCategoryData({
											...categoryData,
											note: e.target.value,
										})
									}
									required
								/>
							</div>
							<Select
								value={categoryData.condition}
								onValueChange={(value) =>
									setCategoryData({
										...categoryData,
										condition: value as "Good" | "Poor",
									})
								}
								required>
								<SelectTrigger className="w-full">
									<SelectValue placeholder={t("selectCondition")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Good">{t("good")}</SelectItem>
									<SelectItem value="Poor">{t("poor")}</SelectItem>
								</SelectContent>
							</Select>

							<div className="w-full gap-4 grid grid-cols-2">
								<DialogClose className="border rounded-mb">{tCommon("cancel")}</DialogClose>
								<Button>{tCommon("submit")}</Button>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Delete Data */}
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					{tCommon("delete")}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{categoryData.name}</DialogTitle>
						<DialogDescription>
							{t("confirmDeleteItem")}
						</DialogDescription>
						<div className="flex gap-2">
							<DialogClose className="flex-1 p-1 border rounded-md">
								{tCommon("cancel")}
							</DialogClose>
							<Button onClick={() => deleteItem()} className="flex-1">
								{tCommon("confirm")}
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
