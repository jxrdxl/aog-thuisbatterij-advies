import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Zap, User, Phone, Shield } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

interface FormData {
  name: string;
  phone: string;
}

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
  });

  // Track InitiateCheckout once when form is first focused
  useEffect(() => {
    if (formStarted && typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Gratis Energierapport',
        content_category: 'Thuisbatterij Advies',
        value: 240,
        currency: 'EUR'
      });
    }
  }, [formStarted]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (!formStarted) {
      setFormStarted(true);
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = (): boolean => {
    return formData.name.trim().length > 0 && formData.phone.trim().length >= 10;
  };

  const leadMutation = trpc.leads.submit.useMutation();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: "",
      postalCode: "",
      solarPanelCount: "unknown",
      homeOwner: true, // Assume true for lead quality, will be verified on call
      source: "website-form-ultra-low",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
      // 1. Verstuur naar Google Sheets
      try {
        await fetch("https://script.google.com/macros/s/AKfycbzjGcAZ3MSZzyjJ7yosDdPW5KmiDgIiED4SSp41siZpGo_hp_X3P2QkfG9r0xh7G6AjXA/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.warn("Google Sheets submission failed, continuing...", e);
      }

      // 2. Verstuur naar database
      await leadMutation.mutateAsync(payload);
      
      // 3. FIRE COMPLETEREGISTRATION EVENT
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Gratis Energierapport Aangevraagd',
          content_category: 'Thuisbatterij Advies',
          value: 240,
          currency: 'EUR',
          phone_number: formData.phone,
        });
      }
      
      // 4. Navigate to thank you page
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } catch (error) {
      console.error("Fout:", error);
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="w-full">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-10 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-foreground mb-2">Ontvang uw gratis adviesrapport</h2>
          <p className="text-slate-500 font-medium">Vul uw gegevens in en we bellen u binnen 24 uur.</p>
        </div>

        <div className="space-y-6">
          <div className="animate-slide-up">
            <Label className="text-sm font-black text-foreground mb-2 block flex items-center gap-2">
              <User className="w-4 h-4 text-aog-blue" /> Naam *
            </Label>
            <Input
              placeholder="Voornaam + achternaam"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="h-14 rounded-xl border-slate-200 text-lg font-medium"
              autoComplete="name"
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Label className="text-sm font-black text-foreground mb-2 block flex items-center gap-2">
              <Phone className="w-4 h-4 text-aog-green" /> Telefoonnummer *
            </Label>
            <Input
              placeholder="06-12345678"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="h-14 rounded-xl border-slate-200 text-lg font-medium"
              autoComplete="tel"
            />
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!canSubmit() || isSubmitting}
              className="w-full h-16 bg-aog-green hover:bg-aog-green-light text-white text-xl font-black rounded-xl shadow-lg shadow-aog-green/20 transition-all active:scale-95"
            >
              {isSubmitting ? (
                "Verzenden..."
              ) : (
                <>
                  Rapport aanvragen <CheckCircle className="w-6 h-6 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Trust line with enhanced signals */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Zap className="w-3 h-3 text-aog-orange" /> Gratis adviesrapport (€240)
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <CheckCircle className="w-3 h-3 text-aog-green" /> Geen verplichtingen
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Shield className="w-3 h-3 text-aog-blue" /> Veilig & Vertrouwd
          </div>
        </div>
      </div>
    </section>
  );
}
