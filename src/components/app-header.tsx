import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export default function AppHeader({ title }: { title: string }) {
  const tCommon = useTranslations("common");
  
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-white/60">
      <div className="flex w-full items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-2 h-9 w-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-colors" srLabel={tCommon("toggleSidebar")} />

        <Separator orientation="vertical" className="mr-2 h-4 bg-slate-200" />

        <h1 className="text-sm font-semibold tracking-tight text-slate-900 uppercase">{title}</h1>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
