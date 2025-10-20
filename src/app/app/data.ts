import { EventRequest, InventoryItem, MonthlyEvent } from "@/components/type";

export const inventoryItem: InventoryItem[] = [
	{
		id: "1",
		nameItem: "Laptop Dell XPS 13",
		specification: "Intel i7, 16GB RAM, 512GB SSD",
		quantity: 10,
		goodCondition: 8,
		poorCondition: 1,
		items: [
			{
				serialNumber: "DX13-001",
				procurementYear: 2021,
				condition: "Good",
				note: "Used for development and testing",
			},
			{
				serialNumber: "DX13-002",
				procurementYear: 2021,
				condition: "Good",
				note: "Used for development and testing",
			},
			{
				serialNumber: "DX13-003",
				procurementYear: 2021,
				condition: "Poor",
				note: "Screen issue",
			},
		],
	},
	{
		id: "2",
		nameItem: "Projector Epson X500",
		specification: "Full HD, 3000 lumens",
		quantity: 5,
		goodCondition: 4,
		poorCondition: 0,
		items: [
			{
				serialNumber: "EPX500-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for presentations and meetings",
			},
			{
				serialNumber: "EPX500-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for presentations and meetings",
			},
		],
	},
	{
		id: "3",
		nameItem: "HP LaserJet Pro M404dn",
		specification: "Monochrome, Duplex Printing",
		quantity: 3,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "HPLJ404-001",
				procurementYear: 2019,
				condition: "Good",
				note: "Main office printer",
			},
			{
				serialNumber: "HPLJ404-002",
				procurementYear: 2019,
				condition: "Poor",
				note: "Needs toner replacement soon",
			},
		],
	},
	{
		id: "4",
		nameItem: "Apple MacBook Pro 16",
		specification: "M1 Pro, 32GB RAM, 1TB SSD",
		quantity: 6,
		goodCondition: 6,
		poorCondition: 0,
		items: [
			{
				serialNumber: "MBP16-001",
				procurementYear: 2022,
				condition: "Good",
				note: "Used for design and video editing",
			},
			{
				serialNumber: "MBP16-002",
				procurementYear: 2022,
				condition: "Good",
				note: "Used for design and video editing",
			},
		],
	},
	{
		id: "5",
		nameItem: "Samsung Flip 2 Whiteboard",
		specification: "65-inch, Touchscreen",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "SFLIP2-001",
				procurementYear: 2021,
				condition: "Good",
				note: "Used in conference rooms",
			},
		],
	},
	{
		id: "6",
		nameItem: "Cisco Webex Room Kit",
		specification: "Video conferencing system",
		quantity: 4,
		goodCondition: 3,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "7",
		nameItem: "Lenovo ThinkPad X1 Carbon",
		specification: "Intel i5, 16GB RAM, 256GB SSD",
		quantity: 8,
		goodCondition: 7,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "8",
		nameItem: "Canon EOS 90D Camera",
		specification: "32.5MP, 4K Video",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "9",
		nameItem: "Microsoft Surface Pro 7",
		specification: "Intel i5, 8GB RAM, 128GB SSD",
		quantity: 5,
		goodCondition: 4,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "10",
		nameItem: "APC Smart-UPS 1500VA",
		specification: "Uninterruptible Power Supply",
		quantity: 3,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "11",
		nameItem: "Dell UltraSharp U2720Q",
		specification: "27-inch 4K Monitor",
		quantity: 7,
		goodCondition: 7,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "12",
		nameItem: "Logitech Rally Camera",
		specification: "PTZ, 4K Ultra-HD",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "13",
		nameItem: "Brother HL-L2350DW Printer",
		specification: "Monochrome, Wireless",
		quantity: 4,
		goodCondition: 3,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "14",
		nameItem: "BenQ GW2780 Monitor",
		specification: "27-inch, Full HD",
		quantity: 6,
		goodCondition: 5,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "15",
		nameItem: "Jabra Speak 710 Speakerphone",
		specification: "Bluetooth, USB",
		quantity: 3,
		goodCondition: 3,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "16",
		nameItem: "Synology DS920+ NAS",
		specification: "4-bay, 32TB max",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "17",
		nameItem: "Epson EcoTank L3150",
		specification: "Color, Wi-Fi",
		quantity: 3,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "18",
		nameItem: "TP-Link Archer AX6000 Router",
		specification: "Wi-Fi 6, 8 LAN Ports",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "19",
		nameItem: "Sony WH-1000XM4 Headphones",
		specification: "Noise Cancelling, Wireless",
		quantity: 5,
		goodCondition: 5,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
	{
		id: "20",
		nameItem: "Wacom Intuos Pro Tablet",
		specification: "Medium, Bluetooth",
		quantity: 2,
		goodCondition: 2,
		poorCondition: 0,
		items: [
			{
				serialNumber: "CWRK-001",
				procurementYear: 2020,
				condition: "Good",
				note: "Used for remote meetings",
			},
		],
	},
];

export const eventRequestItem: EventRequest[] = [
	{
		id: "2",
		date: "2024-06-10",
		title: "Project Kickoff Meeting",
		time: "09:00 AM - 10:00 AM",
		description: "Kickoff meeting for the new project.",
		pic: "John Doe",
		note: "Important stakeholders invited.",
		contact: "john.doe@example.com",
		category: "kelas",
		status: "Approved",
	},
	{
		id: "3",
		date: "2024-06-11",
		title: "Design Sprint",
		time: "10:00 AM - 12:00 PM",
		description: "Collaborative design sprint for new features.",
		pic: "Design Team",
		note: "Bring sketches and ideas.",
		contact: "design.team@example.com",
		category: "praktikum",
		status: "Cancelled",
	},
	{
		id: "4",
		date: "2024-06-12",
		title: "Client Feedback Session",
		time: "02:00 PM - 03:00 PM",
		description: "Session to gather feedback from the client.",
		pic: "Client",
		note: "Prepare demo materials.",
		contact: "client@example.com",
		category: "skripsi",
		status: "Pending",
	},
	{
		id: "5",
		date: "2024-06-13",
		title: "QA Review",
		time: "11:00 AM - 12:00 PM",
		description: "Quality assurance review for the latest release.",
		pic: "QA Team",
		note: "",
		contact: "qa@example.com",
		category: "praktikum",
		status: "Cancelled",
	},
	{
		id: "6",
		date: "2024-06-14",
		title: "Weekly Standup",
		time: "09:30 AM - 10:00 AM",
		description: "Weekly team standup meeting.",
		pic: "Team Lead",
		note: "",
		contact: "teamlead@example.com",
		category: "kelas",
		status: "Approved",
	},
	{
		id: "7",
		date: "2024-06-15",
		title: "Retrospective",
		time: "04:00 PM - 05:00 PM",
		description: "Sprint retrospective meeting.",
		pic: "Scrum Master",
		note: "",
		contact: "scrum.master@example.com",
		category: "kelas",
		status: "Pending",
	},
	{
		id: "8",
		date: "2024-06-16",
		title: "Infrastructure Upgrade",
		time: "01:00 PM - 03:00 PM",
		description: "Upgrading server infrastructure.",
		pic: "IT Team",
		note: "Downtime expected.",
		contact: "it@example.com",
		category: "lainnya",
		status: "Pending",
	},
	{
		id: "9",
		date: "2024-06-17",
		title: "Marketing Strategy Meeting",
		time: "10:00 AM - 11:30 AM",
		description: "Discussing new marketing strategies.",
		pic: "Marketing Team",
		note: "",
		contact: "marketing@example.com",
		category: "kelas",
		status: "Pending",
	},
	{
		id: "10",
		date: "2024-06-18",
		title: "Product Demo",
		time: "03:00 PM - 04:00 PM",
		description: "Demonstration of the new product features.",
		pic: "Product Team",
		note: "",
		contact: "product@example.com",
		category: "lainnya",
		status: "Approved",
	},
	{
		id: "11",
		date: "2024-06-19",
		title: "Security Audit",
		time: "11:00 AM - 01:00 PM",
		description: "Comprehensive security audit.",
		pic: "Security Team",
		note: "All teams must participate.",
		contact: "security@example.com",
		category: "lainnya",
		status: "Pending",
	},
	{
		id: "12",
		date: "2024-06-20",
		title: "Team Building Activity",
		time: "02:00 PM - 05:00 PM",
		description: "Outdoor team building exercises.",
		pic: "HR Team",
		note: "Wear comfortable clothes.",
		contact: "hr@example.com",
		category: "lainnya",
		status: "Pending",
	},
	{
		id: "13",
		date: "2024-06-21",
		title: "Board Meeting",
		time: "09:00 AM - 11:00 AM",
		description: "Quarterly board meeting.",
		pic: "Board Members",
		note: "Board members only.",
		contact: "board@example.com",
		category: "kelas",
		status: "Approved",
	},
	{
		id: "14",
		date: "2024-06-22",
		title: "System Backup",
		time: "12:00 AM - 02:00 AM",
		description: "Scheduled system backup.",
		pic: "IT Team",
		note: "No access during this time.",
		contact: "it@example.com",
		category: "lainnya",
		status: "Pending",
	},
	{
		id: "15",
		date: "2024-06-23",
		title: "Training Session",
		time: "10:00 AM - 12:00 PM",
		description: "Training on new software tools.",
		pic: "Trainer",
		note: "",
		contact: "training@example.com",
		category: "praktikum",
		status: "Pending",
	},
	{
		id: "16",
		date: "2024-06-24",
		title: "Vendor Meeting",
		time: "03:00 PM - 04:00 PM",
		description: "Meeting with hardware vendors.",
		pic: "Procurement Team",
		note: "",
		contact: "procurement@example.com",
		category: "kelas",
		status: "Pending",
	},
	{
		id: "17",
		date: "2024-06-25",
		title: "App Launch",
		time: "01:00 PM - 02:00 PM",
		description: "Official launch of the new app.",
		pic: "Launch Team",
		note: "Invite all stakeholders.",
		contact: "launch@example.com",
		category: "lainnya",
		status: "Approved",
	},
	{
		id: "18",
		date: "2024-06-26",
		title: "Bug Bash",
		time: "11:00 AM - 01:00 PM",
		description: "Team-wide bug fixing session.",
		pic: "QA Team",
		note: "",
		contact: "qa@example.com",
		category: "praktikum",
		status: "Pending",
	},
	{
		id: "19",
		date: "2024-06-27",
		title: "Customer Support Review",
		time: "02:00 PM - 03:00 PM",
		description: "Review of customer support tickets.",
		pic: "Support Team",
		note: "",
		contact: "support@example.com",
		category: "lainnya",
		status: "Pending",
	},
	{
		id: "20",
		date: "2024-06-28",
		title: "Annual General Meeting",
		time: "09:00 AM - 12:00 PM",
		description: "Company-wide annual meeting.",
		pic: "Admin Team",
		note: "All employees must attend.",
		contact: "admin@example.com",
		category: "kelas",
		status: "Approved",
	},
];

const dateNow = new Date();

const getDateStr = (offset: number) => {
	const d = new Date(dateNow);
	d.setDate(d.getDate() + offset);
	return d.toISOString().slice(0, 10);
};

const getDayName = (offset: number) => {
	const d = new Date(dateNow);
	d.setDate(d.getDate() + offset);
	return d.toLocaleDateString(undefined, { weekday: "long" });
};

export const monthlySchedule: MonthlyEvent[] = (() => {
	const list: MonthlyEvent[] = [];
	let idCounter = 1;

	for (let i = 0; i < 30; i++) {
		const offset = i;
		const date = getDateStr(offset);
		const day = getDayName(offset);

		const base: MonthlyEvent = {
			id: String(idCounter++),
			title: `Event ${i + 1}`,
			description: `Auto-generated event for ${day}, ${date}`,
			note: "",
			lecturerName: "Dr. Smith",
			contact: "events@example.com",
			category:
				i % 4 === 0
					? "Praktikum"
					: i % 4 === 1
					? "Kelas"
					: i % 4 === 2
					? "Skripsi"
					: "Other",
			status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Cancelled",
			date,
			day,
			startTime: `${date}T09:00:00`,
			endTime: `${date}T10:00:00`,
		};

		list.push(base);

		// Randomly add multiple schedules for this same day
		// ~30% chance to add 1-2 extra events
		if (Math.random() < 0.3) {
			const extraCount = 1 + Math.floor(Math.random() * 2); // 1 or 2 extras
			for (let j = 0; j < extraCount; j++) {
				const startHour = 10 + j; // 10:00, 11:00, ...
				const endHour = startHour + 1;
				const extra: MonthlyEvent = {
					id: String(idCounter++),
					title: `Event ${i + 1} (Part ${j + 2})`,
					description: `Additional auto-generated event for ${day}, ${date}`,
					note: "",
					lecturerName:
						i % 4 === 0
							? "Dr. Smith"
							: i % 4 === 1
							? "Prof. Johnson"
							: i % 4 === 2
							? "Dr. Burhan"
							: "Yatno",
					contact: "events@example.com",
					category:
						(i + j) % 4 === 0
							? "Praktikum"
							: (i + j) % 4 === 1
							? "Kelas"
							: (i + j) % 4 === 2
							? "Skripsi"
							: "Other",
					status:
						(i + j) % 3 === 0
							? "Approved"
							: (i + j) % 3 === 1
							? "Pending"
							: "Cancelled",
					date,
					day,
					startTime: `${date}T${String(startHour).padStart(2, "0")}:00:00`,
					endTime: `${date}T${String(endHour).padStart(2, "0")}:00:00`,
				};
				list.push(extra);
			}
		}
	}

	return list;
})();
