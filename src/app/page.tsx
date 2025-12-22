"use client";

import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";
import { ScheduleMonthLanding } from "@/components/schedule-month";
import FeatureList from "@/components/feature-list";
import ReviewUser from "@/components/review-user"; // Assuming this is the Bento or Marquee version
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";

export default function Home() {
  const user = useUser();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        user.setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const isUserLoggedIn = user.user?.email ? true : false;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      <LandingNav isLogin={isUserLoggedIn} />
      <LandingHero isLogin={isUserLoggedIn} />
      <section className="relative py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base font-semibold text-slate-950 uppercase tracking-wide mb-3">Why do you need it?</h2>
            <p className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Everything you need to run a modern lab.
            </p>
            <p className="text-lg text-slate-500">
              Stop using spreadsheets. Get a suite of tools designed specifically for academic scheduling.
            </p>
          </div>

          <FeatureList />
        </div>
      </section>
      <section className="relative py-24 lg:py-32 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-white to-transparent opacity-100 pointer-events-none" />
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Orchestrate your semester
              </h2>
              <p className="text-lg text-slate-500">
                Reserve lab times, assign team shifts, and monitor equipment availability in a single, real-time view.
              </p>
            </div>

            <ScheduleMonthLanding />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <ReviewUser />
      </section>

      <Footer />
    </main>
  );
}
