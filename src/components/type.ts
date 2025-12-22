export interface SideBarItem {
	title: string;
	url: string;
	icon: React.ElementType;
	child: SubItem[];
	bgGradient?: string;
}

export interface AuditLog {
	id: number;
	ticketId: number;
	userId?: number;
	action: "created" | "updated" | "status_changed" | "deleted" | "assigned" | "commented" | "approved" | "rejected";
	oldValue?: string;
	newValue?: string;
	changes?: string;
	ipAddress?: string;
	userAgent?: string;
	notes?: string;
	createdAt: string;
	ticket?: {
		id: number;
		title: string;
	};
	user?: {
		id: number;
		name: string;
		email: string;
	};
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
	status?: "Pending" | "Accepted" | "Cancelled";
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
	status: "Pending" | "Accepted" | "Cancelled" | string;
	startTime: string;
	endTime: string;
	date: string; // YYYY-MM-DD
	day: string; // weekday name
}

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
	condition: "Good" | "Poor";
	year?: number;
}

export interface Ticket {
	id: number;
	userId: number;
	user: UserType;
	title: string;
	description: string;
	status: "pending" | "accepted" | "rejected" | string;
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
	date: Date;
	day: string;
	userId: number;
	kategori: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	user: UserType;
	status: "pending" | "accepted" | "rejected" | string;
	tickets?: Ticket[];
	isReguler: boolean;
}

export interface AuditLogByUser {
	id: number;
	ticketId: number;
	userId: number;
	action: string;
	newValue: string;
	oldValue?: string;
	changes?: string;
	createdAt: string;
	ticket: Ticket;
}

export interface AuditLogByTicket {
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

export interface ScheduleDataTicket {
	description: string;
	endDate: Date;
	startDate: Date;
	category: "Kelas" | "Praktikum" | "Skripsi" | string;
	title: string;
	userId: number;
}

export interface ScheduleRegulerDataTicket {
	endDate: Date;
	startDate: Date;
	title: string;
	userId: number;
}

export interface CategoryChartData {
  category: "Praktikum" | "Kelas" | "Skripsi" | string;
  totalRequest: number;
  fill: string;
}

export interface PatchTicketStatus {
	status: "pending" | "accepted" | "rejected";
	reason?: string;
}

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]