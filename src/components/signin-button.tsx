import Link from "next/link";
import { Button } from "./ui/button";

export function SignInButton() {
	return (
		<Link href="/auth/login">
			<Button type="submit">Get Started</Button>
		</Link>
	);
}
