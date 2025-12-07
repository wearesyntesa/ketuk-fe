'use client';

import { ItemCategories, ItemDetail } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export const useItems = () => {
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
        const data = await response.json();
        return data.data;
    };

    const handleGetItemCategory = async (token: string, category_id: number) => {
        const response = await fetch(`${API_URL}/api/item-categories/v1/${category_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data.data.items);
        return data.data.items;
    };

    return { itemsCategories, setItemsCategories, handleGetAllInventory: handleGetAllCategories, handleGetItemCategory, setItemCategories, itemCategories };
}