"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useItems } from "@/hooks/use-items";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ItemDialogProps {
    name: string;
    note: string;
    condition: "Baik" | "Good" | "Poor";
}

interface DetailItemProps {
    id: number;
}

export default function DetailItem({ id }: DetailItemProps) {
    const [categoryData, setCategoryData] = useState<ItemDialogProps>({
        name: "",
        note: "",
        condition: "Baik",
    });
    const token = localStorage.getItem("access_token") || "";

    const items = useItems();

    useEffect(() => {
        items.handleGetItem(token, id).then((data) => {
            setCategoryData({
                name: data.name,
                note: data.note,
                condition: data.kondisi,
            });
        })
    }, []);

    const deleteCategory = () => {
        if (token) {
            items.handleDeleteItem(token, id).then(() => {
                console.log("Item deleted");
            });
        }
    };

    return (
        <div className="flex flex-col w-full gap-4 px-2 justify-start items-start">
            <Dialog>
                <DialogTrigger className="cursor-pointer hover:font-semibold w-full">
                    Add Item
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new inventory item.
                    </DialogDescription>
                    <form>
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
                            <Select value={categoryData.condition} onValueChange={(value) => setCategoryData({ ...categoryData, condition: value as "Baik" | "Good" | "Poor" })}>
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
                            <Button onClick={() => deleteCategory()} className="flex-1">
                                Confirm
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
