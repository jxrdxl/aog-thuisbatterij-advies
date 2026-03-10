import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-3 sm:hidden animate-slide-up">
      <div className="flex gap-2">
        <Button
          asChild
          variant="outline"
          className="flex-1 h-12 text-sm font-bold border-aog-green text-aog-green"
        >
          <a href="tel:+31612712804">
            <Phone className="w-4 h-4 mr-1.5" /> Bel direct
          </a>
        </Button>
        <Button
          asChild
          className="flex-1 h-12 text-sm font-bold bg-aog-green hover:bg-aog-green-light text-white"
        >
          <a href="#lead-form">
            Start check <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
