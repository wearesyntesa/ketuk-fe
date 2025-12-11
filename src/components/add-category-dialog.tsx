"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCategories } from "@/hooks/use-categories";

export default function AddCategoryDialog() {
	const [categoryData, setCategoryData] = useState({
		name: "",
		specification: "",
	});
	const token = localStorage.getItem("access_token") || "";

	const categories = useCategories();

	return (
		<>
			<Dialog>
				<DialogTrigger className="ml-2 bg-linear-to-br from-blue-500 via-blue-400 to-blue-300 text-white px-2 py-1 rounded-md font-semibold">
					Add Category +
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Add New Category</DialogTitle>
					{/* <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new inventory item.
                    </DialogDescription>
                    <DialogFooter>
                        <Button type="submit">Add Item</Button>
                    </DialogFooter> */}
					{/* <InventoryForm /> */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							categories.handlePostCategory(token, categoryData);
						}}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="item-name">Nama Category</Label>
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
							{/* <div className="grid gap-2">
                                    <Label htmlFor="procurement-year">Procurement Year</Label>
                                    <Input
                                        id="procurement-year"
                                        type="number"
                                        placeholder="2025"
                                        required
                                    />
                                </div> */}
							<div className="grid gap-2">
								<Label htmlFor="specification">Specification</Label>
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
								<Button variant={"secondary"}>Cancel</Button>
								<Button>Submit</Button>
							</div>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
