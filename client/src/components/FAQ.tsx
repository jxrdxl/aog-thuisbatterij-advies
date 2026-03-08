import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Wat is de salderingsregeling en waarom verdwijnt deze?",
    a: "De salderingsregeling stelt u in staat om de stroom die u teruglevert aan het net te verrekenen met uw verbruik. Per 1 januari 2027 wordt deze regeling afgeschaft. Dit betekent dat u uw volledige verbruik weer zelf betaalt, ook al produceren uw panelen genoeg stroom. Bovendien betaalt u nu al terugleverkosten van gemiddeld €0,13 per kWh.",
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
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 bg-aog-blue/10 text-aog-blue text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <HelpCircle className="w-4 h-4" /> Veelgestelde Vragen
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Heeft u nog vragen?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Hieronder vindt u antwoorden op de meest gestelde vragen over thuisbatterijen en het Warmtefonds.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-50 rounded-xl border border-border px-5 data-[state=open]:bg-white data-[state=open]:shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-sm sm:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
