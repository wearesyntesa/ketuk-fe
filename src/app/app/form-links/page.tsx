"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import {
  Copy,
  EllipsisVertical,
  ExternalLink,
  Link2,
  Plus,
  QrCode,
  Power,
  Trash2,
  Eye,
  CopyPlus,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

import { FormLink, CreateFormLinkRequest } from "@/components/type";
import { useFormLinks } from "@/hooks/use-form-links";
import { useUser } from "@/hooks/use-user";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";

export default function FormLinksPage() {
  const t = useTranslations("formLinks");
  const tCommon = useTranslations("common");
  const tQr = useTranslations("qrCode");
  const user = useUser();
  const formLinksHook = useFormLinks();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [selectedFormLink, setSelectedFormLink] = useState<FormLink | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [formLinkToAction, setFormLinkToAction] = useState<FormLink | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Create form state
  const [formData, setFormData] = useState<CreateFormLinkRequest>({
    title: "",
    description: "",
    picName: "",
    picEmail: "",
    picPhone: "",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    maxSubmissions: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || "";
    if (token) {
      formLinksHook.handleGetAllFormLinks(token);
    }
  }, []);

  const getStatusBadge = (formLink: FormLink) => {
    const now = new Date();
    const expiresAt = new Date(formLink.expiresAt);

    if (!formLink.isActive) {
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          {t("deactivated")}
        </Badge>
      );
    }

    if (expiresAt < now) {
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200">
          {t("expired")}
        </Badge>
      );
    }

    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
        {t("active")}
      </Badge>
    );
  };

  const copyToClipboard = (code: string) => {
    const url = formLinksHook.getFormUrl(code);
    navigator.clipboard.writeText(url);
    toast.success(t("linkCopied"));
  };

  const handleCreateFormLink = async () => {
    if (!formData.title || !formData.picName || !formData.picEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("access_token") || "";
    const result = await formLinksHook.handleCreateFormLink(formData, token);

    if (result) {
      setIsCreateDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        picName: "",
        picEmail: "",
        picPhone: "",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxSubmissions: null,
      });
      formLinksHook.handleGetAllFormLinks(token);
    }
    setIsSubmitting(false);
  };

  const handleDeactivate = async () => {
    if (!formLinkToAction) return;
    const token = localStorage.getItem("access_token") || "";
    await formLinksHook.handleDeactivateFormLink(formLinkToAction.id, token);
    formLinksHook.handleGetAllFormLinks(token);
    setDeactivateDialogOpen(false);
    setFormLinkToAction(null);
  };

  const handleDelete = async () => {
    if (!formLinkToAction) return;
    const token = localStorage.getItem("access_token") || "";
    await formLinksHook.handleDeleteFormLink(formLinkToAction.id, token);
    formLinksHook.handleGetAllFormLinks(token);
    setDeleteDialogOpen(false);
    setFormLinkToAction(null);
  };

  const handleClone = async (formLink: FormLink) => {
    const token = localStorage.getItem("access_token") || "";
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await formLinksHook.handleCloneFormLink(formLink.id, newExpiresAt, token);
    formLinksHook.handleGetAllFormLinks(token);
  };

  const columns: ColumnDef<FormLink>[] = useMemo(
    () => [
      {
        accessorKey: "code",
        header: t("code"),
        cell: ({ row }) => (
          <code className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">
            {row.getValue("code")}
          </code>
        ),
      },
      {
        accessorKey: "title",
        header: t("formTitle"),
      },
      {
        accessorKey: "picName",
        header: t("picName"),
      },
      {
        accessorKey: "expiresAt",
        header: t("expiresAt"),
        cell: ({ row }) => {
          const date = new Date(row.getValue("expiresAt"));
          return format(date, "PPP");
        },
      },
      {
        accessorKey: "submissionCount",
        header: t("submissions"),
        cell: ({ row }) => {
          const formLink = row.original;
          const count = formLink.submissionCount;
          const max = formLink.maxSubmissions;
          return (
            <span>
              {count}
              {max ? ` / ${max}` : ""}
            </span>
          );
        },
      },
      {
        id: "status",
        header: t("status"),
        cell: ({ row }) => getStatusBadge(row.original),
      },
      {
        id: "actions",
        header: tCommon("actions"),
        cell: ({ row }) => {
          const formLink = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => copyToClipboard(formLink.code)}>
                  <Copy className="h-4 w-4 mr-2" />
                  {t("copyLink")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedFormLink(formLink);
                    setIsQRDialogOpen(true);
                  }}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  {t("viewQR")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(formLinksHook.getFormUrl(formLink.code), "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {tCommon("open")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleClone(formLink)}>
                  <CopyPlus className="h-4 w-4 mr-2" />
                  {t("clone")}
                </DropdownMenuItem>
                {formLink.isActive && (
                  <DropdownMenuItem
                    onClick={() => {
                      setFormLinkToAction(formLink);
                      setDeactivateDialogOpen(true);
                    }}
                  >
                    <Power className="h-4 w-4 mr-2" />
                    {t("deactivate")}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => {
                    setFormLinkToAction(formLink);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {tCommon("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [t, tCommon]
  );

  const table = useReactTable({
    data: formLinksHook.formLinks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="@container/main flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-slate-500 text-sm">{t("description")}</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                {t("newFormLink")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t("createFormLink")}</DialogTitle>
                <DialogDescription>
                  {t("description")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">{t("formTitle")} *</Label>
                  <Input
                    id="title"
                    placeholder={t("formTitlePlaceholder")}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">{t("formDescription")}</Label>
                  <Textarea
                    id="description"
                    placeholder={t("formDescriptionPlaceholder")}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="picName">{t("picName")} *</Label>
                    <Input
                      id="picName"
                      placeholder={t("picNamePlaceholder")}
                      value={formData.picName}
                      onChange={(e) =>
                        setFormData({ ...formData, picName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="picEmail">{t("picEmail")} *</Label>
                    <Input
                      id="picEmail"
                      type="email"
                      placeholder={t("picEmailPlaceholder")}
                      value={formData.picEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, picEmail: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="picPhone">{t("picPhone")}</Label>
                  <Input
                    id="picPhone"
                    placeholder={t("picPhonePlaceholder")}
                    value={formData.picPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, picPhone: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>{t("expiresAt")} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !formData.expiresAt && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.expiresAt
                            ? format(formData.expiresAt, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.expiresAt}
                          onSelect={(date) =>
                            date && setFormData({ ...formData, expiresAt: date })
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="maxSubmissions">{t("maxSubmissions")}</Label>
                    <Input
                      id="maxSubmissions"
                      type="number"
                      placeholder={t("maxSubmissionsPlaceholder")}
                      value={formData.maxSubmissions || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxSubmissions: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  {tCommon("cancel")}
                </Button>
                <Button
                  onClick={handleCreateFormLink}
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isSubmitting ? t("creating") : t("createFormLink")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="p-2 mb-4">
          <Input
            placeholder={`${tCommon("search")}...`}
            className="max-w-sm"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </Card>

        {/* Table */}
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="px-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/50">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Link2 className="h-8 w-8 text-slate-300" />
                      <p>{t("noFormLinks")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex justify-between items-center px-2 mt-4">
          <div className="text-sm text-muted-foreground">
            {tCommon("page")} {table.getState().pagination.pageIndex + 1}{" "}
            {tCommon("of")} {table.getPageCount() || 1}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {tCommon("previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {tCommon("next")}
            </Button>
          </div>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{t("qrCodeTitle")}</DialogTitle>
            <DialogDescription>{t("qrCodeDescription")}</DialogDescription>
          </DialogHeader>
          {selectedFormLink && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="p-4 bg-white rounded-lg border" id="qr-code-container">
                <QRCodeSVG
                  value={formLinksHook.getFormUrl(selectedFormLink.code)}
                  size={192}
                  level="H"
                  includeMargin={true}
                  className="rounded"
                />
              </div>
              <div className="text-center">
                <p className="font-medium">{selectedFormLink.title}</p>
                <code className="text-sm text-slate-500 break-all">
                  {formLinksHook.getFormUrl(selectedFormLink.code)}
                </code>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(selectedFormLink.code)}
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t("copyLink")}
                </Button>
                <Button
                  onClick={() => {
                    const svg = document.querySelector("#qr-code-container svg");
                    if (svg) {
                      const svgData = new XMLSerializer().serializeToString(svg);
                      const canvas = document.createElement("canvas");
                      const ctx = canvas.getContext("2d");
                      const img = new Image();
                      img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx?.drawImage(img, 0, 0);
                        const pngFile = canvas.toDataURL("image/png");
                        const downloadLink = document.createElement("a");
                        downloadLink.download = `qr-${selectedFormLink.code}.png`;
                        downloadLink.href = pngFile;
                        downloadLink.click();
                      };
                      img.src = "data:image/svg+xml;base64," + btoa(svgData);
                    }
                  }}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {tQr("downloadQRCode")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirmation */}
      <AlertDialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deactivate")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("confirmDeactivate")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeactivate}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {t("deactivate")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteFormLink")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("confirmDelete")}
              <br />
              <span className="text-red-600 text-sm">{t("deleteWarning")}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {tCommon("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
