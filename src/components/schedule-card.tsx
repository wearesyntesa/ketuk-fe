"use client";

import { InitialIcon } from "./initial-icon";
import { MergeSchedultType } from "./type";
import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export default function ScheduleCard({data, day, id}: {data: MergeSchedultType[], day: string, id: number}) {
	const date = new Date().getDate();

	return (
		<div className="gap-4">
			{(() => {
				const dayEvents = data.filter((event) => {
					const eventDate = new Date(event.date);
					return eventDate.getDate() === date + id;
				});

				if (dayEvents.length === 0) {
					return (
						<p className="text-sm text-muted-foreground text-start">
							No events scheduled for {day}.
						</p>
					);
				}

				return (
					<>
						{dayEvents.map((event, index) => (
							<Dialog key={index}>
								<DialogTrigger asChild>
									<div className="flex gap-4 hover:bg-accent px-2 py-4 rounded-lg cursor-pointer items-center">
										{InitialIcon(event.title)}
										<div className="flex flex-col items-start">
											<h3 className="text-lg font-medium text-start">
												{event.title}
											</h3>
											<p className="text-sm text-muted-foreground text-start">
												{event.description}
											</p>
											<p className="text-sm text-start">{event.description}</p>
											<Badge className="mt-2 bg-green-100 text-green-800">
												Lecturer: {event.user.name}
											</Badge>
										</div>
									</div>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle className="text-2xl">
											{event.title}
										</DialogTitle>
										<DialogDescription>{event.status}</DialogDescription>
										<DialogDescription>{event.user.name}</DialogDescription>
										<DialogDescription>{event.description}</DialogDescription>
										<Badge>Category: {event.kategori}</Badge>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						))}
					</>
				);
			})()}
		</div>
	);
}
