import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  Zap,
  User,
  Phone,
  Mail,
  MapPin,
  Home,
  Sun,
  BatteryCharging,
  Car,
  Moon,
  Gauge,
  HelpCircle,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

type QuizAnswers = {
  homeType: string;
  hasPanels: string;
  panelCount: string;
  feedIn: string;
  usageMoment: string;
  futureUsage: string;
};

type LeadFields = {
  postcode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type DisqualifiedReason = "huurwoning" | "geen-panelen" | null;

const totalSteps = 8; 

const optionBase =
  "w-full text-left rounded-2xl border px-3.5 py-3.5 transition-all duration-200 bg-white hover:shadow-md";
const optionIdle = "border-slate-200 hover:border-aog-green/50";
const optionActive = "border-aog-green bg-aog-green/5 shadow-sm ring-1 ring-aog-green";

export default function LeadForm() {
  const [, setLocation] = useLocation();
  const leadMutation = trpc.leads.submit.useMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [leadSaved, setLeadSaved] = useState(false);
  const [disqualifiedReason, setDisqualifiedReason] = useState<DisqualifiedReason>(null);

  const [answers, setAnswers] = useState<QuizAnswers>({
    homeType: "",
    hasPanels: "",
    panelCount: "",
    feedIn: "",
    usageMoment: "",
    futureUsage: "",
  });

  const [leadFields, setLeadFields] = useState<LeadFields>({
    postcode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const calculatedSavings = useMemo(() => {
    let panels = 12; // default
    if (answers.panelCount === "6-10") panels = 8;
    if (answers.panelCount === "11-15") panels = 13;
    if (answers.panelCount === "16-20") panels = 18;
    if (answers.panelCount === "20+") panels = 24;

    const annualProduction = panels * 310;
    const feedbackKwh = Math.round(annualProduction * 0.7);
    const currentFeedbackCost = Math.round(feedbackKwh * 0.115);
    const cost2027 = Math.round(feedbackKwh * 0.35);
    const totalExtraCost = currentFeedbackCost + cost2027;
    const savingsWithBattery = Math.round(totalExtraCost * 0.82);

    return {
      savings: savingsWithBattery,
      extraCosts: totalExtraCost,
    };
  }, [answers.panelCount]);

  useEffect(() => {
    if (currentStep === 7 && !disqualifiedReason) {
      const timer = setTimeout(() => {
        setCurrentStep(8);
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [currentStep, disqualifiedReason]);

  // UPDATED: Verlengde timer (5 sec) & extra besparings parameter in de URL
  useEffect(() => {
    if (currentStep === 9 && leadSaved) {
      const timer = window.setTimeout(() => {
        setLocation(
          `/bedankt?naam=${encodeURIComponent(
            leadFields.firstName || "bezoeker"
          )}&telefoon=${encodeURIComponent(
            leadFields.phone || ""
          )}&besparing=${calculatedSavings.savings}`
        );
      }, 5000); // 5 seconden wachten zodat ze de score kunnen zien
      return () => window.clearTimeout(timer);
    }
  }, [currentStep, leadSaved, leadFields.firstName, leadFields.phone, calculatedSavings.savings, setLocation]);

  const updateAnswer = (key: keyof QuizAnswers, value: string) => {
    setSubmitError("");
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const updateLeadField = (key: keyof LeadFields, value: string) => {
    setSubmitError("");
    setLeadFields((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < 9) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1 && currentStep !== 7 && currentStep !== 9) setCurrentStep((s) => s - 1);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitting(false);
    setSubmitError("");
    setLeadSaved(false);
    setDisqualifiedReason(null);
    setAnswers({
      homeType: "",
      hasPanels: "",
      panelCount: "",
      feedIn: "",
      usageMoment: "",
      futureUsage: "",
    });
    setLeadFields({
      postcode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canContinueStep = () => {
    switch (currentStep) {
      case 1: return !!answers.homeType;
      case 2: return !!answers.hasPanels;
      case 3: return !!answers.panelCount;
      case 4: return !!answers.feedIn;
      case 5: return !!answers.usageMoment;
      case 6: return !!answers.futureUsage;
      case 8:
        return (
          leadFields.postcode.trim().length >= 6 &&
          leadFields.firstName.trim().length >= 2 &&
          leadFields.lastName.trim().length >= 2 &&
          isValidEmail(leadFields.email) &&
          leadFields.phone.replace(/\D/g, "").length >= 10
        );
      default:
        return false;
    }
  };

  const handleAutoAdvance = (key: keyof QuizAnswers, value: string) => {
    updateAnswer(key, value);

    if (key === "homeType" && value === "huurwoning") {
      setDisqualifiedReason("huurwoning");
      window.setTimeout(() => setCurrentStep(9), 140);
      return;
    }

    if (key === "hasPanels" && value === "nee") {
      setDisqualifiedReason("geen-panelen");
      window.setTimeout(() => setCurrentStep(9), 140);
      return;
    }

    window.setTimeout(() => nextStep(), 200);
  };

  const handleLeadCapture = async () => {
    if (!canContinueStep() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const params = new URLSearchParams(window.location.search);
    const fullName = `${leadFields.firstName} ${leadFields.lastName}`.trim();

    const payload = {
      name: fullName,
      phone: leadFields.phone.trim(),
      email: leadFields.email.trim(),
      postalCode: leadFields.postcode.trim(),
      solarPanelCount: answers.panelCount || "unknown",
      homeOwner: answers.homeType === "koopwoning",
      source: "website-quiz-funnel-v3",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    };

    const sheetPayload = {
      ...payload,
      usageMoment: answers.usageMoment || "",
      feedIn: answers.feedIn || "",
      futureUsage: answers.futureUsage || "",
      calculatedSavings: calculatedSavings.savings
    };

    let sheetsAccepted = false;
    let dbAccepted = false;

    try {
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbzxa6ipDJoitBPgtIn8gxnES5TdHyFgeenM9Po1b4N1dUzIH_cYeb0HRngUkwU2Y-yl5Q/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(sheetPayload),
          }
        );
        sheetsAccepted = true;
      } catch (e) {
        console.error("Google Sheets submission failed", e);
      }

      try {
        await leadMutation.mutateAsync(payload);
        dbAccepted = true;
      } catch (e) {
        console.error("Database/trpc submission failed", e);
      }

      if (sheetsAccepted || dbAccepted) {
        setLeadSaved(true);
        setCurrentStep(9); 
        return;
      }

      setSubmitError(
        "Er ging iets mis met het verzenden. Probeer het opnieuw of bel ons direct op 06-127 128 04."
      );
    } catch (error) {
      console.error("Lead submission failed:", error);
      setSubmitError(
        "Er ging iets mis met het verzenden. Probeer het opnieuw of bel ons direct op 06-127 128 04."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepPercentage = Math.min(Math.round((currentStep / 6) * 100), 100);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Woont u in een koopwoning?</h3>
            <p className="text-slate-500 mb-6">Deze check is bedoeld voor particuliere koopwoningen.</p>
            <div className="space-y-3">
              {[
                { value: "koopwoning", label: "Ja, koopwoning", icon: Home },
                { value: "huurwoning", label: "Nee, huurwoning", icon: Home },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.homeType === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance("homeType", item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <p className="font-bold text-lg text-slate-900">{item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Heeft u zonnepanelen?</h3>
            <p className="text-slate-500 mb-6">We berekenen de impact op uw huidige rendement.</p>
            <div className="space-y-3">
              {[
                { value: "ja", label: "Ja, ik heb zonnepanelen", icon: Sun },
                { value: "nee", label: "Nee, nog niet", icon: Sun },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.hasPanels === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance("hasPanels", item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-aog-green" />
                      </div>
                      <p className="font-bold text-lg text-slate-900">{item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Hoeveel zonnepanelen heeft u?</h3>
            <p className="text-slate-500 mb-6">Een schatting is voldoende voor de berekening.</p>
            <div className="space-y-3">
              {["6-10", "11-15", "16-20", "20+"].map((value) => {
                const active = answers.panelCount === value;
                return (
                  <button key={value} type="button" onClick={() => handleAutoAdvance("panelCount", value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Sun className="w-6 h-6 text-aog-orange" />
                      </div>
                      <p className="font-bold text-lg text-slate-900">{value} panelen</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Levert u regelmatig stroom terug?</h3>
            <div className="space-y-3 mt-6">
              {[
                { value: "regelmatig", label: "Ja, wekelijks", icon: BatteryCharging },
                { value: "soms", label: "Soms", icon: Gauge },
                { value: "weet-niet", label: "Weet ik niet precies", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.feedIn === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance("feedIn", item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><Icon className="w-6 h-6 text-slate-700" /></div>
                      <p className="font-bold text-lg text-slate-900">{item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Wanneer gebruikt u de meeste stroom?</h3>
            <div className="space-y-3 mt-6">
              {[
                { value: "overdag", label: "Overdag (Thuiswerker)", icon: Sun },
                { value: "avond", label: "'s Avonds & 's Nachts", icon: Moon },
                { value: "gelijk", label: "Gelijk verdeeld", icon: Gauge },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.usageMoment === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance("usageMoment", item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><Icon className="w-6 h-6 text-slate-700" /></div>
                      <p className="font-bold text-lg text-slate-900">{item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Verwacht u stijgend stroomverbruik?</h3>
            <p className="text-slate-500 mb-6">Denk aan een laadpaal of warmtepomp in de toekomst.</p>
            <div className="space-y-3">
              {[
                { value: "laadpaal", label: "Ja, elektrische auto", icon: Car },
                { value: "warmtepomp", label: "Ja, warmtepomp / airco", icon: Zap },
                { value: "geen", label: "Nee, verbruik blijft gelijk", icon: Gauge },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.futureUsage === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance("futureUsage", item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><Icon className="w-6 h-6 text-slate-700" /></div>
                      <p className="font-bold text-lg text-slate-900">{item.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 7:
        return (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-aog-green/10 flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-aog-green animate-spin" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Uw besparing wordt berekend...</h3>
            <p className="text-slate-500 text-lg">We analyseren uw verbruik en paneelaantal.</p>
            
            <div className="w-full max-w-sm mt-8 space-y-4 text-left">
              <div className="flex items-center gap-3 text-slate-600 animate-pulse">
                <CheckCircle className="w-5 h-5 text-aog-green" /> Zonnepanelen geanalyseerd
              </div>
              <div className="flex items-center gap-3 text-slate-600 animate-pulse delay-100">
                <CheckCircle className="w-5 h-5 text-aog-green" /> Terugleverkosten berekend
              </div>
              <div className="flex items-center gap-3 text-slate-600 animate-pulse delay-200">
                <CheckCircle className="w-5 h-5 text-aog-green" /> 2027 scenario toegepast
              </div>
            </div>
          </div>
        );

      case 8:
        // UPDATED: Het Lead Formulier is nu gescheiden van het resultaat!
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Uw besparing is berekend!</h3>
              <p className="text-slate-500 mb-6">Vul uw gegevens in om direct uw resultaat te zien en het gedetailleerde rapport te ontvangen.</p>

              <div className="space-y-4">
                <div>
                  <Label className="font-bold text-slate-700 mb-2 block">Postcode *</Label>
                  <Input placeholder="1234 AB" value={leadFields.postcode} onChange={(e) => updateLeadField("postcode", e.target.value)} className="h-14 rounded-2xl border-slate-200 text-lg bg-slate-50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-bold text-slate-700 mb-2 block">Voornaam *</Label>
                    <Input placeholder="Uw voornaam" value={leadFields.firstName} onChange={(e) => updateLeadField("firstName", e.target.value)} className="h-14 rounded-2xl border-slate-200 text-lg bg-slate-50" />
                  </div>
                  <div>
                    <Label className="font-bold text-slate-700 mb-2 block">Achternaam *</Label>
                    <Input placeholder="Uw achternaam" value={leadFields.lastName} onChange={(e) => updateLeadField("lastName", e.target.value)} className="h-14 rounded-2xl border-slate-200 text-lg bg-slate-50" />
                  </div>
                </div>
                <div>
                  <Label className="font-bold text-slate-700 mb-2 block">E-mailadres *</Label>
                  <Input placeholder="naam@voorbeeld.nl" type="email" value={leadFields.email} onChange={(e) => updateLeadField("email", e.target.value)} className="h-14 rounded-2xl border-slate-200 text-lg bg-slate-50" />
                </div>
                <div>
                  <Label className="font-bold text-slate-700 mb-2 block">Telefoonnummer *</Label>
                  <Input placeholder="0612345678" type="tel" value={leadFields.phone} onChange={(e) => updateLeadField("phone", e.target.value)} className="h-14 rounded-2xl border-slate-200 text-lg bg-slate-50" />
                </div>
                {submitError && <div className="rounded-2xl bg-red-50 p-4 text-red-600 text-sm font-bold">{submitError}</div>}
              </div>
            </div>
          </div>
        );

      case 9:
        if (disqualifiedReason) {
          return (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6"><Home className="w-8 h-8 text-slate-700" /></div>
              <h3 className="text-2xl font-black mb-4">Deze check is voor koopwoningen met panelen</h3>
              <p className="text-slate-600 mb-8">Omdat onze adviezen gebaseerd zijn op eigen daken met zonnestroom, kunnen we nu helaas geen nauwkeurige berekening maken.</p>
              <Button onClick={resetForm} variant="outline" className="rounded-xl h-12 px-6 font-bold">Opnieuw starten</Button>
            </div>
          );
        }
        // UPDATED: Succes scherm toont nu de teaser!
        return (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-6">
             <h3 className="text-3xl font-black mb-4">Gegevens succesvol ontvangen!</h3>
             <p className="text-slate-600 text-lg mb-6">Hier is uw persoonlijke resultaat:</p>
             
             <div className="rounded-[24px] bg-[linear-gradient(135deg,#0f172a,#16385f)] text-white px-6 py-8 mb-6 text-center relative overflow-hidden shadow-2xl inline-block w-full max-w-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-aog-green/20 rounded-full -mr-20 -mt-20 blur-2xl" />
              <div className="bg-white/10 rounded-2xl p-5 border border-white/20 inline-block text-center w-full">
                 <p className="text-white/70 font-medium text-sm mb-1 uppercase tracking-wider">Potentiële Besparing</p>
                 <p className="text-5xl font-black text-aog-green-light">€{calculatedSavings.savings}</p>
                 <p className="text-white/60 text-sm mt-1">per jaar</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm mt-4 animate-pulse">U wordt doorverwezen naar de bedanktpagina...</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <section id="lead-form" className="w-full scroll-mt-28">
      <div className="rounded-[32px] bg-white border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {currentStep <= 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-black text-slate-400 uppercase tracking-wider">Stap {currentStep} van 6</p>
              <p className="text-sm font-bold text-aog-green">{stepPercentage}%</p>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-aog-green transition-all duration-500 ease-out rounded-full" style={{ width: `${stepPercentage}%` }} />
            </div>
          </div>
        )}

        {renderStep()}

        {currentStep <= 6 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={prevStep} disabled={currentStep === 1} className="font-bold text-slate-500 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" /> Vorige
            </Button>
            <Button type="button" onClick={nextStep} disabled={!canContinueStep()} className="h-12 px-6 rounded-xl font-black bg-aog-green hover:bg-aog-green-light text-white">
              Volgende <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {currentStep === 8 && (
          <div className="mt-8">
            <Button type="button" onClick={handleLeadCapture} disabled={!canContinueStep() || isSubmitting} className="w-full h-16 rounded-2xl text-xl font-black bg-aog-green hover:bg-aog-green-light text-white shadow-lg shadow-aog-green/20 transition-all hover:scale-[1.02]">
              {isSubmitting ? <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Gegevens verwerken...</> : "Toon mijn resultaat"}
            </Button>
            <p className="text-center text-xs font-medium text-slate-400 mt-4 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Uw gegevens worden veilig en AVG-proof verwerkt
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
