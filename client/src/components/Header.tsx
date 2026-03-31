import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, CheckCircle2, Zap, ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { trackInitiateCheckout, trackContact } = useTracking();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-100 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${scrolled ? "bg-aog-green" : "bg-white/10 backdrop-blur-md"}`}>
            <Zap className={`w-6 h-6 transition-colors ${scrolled ? "text-white" : "text-aog-green"}`} />
          </div>
          <div className={`text-xl font-black transition-colors duration-500 ${scrolled ? "text-slate-900" : "text-white"}`}>
            <span className="text-aog-green">AOG</span> Energie
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#calculator" className={`text-sm font-black uppercase tracking-widest transition-all hover:text-aog-green ${scrolled ? "text-slate-600" : "text-white/80"}`}>
            Bespaarcheck
          </a>
          <a href="#how-it-works" className={`text-sm font-black uppercase tracking-widest transition-all hover:text-aog-green ${scrolled ? "text-slate-600" : "text-white/80"}`}>
            Werkwijze
          </a>
          <a href="#faq" className={`text-sm font-black uppercase tracking-widest transition-all hover:text-aog-green ${scrolled ? "text-slate-600" : "text-white/80"}`}>
            FAQ
          </a>
          <div className={`w-px h-6 bg-current opacity-10 ${scrolled ? "text-slate-900" : "text-white"}`} />
          <a href="tel:+31612712804" onClick={() => trackContact({ method: "phone", source: "header" })} className={`text-sm font-black transition-all hover:scale-105 flex items-center gap-2 ${scrolled ? "text-aog-blue" : "text-white"}`}>
            <div className="w-8 h-8 rounded-full bg-aog-blue/10 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            06-127 128 04
          </a>
          <Button asChild size="lg" className="bg-aog-green hover:bg-aog-green-light text-white font-black rounded-2xl shadow-lg shadow-aog-green/20 h-12 px-6" onClick={() => trackInitiateCheckout({ source: "header" })}>
            <a href="#lead-form">Vraag rapport aan</a>
          </Button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-3 rounded-2xl transition-all ${scrolled ? "bg-slate-100 text-slate-900" : "bg-white/10 backdrop-blur-md text-white"}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 z-[-1] bg-white transition-all duration-500 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <div className="container pt-32 pb-10 flex flex-col h-full">
          <nav className="flex flex-col gap-8 mb-auto">
            <a href="#calculator" onClick={() => setMobileOpen(false)} className="text-3xl font-black text-slate-900 flex items-center justify-between group">
              Bespaarcheck <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-aog-green transition-colors" />
            </a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-3xl font-black text-slate-900 flex items-center justify-between group">
              Werkwijze <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-aog-green transition-colors" />
            </a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="text-3xl font-black text-slate-900 flex items-center justify-between group">
              Veelgestelde vragen <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-aog-green transition-colors" />
            </a>
          </nav>

          <div className="mt-12 space-y-6">
            <a href="tel:+31612712804" onClick={() => trackContact({ method: "phone", source: "header_mobile" })} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-aog-blue/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-aog-blue" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bel ons direct</p>
                <p className="text-xl font-black text-slate-900">06-127 128 04</p>
              </div>
            </a>
            <Button asChild className="w-full h-20 text-xl font-black bg-aog-green hover:bg-aog-green-light text-white rounded-3xl shadow-xl shadow-aog-green/20" onClick={() => { trackInitiateCheckout({ source: "header_mobile" }); setMobileOpen(false); }}>
              <a href="#lead-form">Start gratis check</a>
            </Button>
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Geen verplichtingen</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
