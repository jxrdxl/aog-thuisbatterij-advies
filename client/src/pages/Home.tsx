import { Suspense, lazy } from "react";
import { CheckCircle, Shield, TrendingDown, BatteryWarning, AlertOctagon, Zap, ArrowRight, Sun, Moon, LineChart, Euro } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "wouter";

const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/20 font-sans text-slate-900 bg-slate-50">
      <Header />

      {/* Hero Sectie - Pijngericht & Direct */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.08),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(2,6,23,0.98))]" />
          <div className="absolute top-10 right-8 h-40 w-40 rounded-full bg-aog-green/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 container px-4 flex flex-col items-center">
          <div className="max-w-4xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400 font-black text-xs sm:text-sm uppercase tracking-wider mb-6">
              <AlertOctagon className="w-4 h-4" /> Let op: Nieuwe regels voor zonnepaneel-eigenaren
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-[-0.04em] mb-6 text-balance">
              Stop met betalen voor uw <span className="text-aog-orange">eigen zonnestroom</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl text-balance font-medium">
              Door torenhoge terugleverkosten en het afschaffen van de salderingsregeling verdampt uw rendement. Bereken in 2 minuten hoeveel u kunt redden met een thuisbatterij.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-white/90 text-sm sm:text-base font-bold mb-10">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                <CheckCircle className="w-4 h-4 text-aog-green" />
                <span>Gratis bespaaranalyse</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                <Shield className="w-4 h-4 text-aog-green" />
                <span>100% Vrijblijvend</span>
              </div>
            </div>

            <Link href="/quiz">
              <button className="inline-flex items-center justify-center rounded-full bg-aog-green hover:bg-aog-green-light text-white font-black text-xl sm:text-2xl px-10 py-5 shadow-[0_0_60px_rgba(34,197,94,0.3)] transition-all transform hover:scale-105 active:scale-95 group">
                Bereken mijn besparing 
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* NIEUW: Het Live Pijn Dashboard */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-[-0.03em] text-balance">
              De harde realiteit van uw huidige energierekening
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Kijk mee naar een gemiddelde dag. Zie hoe uw opgewekte stroom overdag niets waard is, terwijl u 's avonds de hoofdprijs betaalt.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Achtergrond effecten */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-aog-green/10 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
                <span className="text-white font-bold text-sm uppercase tracking-widest">Live Marktsimulatie</span>
              </div>
              <span className="text-slate-400 text-sm font-medium border border-white/10 rounded-full px-3 py-1">Vandaag</span>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Tijdslot 1: Overdag (De Pijn van Terugleveren) */}
              <div className="bg-white/5 border border-red-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center justify-center min-w-[100px]">
                  <Sun className="w-8 h-8 text-aog-orange mb-2" />
                  <span className="text-white font-black text-xl">13:00</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">Zonnepiek</span>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="text-red-400 font-black text-lg mb-1">U verliest geld aan het net</h4>
                  <p className="text-slate-300 text-sm">Uw panelen draaien op volle toeren, maar niemand wil de stroom. U levert terug tegen bodemprijzen én betaalt een <strong className="text-white">terugleverboete</strong>.</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center min-w-[140px]">
                  <span className="block text-red-400 text-xs font-bold uppercase mb-1">Waarde stroom</span>
                  <span className="block text-white font-black text-2xl">€ 0,00</span>
                  <span className="block text-red-400 text-xs mt-1">- €0,11 boete/kWh</span>
                </div>
              </div>

              {/* Tijdslot 2: Avond (De Pijn van Inkopen) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center justify-center min-w-[100px]">
                  <Moon className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-white font-black text-xl">19:00</span>
                  <span className="text-slate-400 text-xs font-bold uppercase">Avondpiek</span>
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h4 className="text-slate-200 font-black text-lg mb-1">U koopt dure stroom in</h4>
                  <p className="text-slate-400 text-sm">De zon is onder. U kookt, wast en de tv staat aan. U moet nu de stroom die u overdag gratis weggaf, <strong className="text-white">duur terugkopen</strong> van de leverancier.</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center min-w-[140px]">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-1">Inkoopprijs</span>
                  <span className="block text-red-400 font-black text-2xl">€ 0,35</span>
                  <span className="block text-slate-500 text-xs mt-1">per kWh</span>
                </div>
              </div>
            </div>

            {/* De Oplossing CTA in het dashboard */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <div className="inline-flex items-center justify-center bg-aog-green/20 text-aog-green-light px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Zap className="w-4 h-4 mr-2" /> De Thuisbatterij Oplossing
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
                Sla de gratis stroom van 13:00 op, en gebruik het om 19:00.
              </h3>
              <Link href="/quiz">
                <button className="bg-white text-slate-900 hover:bg-slate-100 font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-105">
                  Bekijk of dit voor u kan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Geoptimaliseerde Pijnpunten Sectie */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Waarom uw zonnepanelen in gevaar zijn
            </h2>
            <p className="text-lg text-slate-600">
              De spelregels zijn veranderd. Wie niets doet, betaalt de rekening.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Euro,
                color: "text-red-500",
                bg: "bg-red-100",
                title: "1. De Teruglever-boete is hier",
                text: "Bijna alle energieleveranciers rekenen inmiddels flinke kosten voor de stroom die u teruglevert. Dit kost een gemiddeld huishouden nu al honderden euro's per jaar.",
              },
              {
                icon: TrendingDown,
                color: "text-aog-orange",
                bg: "bg-orange-100",
                title: "2. Salderingsregeling verdwijnt",
                text: "Vanaf 2027 is het definitief voorbij met het wegstrepen van uw verbruik. U krijgt nog maar een schijntje voor uw opgewekte stroom, terwijl inkoopprijzen stijgen.",
              },
              {
                icon: LineChart,
                color: "text-aog-blue",
                bg: "bg-blue-100",
                title: "3. Netbeheerkosten exploderen",
                text: "Omdat het stroomnet overvol raakt, stijgen de vaste lasten en belastingen hard. Zelfvoorzienend worden is de enige manier om uzelf hiertegen te beschermen.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Zo werkt de check Sectie (Kort en Krachtig) */}
      <section id="how-it-works" className="py-16 bg-white border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Ontdek in 2 minuten of een batterij u geld oplevert
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
            
            {[
              {
                step: "1",
                title: "Klik op Berekenen",
                text: "Vul in hoeveel zonnepanelen u ongeveer heeft.",
              },
              {
                step: "2",
                title: "Live Analyse",
                text: "Onze tool berekent uw terugleverboetes en verlies.",
              },
              {
                step: "3",
                title: "Uw Rapport",
                text: "Zie direct hoeveel u bespaart met een thuisbatterij.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-aog-green text-white font-black flex items-center justify-center mb-6 text-2xl shadow-lg shadow-aog-green/30 ring-4 ring-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
             <Link href="/quiz">
                <button className="inline-flex items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xl px-10 py-5 transition-all transform hover:scale-105 active:scale-95">
                  Start mijn analyse
                </button>
              </Link>
          </div>
        </div>
      </section>

      {/* Veelgestelde vragen Sectie */}
      <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Veelgestelde vragen
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Waarom nu al kijken, 2027 duurt toch nog even?",
                text: "Energieleveranciers wachten niet tot 2027. Ze brengen nú al honderden euro's aan terugleverkosten in rekening. Met een batterij stopt u die bloeding direct.",
              },
              {
                title: "Is deze check vrijblijvend?",
                text: "Ja, 100%. U krijgt inzicht in uw persoonlijke situatie en hoeveel geld u momenteel laat liggen. Daarna bepaalt u zelf of u actie onderneemt.",
              },
              {
                title: "Past een thuisbatterij in mijn huis?",
                text: "Moderne batterijen zijn vaak niet groter dan een kleine cv-ketel of computerkast. In vrijwel elke woning met panelen is er plek voor te vinden.",
              },
              {
                title: "Zijn thuisbatterijen nu niet te duur?",
                text: "De prijzen zijn het afgelopen jaar enorm gedaald. Gecombineerd met de stijgende stroomprijzen en boetes, is de terugverdientijd korter dan ooit.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={null}>
        <StickyCta />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
      <Suspense fallback={<div className="h-24 bg-slate-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
