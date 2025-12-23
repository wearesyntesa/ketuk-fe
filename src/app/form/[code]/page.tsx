"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { motion, AnimatePresence, Transition } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  BookOpen,
  GraduationCap,
  FlaskConical,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

import { useFormLinks } from "@/hooks/use-form-links";
import { PublicFormResponse, PublicFormSubmitRequest } from "@/components/type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// --- ANIMATION CONFIG ---
const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

// --- TYPES ---
type FormStep =
  | "welcome"
  | "name"
  | "contact"
  | "category"
  | "eventTitle"
  | "dateTime"
  | "description"
  | "review"
  | "success"
  | "error";

type Category = "Praktikum" | "Kelas" | "Skripsi" | "Lainnya";

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: Category | "";
  eventTitle: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  description: string;
}

const STEPS: FormStep[] = ["welcome", "name", "contact", "category", "eventTitle", "dateTime", "description", "review"];

export default function PublicFormPage() {
  const params = useParams();
  const code = params.code as string;
  const t = useTranslations("publicForm");
  const formLinksHook = useFormLinks();

  const [formConfig, setFormConfig] = useState<PublicFormResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState<"expired" | "full" | "notFound" | "inactive" | null>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>("welcome");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    category: "",
    eventTitle: "",
    date: undefined,
    startTime: "08:00",
    endTime: "10:00",
    description: "",
  });

  useEffect(() => {
    const fetchForm = async () => {
      const data = await formLinksHook.handleGetPublicForm(code);
      if (!data) {
        setErrorState("notFound");
      } else if (!data.isAvailable) {
        const expiresAt = new Date(data.expiresAt);
        if (expiresAt < new Date()) {
          setErrorState("expired");
        } else if (data.remainingSlots === 0) {
          setErrorState("full");
        } else {
          setErrorState("inactive");
        }
      } else {
        setFormConfig(data);
      }
      setLoading(false);
    };
    fetchForm();
  }, [code]);

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = currentStep === "success" ? 100 : (currentStepIndex / (STEPS.length - 1)) * 100;

  // --- NAVIGATION HELPERS ---

  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  }, [currentStepIndex]);

  const goToPrevStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  }, [currentStepIndex]);

  // --- VALIDATION LOGIC (Moved up to fix ReferenceError) ---
  const canProceed = useCallback((): boolean => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "name":
        return formData.name.trim().length >= 2;
      case "contact":
        return formData.email.includes("@") && formData.email.includes(".");
      case "category":
        return formData.category !== "";
      case "eventTitle":
        return formData.eventTitle.trim().length >= 3;
      case "dateTime":
        return formData.date !== undefined && !!formData.startTime && !!formData.endTime;
      case "description":
        return true;
      case "review":
        return true;
      default:
        return false;
    }
  }, [currentStep, formData]);

  // --- KEYBOARD HANDLER ---
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (currentStep === "description") return; // Allow new lines in textarea

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canProceed()) {
          goToNextStep();
        }
      }
    },
    [goToNextStep, canProceed, currentStep],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSubmit = async () => {
    if (!formData.date) return;
    setIsSubmitting(true);

    const [startHour, startMin] = formData.startTime.split(":").map(Number);
    const [endHour, endMin] = formData.endTime.split(":").map(Number);

    const startDate = new Date(formData.date);
    startDate.setHours(startHour, startMin, 0, 0);

    const endDate = new Date(formData.date);
    endDate.setHours(endHour, endMin, 0, 0);

    const submission: PublicFormSubmitRequest = {
      submitterName: formData.name,
      submitterEmail: formData.email,
      submitterPhone: formData.phone,
      title: formData.eventTitle,
      description: formData.description,
      category: formData.category,
      startDate,
      endDate,
    };

    const result = await formLinksHook.handleSubmitPublicForm(code, submission);

    if (result) {
      setConfirmationCode(result.confirmationCode);
      setCurrentStep("success");
    }
    setIsSubmitting(false);
  };

  const getTimeRemaining = () => {
    if (!formConfig) return null;
    const expiresAt = new Date(formConfig.expiresAt);
    const now = new Date();
    const days = differenceInDays(expiresAt, now);
    const hours = differenceInHours(expiresAt, now) % 24;

    if (days > 0) return `${days} ${t("days")}`;
    if (hours > 0) return `${hours} ${t("hours")}`;
    return `< 1 ${t("hours")}`;
  };

  // --- RENDER STATES ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          <p className="text-slate-500 font-medium animate-pulse">Loading form...</p>
        </div>
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center space-y-6 border border-slate-100">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center ring-8 ring-red-50/50">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {errorState === "expired" && t("formExpired")}
              {errorState === "full" && t("formFull")}
              {errorState === "notFound" && t("formNotFound")}
              {errorState === "inactive" && t("formInactive")}
            </h1>
            <p className="text-slate-500">
              {errorState === "expired" && t("formExpiredMessage")}
              {errorState === "full" && t("formFullMessage")}
              {errorState === "notFound" && t("formNotFoundMessage")}
              {errorState === "inactive" && t("formInactiveMessage")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN FORM UI ---

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-100 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:py-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md py-2 px-4 rounded-full border border-white/50 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="font-semibold text-slate-800 text-sm truncate max-w-[150px] md:max-w-xs">
              {formConfig?.title}
            </span>
          </div>

          {formConfig?.remainingSlots !== null && (
            <div className="hidden md:flex items-center gap-2 bg-slate-900/5 backdrop-blur-md py-1.5 px-3 rounded-full text-xs font-medium text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              {t("expiresIn")} <span className="text-slate-900 font-bold">{getTimeRemaining()}</span>
            </div>
          )}
        </div>
      </motion.header>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-32 relative z-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* WELCOME */}
            {currentStep === "welcome" && (
              <motion.div
                key="welcome"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                className="text-center space-y-8"
              >
                <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-xl shadow-emerald-100/50 mb-4">
                    <FileText className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {t("welcomeTitle")}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
                    {formConfig?.description || t("letsGetStarted")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={goToNextStep}
                    size="lg"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-lg px-10 py-7 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("letsGetStarted")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <div className="mt-4 text-sm text-slate-400 font-medium">{t("pressEnter")} ↵</div>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 1: NAME */}
            {currentStep === "name" && (
              <StepContainer step={1} icon={User} title={t("yourName")}>
                <Input
                  autoFocus
                  placeholder={t("namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-3xl md:text-4xl py-8 px-0 border-0 border-b-2 border-slate-200 rounded-none focus:ring-0 focus-visible:ring-0 focus:border-emerald-500 bg-transparent placeholder:text-slate-300 font-medium transition-all"
                />
              </StepContainer>
            )}

            {/* STEP 2: CONTACT */}
            {currentStep === "contact" && (
              <StepContainer step={2} icon={Mail} title={t("yourContact")}>
                <div className="space-y-8">
                  <Input
                    autoFocus
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-2xl md:text-3xl py-6 px-0 border-0 border-b-2 border-slate-200 rounded-none focus:ring-0 focus-visible:ring-0 focus:border-emerald-500 bg-transparent placeholder:text-slate-300 font-medium"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {t("phone")}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-xl md:text-2xl py-4 px-0 border-0 border-b-2 border-slate-200 rounded-none focus:ring-0 focus-visible:ring-0 focus:border-emerald-500 bg-transparent placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </StepContainer>
            )}

            {/* STEP 3: CATEGORY */}
            {currentStep === "category" && (
              <StepContainer step={3} icon={BookOpen} title={t("selectCategory")}>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {[
                    { key: "Praktikum", icon: FlaskConical, label: t("practicum"), desc: t("practicumDesc") },
                    { key: "Kelas", icon: BookOpen, label: t("class"), desc: t("classDesc") },
                    { key: "Skripsi", icon: GraduationCap, label: t("thesis"), desc: t("thesisDesc") },
                    { key: "Lainnya", icon: MoreHorizontal, label: t("other"), desc: t("otherDesc") },
                  ].map(({ key, icon: Icon, label, desc }) => (
                    <motion.button
                      key={key}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFormData({ ...formData, category: key as Category });
                        setTimeout(goToNextStep, 250);
                      }}
                      className={cn(
                        "relative p-6 rounded-2xl border text-left transition-all duration-300 group",
                        formData.category === key
                          ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-100"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md",
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                          formData.category === key
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-50 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600",
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-bold text-slate-900 mb-1">{label}</p>
                      <p className="text-sm text-slate-500 group-hover:text-slate-600">{desc}</p>

                      {formData.category === key && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </StepContainer>
            )}

            {/* STEP 4: EVENT TITLE */}
            {currentStep === "eventTitle" && (
              <StepContainer step={4} icon={FileText} title={t("eventTitle")}>
                <Input
                  autoFocus
                  placeholder={t("eventTitlePlaceholder")}
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                  className="text-2xl md:text-3xl py-6 px-0 border-0 border-b-2 border-slate-200 rounded-none focus:ring-0 focus-visible:ring-0 focus:border-emerald-500 bg-transparent placeholder:text-slate-300 font-medium"
                />
              </StepContainer>
            )}

            {/* STEP 5: DATE & TIME */}
            {currentStep === "dateTime" && (
              <StepContainer step={5} icon={Calendar} title={t("selectDateTime")}>
                <div className="space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                  {/* Date Picker */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("date")}</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left text-lg h-14 rounded-xl border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <Calendar className="mr-3 h-5 w-5 text-emerald-600" />
                          {formData.date ? format(formData.date, "PPP") : t("selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl shadow-xl" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => setFormData({ ...formData, date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="rounded-xl border-none"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Inputs */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {t("startTime")}
                      </label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                          className="text-lg h-14 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 pl-4 bg-slate-50/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {t("endTime")}
                      </label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          className="text-lg h-14 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 pl-4 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </StepContainer>
            )}

            {/* STEP 6: DESCRIPTION */}
            {currentStep === "description" && (
              <StepContainer step={6} icon={FileText} title={t("additionalInfo")}>
                <div className="relative">
                  <Textarea
                    autoFocus
                    placeholder={t("additionalInfoPlaceholder")}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="text-lg min-h-[200px] p-6 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 resize-none bg-white shadow-sm transition-all"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-slate-400">Optional</div>
                </div>
              </StepContainer>
            )}

            {/* STEP 7: REVIEW */}
            {currentStep === "review" && (
              <StepContainer step={7} icon={Check} title={t("reviewSubmission")}>
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  {/* Ticket Header */}
                  <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Request Summary</p>
                        <p className="font-semibold">{formConfig?.title}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500 rounded-full text-xs font-bold text-white">READY</div>
                  </div>

                  {/* Ticket Body */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                      <ReviewItem label={t("name")} value={formData.name} icon={<User className="w-4 h-4" />} />
                      <ReviewItem label={t("email")} value={formData.email} icon={<Mail className="w-4 h-4" />} />
                      {formData.phone && (
                        <ReviewItem label={t("phone")} value={formData.phone} icon={<Phone className="w-4 h-4" />} />
                      )}
                      <ReviewItem
                        label={t("category")}
                        value={formData.category}
                        icon={<BookOpen className="w-4 h-4" />}
                      />
                    </div>

                    <div className="h-px bg-slate-100 w-full" />

                    <div className="space-y-4">
                      <ReviewItem label={t("event")} value={formData.eventTitle} fullWidth />
                      <ReviewItem
                        label={t("dateTime")}
                        value={
                          formData.date
                            ? `${format(formData.date, "EEEE, d MMMM yyyy")} • ${formData.startTime} - ${formData.endTime}`
                            : ""
                        }
                        icon={<Calendar className="w-4 h-4" />}
                        highlight
                        fullWidth
                      />
                      <ReviewItem label={t("notes")} value={formData.description || t("noNotes")} fullWidth />
                    </div>
                  </div>

                  {/* Ticket Action */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-7 rounded-xl shadow-lg shadow-emerald-200 transition-all hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          {t("submit")}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </StepContainer>
            )}

            {/* SUCCESS STATE */}
            {currentStep === "success" && (
              <motion.div
                key="success"
                variants={pageVariants}
                initial="initial"
                animate="in"
                className="text-center space-y-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-28 h-28 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="h-14 w-14 text-emerald-600" />
                  </motion.div>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                      animate={{ opacity: 0, x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-400 rounded-full"
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-900">{t("successTitle")}</h1>
                  <p className="text-slate-600 max-w-md mx-auto">{t("successMessage")}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 max-w-md mx-auto relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500" />
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                    {t("confirmationCode")}
                  </p>
                  <div className="text-4xl font-mono font-bold text-slate-900 tracking-wider bg-slate-50 py-4 rounded-xl border border-slate-200 border-dashed">
                    {confirmationCode}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 bg-emerald-50/50 p-3 rounded-lg">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Please save this code for your records</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setCurrentStep("welcome");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        category: "",
                        eventTitle: "",
                        date: undefined,
                        startTime: "08:00",
                        endTime: "10:00",
                        description: "",
                      });
                    }}
                    variant="ghost"
                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  >
                    {t("submitAnother")}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER NAVIGATION - FIXED & CLICKABLE */}
      {!["welcome", "success", "error"].includes(currentStep) && (
        <motion.footer
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-4 md:p-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={goToPrevStep}
              className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-4 py-2 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("back")}
            </Button>

            {currentStep !== "review" && (
              <Button
                onClick={goToNextStep}
                disabled={!canProceed()}
                className={cn(
                  "rounded-xl px-6 py-2 shadow-lg shadow-emerald-100 transition-all flex items-center gap-2 font-medium",
                  canProceed()
                    ? "bg-slate-900 hover:bg-slate-800 text-white active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed",
                )}
              >
                {t("continue")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.footer>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StepContainer({
  step,
  icon: Icon,
  title,
  children,
}: {
  step: number;
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={`step-${step}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 w-full"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-emerald-700 text-sm font-bold border border-emerald-100">
          <Icon className="h-4 w-4" />
          <span>Step {step} of 7</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{title}</h2>
      </div>
      <div className="pt-2">{children}</div>
    </motion.div>
  );
}

function ReviewItem({
  label,
  value,
  icon,
  fullWidth,
  highlight,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "space-y-1.5",
        fullWidth ? "col-span-full" : "",
        highlight ? "bg-emerald-50 p-4 rounded-xl border border-emerald-100" : "",
      )}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "text-base md:text-lg font-medium text-slate-900 break-words",
          highlight ? "text-emerald-900" : "",
        )}
      >
        {value || "-"}
      </div>
    </div>
  );
}
