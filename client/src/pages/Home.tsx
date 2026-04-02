import { Suspense, lazy } from "react";
import { CheckCircle, Clock3, Shield, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import { Link } from "wouter"; // Importeer Link

const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/20 font-sans text-slate-900 bg-slate-50">
      <Header />

      {/* Hero Sectie - Nu volledig gecentreerd en clean */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(2,6,23,0.98))]" />
          <div className="absolute top-10 right-8 h-40 w-40 rounded-full bg-aog-green/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-aog-blue/10 blur-3xl" />
        </div>

        <div className="relative z-10 container px-4 flex flex-col items-center">
          <div className="max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-aog-green/30 bg-aog-green/10 px-4 py-2 text-aog-green font-black text-xs sm:text-sm uppercase tracking-wider mb-6">
              Gratis bespaarcheck voor huiseigenaren met zonnepanelen
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-[-0.04em] mb-6">
              Uw zonnepanelen leveren straks
              <span className="text-aog-orange"> minder op</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl">
              Door terugleverkosten en het afbouwen van salderen kan uw rendement flink dalen.
              Ontdek in 2 minuten of een thuisbatterij in uw situatie interessant kan zijn.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-white/90 text-sm sm:text-base font-bold mb-10">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                <CheckCircle className="w-4 h-4 text-aog-green" />
                <span>100% vrijblijvend</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                <Clock3 className="w-4 h-4 text-aog-green" />
                <span>Binnen 2 minuten</span>
              </div>
            </div>

            {/* Link naar de nieuwe quiz pagina */}
            <Link href="/quiz">
              <button className="inline-flex items-center justify-center rounded-full bg-aog-green hover:bg-aog-green-light text-white font-black text-xl sm:text-2xl px-10 py-5 shadow-[0_18px_50px_rgba(34,197,94,0.28)] transition-all transform hover:scale-105 active:scale-95">
                Start de bespaarcheck
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* De rest van de pagina blijft behouden zoals je had, beginnend met Waarom huishoudens... */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Waarom huishoudens nu opnieuw naar hun panelen kijken
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Ontdek waarom steeds meer Nederlanders de overstap maken.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Terugleverkosten drukken uw rendement",
                text: "Steeds meer huishoudens zien dat terugleveren minder oplevert en soms zelfs geld kost.",
              },
              {
                title: "2027 wordt het echte kantelpunt",
                text: "Vanaf 2027 wordt terugleveren nog minder interessant. Zelf gebruiken wordt belangrijker.",
              },
              {
                title: "Niet iedere woning is hetzelfde",
                text: "Aantal panelen, verbruik en gebruiksmoment bepalen of een thuisbatterij voor u logisch is.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-aog-green/10 flex items-center justify-center mb-5">
                  <TrendingDown className="w-6 h-6 text-aog-green" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Zo werkt de check
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Beantwoord een paar vragen",
                text: "Over uw woning, zonnepanelen en stroomgebruik.",
              },
              {
                step: "2",
                title: "Laat uw gegevens achter",
                text: "Uw lead komt direct binnen zodra u uw gegevens verzendt.",
              },
              {
                step: "3",
                title: "Ontvang een terugkoppeling",
                text: "U ziet direct uw uitslag en landt daarna op de bedanktpagina voor de opvolging.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-aog-green text-white font-black flex items-center justify-center mb-5 text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-[-0.03em]">
              Veelgestelde vragen
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Is deze check vrijblijvend?",
                text: "Ja. U vraagt een persoonlijke terugkoppeling aan, geen aankoop of verplicht traject.",
              },
              {
                title: "Is een thuisbatterij altijd interessant?",
                text: "Nee. Juist daarom begint het met een check op uw eigen situatie.",
              },
              {
                title: "Wat gebeurt er na mijn aanvraag?",
                text: "Uw gegevens zijn al binnen. Daarna volgt de terugkoppeling en eventuele opvolging.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
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
