import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { UnblockingResponse } from "./type";
import { useUnblocking } from "@/hooks/use-unblocking";

export default function DetailUnblocking({ id }: { id: number }) {
    const token = localStorage.getItem("access_token") || "";
    const unblocking = useUnblocking();
    const [unblockData, setUnblockData] = useState<UnblockingResponse | null>(null);

    const fetchUnblocking = () => {
        if (token) {
            unblocking.handleGetUnblockingById(token, id).then((data) => {
                setUnblockData(data);
            });
        }
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <Dialog>
                <DialogTrigger
                    className="cursor-pointer hover:font-semibold w-full"
                    onClick={() => fetchUnblocking()}>
                    Detail
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{unblockData?.id || ""}</DialogTitle>
                        <DialogDescription>
                            Detail information about the item can be displayed here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 mt-4 w-full">
                        <div className="flex flex-col">
                            <strong>Start Date:</strong>
                            <Input
                                value={unblockData?.startDate ? new Date(unblockData.startDate).toLocaleDateString() : ""} 
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col">
                            <strong>End Date:</strong>
                            <Input value={unblockData?.endDate ? new Date(unblockData.endDate).toLocaleDateString() : ""} readOnly />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}