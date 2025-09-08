import { ScheduleProps } from "./type";
import { AlertDialog, AlertDialogHeader, AlertDialogTitle, AlertDialogContent, AlertDialogTrigger, AlertDialogDescription, AlertDialogCancel } from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function ScheduleCard({ day, events }: ScheduleProps) {
    return (
        <>
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow min-w-96 h-fit">
            <h2 className="text-xl font-semibold mb-4">{day}</h2>
            <div className="flex flex-col gap-4">
                {events.map((event, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <div key={index} className="flex gap-4 hover:bg-accent px-2 py-4 rounded-lg cursor-pointer items-center">
                                {InitialIcon(event.title)}
                                <div className="flex flex-col items-start">
                                    <h3 className="text-lg font-medium text-start">{event.title}</h3>
                                    <p className="text-sm text-muted-foreground text-start">{event.time} | {event.pic}</p>
                                    {/* <p className="text-sm text-start">{event.description}</p> */}
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                                <DialogDescription>{event.time} | <span className={`${event.status === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>{event.status}</span></DialogDescription>
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
    )
}

function InitialIcon(title: string) {
    const initial = title
        .split(" ")
        .filter((_, index) => index < 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");
    return (
        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
            {initial}
        </div>
    )
}
