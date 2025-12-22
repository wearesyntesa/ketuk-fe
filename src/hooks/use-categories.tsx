'use client';

import { CategoryPost, ItemCategories, ItemDetail } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseCategoriesOptions {
	translations?: {
		unableToLoadCategories?: string;
		unableToLoadCategoryDetails?: string;
		categoryNameAndSpecRequired?: string;
		categoryCreated?: string;
		unableToCreateCategory?: string;
		categoryFieldsRequired?: string;
		categoryUpdated?: string;
		unableToUpdateCategory?: string;
		categoryDeleted?: string;
		failedToDeleteCategory?: string;
		connectionError?: string;
	};
}

export const useCategories = (options?: UseCategoriesOptions) => {
	const t = options?.translations || {
		unableToLoadCategories: "Unable to load categories. Please try again.",
		unableToLoadCategoryDetails: "Unable to load category details. Please try again.",
		categoryNameAndSpecRequired: "Please enter both a category name and specification.",
		categoryCreated: "Category created successfully",
		unableToCreateCategory: "Unable to create category. Please try again.",
		categoryFieldsRequired: "Please fill in all required fields to update this category.",
		categoryUpdated: "Category updated successfully",
		unableToUpdateCategory: "Unable to update category. Please try again.",
		categoryDeleted: "Category deleted successfully",
		failedToDeleteCategory: "Failed to delete category",
		connectionError: "Connection error. Please check your internet and try again.",
	};

	const [itemsCategories, setItemsCategories] = useState<ItemCategories[]>([]);
	const [itemCategories, setItemCategories] = useState<ItemDetail[]>([]);

	const handleGetAllCategories = async (token: string) => {
		try {
			const response = await fetch(`${API_URL}/api/item-categories/v1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error(data.message || 'Failed to load categories');
			}
			return data.data;
		} catch (err) {
			console.error("Fetch categories error:", err);
			toast.error(t.unableToLoadCategories);
			throw err;
		}
	};

	const handleGetCategory = async (token: string, id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/item-categories/v1/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error(data.message || 'Failed to load category');
			}
			return data.data;
		} catch (err) {
			console.error("Fetch category error:", err);
			toast.error(t.unableToLoadCategoryDetails);
			throw err;
		}
	};

	const handlePostCategory = async (
		token: string,
		categoryData: CategoryPost
	) => {
		if (
			categoryData.name.trim() === "" ||
			categoryData.specification.trim() === ""
		) {
			toast.error(t.categoryNameAndSpecRequired);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.categoryCreated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.error || t.unableToCreateCategory);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Create category error:", err);
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
			toast.error(t.categoryFieldsRequired);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.categoryUpdated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.error || t.unableToUpdateCategory);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Update category error:", err);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.categoryDeleted);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				toast.error(data.error || t.failedToDeleteCategory);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Delete category error:", err);
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
