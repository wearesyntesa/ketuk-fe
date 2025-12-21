"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden selection:bg-slate-200">
      
      <style jsx>{`
        @keyframes blob-1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes blob-2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes liquid-shader {
          0% { background-position: 0% 0%, 100% 0%, 0 0; }
          100% { background-position: 100% 20%, 0% 20%, 0 0; }
        }

        .text-shader {
            background-image: 
                radial-gradient(circle at 50% 50%, #cbd5e1 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 50%),
                linear-gradient(to right, #0f172a, #475569, #0f172a);
            
            background-size: 200% 200%, 200% 200%, 100% 100%;
            background-blend-mode: exclusion, difference, normal;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;            
            animation: liquid-shader 10s ease-in-out infinite alternate;            
            filter: contrast(120%) brightness(110%) drop-shadow(0 20px 30px rgba(0,0,0,0.15));
        }
      `}</style>

      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div
        className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        
        <div className="relative group">
          <h1 className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-black tracking-tighter leading-none select-none relative z-10 text-shader">
             404
          </h1>
        </div>

        <div className="mt-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <p className="text-sm font-mono text-slate-400 uppercase tracking-[0.3em]">
                Page Not Found
            </p>
        </div>

        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link 
                href="/" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-500 hover:shadow-lg hover:scale-105"
                aria-label="Return Home"
            >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </Link>
        </div>

      </div>
    </div>
  );
}