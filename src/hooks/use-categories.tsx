'use client';

import { CategoryPost, ItemCategories, ItemDetail } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useCategories = () => {
	const [itemsCategories, setItemsCategories] = useState<ItemCategories[]>([]);
	const [itemCategories, setItemCategories] = useState<ItemDetail[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

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
		setLoading(true);
		setError("");

		if (
			categoryData.name.trim() === "" ||
			categoryData.specification.trim() === ""
		) {
			setError("Name and Specification are required.");
			setLoading(false);
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
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			setError("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateCategory = async (
		token: string,
		categoryData: CategoryPost,
		id: number
	) => {
		setLoading(true);
		setError("");

		if (
			categoryData.name.trim() === "" ||
			categoryData.specification.trim() === ""
		) {
			setError("Name and Specification are required.");
			setLoading(false);
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
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			setError("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteCategory = async (token: string, id: number) => {
		setLoading(true);
		setError("");

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
			} else {
				setError(data.error || "Login failed");
			}
		} catch (err) {
			setError("Failed to connect to server");
			console.error("Login error:", err);
		} finally {
			setLoading(false);
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
		loading,
		error,
	};
};