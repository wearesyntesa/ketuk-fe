"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChevronLeft, ChevronRight, CalendarClock, MapPin, User, AlignLeft } from "lucide-react";
import { MergeSchedultType } from "./type";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shadows_Into_Light, Nothing_You_Could_Do } from "next/font/google";
import { useTranslations } from "next-intl";

const shadowIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shadow-into-light",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nothing-you-could-do",
});

export default function ScheduleMonth({ data }: { data: MergeSchedultType[] }) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const t = useTranslations("schedule");

  const events = data.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  const nextMonth = () => {
    setDisplayDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const prevMonth = () => {
    setDisplayDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
  const baseDays = dayKeys.map(key => t(key).substring(0, 3));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {displayDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="h-9 w-9 bg-white/60 hover:bg-white border-slate-200 text-slate-600 rounded-full shadow-sm backdrop-blur-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="h-9 w-9 bg-white/60 hover:bg-white border-slate-200 text-slate-600 rounded-full shadow-sm backdrop-blur-md"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/60 bg-white/40 backdrop-blur-xl p-4 shadow-sm">
        <div className="grid grid-cols-7 mb-2 border-b border-slate-200/50 pb-2">
          {baseDays.map((day, index) => (
            <div key={index} className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 py-2">
              <span className="md:inline hidden">{t(dayKeys[index])}</span>
              <span className="md:hidden inline">{day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {(() => {
            const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const totalCells = firstDayIndex + daysInMonth;

            return Array.from({ length: totalCells }).map((_, i) => {
              if (i < firstDayIndex || i >= firstDayIndex + daysInMonth) {
                return <div key={`empty-${i}`} className="min-h-[100px]" />;
              }

              const dayNum = i - firstDayIndex + 1;
              const eventsForDay = events.filter((e) => new Date(e.date).getDate() === dayNum);
              const isToday =
                new Date().getDate() === dayNum &&
                new Date().getMonth() === currentMonth &&
                new Date().getFullYear() === currentYear;

              return (
                <Dialog key={`day-${dayNum}`}>
                  <DialogTrigger asChild>
                    <div
                      className={`
                        group min-h-[120px] p-2 rounded-xl border transition-all duration-200 flex flex-col items-start gap-1 cursor-pointer
                        ${
                          isToday
                            ? "bg-emerald-50/50 border-emerald-200"
                            : "bg-white/40 border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-md"
                        }
                      `}
                    >
                      <div
                        className={`
                          text-sm font-semibold h-7 w-7 flex items-center justify-center rounded-full mb-1
                          ${isToday ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "text-slate-500 group-hover:text-slate-900"}
                        `}
                      >
                        {dayNum}
                      </div>

                      <div className="w-full flex flex-col gap-1">
                        {eventsForDay.slice(0, 3).map((ev, id) => (
                          <div
                            key={id}
                            className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-100 shadow-sm w-full"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-[10px] font-medium text-slate-600 truncate">{ev.title}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex md:hidden gap-1 flex-wrap content-start">
                        {eventsForDay.map((_, idx) => (
                          <div key={idx} className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        ))}
                      </div>

                      {eventsForDay.length > 3 && (
                        <div className="hidden md:block text-[10px] text-slate-400 font-medium px-1">
                          +{eventsForDay.length - 3} {t("more")}
                        </div>
                      )}
                    </div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border-slate-100 shadow-2xl rounded-3xl p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                        {displayDate.toLocaleString("default", { month: "long" })} {dayNum}, {currentYear}
                      </DialogTitle>

                      <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                        {eventsForDay.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                            <CalendarClock className="w-10 h-10 mb-2 opacity-50" />
                            <p className="text-sm">{t("noEventsScheduled")}</p>
                          </div>
                        ) : (
                          eventsForDay.map((event, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900">{event.title}</h3>
                                <Badge variant="outline" className="bg-white text-xs font-normal">
                                  {event.kategori}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <CalendarClock className="w-3.5 h-3.5" />
                                  <span>
                                    {new Date(event.startDate).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    -
                                    {new Date(event.endDate).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <User className="w-3.5 h-3.5" />
                                  <span>{event.user.name}</span>
                                </div>
                                {event.description && (
                                  <div className="flex items-start gap-2 text-xs text-slate-500 mt-2 border-t border-slate-200/50 pt-2">
                                    <AlignLeft className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                    <p>{event.description}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

export function ScheduleMonthLanding() {
  const displayDate = new Date();
  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const baseDays = ["S", "M", "T", "W", "T", "F", "S"];
  const t = useTranslations("landing");

  return (
    <div className="w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-[32px] shadow-xl relative overflow-hidden">
      <div className="hidden md:block absolute -top-4 -left-4 z-20 rotate-[-8deg] w-64 bg-[#fef3c7] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-sm border-t-[12px] border-black/5">
        <h3 className={`${shadowIntoLight.className} text-3xl font-bold text-amber-900/80 mb-2`}>{t("todaysFocus")}</h3>
        <ul className="list-disc list-inside text-lg text-amber-900/70 font-medium leading-relaxed">
          <li>{t("stickyNote1Item1")}</li>
          <li>{t("stickyNote1Item2")}</li>
        </ul>
      </div>

      <div className="hidden md:block absolute -bottom-6 -right-6 z-20 rotate-[6deg] w-64 bg-[#dbeafe] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-sm border-t-[12px] border-black/5">
        <h3 className={`${nothingYouCouldDo.className} text-3xl font-bold text-emerald-900/80 mb-2`}>{t("comingUp")}</h3>
        <ul className="list-disc list-inside text-lg text-emerald-900/70 font-medium leading-relaxed">
          <li>{t("stickyNote2Item1")}</li>
          <li>{t("stickyNote2Item2")}</li>
        </ul>
      </div>

      <div className="max-w-2xl mx-auto opacity-80 pointer-events-none">
        <div className="text-center mb-6">
          <span className="text-lg font-bold text-slate-400 tracking-widest uppercase">
            {displayDate.toLocaleString("default", { month: "long" })}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {baseDays.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-slate-300">
              {day}
            </div>
          ))}

          {(() => {
            const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const totalCells = firstDayIndex + daysInMonth;

            return Array.from({ length: totalCells }).map((_, i) => {
              if (i < firstDayIndex || i >= firstDayIndex + daysInMonth) {
                return <div key={`empty-${i}`} className="min-h-[60px]" />;
              }
              const dayNum = i - firstDayIndex + 1;
              const isToday = dayNum === new Date().getDate();

              return (
                <div key={`day-${dayNum}`} className="flex justify-center">
                  <div
                    className={`
                    h-12 w-12 rounded-full flex items-center justify-center text-sm font-semibold border
                    ${
                      isToday
                        ? "bg-white border-emerald-200 text-emerald-600 shadow-lg"
                        : "bg-slate-50/50 border-slate-100 text-slate-400"
                    }
                  `}
                  >
                    {dayNum}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
