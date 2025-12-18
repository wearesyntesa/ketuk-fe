"use client";

import { Ticket, ScheduleDataTicket, ScheduleRegulerDataTicket, PatchTicketStatus } from "@/components/type";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useTickets = () => {
    // const token = localStorage.getItem("access_token") || "";
    const route = useRouter();
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
        console.log("Fetched Tickets:", data);
        return data.data;
    }

    const handlePostTicket = async (ticket: ScheduleDataTicket, token: string) => {
        try {
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

            if (response.ok) {
                route.push('/app/your-requests');
                toast.success('Ticket created successfully');
                return data;
            }
    
            return data;
        } catch (error: any) {
            toast.error(error.message || 'Gagal mengirim pesan');
            throw error;
        }
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

    const handleGetTicketByID = async (id: number, token: string) => {
        try {
            const response = await fetch(`${API_URL}/api/tickets/v1/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal mendapatkan data ticket');
            }

            if (response.ok) {
                return data.data;
            }
            return data.data;
        } catch (error: any) {
            toast.error(error.message || 'Gagal mendapatkan data ticket');
            throw error;
        }
    }

    const handlePatchTicket = async (patchTicket: PatchTicketStatus, id: number, token: string) => {
        try {
            const response = await fetch(`${API_URL}/api/tickets/v1/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(patchTicket),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Gagal mengupdate status ticket');
            }

            if (response.ok) {
                toast.success('Ticket status updated successfully');
                return data;
            }
    
            return data;
        } catch (error: any) {
            toast.error(error.message || 'Gagal mengupdate status ticket');
            throw error;
        }
    }

    return {
        tickets,
        setTickets,
        handleGetAllTickets,
        handlePostTicket,
        handleUpdateTicket,
        handlePostTicketReguler,
        handleGetTicketByID,
        handlePatchTicket,
    }
}