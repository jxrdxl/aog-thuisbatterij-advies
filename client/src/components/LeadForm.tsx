import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Zap, User, Mail, MapPin, TrendingDown, AlertTriangle } from "lucide-react";
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

// Cost calculation function
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
      case 0: 
        return formData.solarPanelCount !== "";
      case 1: 
        return formData.homeOwner !== undefined;
      case 2: 
        return formData.name.length > 0 && formData.phone.length >= 10;
      default: 
        return false;
    }
  };

  const handleNext = () => {
    // BLOKKADE VOOR HUURDERS
    if (step === 1 && formData.homeOwner === false) {
      alert("Helaas, het adviesrapport en de financiering vanuit het Warmtefonds zijn uitsluitend beschikbaar voor woningeigenaren.");
      return; 
    }
    
    // Track InitiateCheckout event on form progression
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Energiecheck Stap ' + (step + 1),
        content_category: 'Thuisbatterij Advies',
        value: 240,
        currency: 'EUR'
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
      
      // 3. FIRE LEAD EVENT - This is the most important pixel event
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'Lead', {
          content_name: 'Gratis Energierapport Aangevraagd',
          content_category: 'Thuisbatterij Advies',
          value: 240,
          currency: 'EUR',
          phone_number: formData.phone,
          city: formData.postalCode
        });
        
        // Also track Purchase for optimization
        window.fbq('track', 'Purchase', {
          content_name: 'Energierapport',
          content_category: 'Thuisbatterij Advies',
          value: 240,
          currency: 'EUR'
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
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stap {step + 1} van {STEPS.length}</span>
            <span className="text-xs font-black text-aog-green uppercase tracking-widest">{STEPS[step].title}</span>
          </div>
          <Progress value={progress} className="h-2 rounded-full bg-slate-200" />
        </div>

        {/* Cost Display - Shows as you fill */}
        {costs && (
          <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-red-600 font-black uppercase tracking-wider mb-1">Extra kosten 2027</p>
                <p className="text-2xl font-black text-aog-red">€{costs.cost2027.toLocaleString("nl-NL")}</p>
              </div>
              <div>
                <p className="text-xs text-aog-green font-black uppercase tracking-wider mb-1">Met batterij besparen</p>
                <p className="text-2xl font-black text-aog-green">€{costs.savings.toLocaleString("nl-NL")}</p>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-[280px] flex flex-col">
          {/* Step 0: Solar Panels */}
          {step === 0 && (
            <div className="flex-1 animate-slide-up">
              <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-5 h-5 text-aog-orange" />
                Hoeveel zonnepanelen heeft u?
              </h3>
              
              <RadioGroup value={formData.solarPanelCount} onValueChange={(v) => updateField("solarPanelCount", v)} className="space-y-3">
                {[
                  { value: "1-5", label: "1 – 5 panelen" },
                  { value: "6-10", label: "6 – 10 panelen" },
                  { value: "11-15", label: "11 – 15 panelen" },
                  { value: "16-20", label: "16 – 20 panelen" },
                  { value: "21+", label: "21+ panelen" },
                  { value: "unknown", label: "Weet ik niet" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`panels-${opt.value}`}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.solarPanelCount === opt.value
                        ? "border-aog-green bg-aog-green/5 shadow-md"
                        : "border-slate-200 hover:border-aog-green/30"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={`panels-${opt.value}`} className="border-2" />
                    <span className="font-bold text-foreground">{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 1: Home Owner */}
          {step === 1 && (
            <div className="flex-1 animate-slide-up">
              <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-3">
                <User className="w-5 h-5 text-aog-blue" />
                Bent u eigenaar van uw woning?
              </h3>
              
              <div className="space-y-3">
                {[
                  { value: true, label: "Ja, ik ben eigenaar", icon: "🏠" },
                  { value: false, label: "Nee, ik huur", icon: "🔑" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => updateField("homeOwner", opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      formData.homeOwner === opt.value
                        ? "border-aog-green bg-aog-green/5 shadow-md"
                        : "border-slate-200 hover:border-aog-green/30"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-bold text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="flex-1 animate-slide-up space-y-4">
              <h3 className="text-xl font-black text-foreground mb-6">Uw contactgegevens</h3>
              
              <div>
                <Label className="text-sm font-black text-foreground mb-2 block">Naam *</Label>
                <Input
                  placeholder="Voornaam + achternaam"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <Label className="text-sm font-black text-foreground mb-2 block">Telefoonnummer *</Label>
                <Input
                  placeholder="06-12345678"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <Label className="text-sm font-black text-foreground mb-2 block">E-mailadres (optioneel)</Label>
                <Input
                  placeholder="uw@email.nl"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>

              <div>
                <Label className="text-sm font-black text-foreground mb-2 block">Postcode (optioneel)</Label>
                <Input
                  placeholder="1234 AB"
                  value={formData.postalCode}
                  onChange={(e) => updateField("postalCode", e.target.value)}
                  className="h-12 rounded-xl border-slate-200"
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="flex-1 h-12 rounded-xl border-slate-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Terug
            </Button>
          )}
          
          {step < STEPS.length - 1 ? (
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 h-12 bg-aog-green hover:bg-aog-green-light text-white font-black rounded-xl"
            >
              Volgende <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="flex-1 h-12 bg-aog-green hover:bg-aog-green-light text-white font-black rounded-xl"
            >
              {isSubmitting ? "Verzenden..." : "Rapport aanvragen"}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Trust line */}
        <p className="text-xs text-muted-foreground text-center mt-6 font-medium">
          ✓ Gratis adviesrapport (€240) · ✓ Geen verplichtingen · ✓ Onafhankelijk advies
        </p>
      </div>
    </section>
  );
}
