"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { UserType } from "./type";
import { useUser } from "@/hooks/use-user";
import { useTranslations } from "next-intl";

export default function DetailUser({ id }: { id: number }) {
	const t = useTranslations("users");
	const tCommon = useTranslations("common");
	
	const token = localStorage.getItem("access_token");
	const user = useUser();
	const [userName, setUserName] = useState<string>("");
	const [userData, setUserData] = useState<UserType>({
		id: 0, // Provide a default value for id
		name: "",
		email: "",
		role: "user",
	});

	const fetchUser = () => {
		if (token) {
			user.handleUserbyID(token, id).then((data) => {
				setUserData(data);
				setUserName(data.name);
			});
		}
	};

	const updateUser = () => {
		if (token) {
			user.handleUpdateUser(token, userData, id).then(() => {
				console.log("User updated");
			});
		}
	};

	const deleteUser = () => {
		if (token) {
			user.handleDeleteUser(token, id).then(() => {
				console.log("User deleted");
			});
		}
	};

	return (
		<div className="w-full flex flex-col gap-2">
			<Dialog>
				<DialogTrigger
					className="cursor-pointer hover:font-semibold w-full"
					onClick={() => fetchUser()}>
					{t("detail")}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("editUser")}: {userName || ""}</DialogTitle>
						<DialogDescription>
							{t("updateProfile")}
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-4 mt-4 w-full">
						<div className="flex flex-col">
							<strong>{t("id")}:</strong>
							<Input value={userData?.id || ""} readOnly />
							<div className="flex flex-col">
								<strong>{tCommon("name")}:</strong>
								<Input
									value={userData.name}
									onChange={(e) =>
										setUserData({ ...userData, name: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="flex flex-col">
							<strong>{tCommon("email")}:</strong>
							<Input value={userData?.email || ""} readOnly />
						</div>
						<div className="flex flex-col">
							<strong>{t("role")}:</strong>
							<Select onValueChange={(value) =>
								setUserData({ ...userData, role: value })
							}>
								<SelectTrigger className="w-full" value={userData?.role || ""}>
									<SelectValue placeholder={userData?.role || ""} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="admin">{t("admin")}</SelectItem>
									<SelectItem value="user">{t("user")}</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 w-full justify-end">
						<DialogClose className="border rounded-mb mr-2">{tCommon("cancel")}</DialogClose>
						<Button
							onClick={(e) => {
								e.preventDefault();
								updateUser();
							}}>
							{t("saveChanges")}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<Dialog>
				<DialogTrigger className="cursor-pointer hover:font-semibold w-full">
					{tCommon("delete")}
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{userData?.name}</DialogTitle>
						<DialogDescription>
							{t("confirmDeleteUser")}
						</DialogDescription>
						<div className="flex gap-2">
							<DialogClose className="flex-1 p-1 border rounded-md">
								{tCommon("cancel")}
							</DialogClose>
							<Button onClick={() => deleteUser()} className="flex-1">
								{tCommon("confirm")}
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
