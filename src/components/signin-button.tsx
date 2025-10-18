
import { signIn } from "@/app/auth"
import { Button } from "./ui/button"
 
export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/app" })
      }}
    >
      <Button type="submit">Get Started</Button>
    </form>
  )
} 