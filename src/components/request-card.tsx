import { CheckCircle, Hourglass, XCircle } from "lucide-react";
import { EventRequest } from "./type";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function RequestCard({item}: {item: EventRequest}) {
    const icon = item.status === "Approved" ? <CheckCircle className="text-green-500" /> : item.status === "Pending" ? <Hourglass className="text-yellow-500" /> : <XCircle className="text-red-500" />;
    const backgroundIcon = item.status === "Approved" ? "bg-green-100" : item.status === "Pending" ? "bg-yellow-100" : "bg-red-100";
    const backgroundCard = item.status === "Approved" ? "bg-green-50" : item.status === "Pending" ? "bg-yellow-50" : "bg-red-50";

    const iconElement = (
        <div className={`p-2 rounded-full ${backgroundIcon}`}>
            {icon}
        </div>
    );

    return (
        <>
            <Card className={`${backgroundCard} p-4 w-full`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            {iconElement}
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-sm text-muted-foreground flex">requested by @{item.pic}  | {item.time}</span>
                        </div>
                    </div>
                    {item.status === "Pending" && (
                        <div>
                            <Button className="bg-gradient-to-br from-red-600 via-red-500 to-red-400" size="sm">Cancel</Button>
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}