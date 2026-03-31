import { FileText, TrendingUp, Percent, Shield, Clock, Wrench, CheckCircle2 } from "lucide-react";

const PROPS = [
  {
    icon: FileText,
    value: "€240",
    label: "Waarde adviesrapport",
    desc: "Onafhankelijk energierapport door gecertificeerde specialist — nu volledig gratis",
    highlight: true,
  },
  {
    icon: TrendingUp,
    value: "€1.645",
    label: "Gemiddelde besparing/jaar",
    desc: "Gemiddelde extra kosten die u bespaart met een thuisbatterij na 2027",
    highlight: false,
  },
  {
    icon: Percent,
    value: "0%",
    label: "Rente via Warmtefonds",
    desc: "Bij een inkomen onder €60.000 kunt u financieren tegen 0% rente",
    highlight: false,
  },
  {
    icon: Shield,
    value: "100%",
    label: "Onafhankelijk advies",
    desc: "Wij zijn niet gebonden aan één merk — u krijgt het beste systeem voor uw situatie",
    highlight: false,
  },
  {
    icon: Clock,
    value: "<2 uur",
    label: "Gemiddelde reactietijd",
    desc: "Na uw aanvraag belt een adviseur u gemiddeld binnen 2 uur terug",
    highlight: false,
  },
  {
    icon: Wrench,
    value: "Open",
    label: "Open systeem",
    desc: "Geen vendor lock-in — uw thuisbatterij werkt met elke omvormer en elk merk paneel",
    highlight: false,
  },
];

export default function ValuePropositions() {
  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-aog-green/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-aog-blue/10 rounded-full -ml-48 -mb-48 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-1.5 bg-aog-blue/10 text-aog-blue text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            WAAROM KIEZEN VOOR AOG ENERGIE?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance leading-tight">
            De zekerheid van een <span className="text-aog-green">slimme investering</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
            Wij helpen huishoudens in heel Nederland de stap naar energieonafhankelijkheid te zetten met bewezen resultaten en onafhankelijk advies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {PROPS.map((p) => (
            <div
              key={p.label}
              className={`rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col group ${
                p.highlight
                  ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800 shadow-lg"
                  : "bg-white border-slate-200 hover:border-aog-green/30"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 ${
                p.highlight ? "bg-aog-green" : "bg-aog-green/10"
              }`}>
                <p.icon className={`w-7 h-7 ${p.highlight ? "text-white" : "text-aog-green"}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className={`text-4xl font-black ${p.highlight ? "text-white" : "text-foreground"}`}>
                    {p.value}
                  </p>
                  {p.highlight && (
                    <span className="bg-aog-green text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest text-white">
                      GRATIS
                    </span>
                  )}
                </div>
                <p className={`text-lg font-black mb-4 ${p.highlight ? "text-white/90" : "text-foreground"}`}>
                  {p.label}
                </p>
                <p className={`text-base leading-relaxed ${p.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  {p.desc}
                </p>
              </div>
              
              <div className={`mt-8 flex items-center gap-2 text-sm font-bold ${p.highlight ? "text-aog-green-light" : "text-aog-green"}`}>
                <CheckCircle2 className="w-4 h-4" />
                Geverifieerd
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Trust Line */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm font-bold flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-slate-200" />
            OFFICIËLE PARTNER VOOR ENERGIERAPPORTEN
            <span className="w-12 h-px bg-slate-200" />
          </p>
        </div>
      </div>
    </section>
  );
}
