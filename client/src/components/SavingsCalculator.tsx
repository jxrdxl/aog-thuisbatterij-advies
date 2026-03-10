import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sun, TrendingDown, TrendingUp, Zap, ArrowRight, Info, AlertTriangle } from "lucide-react";
import React, { Suspense } from "react";

const TooltipProvider = React.lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));
const Tooltip = React.lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.Tooltip })));
const TooltipTrigger = React.lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipTrigger })));
const TooltipContent = React.lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipContent })));

interface CalculatorResult {
  annualProduction: number;
  feedbackKwh: number;
  currentFeedbackCost: number;
  cost2027: number;
  totalExtraCost: number;
  savingsWithBattery: number;
}

function calculate(panels: number): CalculatorResult {
  // Gemiddelde opbrengst per paneel in NL: 310 kWh/jaar
  const annualProduction = panels * 310;
  // Gemiddeld direct verbruik zonder batterij is ~30%, dus 70% wordt teruggeleverd
  const feedbackKwh = Math.round(annualProduction * 0.7);
  // Huidige gemiddelde terugleverkosten bij grote leveranciers: ~€0,115 per kWh
  const currentFeedbackCost = Math.round(feedbackKwh * 0.115);
  // Na 2027: Saldering weg. Je betaalt de volle prijs voor wat je niet direct verbruikt.
  // Gemiddelde stroomprijs ~€0,35/kWh. 
  // Zonder batterij moet je die 70% (feedbackKwh) weer terugkopen op momenten dat de zon niet schijnt.
  const cost2027 = Math.round(feedbackKwh * 0.35);
  const totalExtraCost = currentFeedbackCost + cost2027;
  // Met batterij verhoog je direct verbruik naar ~80%, dus je bespaart 50% extra van je opwek (80% - 30%)
  // plus je voorkomt de terugleverkosten.
  const savingsWithBattery = Math.round(totalExtraCost * 0.82);
  
  return { annualProduction, feedbackKwh, currentFeedbackCost, cost2027, totalExtraCost, savingsWithBattery };
}

export default function SavingsCalculator({ onCtaClick }: { onCtaClick: () => void }) {
  const [panels, setPanels] = useState(12);
  const result = useMemo(() => calculate(panels), [panels]);

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 bg-aog-green/10 text-aog-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Zap className="w-4 h-4" /> Persoonlijke Besparingscheck
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground text-balance">
            Hoeveel kost <span className="text-aog-red">niets doen</span> u per jaar?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
            Verschuif de slider naar het aantal zonnepanelen op uw dak en zie direct de financiële impact van de nieuwe regels.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-50 rounded-3xl border border-border p-6 sm:p-12 shadow-sm relative">
            {/* Slider Section */}
            <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Sun className="w-6 h-6 text-aog-orange" />
                  Aantal zonnepanelen
                </label>
                <div className="bg-aog-green/10 px-4 py-2 rounded-xl">
                  <span className="text-3xl font-black text-aog-green">{panels}</span>
                  <span className="text-sm font-bold text-aog-green/70 ml-1">stuks</span>
                </div>
              </div>
              <Slider
                value={[panels]}
                onValueChange={(v) => setPanels(v[0])}
                min={4}
                max={40}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs font-bold text-muted-foreground mt-4 uppercase tracking-widest">
                <span>4 panelen</span>
                <span>40 panelen</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Opwekking */}
              <div className="bg-white rounded-2xl p-6 border border-border group hover:border-aog-green/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aog-orange/10 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-aog-orange" />
                  </div>
                  <Suspense fallback={<Info className="w-4 h-4 text-muted-foreground" />}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info className="w-4 h-4 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent><p className="w-64">Gebaseerd op 310 kWh per paneel per jaar (NL gemiddelde).</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Suspense>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Jaaropwekking</p>
                <p className="text-3xl font-black text-foreground">{result.annualProduction.toLocaleString("nl-NL")} <span className="text-lg font-medium text-muted-foreground">kWh</span></p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Teruggeleverd (70%)</span>
                  <span className="text-sm font-bold text-foreground">{result.feedbackKwh.toLocaleString("nl-NL")} kWh</span>
                </div>
              </div>

              {/* Huidige Kosten */}
              <div className="bg-white rounded-2xl p-6 border border-border group hover:border-aog-red/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aog-red/10 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-aog-red" />
                  </div>
                  <Suspense fallback={<AlertTriangle className="w-4 h-4 text-aog-red/50" />}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><AlertTriangle className="w-4 h-4 text-aog-red/50" /></TooltipTrigger>
                        <TooltipContent><p className="w-64">Huidige gemiddelde terugleverkosten bij energieleveranciers (~€0,115/kWh).</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Suspense>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Huidige terugleverkosten</p>
                <p className="text-3xl font-black text-aog-red">€{result.currentFeedbackCost.toLocaleString("nl-NL")} <span className="text-lg font-medium text-aog-red/60">/jaar</span></p>
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <p className="text-sm text-muted-foreground italic">Boete voor het hebben van zonnepanelen.</p>
                </div>
              </div>

              {/* Kosten 2027 */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aog-red/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-aog-red" />
                  </div>
                </div>
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Extra kosten vanaf 2027</p>
                <p className="text-3xl font-black text-aog-red">€{result.cost2027.toLocaleString("nl-NL")} <span className="text-lg font-medium text-aog-red/60">/jaar</span></p>
                <div className="mt-4 pt-4 border-t border-red-100">
                  <p className="text-sm text-red-700 font-medium">Einde saldering: u koopt stroom terug die u zelf opwekt.</p>
                </div>
              </div>

              {/* Besparing Batterij */}
              <div className="bg-aog-green/5 rounded-2xl p-6 border border-aog-green/20 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-aog-green/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-aog-green" />
                  </div>
                </div>
                <p className="text-xs font-bold text-aog-green uppercase tracking-wider mb-1">Besparing met batterij</p>
                <p className="text-3xl font-black text-aog-green">€{result.savingsWithBattery.toLocaleString("nl-NL")} <span className="text-lg font-medium text-aog-green/60">/jaar</span></p>
                <div className="mt-4 pt-4 border-t border-aog-green/10">
                  <p className="text-sm text-aog-green font-medium">Gebruik uw eigen stroom in de avond en nacht.</p>
                </div>
              </div>
            </div>

            {/* Final CTA Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-aog-green/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-aog-blue/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              
              <div className="relative z-10">
                <p className="text-aog-green-light font-bold text-sm uppercase tracking-widest mb-4">Conclusie van uw berekening</p>
                <h3 className="text-2xl sm:text-4xl font-black mb-6">
                  U betaalt jaarlijks <span className="text-aog-orange">€{(result.totalExtraCost).toLocaleString("nl-NL")}</span> extra door nieuwe regelgeving.
                </h3>
                <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                  Een thuisbatterij voorkomt deze kosten en maakt u onafhankelijk van het stroomnet. Vraag nu uw gratis rapport aan voor een exacte berekening op maat.
                </p>
                <Button
                  size="lg"
                  onClick={onCtaClick}
                  className="bg-aog-green hover:bg-aog-green-light text-white font-black text-lg px-10 h-16 rounded-2xl shadow-lg shadow-aog-green/20 group transition-all hover:scale-105"
                >
                  Ontvang gratis rapport <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-white/40 text-xs mt-6 font-medium">
                  * Berekening op basis van landelijke gemiddelden. Uw situatie kan afwijken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
