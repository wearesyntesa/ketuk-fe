import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Search,
	Calendar,
	Clock,
	Users,
	Plus,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const timeSlots = [
	"08:00",
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
];

export default function WeeklySchedulerWireframe() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Weekly Lab Scheduler
						</h2>
						<p className="text-xl text-muted-foreground">
							Manage lab bookings and schedules with ease
						</p>
					</div>

					<div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden border">
						<div className="bg-background px-6 py-4 border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="flex items-center space-x-2">
										<div className="w-6 h-6 bg-primary rounded"></div>
										<span className="font-semibold">Ketuk Lab Manager</span>
									</div>
									<div className="relative w-64">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
										<Input
											placeholder="Search labs, users..."
											className="pl-10 bg-muted border-0"
											readOnly
										/>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex -space-x-2">
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-blue-500">
												AD
											</AvatarFallback>
										</Avatar>
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-green-500">
												TL
											</AvatarFallback>
										</Avatar>
										<Avatar className="w-8 h-8 border-2 border-background">
											<AvatarFallback className="bg-purple-500">
												ST
											</AvatarFallback>
										</Avatar>
									</div>
									<Button variant="ghost" size="sm">
										<Users className="w-4 h-4 mr-2" />
										Team
									</Button>
									<Button variant="ghost" size="sm">
										Menu
									</Button>
								</div>
							</div>
						</div>
						<div className="bg-background px-6 py-4 border-b">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<Button variant="ghost" size="sm">
										<ChevronLeft className="w-4 h-4" />
									</Button>
									<div className="flex items-center space-x-2">
										<Calendar className="w-5 h-5 text-primary" />
										<span className="font-semibold text-lg">
											Week of Dec 9-15, 2024
										</span>
									</div>
									<Button variant="ghost" size="sm">
										<ChevronRight className="w-4 h-4" />
									</Button>
								</div>
								<div className="flex items-center space-x-2">
									<Badge variant="outline">Computer Lab A</Badge>
									<Badge variant="outline">Chemistry Lab B</Badge>
									<Badge variant="outline">Physics Lab C</Badge>
									<Button size="sm">
										<Plus className="w-4 h-4 mr-2" />
										New Booking
									</Button>
								</div>
							</div>
						</div>

						<div className="flex">
							<div className="w-20 bg-muted/50">
								<div className="h-14 border-b border-r flex items-center justify-center">
									<Clock className="w-4 h-4 text-muted-foreground" />
								</div>
								{timeSlots.map((time) => (
									<div
										key={time}
										className="h-16 border-b border-r flex items-center justify-center"
									>
										<span className="text-sm text-muted-foreground font-mono">
											{time}
										</span>
									</div>
								))}
							</div>
							<div className="flex-1">
								<div className="grid grid-cols-7 border-b">
									{days.map((day) => (
										<div
											key={day}
											className="h-14 border-r flex flex-col items-center justify-center bg-muted/20"
										>
											<span className="text-xs text-muted-foreground">
												{day}
											</span>
											<span className="text-sm font-semibold">
												{Math.floor(Math.random() * 28) + 1}
											</span>
										</div>
									))}
								</div>
								<div className="grid grid-cols-7">
									{timeSlots.map((time) =>
										days.map((day, dayIndex) => (
											<div
												key={`${time}-${day}`}
												className="h-16 border-r border-b relative hover:bg-muted/20 transition-colors"
											>
												{Math.random() > 0.7 && (
													<div className="absolute inset-1 bg-primary/20 rounded border-l-2 border-primary flex items-center px-2">
														<div className="w-full">
															<div className="w-16 h-2 bg-muted-foreground/30 rounded mb-1"></div>
															<div className="w-12 h-1.5 bg-muted-foreground/20 rounded"></div>
														</div>
													</div>
												)}
												{Math.random() > 0.85 && (
													<div className="absolute inset-1 bg-green-500/20 rounded border-l-2 border-green-500 flex items-center px-2">
														<div className="w-full">
															<div className="w-20 h-2 bg-muted-foreground/30 rounded mb-1"></div>
															<div className="w-8 h-1.5 bg-muted-foreground/20 rounded"></div>
														</div>
													</div>
												)}
											</div>
										))
									)}
								</div>
							</div>
						</div>
						<div className="bg-background px-6 py-4 border-t">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-6">
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-green-500 rounded-full"></div>
										<span className="text-sm">Available</span>
									</div>
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-primary rounded-full"></div>
										<span className="text-sm">Booked</span>
									</div>
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-orange-500 rounded-full"></div>
										<span className="text-sm">Maintenance</span>
									</div>
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-red-500 rounded-full"></div>
										<span className="text-sm">Unavailable</span>
									</div>
								</div>
								<div className="flex items-center space-x-2 text-sm text-muted-foreground">
									<span>Last updated: 2 mins ago</span>
									<Button variant="ghost" size="sm">
										Refresh
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="grid md:grid-cols-3 gap-6 mt-12">
						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Quick Book</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Reserve a lab for immediate use
								</p>
								<div className="space-y-2">
									<div className="h-8 bg-muted/50 rounded"></div>
									<div className="h-8 bg-muted/50 rounded"></div>
									<Button className="w-full" variant="outline">
										Book Now
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">My Bookings</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									View and manage your reservations
								</p>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<div className="w-2 h-2 bg-primary rounded-full"></div>
										<div className="h-4 bg-muted/50 rounded flex-1"></div>
									</div>
									<div className="flex items-center space-x-2">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<div className="h-4 bg-muted/50 rounded flex-1"></div>
									</div>
									<Button className="w-full" variant="outline">
										View All
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">Lab Status</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Real-time availability overview
								</p>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<div className="h-4 bg-muted/50 rounded w-20"></div>
										<Badge
											variant="secondary"
											className="bg-green-500/10 text-green-600"
										>
											Available
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<div className="h-4 bg-muted/50 rounded w-20"></div>
										<Badge variant="secondary">Busy</Badge>
									</div>
									<Button className="w-full" variant="outline">
										Check All Labs
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
