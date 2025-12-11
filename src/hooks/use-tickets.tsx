"use client";

import { Ticket } from "@/components/type";
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useTickets = (token: string) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const handleGetAllTickets = async () => {
        const response = await fetch(`${API_URL}/api/tickets/v1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data.data;
    }

    useEffect(() =>{
        handleGetAllTickets().then((data) => {
            setTickets(data);
        });
    }, [])

    return {
        tickets,
    }
}