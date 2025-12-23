"use client";

import { Suspense, useEffect, useState } from "react";
import { ItemDialogProps } from "@/components/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useItems } from "@/hooks/use-items";
import { ArrowLeftCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import QRCodeGenerator from "@/components/qr-code";
import { useTranslations } from "next-intl";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://ketuk.app";

function LoadingState() {
    return (
        <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
                <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
                <div className="h-24 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
                <div className="h-52 w-52 bg-muted animate-pulse rounded" />
            </div>
        </div>
    );
}

function DetailCategoryItemInner() {
    const searchParams = useSearchParams();
    const itemId: number = Number(searchParams.get("itemId"));
    const t = useTranslations("inventory");
    const tCommon = useTranslations("common");

    const [categoryData, setCategoryData] = useState<ItemDialogProps>({
            categoryId: 0,
            name: "",
            note: "",
            condition: "Good",
        });
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") || "" : "";

    const items = useItems();

    useEffect(() => {
        if (token && itemId) {
            items.handleGetItem(token, itemId).then((data) => {
                setCategoryData({
                    categoryId: data.category_id,
                    name: data.name,
                    note: data.note,
                    condition: data.kondisi,
                });
            });
        }
    }, [itemId]);
    
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
								<Button variant={"outline"} onClick={() => window.history.back()} className="w-fit"><ArrowLeftCircle/> {tCommon("back")}</Button>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="item-name">{t("itemName")}</Label>
								<Input
									id="item-name"
									type="text"
									placeholder={t("itemNamePlaceholder")}
									value={categoryData.name}
									onChange={(e) =>
										setCategoryData({ ...categoryData, name: e.target.value })
									}
									required
									readOnly
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
									<SelectValue placeholder={t("selectCondition")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Good">{t("good")}</SelectItem>
									<SelectItem value="Poor">{t("poor")}</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</form>
					<QRCodeGenerator value={`${BASE_URL}/app/inventory/category/item?itemId=${itemId}`} size={200} />
                </div>
            </div>
        </>
    );
}

export default function DetailCategoryItem() {
    return (
        <Suspense fallback={<LoadingState />}>
            <DetailCategoryItemInner />
        </Suspense>
    );
}
