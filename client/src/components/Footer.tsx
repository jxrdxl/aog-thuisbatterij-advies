import { Phone, Mail, MapPin, Shield, CheckCircle2, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black">
              <span className="text-aog-green">AOG</span> Energie
            </h3>
            <p className="text-base text-slate-400 leading-relaxed max-w-xs">
              Algemene Opslag Groep helpt huishoudens in heel Nederland de stap naar energieonafhankelijkheid te zetten via slimme thuisbatterijen en onafhankelijk advies.
            </p>
            <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-aog-green" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-aog-blue" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Contactgegevens</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+31612712804" className="group flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-aog-green transition-colors">Telefoon</span>
                  <span className="text-lg font-black flex items-center gap-2 group-hover:text-aog-green transition-colors">
                    <Phone className="w-4 h-4" /> 06-127 128 04
                  </span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/31612712804" target="_blank" rel="noopener noreferrer" className="group flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 group-hover:text-aog-green transition-colors">WhatsApp</span>
                  <span className="text-lg font-black flex items-center gap-2 group-hover:text-aog-green transition-colors">
                    <Mail className="w-4 h-4" /> Direct contact
                  </span>
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Werkgebied</span>
                <span className="text-lg font-black flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-aog-red" /> Heel Nederland
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Snelle links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#calculator" className="text-base font-bold text-slate-400 hover:text-aog-green transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Bespaarcheck
                </a>
              </li>
              <li>
                <a href="#lead-form" className="text-base font-bold text-slate-400 hover:text-aog-green transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Gratis rapport aanvragen
                </a>
              </li>
              <li>
                <a href="#faq" className="text-base font-bold text-slate-400 hover:text-aog-green transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Veelgestelde vragen
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-base font-bold text-slate-400 hover:text-aog-green transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Klantervaringen
                </a>
              </li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Onze Garanties</h4>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-aog-green" />
                  <span className="text-sm font-black uppercase tracking-widest">Warmtefonds</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  Officiële onafhankelijke rapporten die geaccepteerd worden voor 0% financiering.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-aog-blue" />
                  <span className="text-sm font-black uppercase tracking-widest">Gecertificeerd</span>
                </div>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  Alleen erkende installateurs en gecertificeerde energieadviseurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Algemene Opslag Groep B.V.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">Disclaimer</a>
              <a href="#" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">Voorwaarden</a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">MADE FOR ENERGY INDEPENDENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
