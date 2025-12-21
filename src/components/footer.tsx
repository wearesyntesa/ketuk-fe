import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-20 pb-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20 pb-12 border-b border-slate-200">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Ready to modernize your lab?</h2>
            <p className="text-slate-500 text-lg">Join forward-thinking universities today.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/demo"
              className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              View Demo
            </Link>
            <Link
              href="/app"
              className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col gap-6 pr-8">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                K
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Ketuk</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 font-medium max-w-sm">
              The operating system for University Lab Management. We help faculties streamline schedules, track assets,
              and manage student access requests in one unified platform.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-600">All systems operational</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/app" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/app/schedule-lab" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Scheduling
                </Link>
              </li>
              <li>
                <Link href="/app/inventory" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://github.com/wearesyntesa"
                  target="_blank"
                  className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
                >
                  GitHub{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/KeCh9tb8hv"
                  target="_blank"
                  className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
                >
                  Discord{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/syntesa"
                  target="_blank"
                  className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
                >
                  Instagram{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="mailto:contact@ketuk.app"
                  className="text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  contact@ketuk.app
                </Link>
              </li>
              <li className="pt-4 text-xs text-slate-400 leading-relaxed">
                Universitas Negeri Surabaya
                <br />
                A10 Building, Room 3 & 4<br />
                Surabaya, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© 2024 Ketuk Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-slate-900 transition-colors">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span>Designed by Syntesa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
