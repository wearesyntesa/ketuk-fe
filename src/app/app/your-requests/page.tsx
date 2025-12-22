"use client";

import RequestsTable from "@/components/table-requests";
import { ColumnDef } from "@tanstack/react-table";
import { MergeSchedultType } from "@/components/type";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Calendar, Clock, BookOpen, GraduationCap, Monitor } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState, useMemo } from "react";
import { useSchedule } from "@/hooks/use-schedule";
import { InitialIconEmail, InitialIconWithName } from "@/components/initial-icon";
import DetailTicketPatch from "@/components/detail-ticket-patch";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useLocale } from "next-intl";

function EventTypeCell({ category }: { category: string }) {
  if (!category) return null;
  const lower = category.toLowerCase();

  let icon = <BookOpen className="w-3.5 h-3.5" />;
  let color = "bg-blue-50 text-blue-700 border-blue-100";

  if (lower === "praktikum") {
    icon = <Monitor className="w-3.5 h-3.5" />;
    color = "bg-emerald-50 text-emerald-700 border-emerald-100";
  } else if (lower === "skripsi") {
    icon = <GraduationCap className="w-3.5 h-3.5" />;
    color = "bg-purple-50 text-purple-700 border-purple-100";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${color}`}>
      {icon}
      <span className="capitalize">{category}</span>
    </div>
  );
}

function StatusCell({ status, t }: { status: string; t: (key: string) => string }) {
  const s = status.toLowerCase();
  let style = "bg-slate-100 text-slate-600 border-slate-200"; // Default/Pending

  if (s === "accepted") style = "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "rejected") style = "bg-red-50 text-red-700 border-red-200";

  const statusKey = s === "accepted" ? "accepted" : s === "rejected" ? "rejected" : "pending";

  return (
    <Badge variant="outline" className={`font-medium border ${style}`}>
      {t(statusKey)}
    </Badge>
  );
}

export default function YourRequestsPage() {
  const [token, setToken] = useState<string>("");
  const user = useUser();
  const mergedSchedules: MergeSchedultType[] = [];
  const t = useTranslations("requests");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const locale = useLocale();

  useEffect(() => {
    setToken(localStorage.getItem("access_token") || "");
    const userData = localStorage.getItem("user");
    if (userData) user.setUser(JSON.parse(userData));
  }, []);

  const schedules = useSchedule(token, {
    locale,
    translations: {
      unableToLoadSchedules: tErrors("connectionError"),
      connectionError: tErrors("connectionError"),
      unableToLoadRegularSchedules: tErrors("connectionError"),
      unableToLoadYourSchedules: tErrors("connectionError"),
    }
  });
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const role = JSON.parse(userData).role;
    const id = JSON.parse(userData).id;

    if (role === "admin") {
      schedules.handleGetAllRegulerSchedules();
      schedules.handleGetAllTicketSchedules();
    } else {
      schedules.handleScheduleByUserId(id || 0);
    }
  }, [token]);

  const regulerFiltered = schedules.regulerSchedules.filter(
    (schedule, index, self) => index === self.findIndex((s) => s.title === schedule.title),
  );

  schedules
    .handleMergeSchedules(schedules.ticketSchedules, regulerFiltered, user.user?.role === "admin")
    .forEach((item) => mergedSchedules.push(item));

  const tableHeaderAdmin: ColumnDef<MergeSchedultType>[] = useMemo(() => [
    {
      accessorKey: "title",
      header: t("eventTitle"),
      cell: ({ row }) => <div className="font-semibold text-slate-900">{row.original.title}</div>,
    },
    {
      accessorKey: "startDate",
      header: t("dateTime"),
      cell: ({ row }) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {new Date(row.original.startDate).toLocaleDateString()}
          </span>
          <span className="text-slate-500 text-xs flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {new Date(row.original.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
            {new Date(row.original.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      ),
    },
    {
      id: "personInCharge",
      header: t("requester"),
      cell: ({ row }) => <InitialIconWithName title={row.original.user.name} />,
    },
    {
      accessorKey: "kategori",
      header: t("category"),
      cell: ({ row }) => <EventTypeCell category={row.original.kategori} />,
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => <StatusCell status={row.original.status || "Pending"} t={t} />,
    },
    {
      header: t("regular"),
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.isReguler ? (
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
              {tCommon("yes")}
            </span>
          ) : (
            <span className="text-slate-400 text-lg">-</span>
          )}
        </div>
      ),
    },
    {
      header: tCommon("actions"),
      id: "actions",
      cell: ({ row }) => {
        const isPending = (row.original.status || "Pending").toLowerCase() === "pending";

        if (!isPending) return <div className="text-center text-slate-300 text-xs italic">{t("noActions")}</div>;

        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-500 transition-colors focus:outline-none">
                <EllipsisVertical size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-slate-200">
                <DetailTicketPatch
                  startTime={row.original.startDate}
                  endTime={row.original.endDate}
                  date={row.original.startDate}
                  id={row.original.tickets?.[0].id || 0}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], [t, tCommon]);

  const tableHeaderUser: ColumnDef<MergeSchedultType>[] = useMemo(() => [
    {
      accessorKey: "title",
      header: t("eventTitle"),
      cell: ({ row }) => <div className="font-semibold text-slate-900">{row.original.title}</div>,
    },
    {
      accessorKey: "startDate",
      header: t("dateTime"),
      cell: ({ row }) => (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-slate-700">{new Date(row.original.startDate).toLocaleDateString()}</span>
          <span className="text-slate-500 text-xs">
            {new Date(row.original.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
            {new Date(row.original.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: t("description"),
      cell: ({ row }) => (
        <div className="truncate max-w-[200px] text-slate-500" title={row.original.description}>
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: t("category"),
      cell: ({ row }) => <EventTypeCell category={row.original.kategori} />,
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => <StatusCell status={row.original.status || "Pending"} t={t} />,
    },
  ], [t]);

  const header = user.user?.role === "admin" ? tableHeaderAdmin : tableHeaderUser;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {user.user?.role === "admin" ? t("allRequests") : t("myHistory")}
        </h2>
        <p className="text-slate-500 text-sm">
          {user.user?.role === "admin"
            ? t("manageDescription")
            : t("trackDescription")}
        </p>
      </div>

      <RequestsTable columns={header} data={mergedSchedules} />
    </div>
  );
}
