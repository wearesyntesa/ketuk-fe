'use client';

import AppHeader from "@/components/app-header";
import { AllUser } from "@/components/type";
import { ColumnDef } from "@tanstack/react-table";
// import { InitialIcon } from "@/app/app/your-requests/page";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import UserTable from "@/components/user-table";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DetailUser from "@/components/detail-user";

const tableHeader: ColumnDef<AllUser>[] = [
    {
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<>
                {/* <InitialIcon title={row.getValue("name")} /> */}
				{row.getValue("name")}
            </>
		),
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
        accessorKey: "created_at",
		header: "Join",
		cell: ({ row }) => {
			return (
				<>
					{new Date(row.getValue("created_at")).toLocaleDateString()}
				</>
			);
		},
	},
    {
        header: "Action",
        cell: ({ row }) => {
			return (
				<DetailUser id={row.getValue("id")} />
			);
		},
    }
];

export default function UserManagement() {
    const user = useUser();
	const token = localStorage.getItem("access_token");

	useEffect(() => {
		user.handleGetAllUser(token || "").then((data) => {	
			user.setAllUsers(data);
		});
	}, [])

    return (
        <>
            <AppHeader title="User Management" />
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* <SectionCards /> */}
                <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
                    {/* <ChartAreaInteractive /> */}
                    <UserTable columns={tableHeader} data={user.allUsers || []} />
                </div>
            </div>
        </>
    )
}