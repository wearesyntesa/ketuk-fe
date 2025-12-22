"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UnblockingForm } from "@/components/form-unblocking";
import UnblockingTable from "@/components/table-unblocking";
import { useUnblocking } from "@/hooks/use-unblocking";
import { useUser } from "@/hooks/use-user";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UnblockingResponse } from "@/components/type";
import DetailUnblocking from "@/components/detail-unblocking";
import { useTranslations } from "next-intl";

export default function UnblockingPage() {
    const unblocking = useUnblocking();
    const user = useUser();
    const t = useTranslations("bookingWindow");
    const tCommon = useTranslations("common");

    const tableHeader: ColumnDef<UnblockingResponse>[] = useMemo(() => [
        {
            accessorKey: "id",
            header: t("id"),
        },
        {
            accessorKey: "semester",
            header: t("semester"),
        },
        {
            accessorKey: "startDate",
            header: t("startDate"),
            cell: ({ row }) => {
                return <>{new Date(row.getValue("startDate")).toLocaleDateString()}</>;
            },
        },
        {
            accessorKey: "endDate",
            header: t("endDate"),
            cell: ({ row }) => {
                return <>{new Date(row.getValue("endDate")).toLocaleDateString()}</>;
            },
        },
        {
            accessorKey: "tahun",
            header: t("year"),
        },
        {
            header: tCommon("actions"),
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="flex justify-start w-full text-sm">
                                <DetailUnblocking id={row.getValue("id")} />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [t, tCommon]);

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		unblocking.handleGetUnblocking(storedToken);
	}, [])

	console.log("unblocking data:", unblocking.dataUnblocking);

    return (
        <>
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<div className="px-4 lg:gap-2 lg:px-6">
					<div className="border rounded-xl mb-4">
						{unblocking.dataUnblocking != undefined && <UnblockingTable columns={tableHeader} data={unblocking.dataUnblocking} />}
					</div>
					<UnblockingForm className="md:w-3/4 w-full px-4 m-auto" userId={user.user?.id || 0} />
				</div>
			</div>
        </>
    )
}