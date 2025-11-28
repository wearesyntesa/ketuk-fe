export interface SideBarItem {
	title: string;
	url: string;
	icon: React.ElementType;
	child: SubItem[];
	bgGradient?: string;
}

interface SubItem {
    title: string;
    url: string;
    icon: React.ElementType;
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
	items: InventoryDetailItem[];
}

export interface InventoryDetailItem {
	serialNumber: string;
	procurementYear: number;
	condition: "Good" | "Poor";
	note: string;
}

export interface MonthlyEvent {
	id: string;
	title: string;
	description?: string;
	note?: string;
	lecturerName: string;
	contact?: string;
	category: "Praktikum" | "Skripsi" | "Kelas" | string;
	status: "Pending" | "Approved" | "Cancelled" | string;
	startTime: string;
	endTime: string;
	date: string; // YYYY-MM-DD
	day: string; // weekday name
};