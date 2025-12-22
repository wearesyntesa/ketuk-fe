"use client";

import { ScheduleRegulerDataTicket } from "@/components/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useReguler = (token: string) => {
    /**
     * Creates a regular schedule entry.
     * Returns true on success, false on failure.
     * Does NOT show toasts or navigate - the calling component handles that.
     */
    const handlePostReguler = async (data: ScheduleRegulerDataTicket): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/api/schedules/reguler/v1`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const resData = await response.json();

            if (resData.success) {
                console.log("Reguler schedule created:", resData.data);
                return true;
            } else {
                console.error("Failed to create reguler schedule:", resData.message);
                return false;
            }
        } catch (err) {
            console.error("Create reguler schedule error:", err);
            return false;
        }
    }

    return {
        handlePostReguler,
    };
};