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

// {
//   "success": true,
//   "message": "Users retrieved successfully",
//   "data": [
//     {
//       "id": 1,
//       "google_sub": "116165663391178858009",
//       "name": "006_NaufalFarrasPratama _TIA22",
//       "email": "naufalfarras.22006@mhs.unesa.ac.id",
//       "role": "user",
//       "created_at": "2025-11-28T03:05:45.886879Z",
//       "updated_at": "2025-11-28T03:06:56.48308Z"
//     },
//     {
//       "id": 2,
//       "name": "John Doe",
//       "email": "user@example.com",
//       "role": "admin",
//       "created_at": "2025-12-04T08:20:02.377043Z",
//       "updated_at": "2025-12-06T12:27:02.777603Z"
//     },
//     {
//       "id": 3,
//       "google_sub": "116743729582255832004",
//       "name": "Ahmd Mufahras Li Alfazh Assardew",
//       "email": "alfazh291@gmail.com",
//       "role": "user",
//       "created_at": "2025-12-04T08:24:12.391076Z",
//       "updated_at": "2025-12-07T04:57:46.853155Z"
//     },
//     {
//       "id": 4,
//       "google_sub": "101582276453371839021",
//       "name": "Ahmd Mufahras Li Alfazh Assardew",
//       "email": "alfazh.work@gmail.com",
//       "role": "admin",
//       "created_at": "2025-12-06T06:04:27.173377Z",
//       "updated_at": "2025-12-07T15:48:42.825312Z"
//     }
//   ]
// }

export interface AllUser {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
	updated_at: string;
}

