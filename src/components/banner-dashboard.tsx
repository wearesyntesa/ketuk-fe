"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function BannerDashboard() {
  const t = useTranslations("bannerDashboard");
  const locale = useLocale();
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const user = useUser();
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "night";
  };

  const timeOfDay = getTimeOfDay();

  const themeConfig = {
    morning: {
      orbs: ["bg-blue-500", "bg-cyan-500", "bg-teal-400"],
      icon: "morning.svg",
    },
    afternoon: {
      orbs: ["bg-orange-500", "bg-amber-500", "bg-yellow-400"],
      icon: "afternoon.svg",
    },
    evening: {
      orbs: ["bg-purple-600", "bg-indigo-600", "bg-pink-500"],
      icon: "afternoon.svg",
    },
    night: {
      orbs: ["bg-indigo-800", "bg-blue-800", "bg-slate-800"],
      icon: "night.svg",
    },
  };

  const theme = themeConfig[timeOfDay as keyof typeof themeConfig];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  if (!mounted) return <div className="w-full h-64 bg-muted/20 animate-pulse rounded-[32px]" />;

  return (
    <div className="relative w-full h-64 group perspective-1000">
      <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-slate-900/10">
        <div
          className={`absolute top-[-50%] left-[-20%] w-[80%] h-[150%] rounded-full blur-[80px] opacity-80 animate-blob ${theme.orbs[0]}`}
        />
        <div
          className={`absolute bottom-[-20%] right-[-20%] w-[80%] h-[120%] rounded-full blur-[80px] opacity-80 animate-blob animation-delay-2000 ${theme.orbs[1]}`}
        />
        <div
          className={`absolute top-[20%] right-[30%] w-[50%] h-[80%] rounded-full blur-[60px] opacity-70 animate-blob animation-delay-4000 ${theme.orbs[2]}`}
        />
      </div>

      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full border border-white/10 bg-black/20 backdrop-blur-3xl shadow-2xl rounded-[32px] overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3), transparent 40%)`,
          }}
        />

        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight drop-shadow-sm">
                {t("hello")}, {user.user?.name ? user.user.name.split(" ")[0] : "User"}
              </h1>
              <p className="text-white/80 font-medium text-sm tracking-wide drop-shadow-sm">{t("welcomeBack")}</p>
            </div>

            <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md">
              <Image src={`/${theme.icon}`} alt={timeOfDay} width={40} height={40} className="drop-shadow-lg" />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">{t("today")}</span>
              <span className="text-xl font-medium tracking-tight drop-shadow-sm">
                {date.toLocaleDateString(locale, options)}
              </span>
            </div>

            <div className="text-right">
              <span
                className="text-7xl md:text-8xl font-light tracking-tighter tabular-nums drop-shadow-lg"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {time || "00:00"}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
