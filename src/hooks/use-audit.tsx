"use client";

import { AuditLog, AuditLogByTicket, AuditLogByUser } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseAuditOptions {
	translations?: {
		unableToLoadAuditLogs?: string;
		connectionError?: string;
	};
}

export const useAudit = (token: string, options?: UseAuditOptions) => {
	const t = options?.translations || {
		unableToLoadAuditLogs: "Unable to load audit logs. Please try again.",
		connectionError: "Connection error. Please check your internet and try again.",
	};

	const [auditsTicketsbyID, setAuditsTickets] = useState<AuditLogByTicket[]>(
		[]
	);
	const [auditsTicketsbuUserID, setAuditsTicketsbyUserID] = useState<
		AuditLogByUser[]
	>([]);
	const [allAuditLogs, setAllAuditLogs] = useState<AuditLog[]>([]);

	const handleGetAuditLogByTicketID = async (ticketID: number) => {
		try {
			const response = await fetch(
				`${API_URL}/api/audit/tickets/${ticketID}/logs`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (data.success) {
				setAuditsTickets(data.data);
			} else {
				console.error("Failed to fetch audit logs by ticket ID:", data.message);
				toast.error(t.unableToLoadAuditLogs);
			}
		} catch (err) {
			console.error("Fetch audit logs by ticket ID error:", err);
			toast.error(t.connectionError);
		}
	};

	const handleGetAuditLogByUserID = async (userID: number) => {
		try {
			const response = await fetch(
				`${API_URL}/api/audit/users/${userID}/logs`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			if (data.success) {
				setAuditsTicketsbyUserID(data.data);
			} else {
				console.error("Failed to fetch audit logs by user ID:", data.message);
				toast.error(t.unableToLoadAuditLogs);
			}
		} catch (err) {
			console.error("Fetch audit logs by user ID error:", err);
			toast.error(t.connectionError);
		}
	};

	const handleGetAllAuditLogs = async () => {
		try {
			const response = await fetch(`${API_URL}/api/audit/logs`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.success) {
				setAllAuditLogs(data.data);
			} else {
				console.error("Failed to fetch all audit logs:", data.message);
				toast.error(t.unableToLoadAuditLogs);
			}
		} catch (err) {
			console.error("Fetch all audit logs error:", err);
			toast.error(t.connectionError);
		}
	};

	return {
		auditsTicketsbyID,
		auditsTicketsbuUserID,
		allAuditLogs,
		handleGetAuditLogByTicketID,
		handleGetAuditLogByUserID,
		handleGetAllAuditLogs,
	};
};
