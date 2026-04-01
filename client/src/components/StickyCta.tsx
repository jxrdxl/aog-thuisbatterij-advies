import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after minimal scroll — form is already in hero but user may have scrolled past it
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/97 backdrop-blur-md border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.12)] p-3 sm:hidden animate-slide-up">
      <div className="flex gap-2">
        <Button
          asChild
          variant="outline"
          className="w-14 h-14 flex-shrink-0 border-slate-200 text-slate-700 rounded-2xl bg-white active:scale-95 transition-transform p-0"
        >
          <a href="tel:+31612712804" aria-label="Bel ons">
            <Phone className="w-5 h-5" />
          </a>
        </Button>
        <Button
          asChild
          className="flex-1 h-14 text-base font-black bg-aog-green hover:bg-aog-green-light text-white rounded-2xl shadow-lg shadow-aog-green/20 active:scale-95 transition-transform"
        >
          <a href="#lead-form">
            Vraag gratis rapport aan <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </div>
      
      {/* Trust line */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <ShieldCheck className="w-3 h-3 text-aog-green" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Gratis · Geen verplichtingen · Waarde €240
        </span>
      </div>
    </div>
  );
}
