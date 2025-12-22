"use client";

import { useMemo, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryChartData, MergeSchedultType } from "./type";
import { useSchedule } from "@/hooks/use-schedule";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface ChartDataPoint {
  date: string;
  rawDate: string;
  requests: number;
}

const COLORS = [
  "#10b981", // Emerald 500
  "#0ea5e9", // Sky 500
  "#84cc16", // Lime 500
  "#14b8a6", // Teal 500
];

export default function DashboardChart({ pieData }: { pieData: CategoryChartData[] }) {
  const [token, setToken] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("dashboard");
  const tErrors = useTranslations("errors");
  const locale = useLocale();

  const schedules = useSchedule(token, {
    locale,
    translations: {
      unableToLoadSchedules: tErrors("connectionError"),
      connectionError: tErrors("connectionError"),
      unableToLoadRegularSchedules: tErrors("connectionError"),
      unableToLoadYourSchedules: tErrors("connectionError"),
    }
  });
  const user = useUser();

  useEffect(() => {
    setIsMounted(true);
    const storedToken = localStorage.getItem("access_token") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      schedules.handleGetAllRegulerSchedules();
      schedules.handleGetAllTicketSchedules();
      user.handleGetAllUser(token);
    }
  }, [token]);

  const { chartData } = useMemo(() => {
    const merged: MergeSchedultType[] = [];
    const rawMerged = schedules.handleMergeSchedules(schedules.ticketSchedules, schedules.regulerSchedules, true);

    if (Array.isArray(rawMerged)) {
      merged.push(...rawMerged);
    }

    const dataMap = new Map<string, number>();
    const baseline = [
      { date: "2025-12-15", val: 10 },
      { date: "2025-12-16", val: 18 },
      { date: "2025-12-17", val: 5 },
    ];

    baseline.forEach((b) => dataMap.set(b.date, b.val));

    merged.forEach((item) => {
      const dateStr = new Date(item.createdAt).toISOString().split("T")[0];
      const current = dataMap.get(dateStr) || 0;
      dataMap.set(dateStr, current + 1);
    });

    const sortedData: ChartDataPoint[] = Array.from(dataMap.entries())
      .map(([date, count]) => ({
        rawDate: date,
        date: new Date(date).toLocaleDateString(locale, { month: "short", day: "numeric" }),
        requests: count,
      }))
      .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

    return {
      chartData: sortedData,
      totalRequests: merged.length,
      totalUsers: user.allUsers ? user.allUsers.length : 0,
    };
  }, [schedules.ticketSchedules, schedules.regulerSchedules, user.allUsers]);

  if (!isMounted)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="animate-spin text-slate-300" />
      </div>
    );

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-white/60 bg-white/60 backdrop-blur-xl shadow-sm rounded-[24px] overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-slate-900">{t("requestVolume")}</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              {t("dailyTrafficDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-6 pr-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                    fontSize={12}
                    tick={{ fill: "#64748b", fontWeight: 500 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                    fontSize={12}
                    tick={{ fill: "#64748b", fontWeight: 500 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                      boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.1)",
                      padding: "8px 12px",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: 600, color: "#0f172a" }}
                    cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
                  />

                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#10b981" // Emerald 500
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRequests)"
                    activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col border border-white/60 bg-white/60 backdrop-blur-xl shadow-sm rounded-[24px] hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold tracking-tight text-slate-900">{t("categories")}</CardTitle>
            <CardDescription className="text-slate-500 font-medium">{t("distributionByType")}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={4}
                    stroke="none"
                    dataKey="totalRequest"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="stroke-white stroke-[3px]"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      color: "#0f172a",
                      boxShadow: "0 4px 20px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: "#0f172a", fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="text-4xl font-bold tracking-tighter text-slate-900 block">
                    {pieData.reduce((acc, curr) => acc + curr.totalRequest, 0)}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{t("total")}</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-4 space-y-3">
              {pieData.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm group cursor-default">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm transition-transform group-hover:scale-125"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-600 font-medium">{entry.category}</span>
                  </div>
                  <span className="font-bold text-slate-900">{entry.totalRequest}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
