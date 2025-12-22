"use client";

import { CategoryChartData, MergeSchedultType, ScheduleReguler, ScheduleTicket } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseScheduleOptions {
	locale?: string;
	translations?: {
		unableToLoadSchedules?: string;
		connectionError?: string;
		unableToLoadRegularSchedules?: string;
		unableToLoadYourSchedules?: string;
	};
}

export const useSchedule = (token: string, options?: UseScheduleOptions) => {
	const locale = options?.locale || "en";
	const t = options?.translations || {
		unableToLoadSchedules: "Unable to load schedules. Please try again.",
		connectionError: "Connection error. Please check your internet and try again.",
		unableToLoadRegularSchedules: "Unable to load regular schedules. Please try again.",
		unableToLoadYourSchedules: "Unable to load your schedules. Please try again.",
	};

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
				toast.error(t.unableToLoadSchedules);
			}
		} catch (err) {
			console.error("Fetch ticket schedules error:", err);
			toast.error(t.connectionError);
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
				toast.error(t.unableToLoadRegularSchedules);
			}
		} catch (err) {
			console.error("Fetch reguler schedules error:", err);
			toast.error(t.connectionError);
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
				toast.error(t.unableToLoadYourSchedules);
			}
		} catch (err) {
			console.error("Fetch schedules by user ID error:", err);
			toast.error(t.connectionError);
		}
	}

	const handleMergeSchedules = (schedule: ScheduleTicket[], regulerSchedule: ScheduleReguler[], admin: boolean) => {
		const merged: MergeSchedultType[] = [];

		schedule.forEach((ticketSchedule) => {
			merged.push({
				idSchedule: ticketSchedule.idSchedule,
				title: ticketSchedule.title,
				startDate: ticketSchedule.startDate,
				endDate: ticketSchedule.endDate,
				date: new Date(ticketSchedule.startDate),
				day: new Date(ticketSchedule.startDate).toLocaleDateString(locale, { weekday: 'long' }),
				userId: ticketSchedule.userId,
				kategori: ticketSchedule.kategori,
				description: ticketSchedule.description,
				createdAt: ticketSchedule.createdAt,
				updatedAt: ticketSchedule.updatedAt,
				user: ticketSchedule.user,
				tickets: ticketSchedule.tickets,
				status: ticketSchedule.tickets?.[0].status || "Pending",
				isReguler: false,
			});
		});
		if (admin) {
			regulerSchedule.forEach((regulerSchedule) => {
				merged.push({
					idSchedule: regulerSchedule.idSchedule,
					title: regulerSchedule.title,
					startDate: regulerSchedule.startDate,
					endDate: regulerSchedule.endDate,
					date: new Date(regulerSchedule.startDate),
					day: new Date(regulerSchedule.startDate).toLocaleDateString(locale, { weekday: 'long' }),
					userId: regulerSchedule.userId,
					kategori: regulerSchedule.kategori,
					description: regulerSchedule.description,
					createdAt: regulerSchedule.createdAt,
					updatedAt: regulerSchedule.updatedAt,
					user: regulerSchedule.user,
					status: "Accepted",
					isReguler: true,
				});
			});
		}

		return merged;
	}

	const handleGetAllAcceptedSchedules = (schedule: ScheduleTicket[], regulerSchedule: ScheduleReguler[]) => {
		const merged: MergeSchedultType[] = [];
		handleMergeSchedules(schedule, regulerSchedule, true).forEach((item) => {
			if (item.status.toLowerCase() === "accepted") {
				merged.push(item);
			}
		});
		return merged;
	}

	const handlePieChartData = (schedules: ScheduleTicket[], regulerSchedule: ScheduleReguler[]) => {
		const pieData: CategoryChartData[] = [];
		const merged = handleMergeSchedules(schedules, regulerSchedule, true);
		const fill = [
			"var(--chart-3)",
			"var(--chart-4)",
			"var(--chart-1)",
		]
		merged.forEach((item) => {
			const existingCategory = pieData.find((data) => data.category === item.kategori);
			// const category = item.kategori === undefined ? "Other" : item.kategori;
			if (existingCategory) {
				existingCategory.totalRequest += 1;
			} else {
				pieData.push({ category: item.kategori, totalRequest: 1, fill: fill[pieData.length % fill.length] } );
			}
		});

		return pieData;
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
		handleMergeSchedules,
		handleGetAllAcceptedSchedules,
		handlePieChartData,
	};
};
