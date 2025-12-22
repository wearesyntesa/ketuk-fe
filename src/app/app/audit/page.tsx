'use client';

import { AuditLog } from "@/components/type";
import { auditTableColumns } from "@/components/table-audit-logs";
import { useAudit } from "@/hooks/use-audit";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { 
	Activity, 
	FileText, 
	Clock,
	BadgeCheck
} from "lucide-react";

export default function AuditPage() {
	const user = useUser();
	const token = localStorage.getItem("access_token");
	const audit = useAudit(token || "");

	useEffect(() => {
		if (token) {
			audit.handleGetAllAuditLogs();
		}
	}, [token]);

	return (
		<>
			<div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
				<div className="px-4 lg:gap-2 lg:px-6 flex flex-col gap-6">
					{/* Page Header */}
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
								<Activity className="w-5 h-5 text-emerald-600" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-slate-900 tracking-tight">
									Audit Logs
								</h2>
								<p className="text-slate-500 text-sm">
									Track system activities and changes across the platform.
								</p>
							</div>
						</div>
					</div>

					{/* Statistics Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
										Total Events
									</p>
									<p className="text-2xl font-bold text-slate-900 mt-1">
										{audit.allAuditLogs?.length || 0}
									</p>
								</div>
								<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
									<FileText className="w-5 h-5 text-blue-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
										Created Events
									</p>
									<p className="text-2xl font-bold text-slate-900 mt-1">
										{audit.allAuditLogs?.filter(log => log.action === "created").length || 0}
									</p>
								</div>
								<div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
									<BadgeCheck className="w-5 h-5 text-emerald-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
										Status Changes
									</p>
									<p className="text-2xl font-bold text-slate-900 mt-1">
										{audit.allAuditLogs?.filter(log => log.action === "status_changed").length || 0}
									</p>
								</div>
								<div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
									<Activity className="w-5 h-5 text-amber-600" />
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
										Today's Activity
									</p>
									<p className="text-2xl font-bold text-slate-900 mt-1">
										{audit.allAuditLogs?.filter(log => {
											const logDate = new Date(log.createdAt).toDateString();
											const today = new Date().toDateString();
											return logDate === today;
										}).length || 0}
									</p>
								</div>
								<div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
									<Clock className="w-5 h-5 text-purple-600" />
								</div>
							</div>
						</div>
					</div>

					{/* Audit Logs Table */}
					<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
						<div className="p-4 border-b border-slate-200">
							<h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
							<p className="text-sm text-slate-500 mt-1">
								Latest system events and modifications
							</p>
						</div>
						
						{audit.allAuditLogs && audit.allAuditLogs.length > 0 ? (
							<div className="divide-y divide-slate-100">
								{audit.allAuditLogs.map((log) => (
									<AuditLogRow key={log.id} log={log} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<Activity className="w-12 h-12 text-slate-300 mb-3" />
								<h3 className="text-lg font-medium text-slate-900 mb-1">No audit logs found</h3>
								<p className="text-sm text-slate-500">
									System activities and changes will appear here once they occur.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

// Individual audit log row component
function AuditLogRow({ log }: { log: AuditLog }) {
	const getActionConfig = (action: AuditLog['action']) => {
		const configs: Record<AuditLog['action'], { icon: React.ReactElement; color: string; label: string }> = {
			created: {
				icon: <FileText className="w-4 h-4" />,
				color: "bg-emerald-50 text-emerald-700 border-emerald-100",
				label: "Created"
			},
			updated: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-blue-50 text-blue-700 border-blue-100", 
				label: "Updated"
			},
			status_changed: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-amber-50 text-amber-700 border-amber-100",
				label: "Status Changed"
			},
			deleted: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-red-50 text-red-700 border-red-100",
				label: "Deleted"
			},
			assigned: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-purple-50 text-purple-700 border-purple-100",
				label: "Assigned"
			},
			commented: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-slate-50 text-slate-700 border-slate-100",
				label: "Commented"
			},
			approved: {
				icon: <BadgeCheck className="w-4 h-4" />,
				color: "bg-green-50 text-green-700 border-green-100",
				label: "Approved"
			},
			rejected: {
				icon: <Activity className="w-4 h-4" />,
				color: "bg-rose-50 text-rose-700 border-rose-100",
				label: "Rejected"
			}
		};
		
		return configs[action] || {
			icon: <Activity className="w-4 h-4" />,
			color: "bg-gray-50 text-gray-700 border-gray-100",
			label: action
		};
	};

	const config = getActionConfig(log.action);
	const date = new Date(log.createdAt);

	return (
		<div className="p-4 hover:bg-slate-50 transition-colors">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start gap-3 flex-1">
					<div className={`p-2 rounded-lg ${config.color} mt-0.5`}>
						{config.icon}
					</div>
					
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-slate-900">{config.label}</span>
							
							{log.ticket && (
								<span className="text-sm text-slate-600">
									Ticket #{log.ticket.id}
								</span>
							)}
							
							{log.user && (
								<span className="text-sm text-slate-600">
									by {log.user.name}
								</span>
							)}
						</div>
						
						{log.ticket?.title && (
							<p className="text-sm text-slate-600 mb-2">{log.ticket.title}</p>
						)}
						
						{log.changes && (
							<div className="text-xs text-slate-500 bg-slate-50 rounded p-2 mt-2">
								Changes: {log.changes}
							</div>
						)}
						
						{log.notes && (
							<p className="text-sm text-slate-600 mt-2 italic">{log.notes}</p>
						)}
					</div>
				</div>
				
				<div className="text-right text-xs text-slate-500 min-w-[120px]">
					<div>{date.toLocaleDateString()}</div>
					<div>{date.toLocaleTimeString()}</div>
					{log.ipAddress && (
						<div className="font-mono mt-1">{log.ipAddress}</div>
					)}
				</div>
			</div>
		</div>
	);
}