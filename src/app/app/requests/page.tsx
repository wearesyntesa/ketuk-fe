"use client";

import AppHeader from "@/components/app-header";
import { RequestForm } from "@/components/request-form";
import { useState } from "react";

export default function RequestsPage() {
    return (
        <>
            <AppHeader title="Request Schedule" />
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* <SectionCards /> */}
                <div className="px-4 lg:gap-2 lg:px-6">
                    {/* <ChartAreaInteractive /> */}
                    <RequestForm border className="md:w-3/4 w-full px-4 m-auto" />
                </div>
            </div>
        </>
    )
}