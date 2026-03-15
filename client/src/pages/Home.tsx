import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";

const LeadForm = lazy(() => import("@/components/LeadForm"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/solar-house_a519113a.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/30">
      <Header />

      {/* HERO + FORM SECTION - COMBINED FOR IMMEDIATE ACTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24">
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/75 to-slate-900/85" />
        </div>

        {/* Content - Form takes center stage */}
        <div className="relative z-10 container w-full flex flex-col items-center justify-center">
          {/* Minimal Hero Text */}
          <div className="text-center mb-8 sm:mb-12 max-w-3xl px-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] mb-4 text-balance">
              Wat kost uw zonnepanelen u in <span className="text-aog-orange">2027?</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              De saldering verdwijnt. Ontdek in 2 minuten hoeveel u kunt besparen met een thuisbatterij.
            </p>
          </div>

          {/* FORM COMPONENT DIRECTLY IN HERO */}
          <div className="w-full max-w-2xl px-4">
            <LeadForm />
          </div>

          {/* Trust indicators below form */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-aog-green" />
              <span>2.400+ huishoudens geholpen</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-aog-green" />
              <span>Gratis adviesrapport (€240)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-aog-green" />
              <span>0% financiering</span>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL INFO SECTION - Only essentials */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-8 text-center">
              Wat gebeurt er na uw aanvraag?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  number: "1",
                  title: "Wij bellen u",
                  description: "Binnen 2 uur neemt een adviseur contact op (gem. 47 min)"
                },
                {
                  number: "2",
                  title: "Gratis rapport",
                  description: "Persoonlijk advies op basis van uw situatie (waarde €240)"
                },
                {
                  number: "3",
                  title: "0% financiering",
                  description: "Via het Warmtefonds - geen rente, geen gedoe"
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-aog-green/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-aog-green">{item.number}</span>
                  </div>
                  <h3 className="font-black text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COST COMPARISON - Quick visual reference */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-12 text-center">
              De impact van de nieuwe regels
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Current situation */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">NU (2024-2026)</p>
                <p className="text-4xl font-black text-aog-green mb-2">€0</p>
                <p className="text-sm text-muted-foreground">U ontvangt geld voor teruggeleverde stroom (saldering)</p>
              </div>

              {/* 2027 situation */}
              <div className="bg-red-50 rounded-2xl p-8 border border-red-200 shadow-sm">
                <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">VANAF 2027</p>
                <p className="text-4xl font-black text-aog-red mb-2">€1.400+</p>
                <p className="text-sm text-red-700">Extra kosten per jaar (gemiddeld)</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-aog-green/5 rounded-2xl border border-aog-green/20 text-center">
              <p className="text-lg font-black text-aog-green mb-2">💡 Oplossing: Thuisbatterij</p>
              <p className="text-sm text-foreground">Gebruik uw eigen stroom in de avond en nacht. Voorkomt deze extra kosten.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Minimal */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-12 text-center">
              Veelgestelde vragen
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Hoeveel kost een thuisbatterij?",
                  a: "Dat hangt af van uw situatie. Daarom bellen we u voor een persoonlijk advies. Veel huiseigenaren financieren via het Warmtefonds met 0% rente."
                },
                {
                  q: "Ben ik geschikt?",
                  a: "Als u eigenaar bent van uw woning en zonnepanelen heeft, bent u waarschijnlijk geschikt. Vul het formulier in en wij bellen u."
                },
                {
                  q: "Wat als ik huur?",
                  a: "Helaas is het adviesrapport en de financiering van het Warmtefonds alleen beschikbaar voor woningeigenaren."
                },
                {
                  q: "Hoe snel gaat dit?",
                  a: "Gemiddeld bellen wij u binnen 47 minuten. Het hele proces duurt meestal 2-4 weken."
                }
              ].map((item, idx) => (
                <details key={idx} className="group border border-slate-200 rounded-xl p-6 hover:border-aog-green/30 transition-colors cursor-pointer">
                  <summary className="font-black text-foreground flex items-center justify-between">
                    {item.q}
                    <span className="text-aog-green group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">
            Klaar om uw toekomst veilig te stellen?
          </h2>
          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Vraag nu uw gratis adviesrapport aan. Geen verplichtingen, geen kosten.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-aog-green hover:bg-aog-green-light text-white font-black text-lg px-8 h-16 rounded-2xl shadow-lg shadow-aog-green/20"
            >
              <a href="#lead-form">Start gratis check</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-black h-16 px-8 rounded-2xl"
            >
              <a href="tel:+31612712804">
                <Phone className="w-5 h-5 mr-2" /> Bel ons: 06-127 128 04
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
