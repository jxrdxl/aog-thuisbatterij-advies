import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Zap, User, Phone, Shield, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useTracking } from "@/hooks/useTracking";

interface FormData {
  name: string;
  phone: string;
}

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [, setLocation] = useLocation();
  const { trackInitiateCheckout } = useTracking();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (formStarted) {
      trackInitiateCheckout({
        content_name: "Gratis Energierapport",
        content_category: "Thuisbatterij Advies",
        value: 240,
        currency: "EUR",
      });
    }
  }, [formStarted, trackInitiateCheckout]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    if (!formStarted) setFormStarted(true);
    if (submitError) setSubmitError("");
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = (): boolean => {
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    return formData.name.trim().length > 1 && cleanedPhone.length >= 10;
  };

  const leadMutation = trpc.leads.submit.useMutation();

  const handleSubmit = async () => {
    if (!canSubmit() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    const params = new URLSearchParams(window.location.search);

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: "",
      postalCode: "",
      solarPanelCount: "unknown",
      homeOwner: true,
      source: "website-form-mobile-first",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
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

      await leadMutation.mutateAsync(payload);
      setLocation(`/bedankt?naam=${encodeURIComponent(payload.name)}&telefoon=${encodeURIComponent(payload.phone)}`);
    } catch (error) {
      console.error("Lead submission failed:", error);
      setSubmitError("Er ging iets mis met het verzenden. Probeer het opnieuw of bel ons direct op 06-127 128 04.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="w-full">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-aog-green/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-aog-green mb-4">
            Gratis check · geen verplichtingen
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">Start uw gratis check</h2>
          <p className="text-slate-500 font-medium">Vul uw gegevens in en we bellen u gemiddeld binnen 47 minuten.</p>
        </div>

        <div className="space-y-5">
          <div>
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

          <div>
            <Label className="text-sm font-black text-foreground mb-2 block flex items-center gap-2">
              <Phone className="w-4 h-4 text-aog-green" /> Telefoonnummer *
            </Label>
            <Input
              placeholder="06 12345678"
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="h-14 rounded-xl border-slate-200 text-lg font-medium"
              autoComplete="tel"
            />
          </div>

          {submitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submitError}
            </div>
          ) : null}

          <div className="pt-2">
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
                  Nu gratis checken <ArrowRight className="w-6 h-6 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Zap className="w-3 h-3 text-aog-orange" /> Gratis rapport (€240)
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <CheckCircle className="w-3 h-3 text-aog-green" /> Geen verplichtingen
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Shield className="w-3 h-3 text-aog-blue" /> AVG-veilig verwerkt
          </div>
        </div>
      </div>
    </section>
  );
}
