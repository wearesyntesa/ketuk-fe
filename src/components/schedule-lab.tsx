"use client";

import { ColumnDef } from "@tanstack/react-table";
import ScheduleMonth from "./schedule-month";
import ScheduleWeek from "./schedule-week";
import { MergeSchedultType } from "./type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ScheduleList from "./schedule-list";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { InitialIconWithName } from "./initial-icon";
import { useTranslations, useLocale } from "next-intl";

export default function ScheduleLab({ mergedSchedules }: { mergedSchedules: MergeSchedultType[] }) {
  const [scheduleType, setScheduleType] = useState("week");
  const t = useTranslations("schedule");
  const locale = useLocale();

  const tableHeader: ColumnDef<MergeSchedultType>[] = [
    {
      accessorKey: "title",
      header: t("titleEvent"),
      cell: ({ row }) => <span className="font-semibold text-slate-900">{row.original.title}</span>,
    },
    {
      accessorKey: "date",
      header: t("date"),
      cell: ({ row }) => (
        <span className="text-slate-600 font-medium tabular-nums">
          {new Date(row.original.date).toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      accessorKey: "user",
      header: t("contact"),
      cell: ({ row }) => (
        <div className="text-slate-700">
          <InitialIconWithName title={row.original.user.email} />
        </div>
      ),
    },
    {
      accessorKey: "kategori",
      header: t("category"),
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
          {row.original.kategori}
        </span>
      ),
    },
    {
      accessorKey: "startDate",
      header: t("startTime"),
      cell: ({ row }) => {
        return (
          <span className="font-mono text-slate-500 text-sm tabular-nums">
            {new Date(row.original.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: t("endTime"),
      cell: ({ row }) => {
        return (
          <span className="font-mono text-slate-500 text-sm tabular-nums">
            {new Date(row.original.endDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
  ];

  const handleScheduleTypeChange = (value: string) => {
    setScheduleType(value);
  };

  const getScheduleTitle = () => {
    switch (scheduleType) {
      case "week":
        return t("thisWeekSchedule");
      case "month":
        return t("thisMonthSchedule");
      default:
        return t("thisListSchedule");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {getScheduleTitle()}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{t("manageAndView")}</p>
        </div>

        <div className="flex justify-end gap-3 w-full md:w-auto">
          <Select onValueChange={handleScheduleTypeChange} defaultValue="week">
            <SelectTrigger className="w-[160px] bg-white/60 border-slate-200 text-slate-700 focus:ring-blue-500/20 backdrop-blur-md shadow-sm">
              <SelectValue placeholder={t("scheduleType")} />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-slate-200 text-slate-700 shadow-xl">
              <SelectItem value="week">{t("week")}</SelectItem>
              <SelectItem value="month">{t("month")}</SelectItem>
              <SelectItem value="list">{t("list")}</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/app/requests">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-all duration-300">
              {t("requestSchedule")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {scheduleType === "week" && <ScheduleWeek data={mergedSchedules} />}
        {scheduleType === "month" && <ScheduleMonth data={mergedSchedules} />}
        {scheduleType === "list" && <ScheduleList columns={tableHeader} data={mergedSchedules} />}
      </div>
    </div>
  );
}
