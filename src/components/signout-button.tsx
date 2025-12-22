"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner"; 
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function SignOutButton() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      toast.success(t("signedOutSuccess"));
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="relative flex w-full cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-red-50 hover:text-red-600 text-slate-600 disabled:opacity-50 disabled:pointer-events-none group"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
      )}
      <span className="font-medium">{t("logout")}</span>
    </button>
  );
}
