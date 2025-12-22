"use client";

import { AllUser, UserType } from "@/components/type";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useUser = () => {
    const [user, setUser] = useState<UserType>();
    const [allUsers, setAllUsers] = useState<AllUser[]>();
	const [allUserManagement, setAllUserManagement] = useState<AllUser[]>();

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData && userData !== "undefined" && userData !== "null") {
			try {
				const parsedUser = JSON.parse(userData);
				if (parsedUser && typeof parsedUser === 'object') {
					setUser(parsedUser);
				} else {
					console.warn("Invalid user data format, clearing from localStorage");
					localStorage.removeItem("user");
				}
			} catch (error) {
				console.error("Failed to parse user data:", error);
				console.log("Invalid user data:", userData);
				// Clear invalid data from localStorage
				localStorage.removeItem("user");
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

	const handleGetAllUserManagement = async (token: string, id: number) => {
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
				console.log("Fetched users for management:", data.data);
				console.log("Excluding user ID:", id);
				const dataFiltered = data.data.filter((user: AllUser) => user.id !== id);
				setAllUserManagement(dataFiltered);
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
		allUserManagement,
		handleGetAllUser,
		setAllUsers,
		handleUserbyID,
		handleUpdateUser,
		handleDeleteUser,
		handleGetAllUserManagement,
	};
}