"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Search,
	Plus,
	CheckCircle2,
	Circle,
	MessageCircle,
	MoreHorizontal,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function LandingDemo() {
	const t = useTranslations("landingDemo");
	const tCommon = useTranslations("common");

	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							{t("seeInAction")}
						</h2>
						<p className="text-xl text-muted-foreground">
							{t("experienceInterface")}
						</p>
					</div>

					<div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden border">
						<div className="bg-background px-6 py-4 border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-2">
										<div className="w-6 h-6 bg-primary rounded"></div>
										<span className="font-semibold">{tCommon("appName")}</span>
									</div>
									<div className="relative w-64">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
										<Input
											placeholder={t("search")}
											className="pl-10 bg-muted border-0"
											readOnly
										/>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex -space-x-2">
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-blue-500">
												JD
											</AvatarFallback>
										</Avatar>
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-green-500">
												AM
											</AvatarFallback>
										</Avatar>
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-purple-500">
												SK
											</AvatarFallback>
										</Avatar>
									</div>
									<Button variant="ghost" size="sm">
										{t("teamMore")}
									</Button>
									<Button variant="ghost" size="sm">
										{t("menu")}
									</Button>
								</div>
							</div>
						</div>
						<div className="flex">
							<div className="w-80 p-6 bg-muted/50">
								<div className="space-y-4">
									<div className="grid grid-cols-3 gap-2">
										<div className="aspect-square bg-muted-foreground/20 rounded-lg"></div>
										<div className="aspect-square bg-muted-foreground/20 rounded-lg"></div>
										<div className="aspect-square bg-muted-foreground/20 rounded-lg"></div>
										<div className="aspect-square bg-muted-foreground/20 rounded-lg"></div>
										<div className="aspect-square bg-muted-foreground/20 rounded-lg"></div>
										<div className="col-span-1 aspect-square bg-muted border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center">
											<Plus className="w-6 h-6 text-muted-foreground" />
										</div>
									</div>
									<div>
										<h3 className="font-semibold mb-2">{t("newTask")}</h3>
										<p className="text-sm text-muted-foreground">
											{t("newTaskDescription")}
										</p>
										<Button className="w-full mt-4" size="sm">
											<Plus className="w-4 h-4 mr-2" />
											{t("addNewTask")}
										</Button>
									</div>
								</div>
							</div>
							<div className="flex-1 p-6">
								<div className="space-y-6">
									<div>
										<div className="flex items-center justify-between mb-4">
											<h3 className="font-semibold">{t("tasks")}</h3>
											<span className="text-sm text-muted-foreground">
												{t("markAsCompleted")}
											</span>
										</div>
										<div className="space-y-3">
											<Card>
												<CardContent className="p-4">
													<div className="flex items-center space-x-3">
														<Circle className="w-5 h-5 text-muted-foreground" />
														<div className="flex-1">
															<div className="font-medium">
																{t("creatingPersona")}
															</div>
															<div className="text-sm text-muted-foreground">
																68% {t("done")}
															</div>
														</div>
														<Badge variant="secondary">{t("inProgress")}</Badge>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardContent className="p-4">
													<div className="flex items-center space-x-3">
														<CheckCircle2 className="w-5 h-5 text-green-500" />
														<div className="flex-1">
															<div className="font-medium">
																{t("documentsSorting")}
															</div>
														</div>
														<Badge className="bg-green-500/10 text-green-600">
															{t("complete")}
														</Badge>
													</div>
												</CardContent>
											</Card>
										</div>
									</div>
								</div>
							</div>

							<div className="w-80 p-6 space-y-6">
								<div>
									<h3 className="font-semibold mb-4">{t("upcoming")}</h3>
									<div className="space-y-3">
										<div className="flex items-center space-x-3">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<div className="flex-1">
												<div className="text-sm font-medium">
													{t("branchMeeting")}
												</div>
												<div className="text-xs text-muted-foreground">
													{t("team")}
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Badge variant="secondary" className="text-xs">
												{t("design")}
											</Badge>
											<Badge variant="secondary" className="text-xs">
												{t("development")}
											</Badge>
										</div>
									</div>
								</div>

								<div>
									<h3 className="font-semibold mb-4 flex items-center">
										<MessageCircle className="w-4 h-4 mr-2" />
										{t("chatDetails")}
									</h3>
									<div className="space-y-3">
										<div className="flex items-center space-x-3">
											<Avatar className="w-8 h-8">
												<AvatarFallback className="bg-blue-500">
													JR
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 text-sm">Jaya rita dean</div>
											<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
										</div>
										<div className="flex items-center space-x-3">
											<Avatar className="w-8 h-8">
												<AvatarFallback className="bg-green-500">
													JW
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 text-sm">John wacker</div>
											<MoreHorizontal className="w-4 h-4 text-muted-foreground" />
										</div>
									</div>
									<Button className="w-full mt-4" size="sm">
										<Plus className="w-4 h-4 mr-2" />
										{t("addNewChat")}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
