import { UnblockingForm, UnblockingResponse } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseUnblockingOptions {
    translations?: {
        unableToLoadBookingWindows?: string;
        unableToLoadBookingWindowDetails?: string;
        bookingWindowCreated?: string;
        unableToCreateBookingWindow?: string;
        connectionError?: string;
    };
}

export const useUnblocking = (options?: UseUnblockingOptions) => {
    const t = options?.translations || {
        unableToLoadBookingWindows: "Unable to load booking windows. Please try again.",
        unableToLoadBookingWindowDetails: "Unable to load booking window details. Please try again.",
        bookingWindowCreated: "Booking window created successfully!",
        unableToCreateBookingWindow: "Unable to create booking window. Please try again.",
        connectionError: "Connection error. Please check your internet and try again.",
    };

    const [unblocking, setUnblocking] = useState(false);
    const [dataUnblocking, setDataUnblocking] = useState<UnblockingResponse[]>([] as UnblockingResponse[]);

    const handleGetUnblocking = async (token: string) => {
		try {
			const response = await fetch(`${API_URL}/api/unblockings/v1`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.success) {
				setDataUnblocking(data.unblockings);
				setUnblocking(true);
			} else {
				setUnblocking(false);
				console.error("Failed to fetch unblocking:", data.message);
				toast.error(t.unableToLoadBookingWindows);
			}
		} catch (err) {
			setUnblocking(false);
			console.error("Fetch unblocking error:", err);
			toast.error(t.connectionError);
		}
	};

	const handleGetUnblockingById = async (token: string, id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/unblockings/v1/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			if (data.success) {
				return data.unblocking;
			} else {
				console.error("Failed to fetch unblocking by ID:", data.message);
				toast.error(t.unableToLoadBookingWindowDetails);
			}
		} catch (err) {
			console.error("Fetch unblocking by ID error:", err);
			toast.error(t.connectionError);
		}
	};

	const handlePostUnblocing = async (
		token: string,
		unblockingData: UnblockingForm
	) => {
		try {
			const response = await fetch(`${API_URL}/api/unblockings/v1`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					endDate: unblockingData.endDate,
					startDate: unblockingData.startDate,
					semester: unblockingData.semester,
					tahun: unblockingData.tahun,
					userId: unblockingData.userId,
				}),
			});

			const data = await response.json();

			if (data.success) {
				setUnblocking(true);
				// Show toast first, then reload after a short delay so user sees the feedback
				toast.success(t.bookingWindowCreated);
				setTimeout(() => {
					window.location.reload();
				}, 500);
				return data;
			} else {
				toast.error(data.message || t.unableToCreateBookingWindow);
				console.error("Failed to post unblocking:", data.message);
			}
		} catch (err) {
			toast.error(t.connectionError);
			console.error("Post unblocking error:", err);
		}
	};

    return {
        unblocking,
        dataUnblocking,
        handleGetUnblocking,
        handleGetUnblockingById,
        handlePostUnblocing
    }
}
