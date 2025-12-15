"use client";

import { AuditLogByTicket, AuditLogByUser } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useAudit = (token: string) => {
	const [auditsTicketsbyID, setAuditsTickets] = useState<AuditLogByTicket[]>(
		[]
	);
	const [auditsTicketsbuUserID, setAuditsTicketsbyUserID] = useState<
		AuditLogByUser[]
	>([]);

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

	return {
		auditsTicketsbyID,
		auditsTicketsbuUserID,
		handleGetAuditLogByTicketID,
		handleGetAuditLogByUserID,
	};
};