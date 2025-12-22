"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MergeSchedultType, PatchTicketStatus, UserType } from "./type";
import { useTickets } from "@/hooks/use-tickets";
import { useSchedule } from "@/hooks/use-schedule";
import { Check, X, AlertCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface DetailItemProps {
  id: number;
  startTime: string;
  endTime: string;
  date: string;
}

interface TicketData {
  id: number;
  idSchedule: number;
  reason: string;
  status: "pending" | "accepted" | "rejected";
  title: string;
  description: string;
  user: UserType;
}

export default function DetailTicketPatch({ id, startTime, endTime, date }: DetailItemProps) {
  const t = useTranslations("tickets");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const locale = useLocale();
  
  const [ticketData, setTicketData] = useState<TicketData>({
    id: 0,
    idSchedule: 0,
    reason: "",
    status: "pending",
    title: "",
    description: "",
    user: { id: 0, name: "", email: "", role: "" },
  });

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
  const mergeAcceptedSchedules: MergeSchedultType[] = [];
  const tickets = useTickets();

  useEffect(() => {
    setToken(localStorage.getItem("access_token") || "");
  }, []);

  useEffect(() => {
    if (token) {
      schedules.handleGetAllRegulerSchedules();
      schedules.handleGetAllTicketSchedules();
    }
  }, [token]);

  schedules
    .handleGetAllAcceptedSchedules(schedules.ticketSchedules, schedules.regulerSchedules)
    .map((item) => mergeAcceptedSchedules.push(item));

  useEffect(() => {
    if (id && token) {
      tickets.handleGetTicketByID(id, token).then((data) => {
        setTicketData({
          id: data.id,
          idSchedule: data.idSchedule,
          reason: data.reason,
          status: data.status,
          title: data.title,
          description: data.description,
          user: data.user,
        });
      });
    }
  }, [id, token]);

  const checkConflict = () => {
    const conflicts = mergeAcceptedSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.date);
      const checkDate = new Date(date);
      return (
        schedule.startDate === startTime &&
        schedule.endDate === endTime &&
        scheduleDate.getFullYear() === checkDate.getFullYear() &&
        scheduleDate.getMonth() === checkDate.getMonth() &&
        scheduleDate.getDate() === checkDate.getDate()
      );
    });
    return conflicts.length > 0;
  };

  const approveTicket = () => {
    const data: PatchTicketStatus = { status: "accepted", reason: ticketData.reason };
    if (token) tickets.handlePatchTicket(data, id, token);
  };

  const rejectTicket = () => {
    const data: PatchTicketStatus = { status: "rejected", reason: ticketData.reason };
    if (token) tickets.handlePatchTicket(data, id, token);
  };

  return (
    <div className="flex flex-col w-full gap-1 p-1">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors">
            <Check className="w-4 h-4" />
            <span>{t("approveRequest")}</span>
          </div>
        </DialogTrigger>
        {!checkConflict() ? (
          <DialogContent className="sm:max-w-md bg-white border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-900">{t("approveRequest")}</DialogTitle>
              <DialogDescription>
                {t("confirmApprovalFor")} <span className="font-semibold text-slate-700">{ticketData.title}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-slate-700 font-medium">{t("eventName")}</Label>
                <Input value={ticketData.title} readOnly className="bg-slate-50 border-slate-200 text-slate-500" />
              </div>
              <div className="grid gap-2">
                <Label className="text-slate-700 font-medium">{t("notesOptional")}</Label>
                <Textarea
                  placeholder={t("addNoteToRequester")}
                  value={ticketData.reason}
                  onChange={(e) => setTicketData({ ...ticketData, reason: e.target.value })}
                  className="bg-white border-slate-200 focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="border-slate-200 text-slate-600">
                  {tCommon("cancel")}
                </Button>
              </DialogClose>
              <Button onClick={approveTicket} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                {t("confirmApproval")}
              </Button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-md bg-white border-red-100">
            <DialogHeader>
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertCircle className="w-6 h-6" />
                <DialogTitle className="text-xl font-bold">{t("conflictDetected")}</DialogTitle>
              </div>
              <DialogDescription className="text-slate-600">
                {t("conflictDescription")}
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-sm text-red-800 font-medium">
              {t("pleaseRejectOrReschedule")}
            </div>

            <div className="grid gap-2 py-4">
              <Label className="text-slate-700 font-medium">{t("rejectionReason")}</Label>
              <Textarea
                value={t("schedulingConflict")}
                readOnly
                className="bg-slate-50 border-slate-200 text-slate-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">{tCommon("cancel")}</Button>
              </DialogClose>
              <Button variant="destructive" onClick={rejectTicket}>
                {t("rejectRequest")}
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-red-50 text-slate-600 hover:text-red-700 transition-colors">
            <X className="w-4 h-4" />
            <span>{t("rejectRequest")}</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">{t("rejectRequest")}</DialogTitle>
            <DialogDescription>
              {t("confirmRejectFor")} <span className="font-semibold text-slate-700">{ticketData.title}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-slate-700 font-medium">{t("reasonForRejection")}</Label>
              <Textarea
                placeholder={t("incompleteInfoPlaceholder")}
                value={ticketData.reason}
                onChange={(e) => setTicketData({ ...ticketData, reason: e.target.value })}
                className="bg-white border-slate-200 focus:border-red-500 min-h-[100px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="border-slate-200 text-slate-600">
                {tCommon("cancel")}
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={rejectTicket}>
              {t("confirmRejection")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
