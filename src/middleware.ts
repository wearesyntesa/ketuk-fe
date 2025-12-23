import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = ["/auth/login", "/auth/register", "/auth/google/callback", "/", "/form"];

// Paths that require authentication
// const protectedPaths = ["/app"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if path is public
	const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

	// Check if path is protected
	// const isProtectedPath = protectedPaths.some((path) =>
	// 	pathname.startsWith(path)
	// );

	// Allow public paths
	if (isPublicPath) {
		return NextResponse.next();
	}

	// For protected paths, we can't check localStorage here (server-side)
	// So we'll let the client-side handle auth check
	// This middleware just prevents infinite loops

	// Allow all requests to pass through
	// Auth check will be done client-side in layout or page
	return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (images, etc)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
	],
};
