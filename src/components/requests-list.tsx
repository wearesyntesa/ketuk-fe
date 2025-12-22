"use client";

import RequestCard from "./request-card";
import { EventRequest } from "./type";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";

export default function RequestsList({ items }: { items: EventRequest[] }) {
    const t = useTranslations("requests");
    
    return (
        <>
            <div className="max-w-2xl flex flex-col gap-4 mx-auto">
                <Input placeholder={t("searchRequests")} className="mb-4" />
                {items.map(item => (
                    <RequestCard key={item.id} item={item} />
                ))}
            </div>
        </>
    )
}