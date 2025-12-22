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
import { useUser } from "@/hooks/use-user";
import { useAudit } from "@/hooks/use-audit";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLogByUser } from "./type";
import AuditTicketsByUserTable from "./table-audit-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DetailAuditTicket from "./detail-audit-ticket";
import { useTranslations } from "next-intl";

export default function DetailAuditUser({ id }: { id: number }) {
    const t = useTranslations("audit");
    const token = localStorage.getItem("access_token") || "";
    const user = useUser();
    const audit = useAudit(token);
    const [userName, setUserName] = useState<string>("");

    const headerTableAuditLogUser: ColumnDef<AuditLogByUser>[] = [
        {
            accessorKey: "ticketId",
            header: t("ticketId"),
        },
        {
            accessorKey: "action",
            header: t("action"),
        },
        {
            accessorKey: "oldValue",
            header: t("oldValue"),
        },
        {
            accessorKey: "changes",
            header: t("changes"),
        },
        {
            accessorKey: "newValue",
            header: t("newValue"),
        },
        {
            accessorKey: "createdAt",
            header: t("createdAt"),
            cell: ({ row }) => {
                return <>{new Date(row.getValue("createdAt")).toLocaleString()}</>;
            }
        },
        {
            header: t("action"),
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <EllipsisVertical className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="flex justify-start w-full text-sm">
                                <DetailAuditTicket id={row.getValue("ticketId")} />
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const fetchUser = () => {
        if (token) {
            user.handleUserbyID(token, id).then((data) => {
                setUserName(data.name);
            });

            audit.handleGetAuditLogByUserID(id)
        }
    };

    console.log("audit logs by user ID:", audit.auditsTicketsbuUserID);

    return (
        <div className="w-full flex flex-col gap-2">
            <Dialog>
                <DialogTrigger
                    className="cursor-pointer hover:font-semibold w-full"
                    onClick={() => fetchUser()}>
                    {t("detail")}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("auditLogTicketsBy")} {userName || ""}</DialogTitle>
                        <DialogDescription>
                            {t("detailLogAuditTicketByUser")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 w-full max-h-96 overflow-y-auto">
                        <AuditTicketsByUserTable columns={headerTableAuditLogUser} data={audit.auditsTicketsbuUserID || []} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
