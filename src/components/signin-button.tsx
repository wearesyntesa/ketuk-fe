"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const t = useTranslations("landing");

  return (
    <Link href="/auth/login">
      <Button className={cn(className)}>{t("getStarted")}</Button>
    </Link>
  );
}
