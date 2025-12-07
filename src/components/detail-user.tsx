import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserType } from "./type";
import { useUser } from "@/hooks/use-user";

export default function DetailUser(id: {id: number}) {
    const token = localStorage.getItem("access_token");
    const user = useUser();
    const [userDetail, setUserDetail] = useState<UserType | null>(null);
    const [userName, setUserName] = useState<string>("");
    const date = new Date();

    const fetchUser = () => {
        if (token) {
            user.handleUserbyID(token, id.id).then((data) => {
                setUserDetail(data);
                setUserName(data.name);
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer hover:font-semibold" onClick={() => fetchUser()}>
                Detail
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{userDetail?.name || ""}</DialogTitle>
                    <DialogDescription>
                        Detail information about the item can be displayed here.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 mt-4 w-full">
                    <div className="flex flex-col">
                        <strong>ID:</strong>
                        <Input value={userDetail?.id || ""} readOnly />
                    <div className="flex flex-col">
                        <strong>Name:</strong>
                        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    </div>
                    <div className="flex flex-col">
                        <strong>Email:</strong>
                        <Input value={userDetail?.email || ""} readOnly />
                    </div>
                    <div className="flex flex-col">
                        <strong>Role:</strong>
                        <Select>
                            <SelectTrigger className="w-full" value={userDetail?.role || ""}>
                                <SelectValue placeholder={userDetail?.role || ""} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">
                                    admin
                                </SelectItem>
                                <SelectItem value="user">
                                    user
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-4 w-full justify-end">
                    <Button className="mt-4 ml-2" variant={"outline"}>Save Update</Button>
                    <Button className="mt-4" onClick={() => window.history.back()}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}