"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

function LoadingState() {
	const t = useTranslations("auth");
	
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-4 text-center">
				<div className="flex justify-center">
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
				</div>
				<h2 className="text-xl font-semibold">{t("completingLogin")}</h2>
				<p className="text-muted-foreground text-sm">
					{t("authenticatingAccount")}
				</p>
			</div>
		</div>
	);
}

function GoogleCallbackInner() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [error, setError] = useState("");
	const t = useTranslations("auth");

	useEffect(() => {
		const handleCallback = async () => {
			// Get code and state from URL
			const code = searchParams.get("code");
			const state = searchParams.get("state");

			if (!code) {
				setError(t("noAuthorizationCode"));
				setTimeout(() => {
					window.location.href = "/auth/login?error=no_code";
				}, 2000);
				return;
			}

			try {
				// Send code to backend callback endpoint
				const response = await fetch(
					`${API_URL}/api/auth/v1/google/callback?code=${encodeURIComponent(
						code
					)}&state=${encodeURIComponent(state || "")}`
				);

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

					// Redirect to dashboard using window.location to avoid 307
					window.location.href = "/app";
				} else {
					throw new Error(data.error || "Authentication failed");
				}
			} catch (err: string | any) {
				console.error("OAuth callback error:", err);
				setError(err.message || "Failed to authenticate");
				setTimeout(() => {
					window.location.href = "/auth/login?error=oauth_failed";
				}, 2000);
			}
		};

		handleCallback();
	}, [searchParams, router]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-6">
			<div className="w-full max-w-sm space-y-4 text-center">
				{error ? (
					<>
						<div className="bg-destructive/10 text-destructive rounded-md p-4">
							<h2 className="text-lg font-semibold mb-2">
								{t("authenticationFailed")}
							</h2>
							<p className="text-sm">{error}</p>
						</div>
						<p className="text-muted-foreground text-sm">
							{t("redirectingToLogin")}
						</p>
					</>
				) : (
					<>
						<div className="flex justify-center">
							<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
						</div>
						<h2 className="text-xl font-semibold">{t("completingLogin")}</h2>
						<p className="text-muted-foreground text-sm">
							{t("authenticatingAccount")}
						</p>
					</>
				)}
			</div>
		</div>
	);
}

export default function GoogleCallbackPage() {
	return (
		<Suspense fallback={<LoadingState />}>
			<GoogleCallbackInner />
		</Suspense>
	);
}
