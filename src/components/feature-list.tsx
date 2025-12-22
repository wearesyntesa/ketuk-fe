"use client";

import { CalendarClock, PencilRuler, ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";

const featureConfig = [
  {
    titleKey: "requestSchedule",
    descKey: "requestScheduleDesc",
    icon: CalendarClock,
    background: "bg-gradient-to-b from-blue-500/10 to-blue-500/5",
    highlight: "bg-blue-500/10",
    component: ChildRequestCard,
  },
  {
    titleKey: "manageInventory",
    descKey: "manageInventoryDesc",
    icon: PencilRuler,
    background: "bg-gradient-to-b from-fuchsia-500/10 to-fuchsia-500/5",
    highlight: "bg-fuchsia-500/10",
    component: ChildManageCard,
  },
  {
    titleKey: "historyLogs",
    descKey: "historyLogsDesc",
    icon: ScrollText,
    background: "bg-gradient-to-b from-emerald-500/10 to-emerald-500/5",
    highlight: "bg-emerald-500/10",
    component: ChildHistoryCard,
  },
];

export default function FeatureList() {
  const t = useTranslations("features");

  const features = featureConfig.map((feature) => ({
    ...feature,
    title: t(feature.titleKey),
    description: t(feature.descKey),
  }));
  return (
    <div className="flex md:flex-row flex-col gap-6 lg:gap-10 w-full justify-center items-center relative mt-20 perspective-1000">
      {features.map((feature, id) => (
        <div
          key={id}
          className={`
            relative group transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            w-full max-w-[320px] md:w-auto
            ${
              id === 0
                ? "md:-rotate-3 md:translate-y-6"
                : id === 1
                  ? "md:translate-y-0 z-10"
                  : "md:rotate-3 md:translate-y-6"
            }
            hover:!rotate-0 hover:!translate-y-0 hover:z-50 hover:scale-105
          `}
        >
          <div className="h-full border border-slate-100 rounded-3xl shadow-sm group-hover:shadow-2xl group-hover:shadow-slate-200/50 transition-all duration-500 bg-white overflow-hidden flex flex-col">
            <div
              className={`h-64 w-72 lg:w-80 relative overflow-hidden ${feature.background} flex items-center justify-center`}
            >
              <div
                className="
                  transition-all duration-500 ease-out
                  scale-90 group-hover:scale-100
                  md:translate-y-4 group-hover:translate-y-0
                  opacity-90 group-hover:opacity-100
                  drop-shadow-lg group-hover:drop-shadow-2xl
                "
              >
                {feature.component ? <feature.component /> : null}
              </div>
            </div>

            <div className="p-8 bg-white relative z-20 flex-1 flex flex-col border-t border-slate-50">
              <div
                className={`w-10 h-10 rounded-xl ${feature.highlight} flex items-center justify-center mb-4 text-slate-700`}
              >
                <feature.icon className="w-5 h-5 opacity-70" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChildRequestCard() {
  return (
    <div className="w-64 bg-white p-4 rounded-xl shadow-sm border border-slate-100 select-none">
      <div className="mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 mb-3 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-blue-500/20" />
        </div>
        <div className="h-4 w-32 bg-slate-900/10 rounded-md mb-2" />
        <div className="h-3 w-48 bg-slate-900/5 rounded-md" />
      </div>
      <div className="space-y-3">
        <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg" />
        <div className="flex gap-2">
          <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg" />
          <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg" />
        </div>
        <div className="h-8 w-24 bg-blue-600 rounded-lg ml-auto mt-2 opacity-80" />
      </div>
    </div>
  );
}

export function ChildManageCard() {
  return (
    <div className="w-64 bg-white p-5 rounded-xl shadow-sm border border-slate-100 select-none">
      <div className="flex justify-between items-center mb-6">
        <div className="h-4 w-20 bg-slate-900/10 rounded-md" />
        <div className="h-6 w-16 bg-fuchsia-50 rounded-full" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-slate-100" />
              <div className="h-3 w-16 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-8 bg-green-100 rounded text-[10px] flex items-center justify-center text-green-600 font-medium">
              {90 - i * 12}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChildHistoryCard() {
  return (
    <div className="w-64 bg-white p-5 rounded-xl shadow-sm border border-slate-100 select-none">
      <div className="mb-5">
        <div className="h-4 w-24 bg-slate-900/10 rounded-md" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 shrink-0" />
            <div className="space-y-1.5 w-full">
              <div className="h-3 w-3/4 bg-slate-200 rounded" />
              <div className="h-2 w-1/2 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
