import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Button } from "@/components/ui/button";
import { useDeal } from "@/context/DealContext";

const iconMap: Record<string, typeof FileText> = { FileText, Download };

const DataBackupSection = () => {
  const deal = useDeal() as any;
  const dataBackup = deal.dataBackup;

  if (!dataBackup) return null;

  return (
    <section className="py-10 md:py-12 overflow-hidden bg-background">
      <div className="container mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            Datos de respaldo
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-xl font-bold tracking-tight md:text-2xl text-foreground"
          >
            {dataBackup.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-xl"
          >
            {dataBackup.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
            {dataBackup.links.map((link: any, i: number) => {
              const Icon = iconMap[link.icon] || FileText;
              return (
                <Button
                  key={i}
                  asChild
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary gap-2"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DataBackupSection;
