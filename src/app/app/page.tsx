"use client";

import ScheduleLab from "@/components/schedule-lab";
import BannerDashboard from "@/components/banner-dashboard";
import DashboardChart from "@/components/dashboard-chart";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { CategoryChartData, MergeSchedultType } from "@/components/type";
import { useSchedule } from "@/hooks/use-schedule";
import { useTranslations, useLocale } from "next-intl";

export default function Dashboard() {
  const [token, setToken] = useState<string>("");
  const user = useUser();
  const mergedSchedules: MergeSchedultType[] = [];
  const pieData: CategoryChartData[] = [];
  const tErrors = useTranslations("errors");
  const locale = useLocale();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token") || "";
    setToken(storedToken);
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        user.setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
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
    const fetchData = async () => {
      if (token) {
        schedules.handleGetAllRegulerSchedules();
        schedules.handleGetAllTicketSchedules();
      }
    };
    fetchData();
  }, [token]);

  if (schedules.ticketSchedules && schedules.regulerSchedules) {
    schedules
      .handleGetAllAcceptedSchedules(schedules.ticketSchedules, schedules.regulerSchedules)
      .map((item) => mergedSchedules.push(item));

    schedules
      .handlePieChartData(schedules.ticketSchedules, schedules.regulerSchedules)
      .map((item) => pieData.push(item));
  }

  return (
    <main className="min-h-screen w-full bg-slate-50/50">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 p-6 md:p-8 lg:p-12">
        <section className="w-full">
          <BannerDashboard />
        </section>
        <section className="w-full">
          <DashboardChart pieData={pieData} />
        </section>
        <section className="w-full space-y-8 border-t border-slate-200/60 pt-10">
          <ScheduleLab mergedSchedules={mergedSchedules} />
        </section>
      </div>
    </main>
  );
}
