import { signOut } from "@/app/auth"
import { Button } from "./ui/button";

export function SignOutButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
			className="w-full">
			<Button variant={"destructive"} type="submit" className="w-full flex">
				Sign Out
			</Button>
		</form>
	);
}