import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, FileText, Zap, Home, ArrowRight } from "lucide-react";

// Declaratie voor Meta Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export default function Bedankt() {
  const [location] = useLocation();
  // const navigate = useNavigate(); // useNavigate is not exported by wouter v3, use useLocation for navigation if needed
  
  // Extract query parameters
  const params = new URLSearchParams(location.split('?')[1]);
  const naam = params.get('naam') || 'je';
  const telefoon = params.get('telefoon') || '';

  useEffect(() => {
    // Track CompleteRegistration event with Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Gratis Energierapport Aangevraagd',
        value: 240,
        currency: 'EUR'
      });
    }
  }, []);

  const whatsappLink = `https://wa.me/31612712804?text=Hallo, ik heb zojuist een rapport aangevraagd`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-aog-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-aog-green" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Bedankt, {naam}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Je gratis energierapport is aangevraagd.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground font-medium">Wat gebeurt er nu?</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {[
            {
              icon: Phone,
              step: "Stap 1",
              title: "Wij bellen je binnen 2 uur",
              description: "Een van onze gecertificeerde energieadviseurs neemt contact op om je situatie te bespreken."
            },
            {
              icon: FileText,
              step: "Stap 2",
              title: "Persoonlijk rapport",
              description: "Op basis van jouw situatie stellen wij een gratis rapport op (waarde €240)."
            },
            {
              icon: Zap,
              step: "Stap 3",
              title: "Advies op maat",
              description: "Je ontvangt een concreet advies over thuisbatterij-opties en financiering via het Warmtefonds (0% rente)."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-aog-green/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-aog-green" />
                  </div>
                  {idx < 2 && <div className="w-1 h-8 bg-aog-green/20 mt-2" />}
                </div>
                <div className="pt-1 pb-4">
                  <p className="text-xs font-semibold text-aog-green uppercase tracking-wide">{item.step}</p>
                  <h3 className="text-lg font-bold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-900">
            <strong>Gemiddelde terugbeltijd:</strong> 47 minuten
          </p>
          <p className="text-sm text-blue-800 mt-2">
            Zorg dat je telefoon bij de hand is. We bellen je op <strong>{telefoon}</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            asChild
            size="lg"
            className="bg-aog-green hover:bg-aog-green-light text-white font-bold flex-1"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <span>💬 Liever direct contact? App ons</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <a href="/">
              Terug naar home
            </a>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="bg-white rounded-xl border border-border p-6 text-center">
          <p className="text-sm font-semibold text-foreground mb-4">Waarom kiezen huiseigenaren voor ons?</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "€240", label: "Rapport waarde" },
              { value: "0%", label: "Rente" },
              { value: "47 min", label: "Gem. beltijd" }
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-lg font-bold text-aog-green">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
