"use client";

import { AllUser } from "@/components/type";
import { ColumnDef } from "@tanstack/react-table";
import UserTable from "@/components/table-user";
import { useUser } from "@/hooks/use-user";
import { useEffect, useMemo } from "react";
import DetailUser from "@/components/detail-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { InitialIconWithName } from "@/components/initial-icon";
import { useTranslations } from "next-intl";

export default function UserManagement() {
  const user = useUser();
  const token = localStorage.getItem("access_token");
  const t = useTranslations("users");

  const userData = localStorage.getItem("user");
  const id = userData && userData !== "undefined" && userData !== "null" ? JSON.parse(userData).id : null;

  const tableHeader: ColumnDef<AllUser>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: t("id"),
    },
    {
      accessorKey: "name",
      header: t("name"),
      cell: ({ row }) => (
        <>
          <InitialIconWithName title={row.getValue("name")} />
        </>
      ),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "role",
      header: t("role"),
    },
    {
      accessorKey: "created_at",
      header: t("joinDate"),
      cell: ({ row }) => {
        return <>{new Date(row.getValue("created_at")).toLocaleDateString()}</>;
      },
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
                <DetailUser id={row.getValue("id")} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [t]);

  useEffect(() => {
    user.handleGetAllUserManagement(token || "", id);
  }, []);

  return (
    <>
      <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-4">
          <UserTable columns={tableHeader} data={user.allUserManagement || []} />
        </div>
      </div>
    </>
  );
}
