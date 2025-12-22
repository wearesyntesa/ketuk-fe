"use client";

import { AllUser, UserType } from "@/components/type";
import { useEffect, useState } from "react"
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseUserOptions {
	translations?: {
		unableToLoadUsers?: string;
		unableToLoadUserDetails?: string;
		userUpdated?: string;
		failedToUpdateUser?: string;
		userDeleted?: string;
		failedToDeleteUser?: string;
		connectionError?: string;
	};
}

export const useUser = (options?: UseUserOptions) => {
	const t = options?.translations || {
		unableToLoadUsers: "Unable to load users. Please try again.",
		unableToLoadUserDetails: "Unable to load user details. Please try again.",
		userUpdated: "User updated successfully",
		failedToUpdateUser: "Failed to update user",
		userDeleted: "User deleted successfully",
		failedToDeleteUser: "Failed to delete user",
		connectionError: "Connection error. Please check your internet and try again.",
	};

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
				toast.error(t.unableToLoadUsers);
			}
		} catch (err) {
			console.error("Fetch users error:", err);
			toast.error(t.connectionError);
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
				const dataFiltered = data.data.filter((user: AllUser) => user.id !== id);
				setAllUserManagement(dataFiltered);
			} else {
				console.error("Failed to fetch users:", data.message);
				toast.error(t.unableToLoadUsers);
			}
		} catch (err) {
			console.error("Fetch users error:", err);
			toast.error(t.connectionError);
		}
	};

	const handleUserbyID = async (token: string, id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/users/v1/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error(data.message || 'Failed to load user');
			}
			return data.data;
		} catch (err) {
			console.error("Fetch user error:", err);
			toast.error(t.unableToLoadUserDetails);
			throw err;
		}
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.userUpdated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
				return data.data;
			} else {
				console.error("Failed to update user:", data.message);
				toast.error(data.message || t.failedToUpdateUser);
			}
		} catch (err) {
			console.error("Update user error:", err);
			toast.error(t.connectionError);
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
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.userDeleted);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			} else {
				console.error("Failed to delete user:", data.message);
				toast.error(data.message || t.failedToDeleteUser);
			}
		} catch (err) {
			console.error("Delete user error:", err);
			toast.error(t.connectionError);
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
