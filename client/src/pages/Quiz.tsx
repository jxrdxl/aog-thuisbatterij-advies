import { Suspense, lazy } from "react";
import Header from "@/components/Header";

// We laden het formulier in via lazy-loading
const LeadForm = lazy(() => import("@/components/LeadForm"));

export default function Quiz() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950">
      <Header />
      
      <main className="flex-grow relative flex items-center justify-center pt-24 pb-12 px-4">
        {/* Achtergrond styling passend bij de AOG stijl */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(2,6,23,0.98))]" />
        
        <div className="w-full max-w-2xl relative z-10">
          <Suspense fallback={<div className="h-[620px] rounded-[28px] bg-white/10 animate-pulse" />}>
            <LeadForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
