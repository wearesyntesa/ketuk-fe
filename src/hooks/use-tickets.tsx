"use client";

import { POST } from "@/app/api/tickets/create/route";
import { Ticket, ScheduleDataTicket, ScheduleRegulerDataTicket } from "@/components/type";
import { NextRequest } from "next/server";
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useTickets = () => {
    // const token = localStorage.getItem("access_token") || "";
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const handleGetAllTickets = async () => {
        const response = await fetch(`${API_URL}/api/tickets/v1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });
        const data = await response.json();
        return data.data;
    }

    const handlePostTicket = async (ticket: ScheduleDataTicket, token: string) => {
        const response = await fetch(`/api/tickets/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ payload: ticket }),
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Gagal mengirim pesan');
        }

        return data;
    }

    const handleUpdateTicket = async (ticket: ScheduleDataTicket, token: string) => {
        const response = await fetch(`/api/tickets/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ payload: ticket }),
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Gagal mengirim pesan');
        }

        return data;
    }

    const handlePostTicketReguler = async (ticket: ScheduleRegulerDataTicket, token: string) => {
        const response = await fetch(`/api/tickets/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ payload: ticket }),
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Gagal mengirim pesan');
        }

        return data;
    }

    return {
        tickets,
        setTickets,
        handleGetAllTickets,
        handlePostTicket,
        handleUpdateTicket,
        handlePostTicketReguler,
    }
}