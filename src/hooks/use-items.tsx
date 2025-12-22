'use client';

import { ItemDetail, ItemDialogProps } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseItemsOptions {
	translations?: {
		unableToLoadItems?: string;
		unableToLoadItemDetails?: string;
		itemCreated?: string;
		failedToCreateItem?: string;
		itemUpdated?: string;
		failedToUpdateItem?: string;
		itemDeleted?: string;
		failedToDeleteItem?: string;
		connectionError?: string;
	};
}

export const useItems = (options?: UseItemsOptions) => {
	const t = options?.translations || {
		unableToLoadItems: "Unable to load items. Please try again.",
		unableToLoadItemDetails: "Unable to load item details. Please try again.",
		itemCreated: "Item created successfully",
		failedToCreateItem: "Failed to create item",
		itemUpdated: "Item updated successfully",
		failedToUpdateItem: "Failed to update item",
		itemDeleted: "Item deleted successfully",
		failedToDeleteItem: "Failed to delete item",
		connectionError: "Connection error. Please check your internet and try again.",
	};

	const [itemCategories, setItemCategories] = useState<ItemDetail[]>([]);

	const handleGetItemCategory = async (token: string, category_id: number) => {
		try {
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
			if (!data.success) {
				throw new Error(data.message || 'Failed to load items');
			}
			return data.data;
		} catch (err) {
			console.error("Fetch items error:", err);
			toast.error(t.unableToLoadItems);
			throw err;
		}
	};

	const handleGetItem = async (token: string, item_id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/items/v1/${item_id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error(data.message || 'Failed to load item');
			}
			return data.data;
		} catch (err) {
			console.error("Fetch item error:", err);
			toast.error(t.unableToLoadItemDetails);
			throw err;
		}
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.itemCreated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.message || t.failedToCreateItem);
				console.error("Failed to post item:", data.message);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Create item error:", err);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.itemUpdated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.message || t.failedToUpdateItem);
				console.error("Failed to update item:", data.message);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Update item error:", err);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.itemDeleted);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.message || t.failedToDeleteItem);
				console.error("Failed to delete item:", data.message);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Delete item error:", err);
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
