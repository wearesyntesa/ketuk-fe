'use client';

import { CategoryPost, ItemCategories, ItemDetail } from "@/components/type";
import { useState } from "react";

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
		setItemCategories,
		itemCategories,
	};
};