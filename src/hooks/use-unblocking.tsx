import { UnblockingForm, UnblockingResponse } from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useUnblocking = () => {
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
				// if (dataUnblocking) {
				// } else {
				// 	setUnblocking(false);
				// }
			} else {
				setUnblocking(false);
				console.error("Failed to fetch unblocking:", data.message);
			}
		} catch (err) {
			setUnblocking(false);
			console.error("Fetch unblocking error:", err);
		} finally {
			console.log("Fetch unblocking completed");
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
			}
		} catch (err) {
			console.error("Fetch unblocking by ID error:", err);
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
				window.location.reload();
				toast.success("Booking window created successfully!");
				return data;
			} else {
				toast.error(data.message || "Unable to create booking window. Please try again.");
				console.error("Failed to post unblocking:", data.message);
			}
		} catch (err) {
			toast.error("Connection error. Please check your internet and try again.");
			console.error("Post unblocking error:", err);
		} finally {
			console.log("Post unblocking completed");
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