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

const headerTableAuditLogUser: ColumnDef<AuditLogByUser>[] = [
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
    {
        header: "Action",
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
]

export default function DetailAuditUser({ id }: { id: number }) {
    const token = localStorage.getItem("access_token") || "";
    const user = useUser();
    const audit = useAudit(token);
    const [userName, setUserName] = useState<string>("");

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
                    Detail
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Audit Log Tickets by {userName || ""}</DialogTitle>
                        <DialogDescription>
                            Detail information log audit ticket by user.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 w-full max-h-96 overflow-y-auto">
                        <AuditTicketsByUserTable columns={headerTableAuditLogUser} data={audit.auditsTicketsbuUserID || []} />
                        {/* {audit.auditsTicketsbuUserID.length === 0 ? (
                            <p>No audit logs found for this user.</p>
                        ) : (
                            <>
                                {audit.auditsTicketsbuUserID.map((log) => (
                                    <div
                                        key={log.id}
                                        className="border rounded-md p-4 flex flex-col gap-2">
                                        <p>
                                            <strong>Tickets ID:</strong> {log.ticketId}
                                        </p>
                                        <p>
                                            <strong>Action:</strong> {log.action}
                                        </p>
                                        <p>
                                            <strong>Old Value:</strong>{" "}
                                            {log.oldValue ? log.oldValue : "N/A"}
                                        </p>
                                        <p>
                                            <strong>New Value:</strong> {log.newValue}
                                        </p>
                                        <p>
                                            <strong>Changes:</strong>{" "}
                                            {log.changes ? log.changes : "N/A"}
                                        </p>
                                        <p>
                                            <strong>Created At:</strong>{" "}
                                            {new Date(log.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </>
                        )} */}
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4 w-full justify-end">
                        <DialogClose className="border rounded-mb mr-2">Close</DialogClose>
                    </div> */}
                </DialogContent>
            </Dialog>
        </div>
    );
}