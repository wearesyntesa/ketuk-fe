"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { UnblockingResponse } from "./type";
import { useUnblocking } from "@/hooks/use-unblocking";
import { useTranslations } from "next-intl";

export default function DetailUnblocking({ id }: { id: number }) {
    const token = localStorage.getItem("access_token") || "";
    const unblocking = useUnblocking();
    const [unblockData, setUnblockData] = useState<UnblockingResponse | null>(null);
    const t = useTranslations("bookingWindow");

    const fetchUnblocking = () => {
        if (token) {
            unblocking.handleGetUnblockingById(token, id).then((data) => {
                setUnblockData(data);
            });
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <Dialog>
                <DialogTrigger
                    className="cursor-pointer hover:font-semibold w-full"
                    onClick={() => fetchUnblocking()}>
                    {t("detail")}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{unblockData?.id || ""}</DialogTitle>
                        <DialogDescription>
                            {t("detailDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 w-full">
                        <div className="flex flex-col">
                            <strong>{t("startDate")}:</strong>
                            <Input
                                value={unblockData?.startDate ? new Date(unblockData.startDate).toLocaleDateString() : ""} 
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <strong>{t("endDate")}:</strong>
                            <Input value={unblockData?.endDate ? new Date(unblockData.endDate).toLocaleDateString() : ""} readOnly />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}