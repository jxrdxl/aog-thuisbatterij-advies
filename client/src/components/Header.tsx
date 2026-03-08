import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className={`text-lg font-extrabold transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            <span className="text-aog-green">AOG</span> Energie
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#calculator" className={`text-sm font-medium transition-colors hover:text-aog-green ${scrolled ? "text-foreground" : "text-white/90"}`}>
            Bespaarcheck
          </a>
          <a href="#lead-form" className={`text-sm font-medium transition-colors hover:text-aog-green ${scrolled ? "text-foreground" : "text-white/90"}`}>
            Gratis Rapport
          </a>
          <a href="#faq" className={`text-sm font-medium transition-colors hover:text-aog-green ${scrolled ? "text-foreground" : "text-white/90"}`}>
            FAQ
          </a>
          <a href="tel:+31612712804" className={`text-sm font-medium transition-colors hover:text-aog-green flex items-center gap-1.5 ${scrolled ? "text-foreground" : "text-white/90"}`}>
            <Phone className="w-4 h-4" /> 06-127 128 04
          </a>
          <Button asChild size="sm" className="bg-aog-green hover:bg-aog-green-light text-white font-bold">
            <a href="#lead-form">Gratis Rapport</a>
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <nav className="container py-4 space-y-3">
            <a href="#calculator" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground py-2">Bespaarcheck</a>
            <a href="#lead-form" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground py-2">Gratis Rapport</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground py-2">Veelgestelde Vragen</a>
            <a href="tel:+31612712804" className="block text-sm font-medium text-aog-green py-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> 06-127 128 04
            </a>
            <Button asChild className="w-full bg-aog-green hover:bg-aog-green-light text-white font-bold">
              <a href="#lead-form" onClick={() => setMobileOpen(false)}>Vraag gratis rapport aan</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
