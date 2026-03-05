import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { DollarSign, FileText, Headphones } from "lucide-react";
import { annexSections, annexGroups, faqs } from "@/data/annexes";
import AnnexContent from "./AnnexContent";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5 text-primary" />,
  FileText: <FileText className="h-5 w-5 text-primary" />,
  Headphones: <Headphones className="h-5 w-5 text-primary" />,
};

const AppendixSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Información Complementaria</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">Anexos</h2>
          <p className="mt-4 text-muted-foreground">
            Detalles sobre precios, beneficios, soporte y preguntas frecuentes.
          </p>
        </div>

        {/* Grouped Sections */}
        <div className="mx-auto mt-12 max-w-3xl space-y-10">
          {annexGroups.map((group) => {
            const groupSections = annexSections.filter((s) => s.group === group.id);
            return (
              <div key={group.id} className="rounded-2xl border border-border bg-card shadow-sm">
                {/* Group Header */}
                <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    {iconMap[group.icon]}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{group.label}</h3>
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  </div>
                </div>

                {/* Accordions */}
                <div className="px-6 py-2">
                  <Accordion type="single" collapsible className="space-y-0">
                    {groupSections.map((section) => (
                      <AccordionItem
                        key={section.id}
                        value={section.id}
                        className="border-b border-border/50 last:border-0"
                      >
                        <AccordionTrigger className="text-left text-sm font-display font-medium text-foreground hover:text-primary py-3.5">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <AnnexContent section={section} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="mx-auto mt-14 max-w-3xl">
          <h3 className="font-display text-lg font-semibold text-foreground">Preguntas Frecuentes</h3>
          <div className="mt-4">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border bg-card px-5"
                >
                  <AccordionTrigger className="text-left text-sm font-display font-medium text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/apendice" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Ver todos los anexos →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AppendixSection;
