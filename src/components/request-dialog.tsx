import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RequestForm } from "./request-form"

export function RequestDialog() {
    return (
			<Dialog>
				<DialogTrigger asChild>
					<Button className="bg-blue-400">Request Lab +</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] p-0">
					<DialogHeader className="p-4 pb-0">
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<RequestForm border={false} />
				</DialogContent>
			</Dialog>
		);
}
