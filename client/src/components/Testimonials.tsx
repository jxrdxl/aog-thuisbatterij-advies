import { Star, Quote, CheckCircle2, User } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Familie de V.",
    location: "Utrecht",
    panels: 14,
    savings: "€1.200",
    text: "We wisten niet dat we al terugleverkosten betaalden. Na het gratis rapport van AOG was de keuze snel gemaakt. Nu besparen we €1.200 per jaar en zijn we klaar voor 2027.",
    rating: 5,
    tag: "Besparing"
  },
  {
    name: "Meneer B.",
    location: "Eindhoven",
    panels: 18,
    savings: "€1.580",
    text: "De specialist legde alles helder uit. Geen verkooppraatje, maar eerlijk advies. De financiering via het Warmtefonds maakte het heel betaalbaar. Aanrader!",
    rating: 5,
    tag: "Warmtefonds"
  },
  {
    name: "Mevrouw K.",
    location: "Amsterdam",
    panels: 10,
    savings: "€890",
    text: "Ik twijfelde lang, maar het gratis rapport overtuigde me. De installatie duurde maar één dag en het systeem werkt perfect. Ik wou dat ik eerder had gebeld.",
    rating: 5,
    tag: "Installatie"
  },
  {
    name: "Familie J.",
    location: "Rotterdam",
    panels: 22,
    savings: "€1.840",
    text: "Met 22 panelen leverden we enorm veel terug. Nu slaan we alles op en verkopen we slim. De besparing is nog hoger dan voorspeld in het rapport.",
    rating: 5,
    tag: "Slimme Handel"
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-1.5 bg-aog-orange/10 text-aog-orange text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" /> WAT ONZE KLANTEN ZEGGEN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance leading-tight">
            Honderden huishoudens <span className="text-aog-orange">gingen u voor</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
            Ontdek waarom duizenden Nederlandse huiseigenaren kiezen voor de onafhankelijke rapporten van AOG Energie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 hover:shadow-xl transition-all duration-300 relative group">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-50 group-hover:text-aog-orange/5 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-aog-yellow fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-black text-slate-400">5.0</span>
                </div>

                <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground flex items-center gap-1.5">
                        {t.name}
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </p>
                      <p className="text-sm font-bold text-muted-foreground">{t.location} · {t.panels} panelen</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-black text-aog-green">{t.savings}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">besparing/jaar</p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <span className="bg-slate-100 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest text-slate-500">
                    {t.tag}
                  </span>
                  <span className="bg-blue-50 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest text-blue-600">
                    Geverifieerd
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Stats Line */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-black text-foreground">4.9/5</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Google Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-foreground">2.400+</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Rapporten gemaakt</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-foreground">98%</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tevredenheid</p>
          </div>
        </div>
      </div>
    </section>
  );
}
