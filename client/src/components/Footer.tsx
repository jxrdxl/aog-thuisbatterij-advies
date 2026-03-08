import { Phone, Mail, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 sm:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-extrabold mb-3">
              <span className="text-aog-green">AOG</span> Energie
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Algemene Opslag Groep helpt huishoudens in heel Nederland de stap naar energieonafhankelijkheid te zetten via slimme thuisbatterijen.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+31612712804" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 06-127 128 04
                </a>
              </li>
              <li>
                <a href="https://wa.me/31612712804" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> WhatsApp
                </a>
              </li>
              <li className="text-sm text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Heel Nederland
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">Snelle links</h4>
            <ul className="space-y-2.5">
              <li><a href="#calculator" className="text-sm text-slate-400 hover:text-white transition-colors">Bespaarcheck</a></li>
              <li><a href="#lead-form" className="text-sm text-slate-400 hover:text-white transition-colors">Gratis rapport aanvragen</a></li>
              <li><a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">Veelgestelde vragen</a></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">Vertrouwen</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-aog-green" /> Warmtefonds partner
              </li>
              <li className="text-sm text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-aog-green" /> Gecertificeerde installateurs
              </li>
              <li className="text-sm text-slate-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-aog-green" /> Onafhankelijk advies
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Algemene Opslag Groep. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacyverklaring</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Disclaimer</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
