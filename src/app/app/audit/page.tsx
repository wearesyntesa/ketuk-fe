'use client';

import { AllUser } from "@/components/type";
import { ColumnDef } from "@tanstack/react-table";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DetailAuditUser from "@/components/detail-audit-user";
import AuditUserTable from "@/components/table-audit";
import { InitialIconWithName } from "@/components/initial-icon";

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
				<InitialIconWithName title={row.getValue("name")} />
				{/* {row.getValue("name")} */}
			</>
		),
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	// {
	// 	accessorKey: "created_at",
	// 	header: "Join",
	// 	cell: ({ row }) => {
	// 		return <>{new Date(row.getValue("created_at")).toLocaleDateString()}</>;
	// 	},
	// },
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
							<DetailAuditUser id={row.getValue("id")} />
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function AuditPage() {
	const user = useUser();
	const token = localStorage.getItem("access_token");

	useEffect(() => {
		user.handleGetAllUser(token || "");
	}, []);

	return (
		<>
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
					{/* <ChartAreaInteractive /> */}
					<AuditUserTable columns={tableHeader} data={user.allUsers || []} />
				</div>
			</div>
		</>
	);
}