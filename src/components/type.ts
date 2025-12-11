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

export interface UserType {
	email: string;
	id: number;
	name: string;
	role: string;
}

export interface CategoryPost {
	name: string;
	specification: string;
}

export interface ItemCategories {
	id: number;
	categoryName: string;
	specification: string;
	quantity: number;
	createdAt: string;
	updatedAt: string;
	items: ItemDetail[];
}

export interface ItemDetail {
	id: number;
	name: string;
	year: number;
	kondisi: string;
	note: string;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
}

export interface AllUser {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
	updated_at: string;
}

export interface ItemDialogProps {
	categoryId: number;
	name: string;
	note: string;
	condition: "Baik" | "Good" | "Poor";
	year?: number;
}

export interface Ticket {
	id: number;
	userId: number;
	user: UserType;
	title: string;
	description: string;
	status: "pending" | "approved" | "rejected" | string;
	createdAt: string;
	updatedAt: string;
	reason: string;
}

export interface UnblockingForm {
	endDate: Date | undefined;
	startDate: Date | undefined;
	semester: "Ganjil" | "Genap" | string;
	tahun: number;
	userId: number;
}

export interface UnblockingResponse {
	semester: "Ganjil" | "Genap" | string;
	startDate: string;
	endDate: string;
	tahun: number;
	userId: number;
	id: number;
}

export interface AuditLogTicket {
	id: number;
	ticketId: number;
	userId: number;
	action: string;
	newValue: string;
	oldValue?: string;
	changes?: string;
	createdAt: string;
	user: UserType;
}

export interface AuditLogUser {
	id: number;
	userId: number;
	action: string;
	newValue: string;
	oldValue?: string;
	changes?: string;
	createdAt: string;
	user: UserType;
	title: string;
	description: string;
	status: string;
	reason: string;
	createdAtTicket: string;
	updatedAtTicket?: string;
	approvedAt?: string;
}

export interface ScheduleTicket {
	idSchedule: number;
	title: string;
	startDate: string;
	endDate: string;
	userId: number;
	kategori: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
	tickets?: Ticket[];
}

export interface ScheduleReguler {
	idSchedule: number;
	title: string;
	startDate: string;
	endDate: string;
	userId: number;
	kategori: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
}

export interface MergeSchedultType {
	idSchedule: number;
	title: string;
	startDate: string;
	endDate: string;
	userId: number;
	kategori: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
	tickets?: Ticket[];
	isReguler: boolean;
}