import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, User, Mail, MapPin, Home, Zap } from "lucide-react";

interface FormData {
  solarPanelCount: string;
  homeOwner: boolean | undefined;
  currentProvider: string;
  annualIncome: string;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  preferredContact: string;
}

const STEPS = [
  { title: "Zonnepanelen", icon: Zap },
  { title: "Woonsituatie", icon: Home },
  { title: "Energieleverancier", icon: Zap },
  { title: "Financiering", icon: Shield },
  { title: "Contactgegevens", icon: User },
  { title: "Bevestiging", icon: Phone },
];

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    solarPanelCount: "",
    homeOwner: undefined,
    currentProvider: "",
    annualIncome: "",
    name: "",
    phone: "",
    email: "",
    postalCode: "",
    preferredContact: "phone",
  });

  const submitMutation = trpc.leads.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return formData.solarPanelCount !== "";
      case 1: return formData.homeOwner !== undefined;
      case 2: return true;
      case 3: return true;
      case 4: return formData.name.length > 0 && formData.phone.length >= 8;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Get UTM params from URL
    const params = new URLSearchParams(window.location.search);
    submitMutation.mutate({
      ...formData,
      email: formData.email || "",
      homeOwner: formData.homeOwner ?? undefined,
      estimatedSavings: formData.solarPanelCount ? Math.round(parseInt(formData.solarPanelCount.split("-")[0] || "10") * 310 * 0.7 * 0.35 * 0.85) : undefined,
      source: "website-form",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    });
  };

  if (submitted) {
    return (
      <section id="lead-form" className="py-16 sm:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-aog-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-aog-green" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">Bedankt voor uw aanvraag!</h2>
            <p className="text-muted-foreground text-lg mb-2">
              Een adviseur belt u <strong>binnen 1 werkdag</strong>.
            </p>
            <p className="text-muted-foreground">Gemiddeld nemen wij binnen 2 uur contact op.</p>
            <div className="mt-8 bg-white rounded-xl border border-border p-5 text-left">
              <p className="text-sm font-semibold text-foreground mb-3">Wat kunt u verwachten?</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-aog-green mt-0.5 shrink-0" /> Telefonisch contact door een gecertificeerde adviseur</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-aog-green mt-0.5 shrink-0" /> Persoonlijk energierapport t.w.v. €240 (gratis)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-aog-green mt-0.5 shrink-0" /> Advies op maat over financiering via Warmtefonds</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-aog-green mt-0.5 shrink-0" /> Geen verplichtingen — volledig vrijblijvend</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            Om in aanmerking te komen voor 0% financiering vanuit het Warmtefonds is een onafhankelijk rapport vereist. Beantwoord 6 vragen om te starten.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Stap {step + 1} van {STEPS.length}</span>
              <span>{STEPS[step].title}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm min-h-[320px] flex flex-col">
            {/* Step 0: Solar panels */}
            {step === 0 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Hoeveel zonnepanelen heeft u?</h3>
                <p className="text-sm text-muted-foreground mb-6">Dit helpt ons uw besparing nauwkeurig te berekenen.</p>
                <RadioGroup value={formData.solarPanelCount} onValueChange={(v) => updateField("solarPanelCount", v)} className="space-y-3">
                  {[
                    { value: "1-6", label: "1 – 6 panelen", sub: "Klein systeem" },
                    { value: "7-12", label: "7 – 12 panelen", sub: "Gemiddeld systeem" },
                    { value: "13-18", label: "13 – 18 panelen", sub: "Groot systeem" },
                    { value: "18+", label: "18+ panelen", sub: "Zeer groot systeem" },
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
                        <p className="text-xs text-muted-foreground">{opt.sub}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 1: Home owner */}
            {step === 1 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Bent u eigenaar van uw woning?</h3>
                <p className="text-sm text-muted-foreground mb-6">Warmtefonds financiering is beschikbaar voor woningeigenaren.</p>
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
            )}

            {/* Step 2: Energy provider */}
            {step === 2 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Wie is uw energieleverancier?</h3>
                <p className="text-sm text-muted-foreground mb-6">Optioneel — helpt ons uw terugleverkosten in te schatten.</p>
                <Select value={formData.currentProvider} onValueChange={(v) => updateField("currentProvider", v)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecteer uw leverancier" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Eneco", "Vattenfall", "Essent", "Budget Energie", "Greenchoice", "Vandebron", "Tibber", "Engie", "Anders / Weet ik niet"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 3: Income / financing */}
            {step === 3 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Wat is uw geschat jaarinkomen?</h3>
                <p className="text-sm text-muted-foreground mb-6">Bij een inkomen onder €60.000 komt u mogelijk in aanmerking voor 0% rente via het Warmtefonds.</p>
                <RadioGroup value={formData.annualIncome} onValueChange={(v) => updateField("annualIncome", v)} className="space-y-3">
                  {[
                    { value: "under-30k", label: "Onder €30.000", sub: "0% rente mogelijk" },
                    { value: "30k-60k", label: "€30.000 – €60.000", sub: "0% rente mogelijk" },
                    { value: "60k-plus", label: "Boven €60.000", sub: "Lage rente mogelijk" },
                    { value: "prefer-not", label: "Zeg ik liever niet", sub: "Geen probleem" },
                  ].map((opt) => (
                    <Label
                      key={opt.value}
                      htmlFor={`income-${opt.value}`}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.annualIncome === opt.value
                          ? "border-aog-green bg-aog-green/5 ring-1 ring-aog-green"
                          : "border-border hover:border-aog-green/40"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} id={`income-${opt.value}`} />
                      <div>
                        <p className="font-semibold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.sub}</p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Contact details */}
            {step === 4 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Uw contactgegevens</h3>
                <p className="text-sm text-muted-foreground mb-6">Wij bellen u binnen 1 werkdag. Uw gegevens blijven vertrouwelijk.</p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <User className="w-3.5 h-3.5" /> Naam *
                    </Label>
                    <Input id="name" placeholder="Uw volledige naam" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <Phone className="w-3.5 h-3.5" /> Telefoonnummer *
                    </Label>
                    <Input id="phone" type="tel" placeholder="06-12345678" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <Mail className="w-3.5 h-3.5" /> E-mailadres (optioneel)
                    </Label>
                    <Input id="email" type="email" placeholder="uw@email.nl" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="h-12" />
                  </div>
                  <div>
                    <Label htmlFor="postal" className="text-sm font-medium flex items-center gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Postcode (optioneel)
                    </Label>
                    <Input id="postal" placeholder="1234 AB" value={formData.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} className="h-12" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Bevestig uw aanvraag</h3>
                <p className="text-sm text-muted-foreground mb-6">Controleer uw gegevens en verstuur uw gratis aanvraag.</p>
                <div className="bg-slate-50 rounded-xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Naam</span><span className="font-semibold">{formData.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Telefoon</span><span className="font-semibold">{formData.phone}</span></div>
                  {formData.email && <div className="flex justify-between"><span className="text-muted-foreground">E-mail</span><span className="font-semibold">{formData.email}</span></div>}
                  {formData.postalCode && <div className="flex justify-between"><span className="text-muted-foreground">Postcode</span><span className="font-semibold">{formData.postalCode}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Panelen</span><span className="font-semibold">{formData.solarPanelCount}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Eigenaar</span><span className="font-semibold">{formData.homeOwner ? "Ja" : formData.homeOwner === false ? "Nee" : "-"}</span></div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-aog-green shrink-0 mt-0.5" />
                  <span>Door te versturen gaat u akkoord met onze privacyverklaring. Uw gegevens worden uitsluitend gebruikt voor het energierapport.</span>
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
                  disabled={submitMutation.isPending}
                  className="bg-aog-green hover:bg-aog-green-light text-white gap-1 px-6"
                >
                  {submitMutation.isPending ? "Versturen..." : "Verstuur aanvraag"} <CheckCircle className="w-4 h-4" />
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
