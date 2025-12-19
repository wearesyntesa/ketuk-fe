"use client";

import { AllUser, UserType } from "@/components/type";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useUser = () => {
    const [user, setUser] = useState<UserType>();
    const [allUsers, setAllUsers] = useState<AllUser[]>();

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		}
	}, []);

	const handleGetAllUser = async (token: string) => {
		try {
			const response = await fetch(`${API_URL}/api/users/v1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();

			if (data.success) {
				setAllUsers(data.data);
			} else {
				console.error("Failed to fetch users:", data.message);
			}
		} catch (err) {
			console.error("Fetch users error:", err);
		} finally {
			console.log("Fetch users completed");
		}
	};

	const handleUserbyID = async (token: string, id: number) => {
		const response = await fetch(`${API_URL}/api/users/v1/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();
		return data.data;
	};

	const handleUpdateUser = async (
		token: string,
		userData: UserType,
		id: number
	) => {
		try {
			const response = await fetch(`${API_URL}/api/users/v1/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					id: userData.id,
					name: userData.name,
					email: userData.email,
					role: userData.role,
				}),
			});

			const data = await response.json();

			if (data.success) {
				toast.success("User updated successfully");
				window.location.reload();
				return data.data;
			} else {
				console.error("Failed to update user:", data.message);
				toast.error(data.message || "Failed to update user");
			}
		} catch (err) {
			console.error("Update user error:", err);
			toast.error("Failed to update user");
		} finally {
			console.log("Update user completed");
		}
	};

	const handleDeleteUser = async (token: string, id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/users/v1/${id}`, {
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
				toast.success("User deleted successfully");
			} else {
				console.error("Failed to delete user:", data.message);
			}
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			console.log("User delete completed");
		}
	};

	return {
		user,
		setUser,
		allUsers,
		handleGetAllUser,
		setAllUsers,
		handleUserbyID,
		handleUpdateUser,
		handleDeleteUser,
	};
}