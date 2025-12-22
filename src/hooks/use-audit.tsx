"use client";

import { AuditLog, AuditLogByTicket, AuditLogByUser } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useAudit = (token: string) => {
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
			}
		} catch (err) {
			console.error("Fetch audit logs by ticket ID error:", err);
		} finally {
			console.log("Fetch audit logs by ticket ID completed");
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
			}
		} catch (err) {
			console.error("Fetch audit logs by user ID error:", err);
		} finally {
			console.log("Fetch audit logs by user ID completed");
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
			}
		} catch (err) {
			console.error("Fetch all audit logs error:", err);
		} finally {
			console.log("Fetch all audit logs completed");
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