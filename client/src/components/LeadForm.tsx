import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Zap, User, Mail, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

interface FormData {
  solarPanelCount: string;
  homeOwner: boolean | undefined;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
}

const STEPS = [
  { title: "Zonnepanelen", icon: Zap },
  { title: "Woningeigenaar", icon: User },
  { title: "Contactgegevens", icon: Mail },
];

function calculateCosts(panelCount: string): { cost2027: number; savings: number } {
  const panels = parseInt(panelCount.split("-")[0] || "10");
  const annualProduction = panels * 310;
  const feedbackKwh = Math.round(annualProduction * 0.7);
  const cost2027 = Math.round(feedbackKwh * 0.35);
  const savings = Math.round(cost2027 * 0.82);
  return { cost2027, savings };
}

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    solarPanelCount: "",
    homeOwner: undefined,
    name: "",
    phone: "",
    email: "",
    postalCode: "",
  });

  const progress = ((step + 1) / STEPS.length) * 100;
  const costs = formData.solarPanelCount ? calculateCosts(formData.solarPanelCount) : null;

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return formData.solarPanelCount !== "";
      case 1: return formData.homeOwner !== undefined;
      case 2: return formData.name.length > 0 && formData.phone.length >= 10;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.homeOwner === false) {
      alert("Helaas, het adviesrapport en de financiering vanuit het Warmtefonds zijn uitsluitend beschikbaar voor woningeigenaren.");
      return; 
    }
    
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Energiecheck Stap ' + (step + 1),
        content_category: 'Thuisbatterij Advies'
      });
    }
    
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const leadMutation = trpc.leads.submit.useMutation();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "",
      postalCode: formData.postalCode || "",
      solarPanelCount: formData.solarPanelCount,
      homeOwner: formData.homeOwner,
      estimatedSavings: costs?.savings,
      source: "website-form",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
      try {
        await fetch("https://script.google.com/macros/s/AKfycbzjGcAZ3MSZzyjJ7yosDdPW5KmiDgIiED4SSp41siZpGo_hp_X3P2QkfG9r0xh7G6AjXA/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        });
      } catch (e) { console.warn("Google Sheets failed", e); }

      await leadMutation.mutateAsync(payload);
      
      // FIRE CompleteRegistration as requested
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'CompleteRegistration', {
          content_name: 'Gratis Energierapport Aangevraagd',
          value: 240,
          currency: 'EUR'
        });
        // Also fire Lead for redundancy
        window.fbq('track', 'Lead', { value: 240, currency: 'EUR' });
      }
      
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } catch (error) {
      console.error("Fout:", error);
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="lead-form" className="w-full">
      <div className="bg-white rounded-[2rem] border border-white/20 p-6 sm:p-10 shadow-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stap {step + 1} / {STEPS.length}</span>
            <span className="text-[10px] font-black text-aog-green uppercase tracking-widest">{STEPS[step].title}</span>
          </div>
          <Progress value={progress} className="h-1.5 rounded-full bg-slate-100" />
        </div>

        {/* Cost Feedback - Critical for engagement */}
        {costs && step < 2 && (
          <div className="mb-6 p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-aog-red font-black uppercase tracking-wider mb-1">Boete 2027</p>
                <p className="text-xl font-black text-white">€{costs.cost2027.toLocaleString("nl-NL")}</p>
              </div>
              <div>
                <p className="text-[10px] text-aog-green font-black uppercase tracking-wider mb-1">Uw besparing</p>
                <p className="text-xl font-black text-aog-green">€{costs.savings.toLocaleString("nl-NL")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-[260px] flex flex-col">
          {step === 0 && (
            <div className="flex-1 animate-slide-up">
              <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-aog-orange fill-current" />
                Aantal zonnepanelen?
              </h3>
              <RadioGroup value={formData.solarPanelCount} onValueChange={(v) => updateField("solarPanelCount", v)} className="grid grid-cols-2 gap-3">
                {[
                  { value: "1-5", label: "1-5" },
                  { value: "6-10", label: "6-10" },
                  { value: "11-15", label: "11-15" },
                  { value: "16-20", label: "16-20" },
                  { value: "21-30", label: "21-30" },
                  { value: "31+", label: "31+" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`panels-${opt.value}`}
                    className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.solarPanelCount === opt.value ? "border-aog-green bg-aog-green/5 shadow-md" : "border-slate-100 hover:border-aog-green/30"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={`panels-${opt.value}`} className="sr-only" />
                    <span className="font-black text-slate-900">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1 animate-slide-up">
              <h3 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-aog-blue" />
                Eigenaar van de woning?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: true, label: "Ja, ik ben eigenaar", icon: "🏠" },
                  { value: false, label: "Nee, ik huur", icon: "🔑" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => updateField("homeOwner", opt.value)}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                      formData.homeOwner === opt.value ? "border-aog-green bg-aog-green/5 shadow-md" : "border-slate-100 hover:border-aog-green/30"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-black text-slate-900">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 animate-slide-up space-y-4">
              <h3 className="text-lg font-black text-foreground mb-2">Uw contactgegevens</h3>
              <p className="text-xs text-muted-foreground mb-4">We bellen u binnen 2 uur voor uw rapport.</p>
              <div className="space-y-3">
                <Input placeholder="Uw naam" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="h-14 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all font-bold" />
                <Input placeholder="Telefoonnummer" type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="h-14 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all font-bold" />
                <Input placeholder="E-mail (optioneel)" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="h-14 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all font-bold" />
              </div>
            </div>
          )}
        </div>

        {/* Buttons - Larger for Mobile */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="ghost" size="lg" onClick={handleBack} className="h-14 px-6 font-black text-slate-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <Button
            size="lg"
            onClick={step < STEPS.length - 1 ? handleNext : handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex-1 h-14 bg-aog-green hover:bg-aog-green-light text-white font-black rounded-2xl shadow-xl shadow-aog-green/20 text-lg active:scale-95 transition-all"
          >
            {isSubmitting ? "Verzenden..." : step < STEPS.length - 1 ? "Volgende" : "Rapport aanvragen"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-300" />
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Veilig & Vertrouwelijk</p>
        </div>
      </div>
    </div>
  );
}
