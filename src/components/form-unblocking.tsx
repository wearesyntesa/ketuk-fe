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

export function UnblockingForm({
    border,
    className,
    userId
}: {
    border?: boolean;
    className?: string;
    userId: number;
}) {
    // Form state
    const [token, setToken] = useState("")
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [semester, setSemester] = useState("Ganjil");
    const unblocking = useUnblocking();

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    })

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token") || "";
        setToken(storedToken);
    }, [])

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(parseInt(e.target.value));
    }

    const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSemester(e.target.value);
    }

    const handleChangeDateRange = (dateRange: DateRange | undefined) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		if (dateRange && dateRange.from && dateRange.from >= today) {
			setDateRange(dateRange);
		} else {
			setDateRange(undefined);
			toast.error("Cannot select past dates");
		}
	}

    const postUnblocking = async () => {
        if (token) {
            if (!dateRange?.from || !dateRange.to) {
                alert("Please select start and end dates.");
                return;
            }
            // if (startDate > endDate) {
            //     alert("Start date cannot be later than end date.");
            //     return;
            // }
            if (semester === "") {
                alert("Please select a semester.");
                return;
            }
            // if ((endDate.getMonth() < startDate.getMonth() && endDate.getFullYear() === startDate.getFullYear()) || (endDate.getFullYear() < startDate.getFullYear())) {
            //     alert("End date cannot be earlier than start date.");
            //     return;
            // }
            unblocking.handlePostUnblocing(token || "", {
                    startDate: dateRange.from,
                    endDate: dateRange.to,
                    semester: semester,
                    tahun: year,
                    userId: userId,
                }
            )
        }
    }

    return (
        <Card
            className={`${border ? "border" : "border-0 shadow-none"} ${
                className ? className : "w-full"
            }`}>
            <CardHeader>
                <CardTitle>Unblocking Form</CardTitle>
                <CardDescription>
                    Fill the form below to request unblocking.
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
                                <Label>Waktu</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* <CalendarUnblockForm
                                    label={false}
                                    setDateState={setStartDate}
                                    valDateState={startDate ? new Date(startDate) : undefined}
                                />
                                <span className="flex items-center">-</span>
                                <CalendarUnblockForm
                                    label={false}
                                    setDateState={setEndDate}
                                    valDateState={endDate ? new Date(endDate) : undefined}
                                /> */}
                                <CalendarRange label use="request" valDateState={dateRange} onChange={handleChangeDateRange} />
                            </div>
                        </div>
                        <div className="grid gap-2">
							<Label htmlFor="semester">Semester</Label>
							<Select onValueChange={() => handleSemesterChange}>
                                <SelectTrigger id="semester" className="w-full">
                                    <SelectValue placeholder="Select a semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ganjil">Ganjil</SelectItem>
                                    <SelectItem value="Genap">Genap</SelectItem>
                                </SelectContent>
                            </Select>
						</div>
                        <div className="grid gap-2">
							<Label htmlFor="year">Tahun</Label>
							<Input
								id="year"
								type="number"
								value={year}
								onChange={handleYearChange}
								placeholder="Praktikum Pemrograman Dasar"
								required
							/>
						</div>
                        <div className="flex justify-end w-full gap-2">
                            <Button type="submit">Submit Unblocking</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
