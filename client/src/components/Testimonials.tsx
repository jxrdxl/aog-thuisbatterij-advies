import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Familie de V.",
    location: "Utrecht",
    panels: 14,
    savings: "€1.200",
    text: "We wisten niet dat we al terugleverkosten betaalden. Na het gratis rapport van AOG was de keuze snel gemaakt. Nu besparen we €1.200 per jaar en zijn we klaar voor 2027.",
    rating: 5,
  },
  {
    name: "Meneer B.",
    location: "Eindhoven",
    panels: 18,
    savings: "€1.580",
    text: "De specialist legde alles helder uit. Geen verkooppraatje, maar eerlijk advies. De financiering via het Warmtefonds maakte het heel betaalbaar. Aanrader!",
    rating: 5,
  },
  {
    name: "Mevrouw K.",
    location: "Amsterdam",
    panels: 10,
    savings: "€890",
    text: "Ik twijfelde lang, maar het gratis rapport overtuigde me. De installatie duurde maar één dag en het systeem werkt perfect. Ik wou dat ik eerder had gebeld.",
    rating: 5,
  },
  {
    name: "Familie J.",
    location: "Rotterdam",
    panels: 22,
    savings: "€1.840",
    text: "Met 22 panelen leverden we enorm veel terug. Nu slaan we alles op en verkopen we slim. De besparing is nog hoger dan voorspeld in het rapport.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-aog-orange/10 text-aog-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star className="w-4 h-4 fill-current" /> Ervaringen
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Wat onze klanten zeggen
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Honderden huishoudens gingen u voor. Dit zijn hun ervaringen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
              <Quote className="w-8 h-8 text-aog-green/20 mb-3" />
              <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-aog-yellow fill-current" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {t.panels} panelen</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-aog-green">{t.savings}</p>
                  <p className="text-xs text-muted-foreground">besparing/jaar</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
