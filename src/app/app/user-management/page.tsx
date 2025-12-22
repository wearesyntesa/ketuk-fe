"use client";

import { AllUser } from "@/components/type";
import { ColumnDef } from "@tanstack/react-table";
import UserTable from "@/components/table-user";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import DetailUser from "@/components/detail-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
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
      return <>{new Date(row.getValue("created_at")).toLocaleDateString()}</>;
    },
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
              <DetailUser id={row.getValue("id")} />
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

export default function UserManagement() {
  const user = useUser();
  const token = localStorage.getItem("access_token");

  const userData = localStorage.getItem("user");
  const id = userData && userData !== "undefined" && userData !== "null" ? JSON.parse(userData).id : null;

  useEffect(() => {
    user.handleGetAllUserManagement(token || "", id);
  }, []);

  return (
    <>
      <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* <SectionCards /> */}
        <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
          {/* <ChartAreaInteractive /> */}
          <UserTable columns={tableHeader} data={user.allUserManagement || []} />
        </div>
      </div>
    </>
  );
}
