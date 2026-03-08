import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import SavingsCalculator from "@/components/SavingsCalculator";
import LeadForm from "@/components/LeadForm";
import TrustSignals from "@/components/TrustSignals";
import ValuePropositions from "@/components/ValuePropositions";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyCta from "@/components/StickyCta";
import HowItWorks from "@/components/HowItWorks";
import UrgencyBanner from "@/components/UrgencyBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/solar-house_a519113a.jpg";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="Huis met zonnepanelen"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center pt-20 pb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-aog-green/20 backdrop-blur-sm border border-aog-green/30 text-aog-green-light text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-4 h-4" /> Warmtefonds Initiatief · Onafhankelijk
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 max-w-4xl mx-auto">
            Wat kosten uw zonnepanelen u{" "}
            <span className="relative">
              <span className="text-aog-orange">straks in 2027?</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="oklch(0.70 0.18 60)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            De salderingsregeling verdwijnt per <strong className="text-white">1 januari 2027</strong>.
            Heeft u zonnepanelen? Dan gaat u waarschijnlijk <strong className="text-aog-orange">€1.400+ extra per jaar</strong> betalen.
            Ontdek hoe een thuisbatterij dit voorkomt.
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-3 font-medium">Saldering verdwijnt over</p>
            <CountdownTimer />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-aog-green hover:bg-aog-green-light text-white font-bold text-base px-8 h-14 rounded-xl shadow-lg animate-pulse-glow w-full sm:w-auto"
            >
              Start gratis bespaar-check — 90 sec <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold h-14 rounded-xl w-full sm:w-auto bg-transparent"
            >
              <a href="#calculator">Bereken mijn besparing</a>
            </Button>
          </div>

          <p className="text-xs text-white/40 mb-10">Nog 23 plekken beschikbaar in uw regio</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {[
              { value: "€240", label: "Waarde rapport (Nu gratis)" },
              { value: "€1.645", label: "Gem. extra kosten na 2027" },
              { value: "0%", label: "Rente via Warmtefonds" },
            ].map((s) => (
              <div key={s.value} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4">
                <p className="text-xl sm:text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Signals / News Ticker */}
      <TrustSignals />

      {/* How It Works */}
      <HowItWorks />

      {/* Savings Calculator */}
      <SavingsCalculator onCtaClick={scrollToForm} />

      {/* Value Propositions */}
      <ValuePropositions />

      {/* Lead Form */}
      <div ref={formRef}>
        <LeadForm />
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-aog-green-dark to-aog-green text-white">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Klaar om te besparen?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Vraag vandaag nog uw gratis adviesrapport aan en ontdek hoeveel u kunt besparen met een thuisbatterij.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-aog-green-dark hover:bg-white/90 font-bold text-base px-8 h-14 rounded-xl shadow-lg"
            >
              <a href="#lead-form">
                <CheckCircle className="mr-2 w-5 h-5" /> Vraag gratis rapport aan
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold h-14 rounded-xl bg-transparent"
            >
              <a href="tel:+31612712804">Bel: 06-127 128 04</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating elements */}
      <WhatsAppButton />
      <StickyCta />
    </div>
  );
}
