"use client";

import { ChevronsUpDown, LogOut, Sparkles, BadgeCheck, CreditCard, Bell } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignOutButton } from "./signout-button";
import { useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export default function NavFooter() {
  const t = useTranslations("users");
  const user = useUser();

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

  if (!user.user) return null;

  const initials = user.user.name
    ? user.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  const roleLabel = user.user.role === "admin" ? t("admin") : t("user");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200 hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-slate-100"
            >
              <Avatar className="h-8 w-8 rounded-lg border border-slate-200 bg-white">
                <AvatarFallback className="rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-900">{user.user.name.split(" ")[0]}</span>
                <span className="truncate text-xs text-slate-500">{user.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/10 p-1.5 mb-2"
            side="top"
            align="start"
            sideOffset={12}
          >
            <div className="flex items-center gap-3 px-2 py-2.5">
              <Avatar className="h-9 w-9 rounded-lg border border-slate-100">
                <AvatarFallback className="rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-slate-900">{user.user.name}</span>
                <span className="truncate text-xs text-slate-500 capitalize">{roleLabel}</span>
              </div>
            </div>

            <DropdownMenuSeparator className="bg-slate-100 my-1" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-3 p-2 rounded-lg text-slate-600 focus:text-slate-900 focus:bg-slate-50 cursor-pointer">
                <BadgeCheck className="h-4 w-4 text-slate-400" />
                <span>{t("account")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 p-2 rounded-lg text-slate-600 focus:text-slate-900 focus:bg-slate-50 cursor-pointer">
                <Bell className="h-4 w-4 text-slate-400" />
                <span>{t("notifications")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100 my-1" />

            <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
              <div className="w-full">
                <SignOutButton />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
