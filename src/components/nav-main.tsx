"use client";

import { Archive, BookCheck, CalendarDays, FlagTriangleRight, Logs, Ticket, UserCog2 } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarItem } from "./type";

const itemsAdmin: SideBarItem[] = [
  { title: "Overview", url: "/app", icon: CalendarDays },
  { title: "Schedule Request", url: "/app/requests", icon: BookCheck },
  { title: "All Requests", url: "/app/your-requests", icon: Ticket },
  { title: "Inventory", url: "/app/inventory", icon: Archive },
  { title: "User Management", url: "/app/user-management", icon: UserCog2 },
  { title: "Semester Periods", url: "/app/unblocking", icon: FlagTriangleRight },
  { title: "Audit Logs", url: "/app/audit", icon: Logs },
];

const itemsUser: SideBarItem[] = [
  { title: "Overview", url: "/app", icon: CalendarDays },
  { title: "Schedule Request", url: "/app/requests", icon: BookCheck },
  { title: "My History", url: "/app/your-requests", icon: Ticket },
];

export default function NavMain({ role }: { role: string }) {
  const pathname = usePathname();
  const items = role === "admin" ? itemsAdmin : itemsUser;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
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
                    <span className="text-sm">{item.title}</span>
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
