import { motion } from "framer-motion";
import { ShieldAlert, Database, TrendingUp, BarChart3, XCircle } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldAlert,
  Database,
  TrendingUp,
  BarChart3,
  XCircle,
};

const AdditionalValueSection = () => {
  const deal = useDeal();
  const section = (deal as any).additionalValue;
  if (!section) return null;

  return (
    <section className="section-dark py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            {section.tag}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-white max-w-2xl"
          >
            {section.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-2xl"
          >
            {section.subtitle}
          </motion.p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.cards.map((card: any, i: number) => {
              const Icon = iconMap[card.icon] || ShieldAlert;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={cn(
                    "rounded-xl border border-border bg-card p-5",
                    i === 0 && "sm:col-span-2"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                      <p className="mt-1 text-lg font-extrabold text-primary">{card.magnitude}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                      {card.badge && (
                        <span className="mt-3 inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/15 text-amber-400">
                          {card.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AdditionalValueSection;
