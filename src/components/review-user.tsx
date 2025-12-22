"use client";

import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

const reviews = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lab Coordinator @ CS-EDU",
    text: "Ketuk completely replaced our spreadsheet chaos. The scheduling conflict detection alone saved us 20+ hours this semester.",
    rating: 5,
    className: "md:col-span-2 bg-slate-50", // WIDE CARD
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "CS Student",
    text: "Finally, I don't have to physically walk to the lab just to check if a PC is available. Real-time status is a lifesaver.",
    rating: 5,
    className: "bg-white",
  },
  {
    id: 3,
    name: "Dr. Budi Santoso",
    role: "Head of Bio-Informatics",
    text: "The reporting features give me exactly the data I need for accreditation. Highly recommended for any university department.",
    rating: 5,
    className: "bg-zinc-900 text-white dark-mode-card", // DARK FEATURE CARD
  },
  {
    id: 4,
    name: "Jessica Wu",
    role: "Teaching Assistant",
    text: "Super fast. The interface is clean and doesn't get in the way. It just works.",
    rating: 4,
    className: "bg-white",
  },
  {
    id: 5,
    name: "Marcus Johnson",
    role: "Infrastructure Lead",
    text: "Integration with our existing auth system was surprisingly easy. Setup took less than an afternoon.",
    rating: 5,
    className: "md:col-span-2 bg-blue-50/50 border-blue-100", // WIDE TINTED CARD
  },
];

export default function ReviewBento() {
  const t = useTranslations("reviews");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              {t("trustedByFaculties")}
            </h2>
            <p className="text-lg text-slate-500">
              {t("joinDepartments")}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
              ))}
            </div>
            <span className="text-sm font-medium text-green-800">100+ {t("activeLabs")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`group relative p-8 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md ${review.className}`}
            >
              <Quote
                className={`absolute top-8 right-8 w-8 h-8 opacity-10 ${review.id === 3 ? "text-white" : "text-slate-900"}`}
              />

              <div className="flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${review.id === 3 ? "fill-yellow-500 text-yellow-500" : "fill-amber-400 text-amber-400"}`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-lg font-medium leading-relaxed ${review.id === 3 ? "text-zinc-100" : "text-slate-700"}`}
                  >
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${review.id === 3 ? "bg-zinc-800 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${review.id === 3 ? "text-white" : "text-slate-900"}`}>
                      {review.name}
                    </h4>
                    <p className={`text-xs ${review.id === 3 ? "text-zinc-400" : "text-slate-500"}`}>{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
