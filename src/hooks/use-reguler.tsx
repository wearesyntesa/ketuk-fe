"use client";

import { ScheduleRegulerDataTicket } from "@/components/type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useReguler = (token: string) => {
    const router = useRouter();

    const handlePostReguler = async (data: ScheduleRegulerDataTicket) => {
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
                toast.success("Reguler schedule created successfully");
                router.push('/app/your-requests');
                return resData.data;
            } else {
                toast.error("Failed to create reguler schedule");
                console.error("Failed to create reguler schedule:", resData.message);
            }
        } catch (err) {
            toast.error("Error creating reguler schedule");
            console.error("Create reguler schedule error:", err);
        } finally {
            console.log("Create reguler schedule completed");
        }
    }

    return {
        handlePostReguler,
    };
};