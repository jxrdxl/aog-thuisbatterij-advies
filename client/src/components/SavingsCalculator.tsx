import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sun, TrendingDown, TrendingUp, Zap, ArrowRight } from "lucide-react";

interface CalculatorResult {
  annualProduction: number;
  feedbackKwh: number;
  currentFeedbackCost: number;
  cost2027: number;
  totalExtraCost: number;
  savingsWithBattery: number;
}

function calculate(panels: number): CalculatorResult {
  const annualProduction = panels * 310;
  const feedbackKwh = Math.round(annualProduction * 0.7);
  const currentFeedbackCost = Math.round(feedbackKwh * 0.13);
  const cost2027 = Math.round(feedbackKwh * 0.35);
  const totalExtraCost = currentFeedbackCost + cost2027;
  const savingsWithBattery = Math.round(totalExtraCost * 0.85);
  return { annualProduction, feedbackKwh, currentFeedbackCost, cost2027, totalExtraCost, savingsWithBattery };
}

export default function SavingsCalculator({ onCtaClick }: { onCtaClick: () => void }) {
  const [panels, setPanels] = useState(12);
  const result = useMemo(() => calculate(panels), [panels]);

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-aog-green/10 text-aog-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Zap className="w-4 h-4" /> Persoonlijke Berekening
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Hoeveel kost <span className="text-aog-red">niets doen</span> u per jaar?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base sm:text-lg">
            Verschuif de slider naar het aantal zonnepanelen op uw dak en zie direct wat u straks extra betaalt.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-green-50/50 rounded-2xl border border-border p-6 sm:p-10 shadow-sm">
            {/* Slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sun className="w-5 h-5 text-aog-orange" />
                  Aantal zonnepanelen
                </label>
                <span className="text-2xl font-extrabold text-aog-green">{panels}</span>
              </div>
              <Slider
                value={[panels]}
                onValueChange={(v) => setPanels(v[0])}
                min={4}
                max={30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>4 panelen</span>
                <span>30 panelen</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-aog-orange" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Jaaropwek</span>
                </div>
                <p className="text-2xl font-extrabold text-foreground">{result.annualProduction.toLocaleString("nl-NL")} kWh</p>
                <p className="text-xs text-muted-foreground mt-1">Waarvan {result.feedbackKwh.toLocaleString("nl-NL")} kWh teruggeleverd</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-aog-red" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Terugleverkosten nu</span>
                </div>
                <p className="text-2xl font-extrabold text-aog-red">-€{result.currentFeedbackCost.toLocaleString("nl-NL")}/jaar</p>
                <p className="text-xs text-muted-foreground mt-1">Gemiddeld €0,13/kWh terugleverkosten</p>
              </div>

              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-aog-red" />
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Extra kosten na 2027</span>
                </div>
                <p className="text-2xl font-extrabold text-aog-red">-€{result.cost2027.toLocaleString("nl-NL")}/jaar</p>
                <p className="text-xs text-red-500 mt-1">Saldering verdwijnt — volledig verbruik betalen</p>
              </div>

              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-aog-green" />
                  <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Besparing met batterij</span>
                </div>
                <p className="text-2xl font-extrabold text-aog-green">+€{result.savingsWithBattery.toLocaleString("nl-NL")}/jaar</p>
                <p className="text-xs text-green-600 mt-1">Stroom opslaan i.p.v. terugleveren</p>
              </div>
            </div>

            {/* Total comparison */}
            <div className="bg-gradient-to-r from-aog-green-dark to-aog-green rounded-xl p-6 text-white text-center">
              <p className="text-sm font-medium text-white/80 mb-1">Uw totale geschatte extra kosten zonder thuisbatterij</p>
              <p className="text-4xl sm:text-5xl font-extrabold mb-2">
                €{result.totalExtraCost.toLocaleString("nl-NL")}
                <span className="text-lg font-medium text-white/70"> /jaar</span>
              </p>
              <p className="text-sm text-white/80 mb-5">Niets doen is de duurste keuze.</p>
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-white text-aog-green-dark hover:bg-white/90 font-bold text-base px-8 py-3 h-auto rounded-xl shadow-lg"
              >
                Vraag gratis adviesrapport aan <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
