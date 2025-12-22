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
import { Loader2 } from "lucide-react";

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
	const [token, setToken] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const items = useItems();

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		setToken(storedToken);
		
		if (storedToken) {
			items.handleGetItem(storedToken, itemId).then((data) => {
				setCategoryData({
					categoryId: data.category_id,
					name: data.name,
					note: data.note,
					condition: data.kondisi,
				});
			});
		}
	}, [itemId]);

	const updateItem = async () => {
		if (token) {
			setIsUpdating(true);
			try {
				await items.handleUpdateItem(token, categoryData, itemId);
			} finally {
				setIsUpdating(false);
			}
		}
	};

	const deleteItem = async () => {
		if (token) {
			setIsDeleting(true);
			try {
				await items.handleDeleteItem(token, itemId);
			} finally {
				setIsDeleting(false);
			}
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
					<form onSubmit={(e) => { e.preventDefault(); updateItem(); }}>
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
									placeholder={t("specificationPlaceholder")}
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
								<DialogClose className="border rounded-mb" disabled={isUpdating}>{tCommon("cancel")}</DialogClose>
								<Button type="submit" disabled={isUpdating}>
									{isUpdating ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											{tCommon("processing")}
										</>
									) : (
										tCommon("submit")
									)}
								</Button>
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
							<DialogClose className="flex-1 p-1 border rounded-md" disabled={isDeleting}>
								{tCommon("cancel")}
							</DialogClose>
							<Button onClick={() => deleteItem()} className="flex-1" disabled={isDeleting}>
								{isDeleting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										{tCommon("processing")}
									</>
								) : (
									tCommon("confirm")
								)}
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
