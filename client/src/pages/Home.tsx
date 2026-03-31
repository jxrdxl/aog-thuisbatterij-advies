import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Phone, Shield, ArrowRight, TrendingDown, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

const LeadForm = lazy(() => import("@/components/LeadForm"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const SavingsCalculator = lazy(() => import("@/components/SavingsCalculator"));

export default function Home() {
  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/30 font-sans text-slate-900">
      <Header />

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(2,6,23,0.98))]" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-aog-green/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-aog-blue/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(2,6,23,0.18))]" />
        </div>

        <div className="relative z-10 container w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          <div className="text-left max-w-2xl lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-4 py-2.5 rounded-full mb-6 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-xs sm:text-sm font-black uppercase tracking-wider">Terugleverkosten drukken uw rendement nu al</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 text-balance">
              Betaal niet voor uw <span className="text-aog-green">eigen stroom.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 font-medium max-w-xl">
              Ontdek in een gratis adviesrapport hoe u terugleverkosten kunt beperken, uw zonnestroom slimmer inzet en welke thuisbatterij-oplossing bij uw woning past.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Gratis rapport t.w.v. €240",
                "Gemiddelde terugbeltijd: 47 minuten",
                "Geen verplichtingen",
                "Mogelijk 0% rente via Warmtefonds"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm px-4 py-3 text-white/85 font-bold">
                  <CheckCircle className="w-5 h-5 text-aog-green flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-lg animate-slide-up">
            <div className="relative">
              <div className="absolute -top-4 -right-4 z-20 bg-aog-green text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl rotate-3 hidden sm:block">
                GRATIS CHECK
              </div>
              <Suspense fallback={<div className="h-[400px] bg-white/10 animate-pulse rounded-3xl" />}>
                <LeadForm />
              </Suspense>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-white/70 text-xs font-bold uppercase tracking-widest">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                AVG-veilig
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                Direct inzicht
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Rapportwaarde", value: "€240" },
              { label: "Gem. terugbeltijd", value: "47 min" },
              { label: "Verplichtingen", value: "Geen" }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white border border-slate-200 p-5 text-center shadow-sm">
                <p className="text-2xl font-black text-aog-green">{item.value}</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator">
        <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
          <SavingsCalculator onCtaClick={scrollToForm} />
        </Suspense>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6">
              Waarom nu actie nodig is
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Wie niets doet, ziet het rendement van zonnepanelen steeds verder afnemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 rounded-3xl p-8 sm:p-10 border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown className="w-24 h-24 text-red-600" />
              </div>
              <h3 className="text-2xl font-black text-red-900 mb-4">Zonder oplossing</h3>
              <ul className="space-y-4">
                {[
                  "U levert uw stroom terug tegen steeds slechtere voorwaarden",
                  "Terugleverkosten drukken direct op uw opbrengst",
                  "De salderingsregeling stopt volledig op 1 januari 2027",
                  "Uw zonnepanelen verdienen zichzelf minder snel terug"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-800/80 font-bold">
                    <span className="text-red-500 mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-aog-green/5 rounded-3xl p-8 sm:p-10 border border-aog-green/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24 text-aog-green" />
              </div>
              <h3 className="text-2xl font-black text-aog-green mb-4">Met een passende thuisbatterij</h3>
              <ul className="space-y-4">
                {[
                  "U gebruikt meer van uw eigen zonnestroom zelf",
                  "U beperkt teruglevering en dus ook terugleverkosten",
                  "U krijgt zicht op financiering en terugverdientijd",
                  "U maakt uw woning beter voorbereid op nieuwe energieregels"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-aog-green/80 font-bold">
                    <span className="text-aog-green mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16">Hoe het werkt</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Gratis check",
                desc: "Vul uw gegevens in voor een eerste scan van uw situatie."
              },
              {
                step: "02",
                title: "Persoonlijk rapport",
                desc: "Onze adviseur kijkt naar terugleverkosten, woningtype en mogelijke besparing."
              },
              {
                step: "03",
                title: "Advies op maat",
                desc: "U krijgt helder vervolgadvies over batterijen, financiering en vervolgstappen."
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="text-7xl font-black text-slate-100 absolute -top-10 -left-4 group-hover:text-aog-green/10 transition-colors">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is het rapport echt gratis?",
                  a: "Ja. U ontvangt eerst vrijblijvend advies. Er zijn geen kosten of verplichtingen aan verbonden."
                },
                {
                  q: "Hoe snel word ik gebeld?",
                  a: "Gemiddeld binnen 47 minuten. Op drukkere momenten kan dit iets langer duren."
                },
                {
                  q: "Kan ik ook financieren?",
                  a: "Afhankelijk van uw situatie is 0% rente via het Warmtefonds mogelijk. Dit bespreken we in het advies."
                },
                {
                  q: "Is een thuisbatterij voor elke woning geschikt?",
                  a: "Niet altijd. Daarom kijken we eerst naar uw woning, zonnepanelen en verbruik voordat we iets adviseren."
                }
              ].map((item, idx) => (
                <details key={idx} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-black text-slate-900">
                    {item.q}
                    <span className="text-aog-green transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-aog-green">
        <div className="container px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-8">
            Klaar voor de toekomst?
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Vraag nu uw gratis adviesrapport aan en ontdek wat u kunt besparen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-aog-green hover:bg-slate-100 font-black text-xl px-10 h-20 rounded-2xl shadow-2xl"
            >
              <a href="#lead-form">Start de gratis check <ArrowRight className="ml-2 w-6 h-6" /></a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 font-black h-20 px-10 rounded-2xl text-xl"
            >
              <a href="tel:+31612712804">
                <Phone className="w-6 h-6 mr-3" /> 06-127 128 04
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
        <WhatsAppButton />
        <StickyCta />
        <ExitIntentPopup />
      </Suspense>
    </div>
  );
}
