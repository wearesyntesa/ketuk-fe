"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

function CallbackContent() {
const searchParams = useSearchParams();
const router = useRouter();
const [error, setError] = useState("");

useEffect(() => {
const handleCallback = async () => {
const code = searchParams.get("code");
const state = searchParams.get("state");

if (!code) {
setError("No authorization code received");
setTimeout(() => {
window.location.href = "/auth/login?error=no_code";
}, 2000);
return;
}

try {
const response = await fetch(
`${API_URL}/api/auth/v1/google/callback?code=${encodeURIComponent(
code
)}&state=${encodeURIComponent(state || "")}`
);

const data = await response.json();

if (data.success) {
localStorage.setItem("access_token", data.data.token);
localStorage.setItem("refresh_token", data.data.refresh_token);
localStorage.setItem("user", JSON.stringify({
id: data.data.user.id,
email: data.data.user.email,
name: data.data.user.name,
role: data.data.user.role,
}));

window.location.href = "/app";
} else {
throw new Error(data.error || "Authentication failed");
}
} catch (err) {
console.error("OAuth callback error:", err);
const errorMessage = err instanceof Error ? err.message : "Failed to authenticate";
setError(errorMessage);
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
Authentication Failed
</h2>
<p className="text-sm">{error}</p>
</div>
<p className="text-muted-foreground text-sm">
Redirecting to login page...
</p>
</>
) : (
<>
<div className="flex justify-center">
<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
</div>
<h2 className="text-xl font-semibold">Completing login...</h2>
<p className="text-muted-foreground text-sm">
Please wait while we authenticate your account.
</p>
</>
)}
</div>
</div>
);
}

export default function GoogleCallbackPage() {
return (
<Suspense
fallback={
<div className="flex min-h-screen flex-col items-center justify-center p-6">
<div className="w-full max-w-sm space-y-4 text-center">
<div className="flex justify-center">
<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
</div>
<h2 className="text-xl font-semibold">Loading...</h2>
</div>
</div>
}
>
<CallbackContent />
</Suspense>
);
}
