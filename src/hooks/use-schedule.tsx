"use client";

import { MergeSchedultType, ScheduleReguler, ScheduleTicket } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useSchedule = (token: string) => {
	const [schedules, setSchedules] = useState<MergeSchedultType[]>([]);
	const [ticketSchedules, setTicketSchedules] = useState<ScheduleTicket[]>([]);
	const [regulerSchedules, setRegulerSchedules] = useState<ScheduleReguler[]>(
		[]
	);

	const handleGetAllTicketSchedules = async () => {
		try {
			const response = await fetch(`${API_URL}/api/schedules/tickets/v1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();

			if (data.success) {
				const dataRes: ScheduleTicket[] = data.data;
				setTicketSchedules(
					dataRes.map((item: ScheduleTicket) => ({
						idSchedule: item.idSchedule,
						title: item.title,
						startDate: item.startDate,
						endDate: item.endDate,
						userId: item.userId,
						kategori: item.kategori,
						description: item.description,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
						user: item.user,
						tickets: item.tickets,
					}))
				);
				return dataRes;
			} else {
				console.error("Failed to fetch ticket schedules:", data.message);
			}
		} catch (err) {
			console.error("Fetch ticket schedules error:", err);
		} finally {
			console.log("Fetch ticket schedules completed");
		}
	};

	const handleGetAllRegulerSchedules = async () => {
		try {
			const response = await fetch(`${API_URL}/api/schedules/reguler/v1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.success) {
				const dataRes: ScheduleReguler[] = data.data;
				setRegulerSchedules(
					dataRes.map((item: ScheduleReguler) => ({
						idSchedule: item.idSchedule,
						title: item.title,
						startDate: item.startDate,
						endDate: item.endDate,
						userId: item.userId,
						kategori: item.kategori,
						description: item.description,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
						user: item.user,
					}))
				);
				return data.data;
			} else {
				console.error("Failed to fetch reguler schedules:", data.message);
			}
		} catch (err) {
			console.error("Fetch reguler schedules error:", err);
		} finally {
			console.log("Fetch reguler schedules completed");
		}
	};

	const handleScheduleByUserId = async (userId: number) => {
		try {
			const response = await fetch(`${API_URL}/api/schedules/tickets/v1/user/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.success) {
				const dataRes: ScheduleTicket[] = data.data;
				setTicketSchedules(dataRes.map((item: ScheduleTicket) => ({
						idSchedule: item.idSchedule,
						title: item.title,
						startDate: item.startDate,
						endDate: item.endDate,
						userId: item.userId,
						kategori: item.kategori,
						description: item.description,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
						user: item.user,
						tickets: item.tickets,
					})));
			} else {
				console.error("Failed to fetch schedules by user ID:", data.message);
			}
		} catch (err) {
			console.error("Fetch schedules by user ID error:", err);
		} finally {
			console.log("Fetch schedules by user ID completed");
		}
	}

	return {
		schedules,
		ticketSchedules,
		regulerSchedules,
		setSchedules,
		setTicketSchedules,
		setRegulerSchedules,
		handleGetAllRegulerSchedules,
		handleGetAllTicketSchedules,
		handleScheduleByUserId,
	};
};