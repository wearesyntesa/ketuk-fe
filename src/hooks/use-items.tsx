'use client';

import { ItemDetail, ItemDialogProps } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useItems = () => {
	const [itemCategories, setItemCategories] = useState<ItemDetail[]>([]);

	const handleGetItemCategory = async (token: string, category_id: number) => {
		const response = await fetch(
			`${API_URL}/api/items/v1/category/${category_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		console.log(data.data);
		return data.data;
	};

	const handleGetItem = async (token: string, item_id: number) => {
		const response = await fetch(`${API_URL}/api/items/v1/${item_id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		console.log(data.data);
		return data.data;
	};

	const handlePostItem = async (token: string, itemData: ItemDialogProps) => {
		try {
			const response = await fetch(`${API_URL}/api/items/v1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					categoryId: itemData.categoryId,
					name: itemData.name,
					note: itemData.note,
					kondisi: itemData.condition,
					year: itemData.year,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				window.location.reload();
				toast.success("Item created successfully");
			} else {
				toast.error("Failed to create item");
				console.error("Failed to post item:", data.message);
			}
		} catch (err) {
			toast.error("Error creating item");
			console.error("Login error:", err);
		} finally {
			console.log("Post request completed");
		}
	};

	const handleUpdateItem = async (
		token: string,
		itemData: ItemDialogProps,
		item_id: number
	) => {
		try {
			const response = await fetch(`${API_URL}/api/items/v1/${item_id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: itemData.name,
					note: itemData.note,
					kondisi: itemData.condition,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				window.location.reload();
			} else {
				console.error("Failed to update item:", data.message);
			}
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			console.log("Update request completed");
		}
	};

	const handleDeleteItem = async (token: string, item_id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/items/v1/${item_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				window.location.reload();
			} else {
				console.error("Failed to delete item:", data.message);
			}
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			console.log("Delete request completed");
		}
	};

	return {
		handleGetItemCategory,
		handleGetItem,
		handleDeleteItem,
		handlePostItem,
		handleUpdateItem,
		setItemCategories,
		itemCategories,
	};
};