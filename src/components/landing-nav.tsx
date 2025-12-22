"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOutButton } from "./signout-button";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { Button } from "./ui/button";
import { InitialIcon } from "./initial-icon";
import { DoorOpen, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LandingNav(isLogin: { isLogin: boolean }) {
  const t = useTranslations("landing");
  const tUsers = useTranslations("users");
  const user = useUser();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for border/shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        user.setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/0 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 rounded-lg group-hover:bg-slate-100 transition-colors">
              <DoorOpen className="h-7 w-7 text-slate-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-950">Ketuk</span>
          </Link>

          <div className="flex items-center gap-4">
            {!isLogin.isLogin ? (
              <div className="flex items-center gap-2">
                <Link href="/app">
                  <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium">
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/app">
                  <Button className="rounded-full bg-slate-950 text-white hover:bg-slate-800 shadow-md font-medium px-5">
                    {t("getStarted")}
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 bg-white hover:border-slate-300 transition-colors cursor-pointer shadow-sm">
                    <span className="text-xs font-medium text-slate-700 pl-2 hidden sm:block">
                      {user.user?.name || tUsers("account")}
                    </span>
                    <div className="h-8 w-8">{InitialIcon(user.user?.name || "U")}</div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-slate-200 shadow-xl mt-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-900">{user.user?.name}</p>
                      <p className="text-xs leading-none text-slate-500">{user.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 my-2" />

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer rounded-lg focus:bg-slate-50 focus:text-slate-900"
                  >
                    <Link href="/app" className="flex items-center w-full py-2">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
                      <span>{t("dashboard")}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-100 my-2" />

                  <div className="p-1">
                    <SignOutButton />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
