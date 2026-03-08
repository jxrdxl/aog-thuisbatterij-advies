import { FileText, TrendingUp, Percent, Shield, Clock, Wrench } from "lucide-react";

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
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Waarom kiezen voor AOG?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Wij helpen huishoudens in heel Nederland de stap naar energieonafhankelijkheid te zetten.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {PROPS.map((p) => (
            <div
              key={p.label}
              className={`rounded-2xl p-6 border transition-all hover:shadow-md ${
                p.highlight
                  ? "bg-gradient-to-br from-aog-green to-aog-green-dark text-white border-aog-green"
                  : "bg-white border-border"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                p.highlight ? "bg-white/20" : "bg-aog-green/10"
              }`}>
                <p.icon className={`w-5 h-5 ${p.highlight ? "text-white" : "text-aog-green"}`} />
              </div>
              <p className={`text-3xl font-extrabold mb-1 ${p.highlight ? "text-white" : "text-foreground"}`}>
                {p.value}
              </p>
              <p className={`text-sm font-bold mb-2 ${p.highlight ? "text-white/90" : "text-foreground"}`}>
                {p.label}
              </p>
              <p className={`text-sm ${p.highlight ? "text-white/75" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
