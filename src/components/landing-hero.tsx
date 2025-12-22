"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton } from "./signin-button";
import { Calendar, Box, ShieldCheck, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LandingHero(isLogin: { isLogin: boolean }) {
  const t = useTranslations("landing");
  
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-20 lg:pt-0 border-b border-slate-100">
      <div
        className="absolute inset-0 z-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black, transparent 90%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="max-w-2xl space-y-8 text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-950 leading-[1.05]">
              {t("heroTitle")}{" "}
              <span className="relative inline-block text-slate-950">
                {t("heroTitleHighlight")}
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-emerald-500 opacity-80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
              {t("heroDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center justify-center lg:justify-start w-full">
              {!isLogin.isLogin ? (
                <>
                  <SignInButton className="hidden sm:inline-flex h-12 px-8 rounded-full text-base bg-slate-950 hover:bg-slate-800 text-white shadow-lg transition-all items-center justify-center font-medium" />
                  <Link href="/demo">
                    <Button
                      variant="outline"
                      className="h-12 px-6 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-base font-medium"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" /> {t("watchDemo")}
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/app">
                  <Button
                    size="lg"
                    className="h-12 px-8 rounded-full text-base bg-slate-950 hover:bg-slate-800 text-white shadow-lg transition-all"
                  >
                    {t("goToDashboard")}
                  </Button>
                </Link>
              )}
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 grayscale"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                {t("trustedBy")} <span className="text-slate-900">12 {t("departments")}</span>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
            <style jsx>{`
              @keyframes hover-card {
                0%,
                100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              .animate-hover {
                animation: hover-card 8s ease-in-out infinite;
              }
            `}</style>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-50" />

            <div className="absolute top-20 left-10 right-10 bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-xl p-6 animate-hover z-20">
              <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">{t("labSchedule")}</h3>
                  <p className="text-sm text-slate-500">{t("demoLabName")}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-md border border-slate-100">
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-12 text-xs font-mono text-slate-400">09:00</div>
                  <div className="flex-1 p-3 bg-blue-50/50 border border-blue-100 rounded-lg group-hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium text-slate-900">{t("demoClassName")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-12 text-xs font-mono text-slate-400">11:00</div>
                  <div className="flex-1 p-3 bg-white border border-slate-100 border-dashed rounded-lg">
                    <span className="text-sm text-slate-400">{t("available")}</span>
                  </div>
                </div>
                <div className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-12 text-xs font-mono text-slate-400">13:00</div>
                  <div className="flex-1 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{t("maintenance")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-64 -left-6 w-56 bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-xl p-4 z-30 animate-hover"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-1.5 bg-orange-50 rounded text-orange-600">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{t("inventory")}</span>
              </div>
              <div className="text-sm font-medium text-slate-900 mb-1">Arduino Uno R3</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-orange-500 w-[20%] h-full" />
              </div>
              <div className="text-xs text-slate-500 text-right">2 {t("itemsLeft")}</div>
            </div>

            <div
              className="absolute top-80 -right-4 w-64 bg-slate-950 text-white shadow-2xl rounded-xl p-4 z-40 animate-hover"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm">
                  MI
                </div>
                <div>
                  <div className="text-sm font-semibold">Muhammad Istiqlal</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {t("adminAccess")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
