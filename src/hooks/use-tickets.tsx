"use client";

import { Ticket, ScheduleDataTicket, ScheduleRegulerDataTicket, PatchTicketStatus } from "@/components/type";
// import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseTicketsOptions {
    translations?: {
        requestSubmitted?: string;
        unableToSubmitRequest?: string;
        requestUpdated?: string;
        unableToUpdateRequest?: string;
        unableToLoadRequestDetails?: string;
        requestStatusUpdated?: string;
        unableToUpdateRequestStatus?: string;
    };
}

export const useTickets = (options?: UseTicketsOptions) => {
    const t = options?.translations || {
        requestSubmitted: "Request submitted successfully!",
        unableToSubmitRequest: "Unable to submit your request. Please try again.",
        requestUpdated: "Request updated successfully!",
        unableToUpdateRequest: "Unable to update your request. Please try again.",
        unableToLoadRequestDetails: "Unable to load request details. Please refresh the page.",
        requestStatusUpdated: "Request status updated successfully!",
        unableToUpdateRequestStatus: "Unable to update request status. Please try again.",
    };

    // const token = localStorage.getItem("access_token") || "";
    // const route = useRouter();
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
            // Map frontend field names to backend expected format
            const requestBody = {
                userId: ticket.userId,
                title: ticket.title,
                description: ticket.description,
                category: ticket.category,
                startDate: ticket.startDate.toISOString(),
                endDate: ticket.endDate.toISOString(),
            };

            const response = await fetch(`${API_URL}/api/tickets/v1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || t.unableToSubmitRequest);
            }

            // Show toast first, then navigate after a short delay so user sees the feedback
            toast.success(t.requestSubmitted);
            setTimeout(() => {
                window.location.href = '/app/your-requests';
            }, 500);
            return data;
        } catch (error: any) {
            toast.error(error.message || t.unableToSubmitRequest);
            throw error;
        }
    }

    const handleUpdateTicket = async (ticketId: number, ticket: Partial<ScheduleDataTicket>, token: string) => {
        try {
            // Build request body - only title and description can be updated
            const requestBody: Record<string, unknown> = {};
            if (ticket.title !== undefined) requestBody.title = ticket.title;
            if (ticket.description !== undefined) requestBody.description = ticket.description;

            const response = await fetch(`${API_URL}/api/tickets/v1/${ticketId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || t.unableToUpdateRequest);
            }

            toast.success(t.requestUpdated);
            return data;
        } catch (error: any) {
            toast.error(error.message || t.unableToUpdateRequest);
            throw error;
        }
    }

    const handlePostTicketReguler = async (ticket: ScheduleRegulerDataTicket, token: string) => {
        try {
            // Map frontend field names to backend expected format
            const requestBody = {
                title: ticket.title,
                startDate: ticket.startDate.toISOString(),
                endDate: ticket.endDate.toISOString(),
                userId: ticket.userId,
            };

            const response = await fetch(`${API_URL}/api/schedules/reguler/v1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || t.unableToSubmitRequest);
            }

            // Show toast first, then navigate after a short delay so user sees the feedback
            toast.success(t.requestSubmitted);
            setTimeout(() => {
                window.location.href = '/app/your-requests';
            }, 500);
            return data;
        } catch (error: any) {
            toast.error(error.message || t.unableToSubmitRequest);
            throw error;
        }
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
            console.log("Fetched Ticket by ID:", data);

            if (!response.ok) {
                throw new Error(data.message || t.unableToLoadRequestDetails);
            }

            if (response.ok) {
                return data.data;
            }
            return data.data;
        } catch (error: any) {
            toast.error(error.message || t.unableToLoadRequestDetails);
            throw error;
        }
    }

    const handleGetTicketsByUserID = async (userId: number, token: string): Promise<Ticket[]> => {
        try {
            const response = await fetch(`${API_URL}/api/tickets/v1/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("Fetched Tickets by User ID:", data);

            if (!response.ok) {
                throw new Error(data.message || t.unableToLoadRequestDetails);
            }

            return data.data || [];
        } catch (error: any) {
            console.error("Failed to fetch tickets by user ID:", error);
            return [];
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
                throw new Error(data.message || t.unableToUpdateRequestStatus);
            }

            // Show toast first, then reload after a short delay so user sees the feedback
            toast.success(t.requestStatusUpdated);
            setTimeout(() => {
                window.location.reload();
            }, 500);
            return data;
        } catch (error: any) {
            toast.error(error.message || t.unableToUpdateRequestStatus);
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
        handleGetTicketsByUserID,
        handlePatchTicket,
    }
}
