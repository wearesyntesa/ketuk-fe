"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useItems } from "@/hooks/use-items";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ItemDialogProps } from "./type";
import { useTranslations } from "next-intl";

export default function AddItemDialog({id}: {id: number}) {
	const t = useTranslations("inventory");
	const tCommon = useTranslations("common");
	
	const [categoryData, setCategoryData] = useState<ItemDialogProps>({
		categoryId: id,
		name: "",
		note: "",
		condition: "Good",
		year: new Date().getFullYear(),
	});
	const token = localStorage.getItem("access_token") || "";

	const items = useItems();

	const postItem = () => {
		if (token) {
			items.handlePostItem(token, categoryData).then(() => {
				console.log("Item added");
			});
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger className="ml-2 bg-linear-to-br from-blue-500 via-blue-400 to-blue-300 text-white px-2 py-1 rounded-md font-semibold">
					{t("addItem")}
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>{t("addNewItem")}</DialogTitle>
					<DialogDescription>
						{t("addNewItemDescription")}
					</DialogDescription>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							postItem();
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
							<div className="grid gap-2">
								<Label htmlFor="item-year">{t("year")}</Label>
								<Input
									id="item-year"
									type="number"
									placeholder="2025"
									value={categoryData.year}
									onChange={(e) =>
										setCategoryData({
											...categoryData,
											year: Number(e.target.value),
										})
									}
									required
								/>
							</div>
							<Select
								onValueChange={(value) =>
									setCategoryData({
										...categoryData,
										condition: value as "Good" | "Poor",
									})
								}>
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
		</>
	);
}
