"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
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

export default function ItemDialog() {
    const [categoryData, setCategoryData] = useState<ItemDialogProps>({
        name: "",
        note: "",
        condition: "Baik",
    });
    const token = localStorage.getItem("access_token") || "";

    const items = useItems();

    useEffect(() => {
        // items.handleGetItem(token, id).then((data) => {
        //     setCategoryData({
        //         name: data.name,
        //         note: data.note,
        //         condition: data.kondisi,
        //     });
        // })
    }, []);

    return (
        <>
            <Dialog>
                <DialogTrigger className="ml-2 bg-linear-to-br from-blue-500 via-blue-400 to-blue-300 text-white px-2 py-1 rounded-md font-semibold">
                    Add Category +
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add New Item</DialogTitle>
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
                            <Select>
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
        </>
    );
}
