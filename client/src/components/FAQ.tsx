import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Wat is de salderingsregeling en waarom verdwijnt deze?",
    a: "De salderingsregeling stelt u in staat om de stroom die u teruglevert aan het net te verrekenen met uw verbruik. Per 1 januari 2027 wordt deze regeling afgeschaft. Dit betekent dat u uw volledige verbruik weer zelf betaalt, ook al produceren uw panelen genoeg stroom. Bovendien betaalt u nu al terugleverkosten van gemiddeld €0,115 per kWh.",
  },
  {
    q: "Hoeveel kost een thuisbatterij?",
    a: "De kosten variëren afhankelijk van de capaciteit en het merk. Een gemiddeld systeem voor een huishouden met 10-14 panelen kost tussen de €4.000 en €8.000. Via het Warmtefonds kunt u dit financieren tegen 0% rente (bij inkomen onder €60.000). De terugverdientijd is gemiddeld 4-6 jaar.",
  },
  {
    q: "Wat is het Warmtefonds en hoe werkt de financiering?",
    a: "Het Warmtefonds is een initiatief van de Rijksoverheid dat huiseigenaren helpt bij het verduurzamen van hun woning. Bij een gezamenlijk bruto jaarinkomen onder €60.000 kunt u lenen tegen 0% rente. Boven dit bedrag gelden lage rentetarieven. De lening wordt afbetaald uit uw energiebesparing.",
  },
  {
    q: "Werkt een thuisbatterij met mijn bestaande zonnepanelen?",
    a: "Ja, de thuisbatterijen die wij adviseren zijn open systemen die werken met vrijwel elke omvormer en elk merk zonnepaneel. Er is geen vendor lock-in. Onze specialist beoordeelt uw huidige installatie en adviseert het beste systeem voor uw situatie.",
  },
  {
    q: "Hoe werkt de slimme energiehandel?",
    a: "Een slimme thuisbatterij slaat uw opgewekte stroom op wanneer de energieprijs laag is en verkoopt of gebruikt deze wanneer de prijs hoog is. Dit gebeurt volledig automatisch via een AI-systeem. U hoeft er niets voor te doen. Dit kan uw besparing met 20-40% extra verhogen bovenop de directe besparingen.",
  },
  {
    q: "Is het adviesrapport echt gratis?",
    a: "Ja, het adviesrapport ter waarde van €240 is volledig gratis en vrijblijvend. Een gecertificeerde specialist komt bij u thuis langs, analyseert uw situatie en maakt een persoonlijk rapport. Er zijn geen verplichtingen of verborgen kosten aan verbonden.",
  },
  {
    q: "Hoe lang duurt de installatie?",
    a: "De installatie van een thuisbatterij duurt gemiddeld 1 dag. Onze gecertificeerde installateurs zorgen voor een professionele plaatsing met minimale overlast. Na installatie is het systeem direct operationeel.",
  },
  {
    q: "Wat als ik huur in plaats van koop?",
    a: "Het Warmtefonds is primair bedoeld voor woningeigenaren. Als huurder kunt u contact opnemen met uw verhuurder of woningcorporatie over de mogelijkheden. Wij adviseren u graag over de opties die er zijn.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-1.5 bg-aog-blue/10 text-aog-blue text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            VRAGEN EN ANTWOORDEN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6 text-balance leading-tight">
            Alles wat u moet weten over <span className="text-aog-blue">thuisbatterijen</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
            Hieronder vindt u antwoorden op de meest gestelde vragen over thuisbatterijen, het Warmtefonds en de veranderende wetgeving.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`} 
                className="bg-slate-50 rounded-2xl border border-slate-200 px-6 sm:px-8 data-[state=open]:bg-white data-[state=open]:shadow-lg data-[state=open]:border-aog-blue/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-black text-foreground hover:no-underline py-6 text-base sm:text-lg group">
                  <span className="flex-1 pr-4">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base sm:text-lg leading-relaxed pb-8 pt-2">
                  <div className="border-l-4 border-aog-blue/30 pl-6 py-2">
                    {item.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Bottom CTA line */}
        <div className="mt-20 text-center bg-slate-50 rounded-3xl p-8 border border-slate-100 max-w-2xl mx-auto">
          <p className="text-lg font-bold text-foreground mb-4">Staat uw vraag er niet tussen?</p>
          <p className="text-muted-foreground mb-6">Onze adviseurs staan klaar om al uw vragen te beantwoorden.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+31612712804" className="text-aog-blue font-black text-lg hover:underline">
              Bel: 06-127 128 04
            </a>
            <span className="hidden sm:block text-slate-300">|</span>
            <a href="#lead-form" className="text-aog-green font-black text-lg hover:underline">
              Start gratis check
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
