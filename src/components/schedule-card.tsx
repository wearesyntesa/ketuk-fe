import { ScheduleProps } from "./type";
import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

export default function ScheduleCard({ day, events }: ScheduleProps) {
	return (
		<>
			<div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-96 h-fit mb-6">
				<h2 className="text-xl font-semibold mb-4">{day}</h2>
				<Separator />
				<div className="flex flex-col gap-4">
					{events.map((event, index) => (
						<Dialog key={index}>
							<DialogTrigger asChild>
								<div
									key={index}
									className="flex gap-4 hover:bg-accent px-2 py-4 rounded-lg cursor-pointer items-center">
									{InitialIcon(event.title)}
									<div className="flex flex-col items-start">
										<h3 className="text-lg font-medium text-start">
											{event.title}
										</h3>
										<p className="text-sm text-muted-foreground text-start">
											{event.time}
										</p>
										<p className="text-sm text-start">{event.description}</p>
										{event.status === "Approved" ? (
											<Badge className="mt-2 bg-green-100 text-green-800">
												requested by @{event.pic}
											</Badge>
										) : null}
									</div>
								</div>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-2xl">{event.title}</DialogTitle>
									<DialogDescription>
										{event.time} |{" "}
										<span
											className={`${
												event.status === "Approved"
													? "text-green-500"
													: "text-yellow-500"
											}`}>
											{event.status}
										</span>
									</DialogDescription>
									<DialogDescription>{event.pic}</DialogDescription>
									<DialogDescription>{event.contact}</DialogDescription>
									<Badge>{event.category}</Badge>
									<p>Description : {event.description}</p>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					))}
				</div>
			</div>
		</>
	);
}

function InitialIcon(title: string) {
	const initial = title
		.split(" ")
		.filter((_, index) => index < 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
	const colors = [
		"bg-red-100 text-red-700",
		"bg-green-100 text-green-700",
		"bg-blue-100 text-blue-700",
		"bg-yellow-100 text-yellow-700",
		"bg-purple-100 text-purple-700",
		"bg-pink-100 text-pink-700",
		"bg-indigo-100 text-indigo-700",
		"bg-teal-100 text-teal-700",
		"bg-orange-100 text-orange-700",
	];
	function hashString(str: string) {
		let h = 0;
		for (let i = 0; i < str.length; i++) {
			h = (h << 5) - h + str.charCodeAt(i);
			h |= 0;
		}
		return Math.abs(h);
	}

	const colorClass = colors[hashString(title) % colors.length];
	return (
		<div
			className={`w-12 h-12 px-4 rounded-full flex items-center justify-center font-medium ${colorClass}`}>
			{initial}
		</div>
	);
}
