"use client";

import { CheckCircle, Hourglass, XCircle } from "lucide-react";
import { EventRequest } from "./type";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export default function RequestCard({item}: {item: EventRequest}) {
    const t = useTranslations("requests");
    const tCommon = useTranslations("common");
    
    const icon =
			item.status === "Accepted" ? (
				<CheckCircle className="text-green-500" />
			) : item.status === "Pending" ? (
				<Hourglass className="text-yellow-500" />
			) : (
				<XCircle className="text-red-500" />
			);
		const backgroundIcon =
			item.status === "Accepted"
				? "bg-green-100"
				: item.status === "Pending"
				? "bg-yellow-100"
				: "bg-red-100";
		const backgroundCard =
			item.status === "Accepted"
				? "bg-green-50"
				: item.status === "Pending"
				? "bg-yellow-50"
				: "bg-red-50";

    const iconElement = (
        <div className={`p-2 rounded-full ${backgroundIcon}`}>
            {icon}
        </div>
    );

    return (
        <>
            <Card className={`${backgroundCard} p-4 w-full`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            {iconElement}
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-sm text-muted-foreground flex">{t("submittedBy")} @{item.pic}  | {item.time}</span>
                        </div>
                    </div>
                    {item.status === "Pending" && (
                        <div>
                            <Button className="bg-gradient-to-br from-red-600 via-red-500 to-red-400" size="sm">{tCommon("cancel")}</Button>
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}