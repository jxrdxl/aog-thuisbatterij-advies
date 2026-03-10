import { ExternalLink } from "lucide-react";

const NEWS_ITEMS = [
  { source: "Financieel Dagblad", quote: "Eerste Kamer stemt in met afschaffing salderingsregeling per 2027" },
  { source: "RTL Nieuws", quote: "Energieleveranciers verhogen opnieuw terugleverkosten zonnepanelen" },
  { source: "NOS.nl", quote: "Netbeheerders waarschuwen: Stroomnet zit vol, risico op uitval neemt toe" },
  { source: "Consumentenbond", quote: "Vaste energiecontracten voor zonnepaneelbezitters onbetaalbaar geworden" },
  { source: "Rijksoverheid", quote: "Thuisbatterij steeds vaker noodzaak om rendement te behouden" },
  { source: "Telegraaf", quote: "Nederlandse huishoudens betalen honderden euro's boete voor zonnepanelen" },
];

const MEDIA_LOGOS = [
  { name: "Financieel Dagblad", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/fd-logo_a519113a.png" },
  { name: "RTL Nieuws", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/rtl-nieuws-logo_a519113a.png" },
  { name: "NOS", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/nos-logo_a519113a.png" },
  { name: "Consumentenbond", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/consumentenbond-logo_a519113a.png" },
  { name: "Rijksoverheid", logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029246277/Kr7KprZignQsPbEATC3CRd/rijksoverheid-logo_a519113a.png" },
];

export default function TrustSignals() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mb-10">
        <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">
          BEKEND VAN EN ONAFHANKELIJK ADVIES
        </p>
        
        {/* Media Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {MEDIA_LOGOS.map((m) => (
            <div key={m.name} className="h-8 sm:h-10 flex items-center">
              {/* Fallback to text if logo is not loading, but for now we use text as placeholder for visual style */}
              <span className="text-xl sm:text-2xl font-black text-slate-400 tracking-tighter hover:text-aog-green transition-colors cursor-default">
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling news ticker */}
      <div className="relative mt-12 py-6 bg-slate-50 border-y border-slate-100">
        <div className="flex animate-[scroll_40s_linear_infinite] w-max gap-8 hover:[animation-play-state:paused] cursor-pointer">
          {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-border shadow-sm group hover:border-aog-green/30 transition-colors"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-aog-green uppercase tracking-widest">{item.source}</span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-aog-green transition-colors" />
                </div>
                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">"{item.quote}"</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Faded edges for the ticker */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
      
      <div className="container mt-10">
        <div className="max-w-3xl mx-auto bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <p className="text-sm font-bold text-blue-900">
            AOG Energie adviseert op basis van onafhankelijke rapporten voor het Nationaal Warmtefonds.
          </p>
        </div>
      </div>
    </section>
  );
}
