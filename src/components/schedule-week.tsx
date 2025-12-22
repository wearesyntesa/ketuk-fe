"use client";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import ScheduleCard from "./schedule-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MergeSchedultType } from "./type";
import { CalendarDays } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function ScheduleWeek({ data }: { data: MergeSchedultType[] }) {
  const t = useTranslations("schedule");
  const locale = useLocale();
  
  const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;
  const baseDays = dayKeys.map((key) => ({ key, label: t(key) }));
  const todayDay = new Date().getDay();

  const startIndex = todayDay === 0 || todayDay === 6 ? 0 : todayDay - 1;
  const days = baseDays.slice(startIndex).concat(baseDays.slice(0, startIndex));

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue={days[0].key} className="flex flex-col lg:flex-row gap-6 w-full">
        <TabsList className="flex lg:flex-col flex-row h-auto w-full lg:w-72 gap-3 bg-transparent p-0 justify-start">
          {days.map((day, id) => {
            const now = new Date();
            const currWeekday = now.getDay() === 0 ? 7 : now.getDay();
            const targetWeekday = startIndex + 1;
            const firstDate = new Date(now);
            firstDate.setDate(now.getDate() + (targetWeekday - currWeekday));
            const dayDate = new Date(firstDate);
            dayDate.setDate(firstDate.getDate() + id);

            const isToday = dayDate.getDate() === new Date().getDate();

            return (
              <TabsTrigger
                key={id}
                value={day.key}
                className={`
                  relative flex w-full flex-col items-start justify-center gap-1.5 rounded-2xl border p-4 text-left transition-all duration-200
                  data-[state=active]:bg-white data-[state=active]:border-emerald-200 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-emerald-100
                  data-[state=inactive]:bg-white/40 data-[state=inactive]:border-transparent data-[state=inactive]:hover:bg-white/80
                `}
              >
                <div className="flex w-full items-center justify-between">
                  <span className={`text-sm font-bold ${isToday ? "text-emerald-700" : "text-slate-700"}`}>{day.label}</span>
                  {isToday && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  )}
                </div>

                <span className={`text-xs font-medium ${isToday ? "text-emerald-600/80" : "text-slate-400"}`}>
                  {dayDate.toLocaleString(locale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="flex-1 w-full">
          {days.map((day, id) => (
            <TabsContent
              value={day.key}
              key={id}
              className="mt-0 w-full focus-visible:ring-0 focus-visible:outline-none animate-in fade-in slide-in-from-left-4 duration-300"
            >
              <ScrollArea className="h-[500px] w-full rounded-2xl">
                <div className="pb-4 pr-4">
                  <ScheduleCard data={data} day={day.key} id={id} />
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
