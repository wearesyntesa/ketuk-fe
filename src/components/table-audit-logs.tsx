"use client";

import {
	DataTable,
	DataTableBody,
	DataTableCell,
	DataTableHead,
	DataTableHeader,
	DataTableRow,
} from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@/components/type";
import { Badge } from "@/components/ui/badge";
import { 
	Calendar, 
	User, 
	FileText, 
	Activity, 
	CheckCircle, 
	XCircle, 
	Edit3, 
	Trash2, 
	UserPlus, 
	MessageSquare,
	AlertCircle
} from "lucide-react";
import { useTranslations } from "next-intl";

interface AuditLogTableProps {
	columns: ColumnDef<AuditLog>[];
	data: AuditLog[];
}

export default function AuditLogTable({ columns, data }: AuditLogTableProps) {
	return (
		<div className="rounded-lg border">
			<DataTable>
				<DataTableHeader>
					{columns.map((column, index) => (
						<DataTableHead key={index}>
							{typeof column.header === "string" ? column.header : ""}
						</DataTableHead>
					))}
				</DataTableHeader>
				<DataTableBody>
					{data.map((row, rowIndex) => (
						<DataTableRow key={rowIndex}>
							{columns.map((column, colIndex) => (
								<DataTableCell key={colIndex}>
									{typeof column.cell === "function"
										? column.cell({ row: { original: row, getValue: (key: string) => (row as any)[key] } } as any)
										: null}
								</DataTableCell>
							))}
						</DataTableRow>
					))}
				</DataTableBody>
			</DataTable>
		</div>
	);
}

// Action icon and color mapping - returns labelKey for translation
export const getActionConfig = (action: AuditLog['action']) => {
	const configs: Record<AuditLog['action'], { icon: React.ReactElement; color: string; labelKey: string }> = {
		created: {
			icon: <FileText className="w-4 h-4" />,
			color: "bg-emerald-50 text-emerald-700 border-emerald-100",
			labelKey: "created"
		},
		updated: {
			icon: <Edit3 className="w-4 h-4" />,
			color: "bg-blue-50 text-blue-700 border-blue-100", 
			labelKey: "updated"
		},
		status_changed: {
			icon: <Activity className="w-4 h-4" />,
			color: "bg-amber-50 text-amber-700 border-amber-100",
			labelKey: "statusChanged"
		},
		deleted: {
			icon: <Trash2 className="w-4 h-4" />,
			color: "bg-red-50 text-red-700 border-red-100",
			labelKey: "deleted"
		},
		assigned: {
			icon: <UserPlus className="w-4 h-4" />,
			color: "bg-purple-50 text-purple-700 border-purple-100",
			labelKey: "assigned"
		},
		commented: {
			icon: <MessageSquare className="w-4 h-4" />,
			color: "bg-slate-50 text-slate-700 border-slate-100",
			labelKey: "commented"
		},
		approved: {
			icon: <CheckCircle className="w-4 h-4" />,
			color: "bg-green-50 text-green-700 border-green-100",
			labelKey: "approved"
		},
		rejected: {
			icon: <XCircle className="w-4 h-4" />,
			color: "bg-rose-50 text-rose-700 border-rose-100",
			labelKey: "rejected"
		}
	};
	
	return configs[action] || {
		icon: <AlertCircle className="w-4 h-4" />,
		color: "bg-gray-50 text-gray-700 border-gray-100",
		labelKey: action
	};
};

// Hook to get translated column definitions
export function useAuditTableColumns(): ColumnDef<AuditLog>[] {
	const t = useTranslations("audit");
	
	return [
		{
			accessorKey: "id",
			header: t("id"),
			cell: ({ row }) => (
				<span className="font-mono text-sm text-slate-600">
					#{row.getValue("id")}
				</span>
			),
		},
		{
			accessorKey: "action",
			header: t("action"),
			cell: ({ row }) => {
				const action = row.getValue("action") as AuditLog['action'];
				const config = getActionConfig(action);
				return (
					<Badge className={`${config.color} gap-1 items-center`}>
						{config.icon}
						{t(config.labelKey)}
					</Badge>
				);
			},
		},
		{
			accessorKey: "user",
			header: t("user"),
			cell: ({ row }) => {
				const user = row.original.user;
				return user ? (
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
							<User className="w-3 h-3 text-primary" />
						</div>
						<div>
							<div className="font-medium text-sm">{user.name}</div>
							<div className="text-xs text-slate-500">{user.email}</div>
						</div>
					</div>
				) : (
					<span className="text-slate-400 text-sm">{t("system")}</span>
				);
			},
		},
		{
			accessorKey: "ticket",
			header: t("ticket"),
			cell: ({ row }) => {
				const ticket = row.original.ticket;
				return ticket ? (
					<div>
						<div className="font-medium text-sm">#{ticket.id}</div>
						<div className="text-xs text-slate-500 truncate max-w-[150px]">
							{ticket.title}
						</div>
					</div>
				) : (
					<span className="text-slate-400 text-sm">-</span>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: t("dateTime"),
			cell: ({ row }) => {
				const date = new Date(row.getValue("createdAt"));
				return (
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4 text-slate-400" />
						<div>
							<div className="text-sm font-medium">
								{date.toLocaleDateString()}
							</div>
							<div className="text-xs text-slate-500">
								{date.toLocaleTimeString()}
							</div>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: "ipAddress",
			header: t("ipAddress"),
			cell: ({ row }) => {
				const ipAddress = row.getValue("ipAddress") as string | null;
				return ipAddress ? (
					<span className="font-mono text-sm text-slate-600">
						{ipAddress}
					</span>
				) : (
					<span className="text-slate-400 text-sm">-</span>
				);
			},
		},
	];
}