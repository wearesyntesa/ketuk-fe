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

interface DetailItemProps {
	itemId: number;
}

export default function DetailItem({ itemId }: DetailItemProps) {
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
				Detail Item
			</Link>
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					Update Item
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Update Item</DialogTitle>
					<DialogDescription>
						Fill in the details for the new inventory item.
					</DialogDescription>
					<form onSubmit={updateItem}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="item-name">Nama Item</Label>
								<Input
									id="item-name"
									type="text"
									placeholder="Lemari"
									value={categoryData.name}
									onChange={(e) =>
										setCategoryData({ ...categoryData, name: e.target.value })
									}
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="specification">Specification</Label>
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
								}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select Condition" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Baik">Baik</SelectItem>
									<SelectItem value="Good">Good</SelectItem>
									<SelectItem value="Poor">Poor</SelectItem>
								</SelectContent>
							</Select>

							<div className="w-full gap-4 grid grid-cols-2">
								<DialogClose className="border rounded-mb">Cancel</DialogClose>
								<Button>Submit</Button>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Delete Data */}
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					Delete
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{categoryData.name}</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this item?
						</DialogDescription>
						<div className="flex gap-2">
							<DialogClose className="flex-1 p-1 border rounded-md">
								Cancel
							</DialogClose>
							<Button onClick={() => deleteItem()} className="flex-1">
								Confirm
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
