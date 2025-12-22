"use client";

import { RequestForm, RequestRegulerForm } from "@/components/request-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function RequestsPage() {
  const [isReguler, setIsRegular] = useState(false);
  const user = useUser();
  const t = useTranslations("requests");

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t("requestSchedule")}</h2>
          <p className="text-slate-500 text-sm">{t("bookLabSlot")}</p>
        </div>

        {user.user?.role === "admin" && (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Label
              htmlFor="mode-toggle"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 cursor-pointer"
            >
              {t("regularMode")}
            </Label>
            <Switch
              id="mode-toggle"
              checked={isReguler}
              onCheckedChange={setIsRegular}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        )}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {user.user?.role === "admin" && isReguler ? <RequestRegulerForm /> : <RequestForm />}
      </div>
    </div>
  );
}
