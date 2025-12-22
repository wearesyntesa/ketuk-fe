"use client";

import { DoorOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import React from "react";
import NavMain from "./nav-main";
import NavFooter from "./nav-footer";
import Link from "next/link";

export function AppSidebar({ role, ...props }: { role: string } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      variant="inset"
      className="border-r border-slate-200 bg-white/80 backdrop-blur-2xl"
      {...props}
    >
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="hover:bg-transparent active:bg-transparent p-0 group">
              <Link href="/app" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-500/30">
                  <DoorOpen className="h-5 w-5" />
                </div>

                <div className="flex flex-col text-left leading-tight">
                  <span className="font-bold text-slate-900 text-[15px]">Ketuk</span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">By Syntesa</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <NavMain role={role} />
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-slate-100/50">
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
