"use client";

import { useUnblocking } from "@/hooks/use-unblocking";
import { CalendarRange, CalendarUnblockForm } from "./date-picker";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export function UnblockingForm({
    border,
    className,
    userId
}: {
    border?: boolean;
    className?: string;
    userId: number;
}) {
    const t = useTranslations("bookingWindow");
    const tErrors = useTranslations("errors");
    
    // Form state
    const [token, setToken] = useState("")
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [semester, setSemester] = useState("Ganjil");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const unblocking = useUnblocking();

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: DateTime.now().plus({ days: 1 }).toJSDate(),
    })

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token") || "";
        setToken(storedToken);
    }, [])

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(parseInt(e.target.value));
    }

    const handleChangeDateRange = (dateRange: DateRange | undefined) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		if (dateRange && dateRange.from && dateRange.from >= today) {
			setDateRange(dateRange);
		} else {
			setDateRange(undefined);
			toast.error(tErrors("validationError"));
		}
	}

    const postUnblocking = async () => {
        if (token) {
            if (!dateRange?.from || !dateRange.to) {
                toast.warning(t("selectDates"));
                return;
            }
            if (semester === "") {
                toast.warning(t("semester"));
                return;
            }
            setIsSubmitting(true);
            try {
                await unblocking.handlePostUnblocing(token || "", {
                        startDate: dateRange.from,
                        endDate: dateRange.to,
                        semester: semester,
                        tahun: year,
                        userId: userId,
                    }
                );
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <Card
            className={`${border ? "border" : "border-0 shadow-none"} ${
                className ? className : "w-full"
            }`}>
            <CardHeader>
                <CardTitle>{t("newBookingWindow")}</CardTitle>
                <CardDescription>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    postUnblocking()
                }}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label>{t("dateRange")}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarRange label use="request" valDateState={dateRange} onChange={handleChangeDateRange} />
                            </div>
                        </div>
                        <div className="grid gap-2">
							<Label htmlFor="semester">{t("semester")}</Label>
							<Select value={semester} onValueChange={setSemester}>
                                <SelectTrigger id="semester" className="w-full">
                                    <SelectValue placeholder={t("semester")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ganjil">{t("oddSemester")}</SelectItem>
                                    <SelectItem value="Genap">{t("evenSemester")}</SelectItem>
                                </SelectContent>
                            </Select>
						</div>
                        <div className="grid gap-2">
							<Label htmlFor="year">{t("year")}</Label>
						<Input
							id="year"
							type="number"
							value={year}
							onChange={handleYearChange}
							placeholder={t("yearPlaceholder")}
							required
						/>
						</div>
                        <div className="flex justify-end w-full gap-2">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("creating")}
                                    </>
                                ) : (
                                    t("createBookingWindow")
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
