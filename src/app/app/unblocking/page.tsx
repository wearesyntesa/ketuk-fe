"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UnblockingForm } from "@/components/form-unblocking";
import UnblockingTable from "@/components/table-unblocking";
import { useUnblocking } from "@/hooks/use-unblocking";
import { useUser } from "@/hooks/use-user";
import { EllipsisVertical } from "lucide-react";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UnblockingResponse } from "@/components/type";
import DetailUnblocking from "@/components/detail-unblocking";

const tableHeader: ColumnDef<UnblockingResponse>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "semester",
		header: "Semester",
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
        cell: ({ row }) => {
			return <>{new Date(row.getValue("startDate")).toLocaleDateString()}</>;
		},
	},
	{
		accessorKey: "endDate",
		header: "End Date",
		cell: ({ row }) => {
			return <>{new Date(row.getValue("endDate")).toLocaleDateString()}</>;
		},
	},
    {
        accessorKey: "tahun",
        header: "Year",
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
							<DetailUnblocking id={row.getValue("id")} />
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		// cell: ({ row }) => {
		// 	return (
		// 		<DetailUser id={row.getValue("id")} />
		// 	);
		// },
	},
];

export default function UnblockingPage() {
    // const token = localStorage.getItem("access_token") || "";
	// const [token, setToken] = useState("");
    const unblocking = useUnblocking();
    const user = useUser();

	useEffect(() => {
		const storedToken = localStorage.getItem("access_token") || "";
		// setToken(storedToken);
		unblocking.handleGetUnblocking(storedToken);
	}, [])

	console.log("unblocking data:", unblocking.dataUnblocking);

    // useEffect(() => {
	// 	// if (token) {
	// 	// }
    // }, [])

    if (unblocking.dataUnblocking != undefined) {
        return (
            <>
                <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* <SectionCards /> */}
                    <div className="px-4 lg:gap-2 lg:px-6">
                        {/* <ChartAreaInteractive /> */}
                        <div>
                            <UnblockingTable columns={tableHeader} data={unblocking.dataUnblocking} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 lg:gap-2 lg:px-6">
					{/* <ChartAreaInteractive /> */}
					<div className="border">
						<UnblockingForm className="md:w-3/4 w-full px-4 m-auto" userId={user.user?.id || 0} />
					</div>
				</div>
			</div>
        </>
    )
}