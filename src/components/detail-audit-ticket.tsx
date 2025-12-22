"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useAudit } from "@/hooks/use-audit";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLogByTicket } from "./type";
import AuditTicketsByTicketTable from "./table-audit-ticket";
import { useTranslations } from "next-intl";

export default function DetailAuditTicket({ id }: { id: number }) {
    const t = useTranslations("audit");
    const token = localStorage.getItem("access_token") || "";
    const audit = useAudit(token);

    const headerTableAuditLogUser: ColumnDef<AuditLogByTicket>[] = [
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
    ];

    const fetchUser = () => {
        if (token) {
            audit.handleGetAuditLogByTicketID(id)
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
                        <DialogTitle>{t("auditLogByTicketId")} {id}</DialogTitle>
                        <DialogDescription>
                            {t("detailLogAuditTicketById")} {id}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 w-full max-h-96 overflow-y-auto">
                        <AuditTicketsByTicketTable columns={headerTableAuditLogUser} data={audit.auditsTicketsbyID || []} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
