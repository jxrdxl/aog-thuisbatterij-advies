import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Phone, Shield, ArrowRight, TrendingDown, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

const LeadForm = lazy(() => import("@/components/LeadForm"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/solar-house-50_cf88f835.webp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/30 font-sans">
      <Header />

      {/* HERO + FORM SECTION - OPTIMIZED FOR CONVERSION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="Huis met zonnepanelen in Nederland"
            className="w-full h-full object-cover scale-105"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container w-full flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          {/* Hero Text - Left Side */}
          <div className="text-left max-w-2xl lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 px-4 py-2.5 rounded-full mb-6 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-xs sm:text-sm font-black uppercase tracking-wider">U betaalt nu al tot €504/jaar om uw eigen stroom terug te leveren</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 text-balance">
              Betaal niet voor uw <span className="text-aog-green">eigen stroom.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 font-medium">
              Energieleveranciers rekenen u <span className="text-white font-black underline decoration-red-400 decoration-4">terugleverkosten</span> voor uw eigen zonnestroom — en per 1 januari 2027 wordt het nog duurder. Zet uw batterij aan het werk.
            </p>

            <div className="space-y-4 mb-8 hidden sm:block">
              {[
                "Stop tot €504 per jaar aan terugleverkosten te betalen",
                "Ontvang uw gratis adviesrapport (t.w.v. €240)",
                "0% rente financiering via het Warmtefonds (tot €8.500)"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80 font-bold">
                  <CheckCircle className="w-5 h-5 text-aog-green flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM COMPONENT - Right Side / Center on Mobile */}
          <div className="w-full max-w-md lg:max-w-lg animate-slide-up">
            <div className="relative">
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-aog-green text-white px-4 py-2 rounded-2xl font-black text-sm shadow-xl rotate-3 hidden sm:block">
                GRATIS CHECK
              </div>
              <LeadForm />
            </div>
            
            {/* Trust signals directly under form */}
            <div className="mt-6 flex items-center justify-center gap-6 text-white/60 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> AVG Veilig
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Direct Inzicht
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / LOGOS */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="container px-4">
          <p className="text-center text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-6">Aanbevolen door experts & gebruikers</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 grayscale">
            <div className="font-black text-xl text-slate-400">WARMTEFONDS</div>
            <div className="font-black text-xl text-slate-400">CONSUMENTENBOND</div>
            <div className="font-black text-xl text-slate-400">NOS.NL</div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION - "PIJN & OPLOSSING" */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6">
              Waarom nu actie nodig is
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              De energiemarkt verandert sneller dan ooit. Wie niet meebeweegt, betaalt de hoofdprijs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Problem */}
            <div className="bg-red-50 rounded-3xl p-8 sm:p-10 border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown className="w-24 h-24 text-red-600" />
              </div>
              <h3 className="text-2xl font-black text-red-900 mb-4">Het Probleem</h3>
              <ul className="space-y-4">
                {[
                  "U betaalt al tot €504/jaar terugleverkosten",
                  "Salderingsregeling stopt volledig op 1 jan. 2027",
                  "Teruglevering levert straks slechts ~5¢/kWh op",
                  "Uw zonnepanelen renderen steeds minder"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-800/80 font-bold">
                    <span className="text-red-500 mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-aog-green/5 rounded-3xl p-8 sm:p-10 border border-aog-green/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-24 h-24 text-aog-green" />
              </div>
              <h3 className="text-2xl font-black text-aog-green mb-4">De Oplossing</h3>
              <ul className="space-y-4">
                {[
                  "Sla uw eigen stroom op voor de avond/nacht",
                  "Word 100% onafhankelijk van het net",
                  "Gebruik dynamische prijzen in uw voordeel",
                  "Verhoog de waarde van uw woning direct"
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

      {/* STEPS SECTION */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-16">Hoe het werkt</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Gratis Check",
                desc: "Vul uw gegevens in voor een eerste scan van uw situatie."
              },
              {
                step: "02",
                title: "Persoonlijk Plan",
                desc: "Onze adviseur stelt een rapport op t.w.v. €240 (geheel gratis)."
              },
              {
                step: "03",
                title: "Zorgeloze Installatie",
                desc: "Wij regelen alles, van financiering tot de laatste schroef."
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

      {/* DYNAMIC ARBITRAGE EXPLAINER - shown AFTER basic value is clear */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-aog-green/20 border border-aog-green/30 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4 text-aog-green" />
                <span className="text-aog-green text-xs font-black uppercase tracking-wider">Slim systeem</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight">
                Uw batterij werkt ook 's nachts <span className="text-aog-orange">voor u.</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                De Hunco ESS slaat uw eigen zonnestroom op en verhandelt overschot automatisch op de energiemarkt — zodat u maximaal profiteert en niets meer teruggeeft aan het net voor niets.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-black text-aog-green mb-1">€0,-</p>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Terugleverkosten</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-black text-aog-orange mb-1">100%</p>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Zelfverbruik</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-slate-800 rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="font-black text-lg">Live Energie Dashboard</div>
                  <div className="px-3 py-1 rounded-full bg-aog-green/20 text-aog-green text-xs font-bold">OPTIMALISEREN</div>
                </div>
                <div className="space-y-6">
                  <div className="h-32 w-full bg-gradient-to-t from-aog-green/20 to-transparent rounded-xl border-b-2 border-aog-green relative">
                    <div className="absolute inset-0 flex items-end justify-around px-4">
                      {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-4 bg-aog-green/40 rounded-t-sm" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-white/40">
                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-aog-green">
        <div className="container px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-8">
            Klaar voor de toekomst?
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Wacht niet tot de wachtlijsten oplopen. Vraag nu uw gratis adviesrapport aan.
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
