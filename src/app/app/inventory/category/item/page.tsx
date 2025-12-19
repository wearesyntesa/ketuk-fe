"use client";

import { ItemDialogProps } from "@/components/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useItems } from "@/hooks/use-items";
import { ArrowLeftCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailCategoryItem() {
    const searchParams = useSearchParams();
    const itemId: number = Number(searchParams.get("itemId"));

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

    return (
        <>
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* <SectionCards /> */}
                <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
                    <form onSubmit={updateItem}>
						<div className="flex flex-col gap-6">
							<div className="w-full gap-4 grid grid-cols-2">
								<Button variant={"outline"} onClick={() => window.history.back()} className="w-fit"><ArrowLeftCircle/> Back</Button>
							</div>
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
									readOnly
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
									readOnly />
							</div>
							<Select
								value={categoryData.condition}
								onValueChange={(value) =>
									setCategoryData({
										...categoryData,
										condition: value as "Good" | "Poor",
									})
							}
							disabled>
								<SelectTrigger className="w-full" >
									<SelectValue placeholder="Select Condition" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Good">Good</SelectItem>
									<SelectItem value="Poor">Poor</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</form>
                </div>
            </div>
        </>
    );
}