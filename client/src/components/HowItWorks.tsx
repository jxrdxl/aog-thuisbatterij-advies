import { ClipboardCheck, UserCheck, Home, Sparkles, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    step: "1",
    title: "Start gratis check",
    desc: "Beantwoord 2 snelle vragen over uw woning en zonnepanelen. Duurt slechts 2 minuten.",
  },
  {
    icon: UserCheck,
    step: "2",
    title: "Adviseur belt u",
    desc: "Een specialist belt u binnen 2 uur om uw situatie en besparingen te bespreken.",
  },
  {
    icon: Home,
    step: "3",
    title: "Gratis rapport",
    desc: "Een gecertificeerde specialist maakt een persoonlijk energierapport t.w.v. €240.",
  },
  {
    icon: Sparkles,
    step: "4",
    title: "Bespaar direct",
    desc: "Professionele installatie in 1 dag. 0% financiering via het Warmtefonds mogelijk.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-1.5 bg-aog-green/10 text-aog-green text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            STAPPENPLAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance leading-tight">
            In 4 stappen naar <span className="text-aog-green">energieonafhankelijkheid</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
            Wij maken de overstap naar een thuisbatterij eenvoudig, transparant en financieel aantrekkelijk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 max-w-6xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={i} className="relative group">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-slate-100 group-hover:bg-aog-green/20 transition-colors duration-500" />
              )}
              
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center group-hover:bg-aog-green/10 transition-all duration-500 group-hover:rotate-6 shadow-sm border border-slate-100">
                    <s.icon className="w-10 h-10 text-slate-400 group-hover:text-aog-green transition-colors duration-500" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-10 h-10 bg-white border-4 border-slate-50 text-aog-green text-base font-black rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {s.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-aog-green transition-colors">{s.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href="#lead-form" 
            className="inline-flex items-center gap-2 text-aog-green font-black text-lg hover:gap-4 transition-all group"
          >
            Start nu de eerste stap 
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
