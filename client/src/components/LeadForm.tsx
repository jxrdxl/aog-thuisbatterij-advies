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
  Car,
  Moon,
  Gauge,
  HelpCircle,
  Loader2,
  Home,
  Sun,
  BatteryCharging,
  Check,
  Lock,
  ShieldCheck,
  Phone,
  MessageCircle,
  MonitorSmartphone,
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
      }, 800); 
      return () => clearTimeout(timer);
    }
  }, [currentStep, disqualifiedReason]);

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
          leadFields.firstName.trim().length >= 2 &&
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
      name: leadFields.firstName.trim(),
      phone: leadFields.phone.trim(),
      email: leadFields.email.trim() || undefined,
      postalCode: leadFields.postcode.trim() || undefined,
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
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        const questionData = [
          { step: 1, title: "Woont u in een koopwoning?", desc: "Deze check is bedoeld voor particuliere koopwoningen.", key: "homeType", options: [{ value: "koopwoning", label: "Ja, koopwoning", icon: Home }, { value: "huurwoning", label: "Nee, huurwoning", icon: Home }] },
          { step: 2, title: "Heeft u zonnepanelen?", desc: "We berekenen de impact op uw huidige rendement.", key: "hasPanels", options: [{ value: "ja", label: "Ja, ik heb zonnepanelen", icon: Sun }, { value: "nee", label: "Nee, nog niet", icon: Sun }] },
          { step: 3, title: "Hoeveel zonnepanelen heeft u?", desc: "Een schatting is voldoende voor de berekening.", key: "panelCount", options: [{ value: "6-10", label: "6-10 panelen", icon: Sun }, { value: "11-15", label: "11-15 panelen", icon: Sun }, { value: "16-20", label: "16-20 panelen", icon: Sun }, { value: "20+", label: "20+ panelen", icon: Sun }] },
          { step: 4, title: "Levert u regelmatig stroom terug?", desc: "", key: "feedIn", options: [{ value: "regelmatig", label: "Ja, wekelijks", icon: BatteryCharging }, { value: "soms", label: "Soms", icon: Gauge }, { value: "weet-niet", label: "Weet ik niet precies", icon: HelpCircle }] },
          { step: 5, title: "Wanneer gebruikt u de meeste stroom?", desc: "", key: "usageMoment", options: [{ value: "overdag", label: "Overdag (Thuiswerker)", icon: Sun }, { value: "avond", label: "'s Avonds & 's Nachts", icon: Moon }, { value: "gelijk", label: "Gelijk verdeeld", icon: Gauge }] },
          { step: 6, title: "Verwacht u stijgend stroomverbruik?", desc: "Denk aan een laadpaal of warmtepomp in de toekomst.", key: "futureUsage", options: [{ value: "laadpaal", label: "Ja, elektrische auto", icon: Car }, { value: "warmtepomp", label: "Ja, warmtepomp / airco", icon: Zap }, { value: "geen", label: "Nee, verbruik blijft gelijk", icon: Gauge }] },
        ];
        
        const currentQ = questionData.find(q => q.step === currentStep);
        if (!currentQ) return null;

        return (
          <>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{currentQ.title}</h3>
            {currentQ.desc && <p className="text-slate-500 mb-6">{currentQ.desc}</p>}
            <div className="space-y-3 mt-4">
              {currentQ.options.map((item) => {
                const Icon = item.icon;
                const active = answers[currentQ.key as keyof QuizAnswers] === item.value;
                return (
                  <button key={item.value} type="button" onClick={() => handleAutoAdvance(currentQ.key as keyof QuizAnswers, item.value)} className={`${optionBase} ${active ? optionActive : optionIdle}`}>
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
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Savings teaser - zichtbaar BOVEN het formulier */}
            <div className="border-2 border-aog-green rounded-2xl p-5 mb-6 text-center bg-aog-green/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-aog-green" />
              <p className="text-sm font-bold text-slate-600 mb-1">Jouw geschatte besparing</p>
              <p className="text-4xl font-black text-aog-green">€{calculatedSavings.savings}<span className="text-lg font-bold text-slate-500">/jaar</span></p>
              <p className="text-xs text-slate-500 mt-2">Vul je gegevens in om je persoonlijke rapport te ontvangen →</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Waar sturen we het rapport naartoe?</h3>
              <p className="text-sm text-slate-500 mb-6">Onze specialist belt je op voor een gratis adviesgesprek.</p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label className="font-semibold text-slate-700 mb-1.5 block text-sm">Voornaam *</Label>
                  <Input
                    autoFocus
                    placeholder="Je voornaam"
                    value={leadFields.firstName}
                    onChange={(e) => updateLeadField("firstName", e.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <Label className="font-semibold text-slate-700 mb-1.5 block text-sm">Telefoonnummer *</Label>
                  <Input
                    placeholder="0612345678"
                    type="tel"
                    inputMode="tel"
                    value={leadFields.phone}
                    onChange={(e) => updateLeadField("phone", e.target.value)}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 placeholder:text-slate-400"
                  />
                </div>
                {submitError && <div className="rounded-xl bg-red-50 p-4 text-red-600 text-sm font-bold">{submitError}</div>}
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center text-sm text-slate-600">
                  <Check className="w-4 h-4 text-aog-green mr-2 shrink-0" /> Gratis en vrijblijvend adviesgesprek aan huis
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Check className="w-4 h-4 text-aog-green mr-2 shrink-0" /> Persoonlijk bespaarrapport op maat
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Check className="w-4 h-4 text-aog-green mr-2 shrink-0" /> Geen gedoe — wij bellen jou
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 mb-5 font-medium">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Veilig verstuurd</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Niet doorverkocht</span>
              </div>

              <Button
                type="button"
                onClick={handleLeadCapture}
                disabled={!canContinueStep() || isSubmitting}
                className="w-full h-14 rounded-full text-lg font-bold bg-[#10b981] hover:bg-[#059669] text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verwerken...</>
                ) : (
                  `Stuur mijn gratis rapport >`
                )}
              </Button>
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

        return (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#111827] text-white rounded-t-[32px] sm:rounded-t-[40px] px-6 py-10 -mt-6 sm:-mt-10 -mx-6 sm:-mx-10 mb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-400" fill="currentColor" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Jouw Bespaarresultaat</h2>
              <p className="text-slate-400 text-sm">Op basis van jouw antwoorden</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Analyse Voltooid
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Bedankt voor je aanvraag!</h3>
                <p className="text-slate-600 mb-6">
                  We hebben je gegevens in goede orde ontvangen. We nemen spoedig contact met je op voor een persoonlijke terugkoppeling en om te kijken hoe we dit resultaat voor je kunnen realiseren.
                </p>

                <div className="border-2 border-aog-green rounded-2xl p-6 text-center shadow-sm relative overflow-hidden bg-white mb-6">
                  <div className="absolute top-0 w-full h-1 bg-aog-green left-0" />
                  <p className="text-aog-green font-bold text-sm mb-2">Geschat besparingspotentieel</p>
                  <p className="text-4xl sm:text-5xl font-black text-aog-green">€{calculatedSavings.savings}</p>
                  <p className="text-sm text-slate-500 mt-2">per jaar</p>
                </div>

                <div className="space-y-3">
                  <p className="font-bold text-slate-900">Onze aanbevelingen:</p>
                  <div className="flex gap-3 text-slate-600 text-sm">
                    <CheckCircle className="w-5 h-5 text-aog-green shrink-0" /> 
                    <span>Laat je verbruiksprofiel analyseren door een specialist.</span>
                  </div>
                  <div className="flex gap-3 text-slate-600 text-sm">
                    <CheckCircle className="w-5 h-5 text-aog-green shrink-0" /> 
                    <span>Vergelijk de terugverdientijd bij verschillende batterijcapaciteiten.</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                  <h4 className="text-xl font-bold text-slate-900 mb-2 text-center">Klaar voor de volgende stap?</h4>
                  <p className="text-sm text-slate-500 text-center mb-6">Plan een gratis adviesgesprek of vergelijk direct thuisbatterijen.</p>

                 <div className="space-y-3 mb-6">
                    {/* Knop 1: WhatsApp met vooraf ingevuld bericht */}
                    <Button 
                      onClick={() => window.open("https://wa.me/31612712804?text=Ik%20zou%20graag%20meer%20willen%20weten%20over%20thuisbatterijen", "_blank")}
                      className="w-full h-14 rounded-xl text-md font-bold bg-[#10b981] hover:bg-[#059669] text-white"
                    >
                      <Phone className="w-5 h-5 mr-2" /> Plan een adviesgesprek
                    </Button>
                    
                    {/* Knop 2: Standaard WhatsApp chat zonder tekst */}
                    <Button 
                      onClick={() => window.open("https://wa.me/31612712804", "_blank")}
                      className="w-full h-14 rounded-xl text-md font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp ons direct
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> 100% Vrijblijvend</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Gratis advies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <section id="lead-form" className="w-full scroll-mt-28">
      <div className={`rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200 shadow-xl relative overflow-hidden transition-all duration-500 ${currentStep === 9 ? 'p-6 sm:p-10 max-w-4xl mx-auto' : 'p-6 sm:p-10 max-w-2xl mx-auto'}`}>
        
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
      </div>
    </section>
  );
}
