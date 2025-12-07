"use client";

import LandingNav from "@/components/landing-nav";
import LandingHero from "@/components/landing-hero";
import { ScheduleMonthLanding } from "@/components/schedule-month";
import FeatureList from "@/components/feature-list";
import ReviewUser from "@/components/review-user";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { UserType } from "@/components/type";
import { useUser } from "@/hooks/use-user";

export default function Home() {
	const user = useUser();

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			user.setUser(JSON.parse(userData));
		}
	}, []);

	return (
		<div className="min-h-screen">
			<LandingNav isLogin={user.user?.email ? true : false} />
			<LandingHero isLogin={user.user?.email ? true : false} />
			<div className="px-4 gap-4 lg:px-6 flex flex-col mb-20 mt-10">
				<div>
					<h2 className="text-2xl font-bold text-center w-full mb-4">
						What we do?
					</h2>
					<FeatureList />
				</div>
				<div className="flex flex-col gap-4 w-full items-center justify-center my-20 relative">
					<h3 className="text-xl font-semibold text-center">
						Lab schedule management — coordinate bookings, shifts, and
						equipment.
					</h3>
					<p className="mt-2 text-sm text-center text-gray-500 max-w-md mx-auto">
						Reserve lab times, assign team shifts, and monitor equipment
						availability in one place.
					</p>
					{/* <div className="absolute top-30 left-30 -z-10 rotate-12 w-96 h-96 rounded-xl bg-amber-200"></div>
					<div className="absolute bottom-10 right-10 -z-10 -rotate-12 w-96 h-96 rounded-xl bg-linear-to-r from-transparent via-90% to-amber-200"></div> */}
					<ScheduleMonthLanding />
				</div>
				<div className="flex flex-col my-20">
					<h3 className="text-xl font-semibold text-center">Review User</h3>
					<ReviewUser />
				</div>
			</div>
			<Footer />
		</div>
	);
}
