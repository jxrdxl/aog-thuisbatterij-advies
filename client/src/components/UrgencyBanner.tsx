import { AlertTriangle, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UrgencyBanner() {
  return (
    <section className="bg-slate-950 py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aog-red/20 rounded-full blur-[150px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aog-red/10 rounded-full blur-[150px] -ml-64 -mb-64" />
      </div>

      <div className="container relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-aog-red/20 text-aog-red text-xs font-black px-5 py-2 rounded-full mb-8 uppercase tracking-[0.2em] border border-aog-red/30">
          <AlertTriangle className="w-4 h-4" /> BELANGRIJKE WAARSCHUWING
        </div>
        
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-8 text-balance leading-tight">
          Wacht niet tot <span className="text-aog-red">iedereen</span> tegelijk een thuisbatterij wil
        </h2>
        
        <p className="text-white/60 max-w-3xl mx-auto mb-12 text-lg sm:text-xl leading-relaxed">
          Herinnert u zich 2021? Iedereen wilde zonnepanelen. De resultaten: 
          <span className="text-white font-bold italic"> maandenlange wachttijden, verdubbelde prijzen en installatiestress.</span> 
          Hetzelfde staat nu te gebeuren met thuisbatterijen zodra 2027 dichterbij komt.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-aog-red/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-aog-red" />
            </div>
            <div>
              <p className="text-white font-black text-lg">Directe capaciteit</p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Nog 23 plekken vrij</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-aog-green/20 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-aog-green" />
            </div>
            <div>
              <p className="text-white font-black text-lg">Huidige prijzen</p>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Vóór de prijsstijging</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            asChild 
            size="lg" 
            className="bg-aog-red hover:bg-red-600 text-white font-black text-xl px-12 h-20 rounded-2xl shadow-2xl shadow-aog-red/20 group transition-all hover:scale-105"
          >
            <a href="#lead-form">
              Voorkom de wachtlijst <ArrowRight className="ml-3 w-7 h-7 transition-transform group-hover:translate-x-2" />
            </a>
          </Button>
        </div>
        
        <p className="text-white/30 text-sm font-bold mt-10 uppercase tracking-widest">
          NU HANDELEN = GELD BESPAREN
        </p>
      </div>
    </section>
  );
}
