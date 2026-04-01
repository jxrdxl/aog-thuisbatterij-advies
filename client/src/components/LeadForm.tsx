import { useMemo, useState } from "react";
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
} from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useTracking } from "@/hooks/useTracking";

type QuizAnswers = {
  homeType: string;
  hasPanels: string;
  panelCount: string;
  feedIn: string;
  usageMoment: string;
  futureUsage: string;
  interest: string;
};

type LeadFields = {
  postcode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const totalSteps = 9;

const optionBase =
  "w-full text-left rounded-2xl border-2 px-4 py-4 transition-all duration-200 bg-white hover:shadow-md";
const optionIdle = "border-slate-200 hover:border-aog-green/50";
const optionActive = "border-aog-green bg-aog-green/5 shadow-sm";

export default function LeadForm() {
  const [, setLocation] = useLocation();
  const { trackInitiateCheckout } = useTracking();

  const leadMutation = trpc.leads.submit.useMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  const [answers, setAnswers] = useState<QuizAnswers>({
    homeType: "",
    hasPanels: "",
    panelCount: "",
    feedIn: "",
    usageMoment: "",
    futureUsage: "",
    interest: "",
  });

  const [leadFields, setLeadFields] = useState<LeadFields>({
    postcode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const stepPercentage = Math.round((currentStep / totalSteps) * 100);

  const resultMeta = useMemo(() => {
    const likelyGood =
      answers.homeType === "koopwoning" &&
      answers.hasPanels === "ja" &&
      (answers.panelCount === "11-15" ||
        answers.panelCount === "16-20" ||
        answers.panelCount === "20+") &&
      (answers.feedIn === "regelmatig" || answers.usageMoment === "avond");

    if (likelyGood) {
      return {
        badge: "Waarschijnlijk interessant",
        title: "Uw situatie lijkt geschikt voor een persoonlijke bespaaranalyse",
        range: "€530 – €950",
        description:
          "Op basis van uw antwoorden lijkt het zinvol om te laten berekenen hoeveel terugleververlies mogelijk speelt en of een thuisbatterij in uw situatie interessant kan zijn.",
      };
    }

    return {
      badge: "Mogelijk interessant",
      title: "Een persoonlijke check is in uw situatie zinvol",
      range: "€250 – €650",
      description:
        "Uw situatie vraagt om een persoonlijke berekening. Voor sommige huishoudens is een thuisbatterij interessant, voor andere niet. Daarom kijken we eerst naar uw woning, verbruik en teruglevering.",
    };
  }, [answers]);

  const startTrackingOnce = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackInitiateCheckout({
        content_name: "Bespaarcheck",
        content_category: "Thuisbatterij Advies",
        value: 240,
        currency: "EUR",
      });
    }
  };

  const updateAnswer = (key: keyof QuizAnswers, value: string) => {
    startTrackingOnce();
    setSubmitError("");
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const updateLeadField = (key: keyof LeadFields, value: string) => {
    startTrackingOnce();
    setSubmitError("");
    setLeadFields((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const canContinueStep = () => {
    switch (currentStep) {
      case 1:
        return !!answers.homeType;
      case 2:
        return !!answers.hasPanels;
      case 3:
        return !!answers.panelCount;
      case 4:
        return !!answers.feedIn;
      case 5:
        return !!answers.usageMoment;
      case 6:
        return !!answers.futureUsage;
      case 7:
        return !!answers.interest;
      case 8:
        return (
          leadFields.postcode.trim().length >= 6 &&
          leadFields.firstName.trim().length >= 2 &&
          leadFields.lastName.trim().length >= 2 &&
          leadFields.email.includes("@") &&
          leadFields.phone.replace(/\D/g, "").length >= 10
        );
      default:
        return false;
    }
  };

  const handleAutoAdvance = (key: keyof QuizAnswers, value: string) => {
    updateAnswer(key, value);

    if (
      (key === "homeType" && value === "huurwoning") ||
      (key === "hasPanels" && value === "nee")
    ) {
      setTimeout(() => {
        setLocation("/bedankt?naam=bezoeker&telefoon=");
      }, 250);
      return;
    }

    setTimeout(() => nextStep(), 180);
  };

  const handleSubmit = async () => {
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

    try {
      try {
        await leadMutation.mutateAsync(payload);
      } catch (e) {
        console.error("Database/trpc submission failed", e);
        throw e;
      }

      setLocation(
        `/bedankt?naam=${encodeURIComponent(
          leadFields.firstName
        )}&telefoon=${encodeURIComponent(leadFields.phone)}`
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Woont u in een koopwoning?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              Deze check is bedoeld voor particuliere koopwoningen.
            </p>

            <div className="space-y-3">
              {[
                { value: "koopwoning", label: "Ja, koopwoning", icon: Home },
                { value: "huurwoning", label: "Nee, huurwoning", icon: Home },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.homeType === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAutoAdvance("homeType", item.value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900">{item.label}</p>
                      </div>
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
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Heeft u zonnepanelen?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              We richten deze check op woningen die al zonnestroom opwekken.
            </p>

            <div className="space-y-3">
              {[
                { value: "ja", label: "Ja", icon: Sun },
                { value: "nee", label: "Nee", icon: Sun },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.hasPanels === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAutoAdvance("hasPanels", item.value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-aog-green" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900">{item.label}</p>
                      </div>
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
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Hoeveel zonnepanelen heeft u ongeveer?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              Een grove indicatie is genoeg.
            </p>

            <div className="space-y-3">
              {["6-10", "11-15", "16-20", "20+"].map((value) => {
                const active = answers.panelCount === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAutoAdvance("panelCount", value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Sun className="w-6 h-6 text-aog-orange" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900">{value}</p>
                      </div>
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
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Levert u regelmatig stroom terug?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              Dit helpt bepalen of terugleververlies een rol speelt.
            </p>

            <div className="space-y-3">
              {[
                { value: "regelmatig", label: "Ja, regelmatig", icon: BatteryCharging },
                { value: "soms", label: "Soms", icon: Gauge },
                { value: "weet-niet", label: "Weet ik niet", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.feedIn === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAutoAdvance("feedIn", item.value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900">{item.label}</p>
                      </div>
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
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Wanneer gebruikt u de meeste stroom?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              Dit bepaalt hoeveel zonnestroom u direct zelf gebruikt.
            </p>

            <div className="space-y-3">
              {[
                {
                  value: "overdag",
                  label: "Overdag",
                  sub: "Thuiswerker / huishouden",
                  icon: Sun,
                },
                {
                  value: "avond",
                  label: "'s Avonds",
                  sub: "Koken, tv, verlichting",
                  icon: Moon,
                },
                {
                  value: "gelijk",
                  label: "Gelijk verdeeld",
                  sub: "Geen duidelijke piek",
                  icon: Gauge,
                },
                {
                  value: "weet-niet",
                  label: "Weet ik niet",
                  sub: "Wij helpen dit inschatten",
                  icon: HelpCircle,
                },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.usageMoment === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAutoAdvance("usageMoment", item.value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                          <p className="font-black text-lg text-slate-900">{item.label}</p>
                          <p className="text-sm text-slate-500">{item.sub}</p>
                        </div>
                      </div>
                      {active ? <CheckCircle className="w-6 h-6 text-aog-green" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-4 text-blue-800 text-sm leading-relaxed">
              <strong>Tip:</strong> Gebruikt u de meeste stroom ’s avonds? Dan kan een thuisbatterij extra interessant zijn, omdat u overdag zonnestroom opslaat en later gebruikt.
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h3 className="text-3xl font-black text-slate-900 mb-3">
              Verwacht u meer stroom te gaan gebruiken?
            </h3>
            <p className="text-slate-500 text-lg mb-6">
              Denk aan een laadpaal, airco of warmtepomp.
            </p>

            <div className="space-y-3">
              {[
                { value: "laadpaal", label: "Elektrische auto / laadpaal", icon: Car },
                { value: "warmtepomp", label: "Airco / warmtepomp", icon: Zap },
                { value: "geen", label: "Geen grote wijziging", icon: Gauge },
                { value: "weet-niet", label: "Weet ik nog niet", icon: HelpCircle },
              ].map((item) => {
                const Icon = item.icon;
                const active = answers.futureUsage === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleAutoAdvance("futureUsage", item.value)}
                    className={`${optionBase} ${active ? optionActive : optionIdle}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div>
                        <p className="font-black text-lg text-slate-900">{item.label}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        );

      case 7:
        return (
          <>
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f172a,#16385f)] text-white px-6 py-8 mb-6">
              <p className="text-4xl mb-3">📋</p>
              <h3 className="text-3xl font-black mb-3">Uw gegevens</h3>
              <p className="text-white/80 text-lg">Vul uw contactgegevens in</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-4xl font-black text-slate-900 mb-6">Jouw gegevens</h3>

              <div className="space-y-5">
                <div>
                  <Label className="text-base font-black text-slate-900 mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-aog-green" />
                    Postcode *
                  </Label>
                  <Input
                    placeholder="1234 AB"
                    value={leadFields.postcode}
                    onChange={(e) => updateLeadField("postcode", e.target.value)}
                    className="h-14 rounded-2xl border-slate-200 text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-black text-slate-900 mb-2 block flex items-center gap-2">
                      <User className="w-4 h-4 text-aog-blue" />
                      Voornaam *
                    </Label>
                    <Input
                      placeholder="Je voornaam"
                      value={leadFields.firstName}
                      onChange={(e) => updateLeadField("firstName", e.target.value)}
                      className="h-14 rounded-2xl border-slate-200 text-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-black text-slate-900 mb-2 block">
                      Achternaam *
                    </Label>
                    <Input
                      placeholder="Je achternaam"
                      value={leadFields.lastName}
                      onChange={(e) => updateLeadField("lastName", e.target.value)}
                      className="h-14 rounded-2xl border-slate-200 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-black text-slate-900 mb-2 block flex items-center gap-2">
                    <Mail className="w-4 h-4 text-aog-blue" />
                    E-mailadres *
                  </Label>
                  <Input
                    placeholder="naam@voorbeeld.nl"
                    type="email"
                    value={leadFields.email}
                    onChange={(e) => updateLeadField("email", e.target.value)}
                    className="h-14 rounded-2xl border-slate-200 text-lg"
                  />
                </div>

                <div>
                  <Label className="text-base font-black text-slate-900 mb-2 block flex items-center gap-2">
                    <Phone className="w-4 h-4 text-aog-green" />
                    Telefoonnummer *
                  </Label>
                  <Input
                    placeholder="0612345678"
                    type="tel"
                    value={leadFields.phone}
                    onChange={(e) => updateLeadField("phone", e.target.value)}
                    className="h-14 rounded-2xl border-slate-200 text-lg"
                  />
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-slate-500 italic text-lg leading-relaxed">
                  Uw contactgegevens worden alleen gebruikt voor maatwerkadvies. De gegevens worden niet doorverkocht.
                </div>
              </div>
            </div>
          </>
        );

      case 8:
        return (
          <>
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f172a,#16385f)] text-white px-6 py-8 mb-6">
              <p className="text-4xl mb-3">🎉</p>
              <h3 className="text-3xl font-black mb-3">Uw bespaarresultaat</h3>
              <p className="text-white/80 text-lg">Op basis van uw antwoorden</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center rounded-full border border-aog-green/70 bg-aog-green/10 px-4 py-2 text-aog-green font-bold text-sm mb-5">
                ⭐ {resultMeta.badge}
              </div>

              <h4 className="text-4xl font-black text-slate-900 leading-tight mb-4">
                {resultMeta.title}
              </h4>

              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                {resultMeta.description}
              </p>

              <div className="rounded-[24px] border-2 border-aog-green bg-aog-green/5 p-6 mb-6 text-center">
                <p className="text-aog-green font-bold text-xl mb-2">
                  Geschat besparingspotentieel
                </p>
                <p className="text-5xl sm:text-6xl font-black text-aog-green mb-1">
                  {resultMeta.range}
                </p>
                <p className="text-slate-500 text-lg">per jaar</p>
              </div>

              <div>
                <h5 className="text-2xl font-black text-slate-900 mb-4">
                  Onze aanbevelingen:
                </h5>
                <ul className="space-y-4 text-slate-600 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-aog-green mt-0.5 flex-shrink-0" />
                    <span>Plan een gratis adviesgesprek voor een persoonlijke berekening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-aog-green mt-0.5 flex-shrink-0" />
                    <span>Bekijk hoe u uw zelfverbruik kunt maximaliseren</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-aog-green mt-0.5 flex-shrink-0" />
                    <span>Informeer naar slimme laad- of batterijopties voor uw woning</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border-2 border-aog-green bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={() => handleAutoAdvance("interest", "advies")}
                className="w-full rounded-2xl bg-aog-green text-white py-5 text-xl font-black shadow-lg shadow-aog-green/20 hover:bg-aog-green-light transition-colors"
              >
                Bekijk mijn besparing
              </button>

              <div className="flex justify-center gap-8 text-sm text-slate-500 mt-5 pt-5 border-t border-slate-200">
                <span>100% vrijblijvend</span>
                <span>Gratis advies</span>
              </div>
            </div>
          </>
        );

      case 9:
        return (
          <>
            <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f172a,#16385f)] text-white px-6 py-8 mb-6">
              <p className="text-4xl mb-3">✅</p>
              <h3 className="text-3xl font-black mb-3">Bedankt!</h3>
              <p className="text-white/80 text-lg">Uw aanvraag is ontvangen</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-3xl font-black text-slate-900 text-center mb-3">
                Uw bespaaranalyse is onderweg
              </h4>
              <p className="text-slate-500 text-center text-lg mb-6">
                We nemen zo snel mogelijk contact met u op voor een persoonlijk adviesgesprek.
              </p>

              <div className="space-y-3 text-slate-600 text-lg pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-aog-green flex-shrink-0" />
                  <span>Persoonlijke bespaaranalyse op maat</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-aog-green flex-shrink-0" />
                  <span>Onafhankelijk en vrijblijvend advies</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-aog-green flex-shrink-0" />
                  <span>Terugkoppeling op basis van uw situatie</span>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <section id="lead-form" className="w-full">
      <div className="rounded-[28px] bg-white/95 backdrop-blur-md border border-white/20 p-4 sm:p-6 shadow-2xl">
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-black text-slate-700">Bespaarcheck</p>
            <p className="text-sm font-bold text-slate-500">{stepPercentage}%</p>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-aog-green transition-all duration-300"
              style={{ width: `${stepPercentage}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="h-12 px-4 rounded-xl text-base font-black border-slate-200 sm:h-14 sm:px-6 sm:rounded-2xl sm:text-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:w-5 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Vorige</span>
            <span className="sm:hidden">Terug</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canContinueStep()}
              className="h-12 px-4 rounded-xl text-base font-black bg-aog-green hover:bg-aog-green-light sm:h-14 sm:px-7 sm:rounded-2xl sm:text-lg"
            >
              <span className="hidden sm:inline">Volgende</span>
              <span className="sm:hidden">Volg</span>
              <ArrowRight className="w-4 h-4 ml-1 sm:w-5 sm:h-5 sm:ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canContinueStep() || isSubmitting}
              className="h-12 px-4 rounded-xl text-base font-black bg-aog-green hover:bg-aog-green-light sm:h-14 sm:px-7 sm:rounded-2xl sm:text-lg"
            >
              {isSubmitting ? "Verzenden..." : "Verzenden"}
              <ArrowRight className="w-4 h-4 ml-1 sm:w-5 sm:h-5 sm:ml-2" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs sm:gap-4 sm:mt-6 sm:pt-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Zap className="w-3 h-3 text-aog-orange" /> Persoonlijke analyse
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