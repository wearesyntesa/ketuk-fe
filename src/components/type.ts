export interface SideBarItem {
    title: string;
    url: string;
    icon: React.ElementType;
    child: SubItem[];
}

interface SubItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

export interface ScheduleProps {
	day: string;
	events: {
		title: string;
		time: string;
		description: string;
		pic: string;
		note?: string;
		contact: string;
		category: "praktikum" | "skripsi" | "kelas" | string;
		status?: "Pending" | "Approved" | "Cancelled";
	}[];
}

export interface EventRequest {
	id: string;
	date: string;
	title: string;
	time: string;
	description: string;
	pic: string;
	note?: string;
	contact: string;
	category: "praktikum" | "skripsi" | "kelas" | string;
	status?: "Pending" | "Approved" | "Cancelled";
}

export interface InventoryItem {
	id: string;
	nameItem: string;
	specification: string;
	quantity: number;
	goodCondition: number;
	poorCondition: number;
	items: {
		serialNumber: string;
		procurementYear: number;
		condition: "Good" | "Poor";
		note: string;
	}[];
}

export interface InventoryDetailItem {
	serialNumber: string;
	procurementYear: number;
	condition: "Good" | "Poor";
	note: string;
}