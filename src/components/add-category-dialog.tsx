"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCategories } from "@/hooks/use-categories";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export default function AddCategoryDialog() {
	const t = useTranslations("inventory");
	const tCommon = useTranslations("common");
	
	const [categoryData, setCategoryData] = useState({
		name: "",
		specification: "",
	});
	const [token, setToken] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setToken(localStorage.getItem("access_token") || "");
	}, []);

	const categories = useCategories();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await categories.handlePostCategory(token, categoryData);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Dialog>
				<DialogTrigger className="ml-2 bg-linear-to-br from-blue-500 via-blue-400 to-blue-300 text-white px-2 py-1 rounded-md font-semibold">
					{t("addCategory")}
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>{t("addCategory")}</DialogTitle>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="item-name">{t("categoryName")}</Label>
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
								<Label htmlFor="specification">{tCommon("description")}</Label>
								<Input
									id="specification"
									type="text"
									placeholder={t("specificationPlaceholder")}
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
								<DialogClose asChild>
									<Button variant={"secondary"} type="button" disabled={isSubmitting}>{tCommon("cancel")}</Button>
								</DialogClose>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? (
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
		</>
	);
}
