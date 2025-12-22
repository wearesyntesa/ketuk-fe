"use client";

import { Archive, BookCheck, CalendarDays, FlagTriangleRight, Logs, Ticket, UserCog2 } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LucideIcon } from "lucide-react";

interface NavItem {
  titleKey: string;
  url: string;
  icon: LucideIcon;
}

const itemsAdmin: NavItem[] = [
  { titleKey: "overview", url: "/app", icon: CalendarDays },
  { titleKey: "scheduleRequest", url: "/app/requests", icon: BookCheck },
  { titleKey: "allRequests", url: "/app/your-requests", icon: Ticket },
  { titleKey: "inventory", url: "/app/inventory", icon: Archive },
  { titleKey: "userManagement", url: "/app/user-management", icon: UserCog2 },
  { titleKey: "bookingWindows", url: "/app/unblocking", icon: FlagTriangleRight },
  { titleKey: "auditLogs", url: "/app/audit", icon: Logs },
];

const itemsUser: NavItem[] = [
  { titleKey: "overview", url: "/app", icon: CalendarDays },
  { titleKey: "scheduleRequest", url: "/app/requests", icon: BookCheck },
  { titleKey: "myHistory", url: "/app/your-requests", icon: Ticket },
];

export default function NavMain({ role }: { role: string }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const items = role === "admin" ? itemsAdmin : itemsUser;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            const title = t(item.titleKey);

            return (
              <SidebarMenuItem key={item.titleKey}>
                <SidebarMenuButton
                  asChild
                  tooltip={title}
                  className={`
                    h-9 px-3 transition-all duration-200 rounded-lg group
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm ring-1 ring-emerald-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon
                      className={`
                            h-4 w-4 shrink-0 transition-colors
                            ${isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"}
                        `}
                    />
                    <span className="text-sm">{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
