import { useRef, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle, Zap, TrendingDown, Star, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import { useTracking } from "@/hooks/useTracking";

const CountdownTimer = lazy(() => import("@/components/CountdownTimer"));
const SavingsCalculator = lazy(() => import("@/components/SavingsCalculator"));
const LeadForm = lazy(() => import("@/components/LeadForm"));
const TrustSignals = lazy(() => import("@/components/TrustSignals"));
const ValuePropositions = lazy(() => import("@/components/ValuePropositions"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const UrgencyBanner = lazy(() => import("@/components/UrgencyBanner"));
const Footer = lazy(() => import("@/components/Footer"));

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/solar-house_a519113a.jpg";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const { trackInitiateCheckout, trackContact, trackViewContent } = useTracking();

  const scrollToForm = () => {
    trackInitiateCheckout({ source: 'hero_cta' });
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/30">
      <Header />

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="Huis met zonnepanelen in Nederland"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-black px-5 py-2 rounded-full mb-8 animate-slide-up shadow-xl">
            <Shield className="w-4 h-4 text-aog-green" /> 
            <span className="uppercase tracking-widest">Warmtefonds Initiatief · Onafhankelijk</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 max-w-5xl mx-auto animate-slide-up [animation-delay:100ms] text-balance">
            Wat kosten uw zonnepanelen u{" "}
            <span className="relative inline-block">
              <span className="text-aog-orange italic">straks in 2027?</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="oklch(0.70 0.18 60)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up [animation-delay:200ms]">
            De salderingsregeling verdwijnt per <strong className="text-white">1 januari 2027</strong>.
            Heeft u zonnepanelen? Dan gaat u waarschijnlijk <strong className="text-aog-orange">€1.400+ extra per jaar</strong> betalen.
            Ontdek hoe een thuisbatterij dit voorkomt.
          </p>

          {/* Countdown */}
          <div className="mb-12 animate-slide-up [animation-delay:300ms]">
            <p className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-4">SALDERING VERDWIJNT OVER</p>
            <CountdownTimer />
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up [animation-delay:400ms]">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-aog-green hover:bg-aog-green-light text-white font-black text-lg px-10 h-16 rounded-2xl shadow-2xl shadow-aog-green/20 animate-pulse-glow w-full sm:w-auto transition-all hover:scale-105"
            >
              Check uw besparing na 2027 <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-black h-16 px-10 rounded-2xl w-full sm:w-auto bg-transparent backdrop-blur-sm transition-all hover:scale-105"
              onClick={() => trackViewContent({ source: 'hero_calculator_link' })}
            >
              <a href="#calculator">Bereken mijn besparing</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-slide-up [animation-delay:500ms]">
            <p className="text-xs font-bold text-white/40 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aog-green" /> 2.400+ huishoudens geholpen
            </p>
            <p className="text-xs font-bold text-white/40 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aog-green" /> 4.9/5 Google Rating
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-20" />}>
        {/* Trust Signals / News Ticker */}
        <TrustSignals />

        {/* How It Works */}
        <HowItWorks />

        {/* Savings Calculator */}
        <SavingsCalculator onCtaClick={scrollToForm} />

        {/* Value Propositions */}
        <ValuePropositions />

        {/* Lead Form Section */}
        <div ref={formRef}>
          <LeadForm />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Urgency Banner */}
        <UrgencyBanner />

        {/* FAQ */}
        <FAQ />
      </Suspense>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aog-green/20 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aog-blue/20 rounded-full blur-[120px] -ml-64 -mb-64" />
        </div>
        
        <div className="container relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-aog-green/20 text-aog-green-light text-xs font-black px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            KLAAR VOOR DE VOLGENDE STAP?
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-8 text-balance leading-tight">
            Maak uw woning vandaag nog <span className="text-aog-green">energie-onafhankelijk</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg sm:text-xl">
            Vraag vandaag nog uw gratis adviesrapport aan en ontdek hoeveel u kunt besparen met een thuisbatterij en 0% financiering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-aog-green hover:bg-aog-green-light text-white font-black text-xl px-12 h-20 rounded-2xl shadow-2xl shadow-aog-green/20 group transition-all hover:scale-105"
              onClick={() => trackInitiateCheckout({ source: 'final_cta' })}
            >
              <a href="#lead-form">
                <CheckCircle className="mr-3 w-7 h-7" /> Start gratis energiecheck
              </a>
            </Button>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <a href="tel:+31612712804" onClick={() => trackContact({ method: 'phone', source: 'final_cta' })} className="flex items-center gap-3 text-2xl font-black hover:text-aog-green transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                06-127 128 04
              </a>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Direct contact met een adviseur</p>
            </div>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 grayscale opacity-40">
            <p className="text-sm font-black tracking-widest uppercase">Financieel Dagblad</p>
            <p className="text-sm font-black tracking-widest uppercase">RTL Nieuws</p>
            <p className="text-sm font-black tracking-widest uppercase">NOS.nl</p>
            <p className="text-sm font-black tracking-widest uppercase">Consumentenbond</p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        {/* Footer */}
        <Footer />

        {/* Floating elements */}
        <WhatsAppButton />
        <StickyCta />
      </Suspense>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
