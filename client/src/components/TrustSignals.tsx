const NEWS_ITEMS = [
  { source: "Financieel Dagblad", quote: "Eerste Kamer stemt in met afschaffing salderingsregeling per 2027" },
  { source: "RTL Nieuws", quote: "Energieleveranciers verhogen opnieuw terugleverkosten zonnepanelen" },
  { source: "NOS.nl", quote: "Netbeheerders waarschuwen: Stroomnet zit vol, risico op uitval neemt toe" },
  { source: "Consumentenbond", quote: "Vaste energiecontracten voor zonnepaneelbezitters onbetaalbaar geworden" },
  { source: "Rijksoverheid", quote: "Thuisbatterij steeds vaker noodzaak om rendement te behouden" },
];

export default function TrustSignals() {
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-border overflow-hidden">
      <div className="container mb-6">
        <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          In het nieuws
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {["Financieel Dagblad", "RTL Nieuws", "NOS.nl", "Consumentenbond", "Rijksoverheid"].map((name) => (
            <div key={name} className="text-sm sm:text-base font-bold text-slate-400 hover:text-slate-600 transition-colors">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling news ticker */}
      <div className="relative mt-6">
        <div className="flex animate-[scroll_30s_linear_infinite] w-max gap-8">
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-5 py-3 border border-border shrink-0">
              <span className="text-xs font-bold text-aog-green whitespace-nowrap">{item.source}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">"{item.quote}"</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
