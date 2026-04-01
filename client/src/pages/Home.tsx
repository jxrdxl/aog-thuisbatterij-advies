import { Suspense, lazy } from "react";
import { CheckCircle, Shield, Clock3, TrendingDown } from "lucide-react";
import Header from "@/components/Header";

const LeadForm = lazy(() => import("@/components/LeadForm"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const StickyCta = lazy(() => import("@/components/StickyCta"));
const Footer = lazy(() => import("@/components/Footer"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

export default function Home() {
  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-aog-green/30 font-sans text-slate-900 bg-slate-50">
      <Header />

      <section className="relative overflow-hidden pt-20 pb-14">
        <div className="absolute inset-0 bg-slate-950" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(2,6,23,0.98))]" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-aog-green/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-aog-blue/10 blur-3xl" />
        </div>

        <div className="relative z-10 container px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-aog-green/30 bg-aog-green/10 px-4 py-2 text-aog-green font-black text-sm uppercase tracking-wider mb-6">
                Gratis bespaarcheck
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.04] mb-6">
                Uw zonnepanelen leveren straks{" "}
                <span className="text-aog-orange">minder op</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl">
                Einde saldering in 2027. Terugleverkosten stijgen. Ontdek wat dit voor u betekent en of een thuisbatterij interessant is.
              </p>

              <div className="flex flex-wrap gap-4 text-white/90 text-base font-bold mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-aog-green" />
                  <span>100% vrijblijvend</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="w-5 h-5 text-aog-green" />
                  <span>~2 minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-aog-green" />
                  <span>Onafhankelijk advies</span>
                </div>
              </div>

              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center rounded-full bg-aog-green hover:bg-aog-green-light text-white font-black text-2xl px-10 py-5 shadow-[0_18px_60px_rgba(34,197,94,0.35)] transition-all"
              >
                Start de bespaarcheck (2 min)
              </button>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                {[
                  { value: "500+", label: "Huishoudens geholpen" },
                  { value: "4.8/5", label: "Klantwaardering" },
                  { value: "€400+", label: "Gem. besparing/jaar" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl bg-white text-center p-6 shadow-xl"
                  >
                    <p className="text-4xl font-black text-aog-green">{item.value}</p>
                    <p className="text-slate-500 font-medium mt-2">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-2xl ml-auto animate-slide-up">
              <Suspense fallback={<div className="h-[600px] bg-white/10 animate-pulse rounded-[32px]" />}>
                <LeadForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Waarom deze check juist nu relevant is
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              De markt verandert. Niet omdat zonnepanelen ineens slecht zijn, maar omdat teruglevering minder waardevol wordt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Terugleverkosten drukken op rendement",
                text: "Veel huishoudens merken dat terugleveren minder aantrekkelijk wordt dan voorheen.",
              },
              {
                title: "2027 verandert het speelveld",
                text: "Het afbouwen van salderen maakt slim omgaan met eigen opwek steeds belangrijker.",
              },
              {
                title: "Niet elke woning is hetzelfde",
                text: "Uw panelen, verbruik en toekomstplannen bepalen of een thuisbatterij echt interessant is.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
              >
                <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto rounded-[32px] bg-[linear-gradient(135deg,#0f172a,#16385f)] p-8 sm:p-10 text-white shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-aog-green font-black uppercase tracking-wider text-sm mb-3">
                  Slimmer positioneren
                </p>
                <h2 className="text-3xl sm:text-5xl font-black mb-4">
                  Niet harder verkopen. Wel slimmer.
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Deze funnel is bewust gebouwd als bespaarcheck in plaats van een harde productpitch. Daardoor voelt het veiliger, duidelijker en minder pushy voor mensen die geïnteresseerd zijn, maar nog niet overtuigd.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-sm p-6">
                <ul className="space-y-4 text-lg">
                  {[
                    "Lagere weerstand bij eerste contact",
                    "Betere match met pijn-hooks in advertenties",
                    "Sterkere leadkwaliteit voor opvolging",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-aog-green mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Wat klanten zeggen
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Duidelijk, laagdrempelig en zonder verkooppraat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                quote:
                  "Duidelijk inzicht gekregen in mijn besparingspotentieel. Precies wat ik nodig had.",
                name: "Sanne K.",
                city: "Amersfoort",
              },
              {
                quote:
                  "Eerlijk en onafhankelijk advies. Geen verkooppraat, maar feiten.",
                name: "Mark V.",
                city: "Utrecht",
              },
              {
                quote:
                  "Binnen 2 minuten wist ik waar ik aan toe was. Top service.",
                name: "Linda B.",
                city: "Haarlem",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-slate-600 text-xl leading-relaxed mb-6">“{item.quote}”</p>
                <p className="font-black text-slate-900 text-2xl">{item.name}</p>
                <p className="text-slate-500 text-lg">{item.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
              Veelgestelde vragen
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Is deze check vrijblijvend?",
                text: "Ja. U vraagt geen aankoop aan, maar een terugkoppeling op basis van uw situatie.",
              },
              {
                title: "Is een thuisbatterij voor iedereen geschikt?",
                text: "Nee. Voor sommige huishoudens wel, voor andere niet. Daarom starten we juist met een persoonlijke check.",
              },
              {
                title: "Wat gebeurt er na mijn aanvraag?",
                text: "Uw gegevens worden bekeken en u kunt een telefoontje verwachten voor een korte, vrijblijvende terugkoppeling.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={null}>
        <StickyCta onClick={scrollToForm} />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
      <Suspense fallback={<div className="h-32 bg-slate-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
}