import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
	Search,
	Users,
	Plus,
	Calendar,
	CheckCircle2,
	Circle,
	MessageCircle,
	MoreHorizontal,
	ChevronRight,
} from "lucide-react";

export default function LandingDemo() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							See Ketuk in action
						</h2>
						<p className="text-xl text-muted-foreground">
							Experience the intuitive interface for lab management
						</p>
					</div>

					<div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden border">
						<div className="bg-background px-6 py-4 border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-2">
										<div className="w-6 h-6 bg-primary rounded"></div>
										<span className="font-semibold">Ketuk</span>
									</div>
									<div className="relative w-64">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
										<Input
											placeholder="Search"
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
										Team more
									</Button>
									<Button variant="ghost" size="sm">
										Menu
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
										<h3 className="font-semibold mb-2">New task</h3>
										<p className="text-sm text-muted-foreground">
											Involves creating and assigning a new task within the
											project management system.
										</p>
										<Button className="w-full mt-4" size="sm">
											<Plus className="w-4 h-4 mr-2" />
											Add new task
										</Button>
									</div>
								</div>
							</div>
							<div className="flex-1 p-6">
								<div className="space-y-6">
									<div>
										<div className="flex items-center justify-between mb-4">
											<h3 className="font-semibold">Tasks</h3>
											<span className="text-sm text-muted-foreground">
												Mark as completed
											</span>
										</div>
										<div className="space-y-3">
											<Card>
												<CardContent className="p-4">
													<div className="flex items-center space-x-3">
														<Circle className="w-5 h-5 text-muted-foreground" />
														<div className="flex-1">
															<div className="font-medium">
																Creating persona
															</div>
															<div className="text-sm text-muted-foreground">
																68% Done
															</div>
														</div>
														<Badge variant="secondary">In progress</Badge>
													</div>
												</CardContent>
											</Card>

											<Card>
												<CardContent className="p-4">
													<div className="flex items-center space-x-3">
														<CheckCircle2 className="w-5 h-5 text-green-500" />
														<div className="flex-1">
															<div className="font-medium">
																Documents & sorting
															</div>
														</div>
														<Badge className="bg-green-500/10 text-green-600">
															Complete
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
									<h3 className="font-semibold mb-4">Upcoming</h3>
									<div className="space-y-3">
										<div className="flex items-center space-x-3">
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<div className="flex-1">
												<div className="text-sm font-medium">
													Branch meeting
												</div>
												<div className="text-xs text-muted-foreground">
													Team
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Badge variant="secondary" className="text-xs">
												Design
											</Badge>
											<Badge variant="secondary" className="text-xs">
												Development
											</Badge>
										</div>
									</div>
								</div>

								<div>
									<h3 className="font-semibold mb-4 flex items-center">
										<MessageCircle className="w-4 h-4 mr-2" />
										Chat details
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
										Add new chat
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
