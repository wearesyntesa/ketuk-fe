import AppHeader from "@/components/app-header";
import ScheduleLab from "@/components/schedule-lab";
import BannerDashboard from "@/components/banner-dashboard";
import DashboardChart from "@/components/dashboard-chart";

export default function Dashboard() {
	return (
		<>
			<AppHeader title="Dashboard" />
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				{/* <SectionCards /> */}
				<div className="px-4 gap-4 lg:px-6 flex flex-col">
					{/* <ChartAreaInteractive /> */}
					<BannerDashboard />
					<DashboardChart />
					<ScheduleLab />
				</div>
			</div>
		</>
	);
}
