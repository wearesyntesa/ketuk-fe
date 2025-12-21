import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Link href="/auth/login">
      <Button className={cn(className)}>Get Started</Button>
    </Link>
  );
}
