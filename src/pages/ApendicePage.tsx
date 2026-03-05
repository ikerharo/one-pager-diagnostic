import Navbar from "@/components/proposal/Navbar";
import Footer from "@/components/proposal/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DollarSign, FileText, Headphones } from "lucide-react";
import { annexSections, annexGroups, faqs } from "@/data/annexes";
import AnnexContent from "@/components/proposal/AnnexContent";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5 text-primary" />,
  FileText: <FileText className="h-5 w-5 text-primary" />,
  Headphones: <Headphones className="h-5 w-5 text-primary" />,
};

const ApendicePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Información Complementaria</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Anexos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
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
                  <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {iconMap[group.icon]}
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-foreground">{group.label}</h2>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="px-6 py-2">
                    <Accordion type="multiple" className="space-y-0">
                      {groupSections.map((section) => (
                        <AccordionItem
                          key={section.id}
                          value={section.id}
                          className="border-b border-border/50 last:border-0"
                        >
                          <AccordionTrigger className="text-left font-display font-medium hover:text-primary py-4">
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
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">Preguntas Frecuentes</h2>
            <div className="mt-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-xl border border-border bg-card px-6"
                  >
                    <AccordionTrigger className="text-left font-display font-medium hover:text-primary">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApendicePage;
