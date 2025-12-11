"use client";

import { MergeSchedultType, ScheduleReguler, ScheduleTicket } from "@/components/type";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export const useSchedule = (token: string) => {
    const [schedules, setSchedules] = useState<MergeSchedultType[]>([]);
    const [ticketSchedules, setTicketSchedules] = useState<ScheduleTicket[]>([]);
    const [regulerSchedules, setRegulerSchedules] = useState<ScheduleReguler[]>([]);

    const handleGetAllTicketSchedules = async () => {
        try {
            const response = await fetch(`${API_URL}/api/schedules/tickets/v1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            
            if (data.success) {
                console.log("data schedule ticket", data.data);
                setTicketSchedules(data.data);
            } else {
                console.error("Failed to fetch ticket schedules:", data.message);
            }
        } catch (err) {
            console.error("Fetch ticket schedules error:", err);
        } finally {
            console.log("Fetch ticket schedules completed");
        }
    }

    const handleGetAllRegulerSchedules = async () => {
        try {
            const response = await fetch(`${API_URL}/api/schedules/reguler/v1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setRegulerSchedules(data.data);
            } else {
                console.error("Failed to fetch reguler schedules:", data.message);
            }
        } catch (err) {
            console.error("Fetch reguler schedules error:", err);
        } finally {
            console.log("Fetch reguler schedules completed");
        }
    }

    const handleGetAllSchedules = async () => {
        await handleGetAllTicketSchedules();
        await handleGetAllRegulerSchedules();
        console.log("ticketSchedules", ticketSchedules);
        console.log("regulerSchedules", regulerSchedules);
    }

    return {
        schedules,
        ticketSchedules,
        regulerSchedules,
        handleGetAllSchedules,
    }
}