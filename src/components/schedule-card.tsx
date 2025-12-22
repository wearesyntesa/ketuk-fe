"use client";

import { InitialIcon } from "./initial-icon";
import { MergeSchedultType } from "./type";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CalendarClock, User, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ScheduleCard({ data, day, id }: { data: MergeSchedultType[]; day: string; id: number }) {
  const t = useTranslations("scheduleCard");
  const tSchedule = useTranslations("schedule");
  const date = new Date().getDate();

  const dayEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === date + id;
  });

  // Get the translated day name
  const dayLabel = tSchedule(day as "monday" | "tuesday" | "wednesday" | "thursday" | "friday");

  return (
    <div className="flex flex-col gap-3">
      {dayEvents.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
          <p className="text-sm font-medium text-slate-400 italic">{t("noEventsOn")} {dayLabel}</p>
        </div>
      ) : (
        dayEvents.map((event, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="group relative flex cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200/60 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
                <div className="flex items-start gap-4">
                  {/* Icon Container with Glass effect */}
                  <div className="shrink-0 rounded-xl bg-blue-50/50 p-2 text-blue-600">{InitialIcon(event.title)}</div>

                  <div className="flex flex-col items-start w-full min-w-0">
                    <div className="flex w-full justify-between items-start">
                      <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      {/* Optional time indicator if available */}
                      {/* <span className="text-xs font-mono text-slate-400">09:00</span> */}
                    </div>

                    <p className="line-clamp-2 text-sm text-slate-500 mt-1">
                      {event.description || t("noDescription")}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium border-0 px-2.5"
                      >
                        {event.user.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            {/* Dialog Content - Clean & Minimal */}
            <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border-slate-100 shadow-2xl rounded-3xl p-6">
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">{InitialIcon(event.title)}</div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-slate-900">{event.title}</DialogTitle>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">{t("eventDetails")}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80">
                      <User className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">{t("organizer")}</p>
                        <p className="text-sm font-medium text-slate-700">{event.user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80">
                      <Tag className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">{t("category")}</p>
                        <Badge className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                          {event.kategori}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80">
                      <CalendarClock className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">{t("status")}</p>
                        <p className="text-sm font-medium text-slate-700">{event.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-semibold uppercase text-slate-400 mb-2">{t("description")}</p>
                    <DialogDescription className="text-slate-600 leading-relaxed text-sm">
                      {event.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))
      )}
    </div>
  );
}
