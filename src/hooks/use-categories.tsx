'use client';

import { CategoryPost, ItemCategories, ItemDetail } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useCategories = () => {
	const [itemsCategories, setItemsCategories] = useState<ItemCategories[]>([]);
	const [itemCategories, setItemCategories] = useState<ItemDetail[]>([]);

	const handleGetAllCategories = async (token: string) => {
		const response = await fetch(`${API_URL}/api/item-categories/v1`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(API_URL);
		const data = await response.json();
		return data.data;
	};

	const handleGetCategory = async (token: string, id: number) => {
		const response = await fetch(`${API_URL}/api/item-categories/v1/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(API_URL);
		const data = await response.json();
		return data.data;
	};

	const handlePostCategory = async (
		token: string,
		categoryData: CategoryPost
	) => {
		if (
			categoryData.name.trim() === "" ||
			categoryData.specification.trim() === ""
		) {
			toast.error("Name and Specification are required.");
			return;
		}

		try {
			const response = await fetch(`${API_URL}/api/item-categories/v1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					categoryName: categoryData.name,
					specification: categoryData.specification,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				window.location.reload();
				toast.success("Category created successfully");
			} else {
				toast.error(data.error || "Login failed");
			}
		} catch (err) {
			toast.error("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			console.log("Post category request completed");
		}
	};

	const handleUpdateCategory = async (
		token: string,
		categoryData: CategoryPost,
		id: number
	) => {

		if (
			categoryData.name.trim() === "" ||
			categoryData.specification.trim() === ""
		) {
			toast.error("Name and Specification are required.");
			return;
		}

		try {
			const response = await fetch(`${API_URL}/api/item-categories/v1/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					categoryName: categoryData.name,
					specification: categoryData.specification,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				window.location.reload();
				toast.success("Category updated successfully");
			} else {
				toast.error(data.error || "Login failed");
			}
		} catch (err) {
			toast.error("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			console.log("Update category request completed");
		}
	};

	const handleDeleteCategory = async (token: string, id: number) => {

		try {
			const response = await fetch(`${API_URL}/api/item-categories/v1/${id}`, {
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
				toast.success("Category deleted successfully");
			} else {
				toast.error(data.error || "Failed to delete category");
			}
		} catch (err) {
			toast.error("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			console.log("Delete category request completed");
		}
	};

	return {
		itemsCategories,
		setItemsCategories,
		handleGetAllInventory: handleGetAllCategories,
		handleGetCategory,
		handlePostCategory,
		handleUpdateCategory,
		handleDeleteCategory,
		setItemCategories,
		itemCategories,
	};
};