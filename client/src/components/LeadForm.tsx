import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, User, Mail, MapPin, Zap } from "lucide-react";
import { useNavigate } from "wouter";

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
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      postalCode: formData.postalCode || undefined,
      solarPanelCount: formData.solarPanelCount,
      homeOwner: formData.homeOwner,
      estimatedSavings: formData.solarPanelCount ? Math.round(parseInt(formData.solarPanelCount.split("-")[0] || "10") * 310 * 0.7 * 0.35 * 0.85) : undefined,
      source: "website-form",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    try {
      // 1. Verstuur naar Google Sheets
      await fetch("https://script.google.com/macros/s/AKfycbzjGcAZ3MSZzyjJ7yosDdPW5KmiDgIiED4SSp41siZpGo_hp_X3P2QkfG9r0xh7G6AjXA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });
      
      // 2. Trigger Meta Pixel Lead Event BEFORE submit
      if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'Lead', {
          content_name: 'Gratis Energierapport',
          content_category: 'Thuisbatterij Advies',
          value: 240,
          currency: 'EUR'
        });
      }
      
      // 3. Navigate to thank you page with name and phone
      navigate(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } catch (error) {
      console.error("Fout:", error);
      // Still navigate to thank you page even if there's an error
      navigate(`/bedankt?naam=${encodeURIComponent(formData.name)}&telefoon=${encodeURIComponent(formData.phone)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 sm:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-aog-green/10 text-aog-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Shield className="w-4 h-4" /> Gratis Check
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Controleer of u in aanmerking komt
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Beantwoord 2 snelle vragen en ontvang uw gratis energierapport (waarde €240).
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Urgency banner above form */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-center gap-3">
            <span className="text-amber-600 text-lg">⚡</span>
            <div>
              <p className="text-amber-800 font-semibold text-sm">
                Nog <span className="font-bold text-amber-900">beschikbaar deze week</span>
              </p>
              <p className="text-amber-700 text-xs">
                Gemiddelde terugbeltijd: <strong>47 minuten</strong> · Nog 23 plekken in uw regio
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Stap {step + 1} van {STEPS.length}</span>
              <span>{STEPS[step].title}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm min-h-[320px] flex flex-col">
            {/* Step 0: Qualification (Solar panels + Home owner) */}
            {step === 0 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-6">Hoeveel zonnepanelen heeft u?</h3>
                <RadioGroup value={formData.solarPanelCount} onValueChange={(v) => updateField("solarPanelCount", v)} className="space-y-3 mb-8">
                  {[
                    { value: "1-5", label: "1 – 5 panelen", sub: "Klein systeem" },
                    { value: "6-10", label: "6 – 10 panelen", sub: "Gemiddeld systeem" },
                    { value: "11-15", label: "11 – 15 panelen", sub: "Groot systeem" },
                    { value: "16+", label: "16+ panelen", sub: "Zeer groot systeem" },
                    { value: "unknown", label: "Weet ik niet", sub: "" },
                  ].map((opt) => (
                    <Label
                      key={opt.value}
                      htmlFor={`panels-${opt.value}`}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.solarPanelCount === opt.value
                          ? "border-aog-green bg-aog-green/5 ring-1 ring-aog-green"
                          : "border-border hover:border-aog-green/40"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={`panels-${opt.value}`} />
                      <div>
                        <p className="font-semibold text-foreground">{opt.label}</p>
                        {opt.sub && <p className="text-xs text-muted-foreground">{opt.sub}</p>}
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Bent u eigenaar van uw woning?</h3>
                  <div className="space-y-3">
                    {[
                      { value: true, label: "Ja, ik ben eigenaar", icon: "🏠" },
                      { value: false, label: "Nee, ik huur", icon: "🔑" },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        onClick={() => updateField("homeOwner", opt.value)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                          formData.homeOwner === opt.value
                            ? "border-aog-green bg-aog-green/5 ring-1 ring-aog-green"
                            : "border-border hover:border-aog-green/40"
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-semibold text-foreground">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Contact details */}
            {step === 1 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Uw contactgegevens</h3>
                <p className="text-sm text-muted-foreground mb-6">Wij bellen u binnen 2 uur. Uw gegevens blijven vertrouwelijk.</p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <User className="w-3.5 h-3.5" /> Voornaam *
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Uw voornaam" 
                      value={formData.name} 
                      onChange={(e) => updateField("name", e.target.value)} 
                      className="h-12" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <Phone className="w-3.5 h-3.5" /> Telefoonnummer *
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="06-12345678" 
                      value={formData.phone} 
                      onChange={(e) => updateField("phone", e.target.value)} 
                      className="h-12" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <Mail className="w-3.5 h-3.5" /> E-mailadres (optioneel)
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="uw@email.nl" 
                      value={formData.email} 
                      onChange={(e) => updateField("email", e.target.value)} 
                      className="h-12" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="postal" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Postcode (optioneel)
                    </Label>
                    <Input 
                      id="postal" 
                      placeholder="1234 AB" 
                      value={formData.postalCode} 
                      onChange={(e) => updateField("postalCode", e.target.value)} 
                      className="h-12" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                className="gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Vorige
              </Button>

              {step < STEPS.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-aog-green hover:bg-aog-green-light text-white gap-1 px-6"
                >
                  Volgende <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceed()}
                  className="bg-aog-green hover:bg-aog-green-light text-white gap-1 px-6"
                >
                  {isSubmitting ? "Versturen..." : "Vraag rapport aan"} <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Slechts beperkt aantal bezoeken beschikbaar per maand
          </p>
        </div>
      </div>
    </section>
  );
}
