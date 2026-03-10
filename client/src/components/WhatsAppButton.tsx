import { MessageCircle } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

const WHATSAPP_NUMBER = "31612712804";
const WHATSAPP_MESSAGE = "Hallo, ik wil graag meer informatie over het gratis energierapport en thuisbatterij financiering.";

export default function WhatsAppButton() {
  const { trackContact } = useTracking();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    trackContact({ method: 'whatsapp', source: 'floating_button' });
  };

  return (
    <div className="fixed bottom-24 sm:bottom-8 right-6 z-50 group">
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="relative bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95 group-hover:-translate-y-2"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        
        {/* Tooltip hint */}
        <div className="absolute right-20 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-100">
          Hulp nodig? Chat met ons!
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45" />
        </div>
      </a>
    </div>
  );
}
