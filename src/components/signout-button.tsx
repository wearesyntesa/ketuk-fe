"use client";

import { Button } from "./ui/button";

export function SignOutButton() {
	const handleSignOut = () => {
		// Clear tokens and user data from localStorage
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		
		// Redirect to login page
		window.location.href = "/auth/login";
	};

	return (
		<Button 
			variant={"destructive"} 
			type="button" 
			className="w-full flex"
			onClick={handleSignOut}
		>
			Sign Out
		</Button>
	);
}