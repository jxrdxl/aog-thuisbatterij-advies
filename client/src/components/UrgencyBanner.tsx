import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UrgencyBanner() {
  return (
    <section className="bg-gradient-to-r from-aog-red to-red-700 py-10 sm:py-14">
      <div className="container text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <AlertTriangle className="w-4 h-4" /> Urgentie
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          In 2021 kochten 1 miljoen Nederlanders zonnepanelen. Te laat.
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
          Lange wachttijden. Hogere prijzen. Installatiestress. Hetzelfde gaat nu met thuisbatterijen gebeuren — zodra 2027 dichterbij komt. U kunt nu handelen. Of straks in de rij staan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-aog-red hover:bg-white/90 font-bold text-base px-8 h-12 rounded-xl shadow-lg">
            <a href="#lead-form">
              Plan mijn gratis gesprek <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <span className="text-white/60 text-sm">Directe installatiecapaciteit beschikbaar</span>
        </div>
      </div>
    </section>
  );
}
