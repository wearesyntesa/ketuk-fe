"use client";

import { UserType } from "@/components/type";
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export const useUser = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [allUsers, setAllUsers] = useState<UserType[] | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
    }, [])

    const handleGetAllUser = async (token: string) => {
        const response = await fetch(`${API_URL}/api/users/v1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data.data;
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

    return { user, setUser, allUsers, handleGetAllUser, setAllUsers, handleUserbyID };
}