import { ClipboardCheck, UserCheck, Home, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    step: "1",
    title: "Vul het formulier in",
    desc: "Beantwoord 6 korte vragen over uw situatie. Duurt slechts 90 seconden.",
  },
  {
    icon: UserCheck,
    step: "2",
    title: "Adviseur belt u",
    desc: "Een specialist belt u binnen 1 werkdag om uw situatie te bespreken.",
  },
  {
    icon: Home,
    step: "3",
    title: "Gratis huisbezoek",
    desc: "Een gecertificeerde specialist maakt een persoonlijk rapport t.w.v. €240.",
  },
  {
    icon: Sparkles,
    step: "4",
    title: "Bespaar direct",
    desc: "Professionele installatie in 1 dag. Financiering via Warmtefonds mogelijk.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Hoe werkt het?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            In 4 eenvoudige stappen naar energieonafhankelijkheid.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-aog-green/30 to-aog-green/10" />
              )}
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-aog-green/10 rounded-2xl mb-5 group-hover:bg-aog-green/20 transition-colors">
                <s.icon className="w-8 h-8 text-aog-green" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-aog-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
