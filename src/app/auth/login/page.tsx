"use client";

import { LoginForm } from "@/components/login-form";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
	const route = useRouter();
	const [session, setSession] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (token) {
			setSession(true);
		}
	}, []);

	if (session) {
		route.push("/app");
		return;
	}

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="absolute top-4 right-4">
				<LanguageSwitcher />
			</div>
			<div className="w-full max-w-sm md:max-w-3xl">
				<LoginForm />
			</div>
		</div>
	);
}
