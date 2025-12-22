"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { CalendarRequestForm, CalendarUnblockForm } from "./date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useTickets } from "@/hooks/use-tickets";
import { MergeSchedultType, ScheduleDataTicket, ScheduleRegulerDataTicket } from "./type";
import { useUser } from "@/hooks/use-user";
import { useReguler } from "@/hooks/use-reguler";
import { useSchedule } from "@/hooks/use-schedule";
import { toast } from "sonner";
import {
  CalendarClock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Layers,
  FileText,
  Type,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 7; i <= 21; i++) {
    const hour = i.toString().padStart(2, "0");
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }
  return slots;
};
const TIME_SLOTS = generateTimeSlots();

function CleanCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={`border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden ${className}`}>
      {children}
    </Card>
  );
}

export function RequestForm({ className, border = true }: { className?: string; border?: boolean }) {
  const t = useTranslations("requests");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  const user = useUser();
  const tickets = useTickets();
  const [token, setToken] = useState("");
  const schedules = useSchedule(token, {
    locale,
    translations: {
      unableToLoadSchedules: tErrors("connectionError"),
      connectionError: tErrors("connectionError"),
      unableToLoadRegularSchedules: tErrors("connectionError"),
      unableToLoadYourSchedules: tErrors("connectionError"),
    }
  });
  const mergedSchedules: MergeSchedultType[] = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      schedules.handleGetAllRegulerSchedules();
      schedules.handleGetAllTicketSchedules();
    }
  }, [token]);

  schedules
    .handleGetAllAcceptedSchedules(schedules.ticketSchedules, schedules.regulerSchedules)
    .forEach((item) => mergedSchedules.push(item));

  const [form, setForm] = useState({
    eventName: "",
    startTime: "",
    endTime: "",
    eventType: "",
    lecturer: "",
    description: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleStartTimeChange = (val: string) => {
    if (!date) {
      toast.error(t("selectDateFirst"));
      return;
    }
    const isToday = DateTime.fromJSDate(date).hasSame(DateTime.now(), 'day');
    const now = DateTime.now().toFormat('HH:mm');
    if (isToday && val < now) {
      toast.error(t("startTimeCannotBePast"));
      return;
    }

    if (form.endTime && val >= form.endTime) {
      toast.error(t("startTimeMustBeEarlier"));
      setForm({ ...form, startTime: "" });
    } else {
      setForm({ ...form, startTime: val });
    }
  };

  const handleEndTimeChange = (val: string) => {
    if (!date) {
      toast.error(t("selectDateFirst"));
      return;
    }
    if (form.startTime && val <= form.startTime) {
      toast.error(t("endTimeMustBeLater"));
      setForm({ ...form, endTime: "" });
    } else {
      setForm({ ...form, endTime: val });
    }
  };

  const handleChangeDate = (d: Date | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d && d >= today) {
      setDate(d);
    } else {
      setDate(undefined);
      setForm({ ...form, startTime: "", endTime: "" });
      if (d) toast.error(t("cannotSelectPastDates"));
    }
  };

  const postTicket = async () => {
    setLoading(true);
    // Safe date parsing with luxon
    let startDate = new Date();
    let endDate = new Date();
    
    if (date) {
      const [hours, minutes] = form.startTime.split(':').map(Number);
      const [endHours, endMinutes] = form.endTime.split(':').map(Number);
      
      startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
      endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHours, endMinutes);
    }

    const ticketData: ScheduleDataTicket = {
      description: form.description,
      title: form.eventName,
      userId: user.user?.id || 0,
      startDate,
      endDate,
      category: form.eventType,
    };

    if (mergedSchedules.length > 0) {
      const hasConflict = mergedSchedules.some((schedule) => {
        const scheduleStart = new Date(schedule.startDate);
        const scheduleEnd = new Date(schedule.endDate);
        
        return (
          ticketData.startDate.getDate() === scheduleStart.getDate() &&
          ticketData.startDate.getMonth() === scheduleStart.getMonth() &&
          ticketData.startDate.getFullYear() === scheduleStart.getFullYear() &&
          ((ticketData.startDate >= scheduleStart && ticketData.startDate < scheduleEnd) ||
           (ticketData.endDate > scheduleStart && ticketData.endDate <= scheduleEnd) ||
           (ticketData.startDate <= scheduleStart && ticketData.endDate >= scheduleEnd))
        );
      });
      if (hasConflict) {
        toast.error(t("scheduleConflict"), {
          description: t("timeSlotBooked"),
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        });
        setLoading(false);
        return;
      }
    }
    
    try {
      await tickets.handlePostTicket(ticketData, token);
      // Note: handlePostTicket already shows success toast and redirects
    } catch (error) {
      // Error toast is already shown by handlePostTicket
      console.error("Failed to submit ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CleanCard className={className}>
        <CardContent className="flex flex-col items-center justify-center py-32 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">{t("processingRequest")}</h3>
        </CardContent>
      </CleanCard>
    );
  }

  return (
    <CleanCard className={className}>
      <CardHeader className="border-b border-slate-100 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CalendarClock className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">{t("newReservation")}</CardTitle>
            <CardDescription className="text-slate-500 mt-0.5">
              {t("newReservationDescription")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postTicket();
          }}
          className="flex flex-col gap-8"
        >
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-slate-700 font-semibold">{t("eventName")}</Label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder={t("eventNamePlaceholder")}
                  value={form.eventName}
                  onChange={(e) => setForm({ ...form, eventName: e.target.value })}
                  className="h-11 pl-10 bg-white border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label className="text-slate-700 font-semibold">{t("category")}</Label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                  <Select onValueChange={(val) => setForm({ ...form, eventType: val })}>
                    <SelectTrigger className="h-11 pl-10 bg-white border-slate-200 focus:ring-emerald-500/20">
                      <SelectValue placeholder={t("selectType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Praktikum">{t("practicum")}</SelectItem>
                      <SelectItem value="Kelas">{t("class")}</SelectItem>
                      <SelectItem value="Skripsi">{t("thesis")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-slate-700 font-semibold">{t("lecturer")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder={t("lecturerPlaceholder")}
                    value={form.lecturer}
                    onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
                    className="h-11 pl-10 bg-white border-slate-200 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
            <div className="grid gap-2 w-full">
              <Label className="text-slate-500 text-xs font-bold uppercase tracking-wider pl-1">{t("date")}</Label>
              <div className="w-full">
                <CalendarRequestForm label={false} valDateState={date} onChange={handleChangeDate} />
              </div>
            </div>

            <div className="grid gap-2 w-full">
              <Label className="text-slate-500 text-xs font-bold uppercase tracking-wider pl-1">{t("duration")}</Label>
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1 min-w-0">
                  <Select value={form.startTime} onValueChange={handleStartTimeChange}>
                    <SelectTrigger className="h-10 w-full bg-white border-slate-200 focus:ring-emerald-500/20">
                      <SelectValue placeholder={t("start")} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-center text-slate-400 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="relative flex-1 min-w-0">
                  <Select value={form.endTime} onValueChange={handleEndTimeChange}>
                    <SelectTrigger className="h-10 w-full bg-white border-slate-200 focus:ring-emerald-500/20">
                      <SelectValue placeholder={t("end")} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-700 font-semibold">{t("description")}</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Textarea
                placeholder={t("descriptionPlaceholder")}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-[100px] pl-10 bg-white border-slate-200 focus:border-emerald-500 resize-none pt-2.5"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <Button
              type="submit"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg px-8 rounded-xl"
            >
              {t("submitRequest")}
            </Button>
          </div>
        </form>
      </CardContent>
    </CleanCard>
  );
}

export function RequestRegulerForm({ className, border = true }: { className?: string; border?: boolean }) {
  const t = useTranslations("requests");
  const user = useUser();
  const [token, setToken] = useState("");
  const reguler = useReguler(token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("access_token") || "");
  }, []);

  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

	const handleSubmit = async () => {
		// Form validation
		if (!eventName.trim()) {
			toast.error(t("eventNameRequired"));
			return;
		}
		if (!date) {
			toast.error(t("dateRequired"));
			return;
		}
		if (!startTime || !endTime) {
			toast.error(t("timeRequired"));
			return;
		}
		if (!user.user?.id) {
			toast.error(t("userNotAuthenticated"));
			return;
		}
		if (startTime >= endTime) {
			toast.error(t("endTimeMustBeLater"));
			return;
		}

    setIsSubmitting(true);

    try {
      // Build dates inside handleSubmit to ensure we have current state values
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHours, startMinutes);
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHours, endMinutes);

      // Build 16 weekly requests
      const arrRequest = Array.from({ length: 16 }, (_, i) => ({
        title: eventName,
        userId: user.user!.id,
        startDate: new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(endDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
      }));

      let successCount = 0;
      let failCount = 0;

      for (const req of arrRequest) {
        const result = await reguler.handlePostReguler(req);
        if (result) {
          successCount++;
        } else {
          failCount++;
        }
      }

		if (failCount === 0) {
			toast.success(t("semesterScheduleCreated"));
			// Navigate after all requests complete successfully
			window.location.href = '/app/your-requests';
		} else if (successCount > 0) {
			toast.warning(`${t("partialSuccess")}: ${successCount} ${t("created")}, ${failCount} ${t("failed")}`);
		} else {
			toast.error(t("failedToCreateSchedules"));
		}
	} catch (error) {
		console.error("Error creating schedules:", error);
		toast.error(t("errorCreatingSchedules"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CleanCard className={`border-emerald-100 bg-emerald-50/10 ${className}`}>
      <CardHeader className="border-b border-emerald-100/50 px-8 py-6 bg-emerald-50/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">{t("recurringSchedule")}</CardTitle>
            <CardDescription className="text-slate-600 mt-0.5">
              {t("recurringScheduleDescription")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-8"
        >
          <div className="grid gap-2">
            <Label className="text-slate-700 font-semibold">{t("eventName")}</Label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={t("regularClassPlaceholder")}
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="h-11 pl-10 bg-white border-slate-200 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/60 p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
              <div className="grid gap-2 w-full">
                <Label className="text-slate-500 text-xs font-bold uppercase tracking-wider pl-1">{t("startDate")}</Label>
                <div className="w-full">
                  <CalendarUnblockForm label={false} setDateState={setDate} valDateState={date} />
                </div>
              </div>

              <div className="grid gap-2 w-full">
                <Label className="text-slate-500 text-xs font-bold uppercase tracking-wider pl-1">{t("weeklyTime")}</Label>
                <div className="flex w-full items-center gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger className="h-10 w-full bg-white border-slate-200">
                        <SelectValue placeholder={t("start")} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-center text-slate-400 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="relative flex-1 min-w-0">
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger className="h-10 w-full bg-white border-slate-200">
                        <SelectValue placeholder={t("end")} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-emerald-100/50">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg px-8 rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("creatingSchedules")}
                </>
              ) : (
                t("createWeeklySchedule")
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </CleanCard>
  );
}
