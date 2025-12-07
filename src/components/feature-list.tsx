import { CalendarClock, PencilRuler, ScrollText } from "lucide-react";
import { eventRequestItem } from "@/app/app/data";
import { InitialIcon } from "@/app/app/your-requests/page";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const features = [
    {
        title: 'Request Schedule',
        description: 'Easily request lab schedules with our intuitive interface.',
        icon: CalendarClock,
        background: 'bg-radial-[at_40%_80%] from-blue-400 to-blue-200',
        component: ChildRequestCard
    },
    {
        title: 'Manage Inventory',
        description: 'Keep track of lab equipment and supplies efficiently.',
        icon: PencilRuler,
        background: 'bg-radial from-fuchsia-400 to-fuchsia-200',
        component: ChildManageCard
    },
    {
        title: 'History Logs',
        description: 'Access detailed logs of past lab activities and schedules.',
        icon: ScrollText,
        background: 'bg-radial-[at_25%_75%] from-emerald-400 to-emerald-200',
        component: ChildHistoryCard
    }
]

export default function FeatureList() {
	return (
		<div className="flex md:flex-row flex-col gap-8 w-full justify-center items-center relative mt-20">
			{features.map((feature, id) => (
				<div
					key={id}
					className={`lg:${
						id === 0 ? "-rotate-6" : id === 1 ? "rotate-0" : "rotate-6"
					} group hover:rotate-0 hover:z-10 transition-transform hover:scale-125 duration-500`}>
					<div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow h-full lg:w-60 w-55">
						<div
							className={`${feature.background} h-80 lg:w-60 w-55 rounded-t-lg relative overflow-clip`}>
							<div className="absolute left-10 top-10 md:grayscale group-hover:grayscale-0 duration-500 md:blur-xs group-hover:blur-none transition-all">
								{feature.component ? <feature.component /> : <></>}
							</div>
						</div>
						<div className="p-6 bg-white rounded-b-lg">
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					</div>
				</div>
			))}
			<div className="absolute md:top-40 top-1/2 -left-10 -z-10 rotate-2 h-32 w-full bg-linear-to-r from-blue-300/70 to-transparent" />
			<div className="absolute top-60 -right-2 -z-20 rotate-2 h-32 w-full bg-linear-to-l from-emerald-300/70 to-transparent" />
			<div className="absolute md:hidden block bottom-50 -right-2 -z-10 rotate-2 h-32 w-full bg-linear-to-l from-fuchsia-300/70 to-transparent" />
		</div>
	);
}

export function ChildRequestCard() {
	return (
		<div className="min-w-96 bg-white p-4 rounded-lg shadow-md text-sm">
			<div className="mb-4 relative">
				<div className="w-40 h-4 bg-linear-to-r from-lime-300 to-lime-50" />
				<h3 className="absolute top-0 left-0 text-lg font-semibold z-100">
					Request Schedule
				</h3>
				<p className="text-gray-400 pt-2">
					Input information for your schedule request below.
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label className="min-w-64">Event Name</Label>
					<Input
						type="text"
						placeholder="Enter event name"
						className="w-full cursor-not-allowed opacity-50"
						disabled
						aria-disabled="true"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label className="min-w-64">Date Event</Label>
					<Input
						type="text"
						placeholder="Select date"
						className="w-full cursor-not-allowed opacity-50"
						disabled
						aria-disabled="true"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Label className="min-w-64">Event Name</Label>
					<div className="flex gap-2">
						<Input
							type="text"
							placeholder="--:--"
							className="w-20 cursor-not-allowed opacity-50"
							disabled
							aria-disabled="true"
						/>
						{"-"}
						<Input
							type="text"
							placeholder="--:--"
							className="w-20 cursor-not-allowed opacity-50"
							disabled
							aria-disabled="true"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

const DummyManageData = [
	{
		name: "Table",
		good: 6,
		poor: 2,
	},
	{
		name: "White Board",
		good: 4,
		poor: 2,
	},
	{
		name: "AIO PC",
		good: 25,
		poor: 1,
	},
	{
		name: "Projector",
		good: 6,
		poor: 2,
	},
];

export function ChildManageCard() {
	return (
		<div className="min-w-96 bg-white p-4 rounded-lg shadow-md text-sm">
			<div>
				<h3 className="text-lg font-semibold mb-2">Inventory</h3>
			</div>
			<div className="grid grid-cols-4">
				<span className="min-w-60">Item</span>
				<span className="item-center w-full">Condition</span>
			</div>
			{DummyManageData.map((item, id) => (
				<div key={id} className="grid grid-cols-4 gap-8 py-2 border-b">
					<span className="min-w-60 flex items-center gap-2">{item.name}</span>
					<span className="flex flex-col gap-1 items-center justify-center">
						<div className="bg-green-100 text-green-500 rounded-sm px-1 text-xs">
							Good : {item.good}
						</div>
						<div className="bg-yellow-100 text-yellow-500 rounded-sm px-1 text-xs">
							Poor: {item.poor}
						</div>
					</span>
				</div>
			))}
		</div>
	);
}

export function ChildHistoryCard() {
	return (
		<div className="min-w-96 bg-white p-4 rounded-lg shadow-md text-sm">
			<div>
				<h3 className="text-lg font-semibold mb-2">History Logs</h3>
			</div>
			<div className="grid grid-cols-4">
				<span className="min-w-64">Event Name</span>
				{/* <span>Date</span> */}
			</div>
			<div>
				{eventRequestItem.slice(0, 3).map((item, id) => (
					<div key={id} className="grid grid-cols-4 gap-8 py-2 border-b">
						<span className="min-w-64 flex items-center gap-2">
							<InitialIcon title={item.title} />
						</span>
						{/* <span>{item.date}</span> */}
					</div>
				))}
			</div>
		</div>
	);
}