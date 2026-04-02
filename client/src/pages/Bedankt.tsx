import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, PhoneCall, FileText } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Bedankt() {
  const [location] = useLocation();
  const { trackCompleteRegistration, trackContact } = useTracking();

  const params = new URLSearchParams(location.split("?")[1]);
  const naam = params.get("naam") || "daar";
  const telefoon = params.get("telefoon") || "";

  useEffect(() => {
    trackCompleteRegistration({
      content_name: "Bespaarcheck Aangevraagd",
      value: 240,
      currency: "EUR",
    });
  }, [trackCompleteRegistration]);

  const whatsappLink = `https://wa.me/31612712804?text=${encodeURIComponent(
    "Hallo, ik heb zojuist de bespaarcheck gedaan en wil graag direct even appen."
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-[28px] shadow-xl border border-slate-200 p-7 sm:p-9">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-aog-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-aog-green" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-aog-green/10 px-4 py-2 text-aog-green font-black text-xs sm:text-sm uppercase tracking-wider mb-4">
              Aanvraag ontvangen
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-[-0.04em]">
              Bedankt, {naam}!
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Uw persoonlijke bespaarcheck is ontvangen. We nemen vrijblijvend contact met u op voor de terugkoppeling.
            </p>
          </div>

          {telefoon ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-8 text-center">
              <p className="text-sm sm:text-base text-slate-700 font-medium">
                We gebruiken hiervoor het opgegeven nummer: <strong>{telefoon}</strong>
              </p>
            </div>
          ) : null}

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground font-medium">Wat gebeurt er nu?</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="w-12 h-12 rounded-full bg-aog-green/10 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6 text-aog-green" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">1. Korte terugkoppeling</h3>
              <p className="text-slate-600 leading-relaxed">
                We kijken naar uw situatie, zonnepanelen en mogelijke terugleververliezen.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="w-12 h-12 rounded-full bg-aog-green/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-aog-green" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">2. Passend vervolgadvies</h3>
              <p className="text-slate-600 leading-relaxed">
                U krijgt helder inzicht of een thuisbatterij in uw geval kansrijk lijkt.
              </p>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-aog-green hover:bg-aog-green-light text-white font-black h-14 rounded-2xl mb-5"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact({ method: "whatsapp", source: "thank_you_page" })}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Liever direct contact? App ons
            </a>
          </Button>

          <div className="text-center">
            <a href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-4">
              Terug naar home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
