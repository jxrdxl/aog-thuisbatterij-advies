import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Zap, ArrowRight } from "lucide-react";

/**
 * ExitIntentPopup
 * - Desktop: fires when mouse leaves viewport toward the top (classic exit intent)
 * - Mobile: fires after 45s of inactivity (user likely to leave)
 * - Shows max once per session (sessionStorage flag)
 */
export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    if (sessionStorage.getItem("exit_popup_shown")) return;
    sessionStorage.setItem("exit_popup_shown", "1");
    setVisible(true);
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves toward top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        show();
      }
    };

    // Mobile: inactivity timer (45s)
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(show, 45000);
    };

    const isMobile = window.innerWidth < 640;

    if (!isMobile) {
      document.addEventListener("mouseleave", handleMouseLeave);
    } else {
      ["touchstart", "touchmove", "scroll"].forEach((ev) =>
        window.addEventListener(ev, resetTimer, { passive: true })
      );
      resetTimer();
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(inactivityTimer);
    };
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>

        {/* Urgency badge */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-3 py-1 mb-4">
          <Zap className="w-3 h-3 text-red-500 fill-current" />
          <span className="text-xs font-black text-red-600 uppercase tracking-widest">Wacht even!</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-3 leading-tight">
          Weet u al hoeveel u verliest in 2027?
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          De salderingsregeling verdwijnt per 1 januari 2027. Huishoudens met zonnepanelen betalen dan gemiddeld <strong>€1.645 meer per jaar</strong>. Vraag nu gratis uw persoonlijk rapport aan — het duurt 2 minuten.
        </p>

        <div className="bg-aog-green/5 border border-aog-green/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aog-green/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📋</span>
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">Gratis Adviesrapport</p>
              <p className="text-xs text-slate-500">Waarde €240 · Geen verplichtingen · Binnen 2 uur gebeld</p>
            </div>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="w-full h-14 bg-aog-green hover:bg-aog-green-light text-white font-black text-base rounded-2xl shadow-lg shadow-aog-green/20"
          onClick={() => setVisible(false)}
        >
          <a href="#lead-form">
            Ja, ik wil mijn gratis rapport <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>

        <p className="text-center text-xs text-slate-400 mt-4">
          ✓ 100% gratis · ✓ Geen spam · ✓ Onafhankelijk advies
        </p>
      </div>
    </div>
  );
}
