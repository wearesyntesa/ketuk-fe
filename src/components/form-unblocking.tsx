"use client";

import { useUnblocking } from "@/hooks/use-unblocking";
import { CalendarRequestForm, CalendarUnblockForm } from "./date-picker";
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
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [semester, setSemester] = useState("Ganjil");
    const unblocking = useUnblocking();

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

    const postUnblocking = async () => {
        if (token) {
            if (!startDate || !endDate) {
                alert("Please select start and end dates.");
                return;
            }
            if (startDate > endDate) {
                alert("Start date cannot be later than end date.");
                return;
            }
            if (semester === "") {
                alert("Please select a semester.");
                return;
            }
            if ((endDate.getMonth() < startDate.getMonth() && endDate.getFullYear() === startDate.getFullYear()) || (endDate.getFullYear() < startDate.getFullYear())) {
                alert("End date cannot be earlier than start date.");
                return;
            }
            unblocking.handlePostUnblocing(token || "", {
                    startDate,
                    endDate,
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
                                <CalendarUnblockForm
                                    label={false}
                                    setDateState={setStartDate}
                                    valDateState={startDate ? new Date(startDate) : undefined}
                                />
                                <span className="flex items-center">-</span>
                                <CalendarUnblockForm
                                    label={false}
                                    setDateState={setEndDate}
                                    valDateState={endDate ? new Date(endDate) : undefined}
                                />
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
                            <Button type="submit">Submit Request</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
