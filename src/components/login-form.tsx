"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const t = useTranslations("auth");
	const tErrors = useTranslations("errors");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch(`${API_URL}/api/auth/v1/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (data.success) {
				// Save tokens to localStorage
				localStorage.setItem("access_token", data.data.token);
				localStorage.setItem("refresh_token", data.data.refresh_token);
				localStorage.setItem(
					"user",
					JSON.stringify({
						id: data.data.user.id,
						email: data.data.user.email,
						name: data.data.user.name,
						role: data.data.user.role,
					})
				);

				// Redirect to dashboard
				window.location.href = "/app/";
			} else {
				setError(data.error || tErrors("somethingWentWrong"));
			}
		} catch (err) {
			setError(tErrors("connectionError"));
			console.error("Login error:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		setError("");

		try {
			// Get Google OAuth URL from backend
			const response = await fetch(`${API_URL}/api/auth/v1/google/login`);
			const data = await response.json();

			if (data.success) {
				// Redirect to Google OAuth
				window.location.href = data.data.auth_url;
			} else {
				setError(tErrors("somethingWentWrong"));
			}
		} catch (err) {
			setError(tErrors("connectionError"));
			console.error("Google login error:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2 h-[500px]">
					<form
						className="p-6 md:p-8 flex justify-center items-center"
						onSubmit={handleEmailLogin}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">{t("welcomeBack")}</h1>
								<p className="text-muted-foreground text-balance">
									{t("loginDescription")}
								</p>
							</div>

							{error && (
								<div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
									{error}
								</div>
							)}

							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={handleGoogleLogin}
								disabled={loading}>
								<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
								</svg>
								{loading ? t("loggingIn") : t("signInWithGoogle")}
							</Button>
						</div>
					</form>
					<div className="bg-muted relative hidden md:block">
						<Image
							src="/banner-login.svg"
							alt={t("loginBannerAlt")}
							className="absolute h-full w-full object-cover object-right"
							width={400}
							height={400}
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				{t("termsAgreement")} <a href="#">{t("termsOfService")}</a>{" "}
				{t("and")} <a href="#">{t("privacyPolicy")}</a>.
			</div>
		</div>
	);
}
