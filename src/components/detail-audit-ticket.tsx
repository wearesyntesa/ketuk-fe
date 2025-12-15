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

const headerTableAuditLogUser: ColumnDef<AuditLogByTicket>[] = [
    {
        accessorKey: "ticketId",
        header: "Ticket ID",
    },
    {
        accessorKey: "action",
        header: "Action",
    },
    {
        accessorKey: "oldValue",
        header: "Old Value",
    },
    {
        accessorKey: "changes",
        header: "Changes",
    },
    {
        accessorKey: "newValue",
        header: "New Value",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            return <>{new Date(row.getValue("createdAt")).toLocaleString()}</>;
        }
    },
]

export default function DetailAuditTicket({ id }: { id: number }) {
    const token = localStorage.getItem("access_token") || "";
    const audit = useAudit(token);

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
                    Detail
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Audit Log by Ticket with id {id}</DialogTitle>
                        <DialogDescription>
                            Detail information log audit ticket by ticket ID {id}.
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