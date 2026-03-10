import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, User, Mail, MapPin, Zap, Info } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

// Declaratie voor Meta Pixel (om TypeScript fouten te voorkomen)
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
  { title: "Kwalificatie", icon: Zap },
  { title: "Contactgegevens", icon: User },
];

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

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: 
        return formData.solarPanelCount !== "" && formData.homeOwner !== undefined;
      case 1: 
        return formData.name.length > 0 && formData.phone.length >= 10;
      default: 
        return false;
    }
  };

  const handleNext = () => {
    // BLOKKADE VOOR HUURDERS
    if (step === 0 && formData.homeOwner === false) {
      alert("Helaas, het adviesrapport en de financiering vanuit het Warmtefonds zijn uitsluitend beschikbaar voor woningeigenaren.");
      return; 
    }
    
    // Track form step with Facebook Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart');
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
      estimatedSavings: formData.solarPanelCount ? Math.round(parseInt(formData.solarPanelCount.split("-")[0] || "10") * 310 * 0.7 * 0.35 * 0.85) : undefined,
      source: "website-form",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
      // 1. Verstuur naar Google Sheets (Bestaande flow)
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

      // 2. Verstuur naar eigen database & trigger notificaties via tRPC
      await leadMutation.mutateAsync(payload);
      
      // 3. Trigger Meta Pixel Lead Event BEFORE redirect
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'Lead', {
          content_name: 'Gratis Energierapport',
          content_category: 'Thuisbatterij Advies',
          value: 240,
          currency: 'EUR'
        });
      }
      
      // 4. Navigate to thank you page with name and phone
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } catch (error) {
      console.error("Fout:", error);
      // Still navigate to thank you page even if there's an error
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-20 sm:py-32 bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aog-green/5 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aog-blue/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-aog-green/10 text-aog-green text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Shield className="w-4 h-4" /> GRATIS ENERGIECHECK
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance leading-tight">
            Controleer of u in <span className="text-aog-green">aanmerking</span> komt
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
            Beantwoord 2 snelle vragen en ontvang uw gratis onafhankelijk energierapport (waarde €240).
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Urgency banner above form */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-8 flex items-start gap-4 shadow-sm animate-slide-up">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-600 fill-current" />
            </div>
            <div>
              <p className="text-amber-900 font-black text-lg mb-1">
                Nog beschikbaar deze week
              </p>
              <p className="text-amber-800 text-sm font-medium leading-relaxed">
                Gemiddelde terugbeltijd: <strong className="font-black">47 minuten</strong> · Nog 23 plekken in uw regio beschikbaar.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 sm:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            {/* Progress */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stap {step + 1} van {STEPS.length}</span>
                <span className="text-xs font-black text-aog-green uppercase tracking-widest">{STEPS[step].title}</span>
              </div>
              <Progress value={progress} className="h-3 rounded-full bg-slate-100" />
            </div>

            <div className="min-h-[350px] flex flex-col">
              {/* Step 0: Qualification (Solar panels + Home owner) */}
              {step === 0 && (
                <div className="flex-1 animate-slide-up">
                  <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aog-orange/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-aog-orange fill-current" />
                    </div>
                    Hoeveel zonnepanelen heeft u?
                  </h3>
                  
                  <RadioGroup value={formData.solarPanelCount} onValueChange={(v) => updateField("solarPanelCount", v)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {[
                      { value: "1-5", label: "1 – 5 panelen", sub: "Klein systeem" },
                      { value: "6-10", label: "6 – 10 panelen", sub: "Gemiddeld" },
                      { value: "11-15", label: "11 – 15 panelen", sub: "Groot" },
                      { value: "16+", label: "16+ panelen", sub: "Zeer groot" },
                      { value: "unknown", label: "Weet ik niet", sub: "Geen probleem" },
                    ].map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={`panels-${opt.value}`}
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.solarPanelCount === opt.value
                            ? "border-aog-green bg-aog-green/5 shadow-md"
                            : "border-slate-100 hover:border-aog-green/30 hover:bg-slate-50"
                        }`}
                      >
                        <RadioGroupItem value={opt.value} id={`panels-${opt.value}`} className="border-2 border-slate-300" />
                        <div>
                          <p className="font-black text-foreground text-base leading-tight">{opt.label}</p>
                          {opt.sub && <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest">{opt.sub}</p>}
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>

                  <div className="border-t border-slate-100 pt-10">
                    <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-aog-blue/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-aog-blue" />
                      </div>
                      Bent u eigenaar van uw woning?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { value: true, label: "Ja, ik ben eigenaar", icon: "🏠" },
                        { value: false, label: "Nee, ik huur", icon: "🔑" },
                      ].map((opt) => (
                        <button
                          key={String(opt.value)}
                          onClick={() => updateField("homeOwner", opt.value)}
                          className={`flex items-center gap-4 p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                            formData.homeOwner === opt.value
                              ? "border-aog-green bg-aog-green/5 shadow-md"
                              : "border-slate-100 hover:border-aog-green/30 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-3xl">{opt.icon}</span>
                          <span className="font-black text-foreground text-lg">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Contact details */}
              {step === 1 && (
                <div className="flex-1 animate-slide-up">
                  <h3 className="text-xl font-black text-foreground mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aog-green/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-aog-green" />
                    </div>
                    Uw contactgegevens
                  </h3>
                  <p className="text-base font-bold text-muted-foreground mb-10 pl-11">
                    Wij bellen u binnen 2 uur. Uw gegevens blijven 100% vertrouwelijk.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pl-11">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Voornaam *
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Uw voornaam" 
                        value={formData.name} 
                        onChange={(e) => updateField("name", e.target.value)} 
                        className="h-14 rounded-xl border-2 border-slate-100 focus:border-aog-green transition-colors font-bold text-lg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Telefoonnummer *
                      </Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="06-12345678" 
                        value={formData.phone} 
                        onChange={(e) => updateField("phone", e.target.value)} 
                        className="h-14 rounded-xl border-2 border-slate-100 focus:border-aog-green transition-colors font-bold text-lg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        E-mailadres (optioneel)
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="uw@email.nl" 
                        value={formData.email} 
                        onChange={(e) => updateField("email", e.target.value)} 
                        className="h-14 rounded-xl border-2 border-slate-100 focus:border-aog-green transition-colors font-bold text-lg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal" className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        Postcode (optioneel)
                      </Label>
                      <Input 
                        id="postal" 
                        placeholder="1234 AB" 
                        value={formData.postalCode} 
                        onChange={(e) => updateField("postalCode", e.target.value)} 
                        className="h-14 rounded-xl border-2 border-slate-100 focus:border-aog-green transition-colors font-bold text-lg" 
                      />
                    </div>
                  </div>
                  
                  <div className="pl-11 bg-slate-50 rounded-2xl p-4 flex items-start gap-3 border border-slate-100">
                    <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">
                      Door op "Vraag rapport aan" te klikken gaat u akkoord met onze privacyverklaring. We gebruiken uw gegevens uitsluitend voor dit onafhankelijke energierapport.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="gap-2 font-black text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Vorige
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-black text-lg px-10 h-16 rounded-2xl shadow-xl transition-all active:scale-95"
                  >
                    Volgende stap <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !canProceed()}
                    className="bg-aog-green hover:bg-aog-green-light text-white font-black text-xl px-12 h-20 rounded-2xl shadow-2xl shadow-aog-green/20 transition-all active:scale-95 group"
                  >
                    {isSubmitting ? "Versturen..." : "Vraag rapport aan"} 
                    <CheckCircle className="ml-3 w-7 h-7 transition-transform group-hover:scale-110" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Veilig & AVG Proof</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Onafhankelijk advies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
