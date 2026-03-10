import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { trackContact, trackInitiateCheckout } = useTracking();

  useEffect(() => {
    const handleScroll = () => {
      // Show when user has scrolled past hero
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] p-4 sm:hidden animate-slide-up">
      <div className="flex gap-3">
        <Button
          asChild
          variant="outline"
          className="flex-1 h-14 text-sm font-black border-slate-200 text-slate-700 rounded-2xl bg-white active:scale-95 transition-transform"
          onClick={() => trackContact({ method: 'phone', source: 'sticky_cta' })}
        >
          <a href="tel:+31612712804">
            <Phone className="w-5 h-5 mr-2" /> Bel
          </a>
        </Button>
        <Button
          asChild
          className="flex-[2] h-14 text-base font-black bg-aog-green hover:bg-aog-green-light text-white rounded-2xl shadow-lg shadow-aog-green/20 active:scale-95 transition-transform"
          onClick={() => trackInitiateCheckout({ source: 'sticky_cta' })}
        >
          <a href="#lead-form">
            Start check <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </div>
      
      {/* Tiny trust line */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <Zap className="w-3 h-3 text-aog-green fill-current" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          GRATIS ENERGIERAPPORT · WAARDE €240
        </span>
      </div>
    </div>
  );
}
