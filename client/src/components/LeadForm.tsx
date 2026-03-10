import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, User, Mail, MapPin, Zap, Info } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useTracking } from "@/hooks/useTracking";

interface FormData {
  solarPanelCount: string;
  homeOwner: boolean | undefined;
  income: string;
  wattpeak: number | undefined;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
}

const STEPS = [
  { title: "Kwalificatie", icon: Zap },
  { title: "Financiering", icon: Shield },
  { title: "Systeem", icon: Zap },
  { title: "Contactgegevens", icon: User },
];

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { trackInitiateCheckout, trackAddToCart, trackLead } = useTracking();
  const [formData, setFormData] = useState<FormData>({
    solarPanelCount: "",
    homeOwner: undefined,
    income: "",
    wattpeak: undefined,
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
        return formData.income !== "";
      case 2:
        return formData.wattpeak !== undefined;
      case 3: 
        return formData.name.length > 0 && formData.phone.length >= 10;
      default: 
        return false;
    }
  };

  const handleNext = () => {
    if (step === 0 && formData.homeOwner === false) {
      alert("Helaas, het adviesrapport en de financiering vanuit het Warmtefonds zijn uitsluitend beschikbaar voor woningeigenaren.");
      return; 
    }
    
    trackAddToCart({
      content_name: `Formulier Stap ${step + 1} Voltooid`,
      step: step + 1,
      solar_panels: formData.solarPanelCount,
      home_owner: formData.homeOwner,
      income: formData.income,
      wattpeak: formData.wattpeak
    });
    
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
      income: formData.income,
      wattpeak: formData.wattpeak,
      estimatedSavings: formData.solarPanelCount ? Math.round(parseInt(formData.solarPanelCount.split("-")[0] || "10") * 310 * 0.7 * 0.35 * 0.85) : undefined,
      source: "website-form",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
      trackInitiateCheckout({
        content_name: 'Energierapport Aanvraag',
        solar_panels: formData.solarPanelCount,
        home_owner: formData.homeOwner,
        estimated_savings: payload.estimatedSavings
      });

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
      
      trackLead({
        phone_number: formData.phone,
        first_name: formData.name,
        email: formData.email,
        postal_code: formData.postalCode,
        solar_panels: formData.solarPanelCount,
        estimated_savings: payload.estimatedSavings
      });
      
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } catch (error) {
      console.error("Fout:", error);
      setLocation(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-20 sm:py-32 bg-gradient-to-b from-green-50/50 to-white relative overflow-hidden">
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
            Beantwoord een paar snelle vragen en ontvang uw gratis onafhankelijk energierapport (waarde €240).
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
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
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Stap {step + 1} van {STEPS.length}</span>
                <span className="text-xs font-black text-aog-green uppercase tracking-widest">{STEPS[step].title}</span>
              </div>
              <Progress value={progress} className="h-3 rounded-full bg-slate-100" />
            </div>

            <div className="min-h-[350px] flex flex-col">
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
                          <span className="font-black text-foreground text-base">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex-1 animate-slide-up">
                  <h3 className="text-xl font-black text-foreground mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aog-green/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-aog-green" />
                    </div>
                    Wat is uw gezamenlijk bruto jaarinkomen?
                  </h3>
                  <p className="text-slate-500 mb-8 text-sm font-medium">
                    Dit is nodig om te checken of u in aanmerking komt voor de 0% lening van het Nationaal Warmtefonds.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "above", label: "Boven €60.000" },
                      { value: "below", label: "Onder €60.000" },
                    ].map((opt) => (
                      <Button
                        key={opt.value}
                        type="button"
                        variant={formData.income === opt.value ? "default" : "outline"}
                        className={`h-20 text-lg font-black rounded-3xl border-2 transition-all ${formData.income === opt.value ? "bg-aog-blue border-aog-blue text-white scale-[1.02] shadow-lg shadow-aog-blue/20" : "border-slate-100 text-slate-600 hover:border-aog-blue/30 hover:bg-slate-50"}`}
                        onClick={() => updateField("income", opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex-1 animate-slide-up">
                  <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aog-orange/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-aog-orange fill-current" />
                    </div>
                    Wat is de wattpiek van uw panelen?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[370, 400, 410, 425].map((watt) => (
                      <Button
                        key={watt}
                        type="button"
                        variant={formData.wattpeak === watt ? "default" : "outline"}
                        className={`h-20 text-lg font-black rounded-3xl border-2 transition-all ${formData.wattpeak === watt ? "bg-aog-blue border-aog-blue text-white scale-[1.02] shadow-lg shadow-aog-blue/20" : "border-slate-100 text-slate-600 hover:border-aog-blue/30 hover:bg-slate-50"}`}
                        onClick={() => updateField("wattpeak", watt)}
                      >
                        {watt} Wp
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={formData.wattpeak === 0 ? "default" : "outline"}
                      className={`h-20 text-lg font-black rounded-3xl border-2 transition-all sm:col-span-2 ${formData.wattpeak === 0 ? "bg-aog-blue border-aog-blue text-white scale-[1.02] shadow-lg shadow-aog-blue/20" : "border-slate-100 text-slate-600 hover:border-aog-blue/30 hover:bg-slate-50"}`}
                      onClick={() => updateField("wattpeak", 0)}
                    >
                      Ik weet het niet zeker
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex-1 animate-slide-up">
                  <h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-aog-green/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-aog-green" />
                    </div>
                    Waar mogen we het rapport naar sturen?
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Volledige naam</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input
                          id="name"
                          placeholder="Bijv. Jan de Vries"
                          className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-aog-green focus:ring-aog-green/20"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400">Telefoonnummer</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="06 12345678"
                          className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-aog-green focus:ring-aog-green/20"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">E-mailadres (optioneel)</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="jan@voorbeeld.nl"
                            className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-aog-green focus:ring-aog-green/20"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-xs font-black uppercase tracking-widest text-slate-400">Postcode (optioneel)</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <Input
                            id="postalCode"
                            placeholder="1234 AB"
                            className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-aog-green focus:ring-aog-green/20"
                            value={formData.postalCode}
                            onChange={(e) => updateField("postalCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="h-16 px-8 rounded-2xl border-slate-200 text-slate-600 font-black hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Vorige
                  </Button>
                )}
                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    disabled={!canProceed()}
                    onClick={handleNext}
                    className="flex-1 h-16 text-lg font-black bg-aog-green hover:bg-aog-green-light text-white rounded-2xl shadow-xl shadow-aog-green/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    Volgende stap <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={!canProceed() || isSubmitting}
                    onClick={handleSubmit}
                    className="flex-1 h-16 text-lg font-black bg-aog-green hover:bg-aog-green-light text-white rounded-2xl shadow-xl shadow-aog-green/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? "Verwerken..." : "Vraag rapport aan"} <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Privacy gegarandeerd</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">100% Onafhankelijk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
