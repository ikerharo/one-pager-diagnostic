import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";
import { cn } from "@/lib/utils";

const ConsolidatedAnalysisSection = () => {
  const deal = useDeal();
  const analysis = (deal as any).consolidatedAnalysis;
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!analysis) return null;

  const confidenceColor: Record<string, string> = {
    Alta: "text-primary",
    Media: "text-amber-400",
    "Media — por confirmar": "text-amber-400",
    "Media-baja": "text-orange-400",
    "Por confirmar": "text-orange-400",
  };

  const typeStyle: Record<string, string> = {
    Directo: "border-primary/30 bg-primary/15 text-primary",
    Indirecto: "border-amber-500/30 bg-amber-500/15 text-amber-400",
    "Costo nuevo": "border-red-500/30 bg-red-500/15 text-red-400",
  };

  // Build a map from lever title to lever data for quick lookup
  const leverMap: Record<string, any> = {};
  if (analysis.levers) {
    for (const lever of analysis.levers) {
      leverMap[lever.title] = lever;
    }
  }

  return (
    <section className="section-dark py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-wider text-primary mb-2"
          >
            {analysis.tag}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-white max-w-2xl"
          >
            {analysis.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-sm text-muted-foreground max-w-2xl"
          >
            {analysis.subtitle}
          </motion.p>

          {/* Table with inline expandable details */}
          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Palanca</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ahorro anual</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Tipo</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Confianza</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.rows.map((row: any, i: number) => {
                    const isHighlight = row.highlight;
                    const lever = leverMap[row.label];
                    const hasDetail = !!lever;
                    const isOpen = expandedRow === i;

                    return (
                      <>
                        <tr
                          key={`row-${i}`}
                          onClick={() => hasDetail && setExpandedRow(isOpen ? null : i)}
                          className={cn(
                            "border-b border-border/50 last:border-0 transition-colors",
                            isHighlight && "bg-primary/[0.06]",
                            hasDetail && "cursor-pointer hover:bg-primary/[0.04]",
                            isOpen && "bg-primary/[0.04]"
                          )}
                        >
                          <td className={cn("px-4 py-3 text-foreground", isHighlight && "font-bold")}>
                            <div className="flex items-center gap-2">
                              {row.label}
                              {hasDetail && (
                                <ChevronDown
                                  className={cn(
                                    "h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200",
                                    isOpen && "rotate-180"
                                  )}
                                />
                              )}
                            </div>
                          </td>
                          <td className={cn("px-4 py-3 text-right font-semibold", isHighlight ? "text-primary" : "text-foreground")}>
                            {row.value}
                          </td>
                          <td className="px-4 py-3 text-center hidden sm:table-cell">
                            {row.type && (
                              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border", typeStyle[row.type] || "border-border text-muted-foreground")}>
                                {row.type}
                              </span>
                            )}
                          </td>
                          <td className={cn("px-4 py-3 text-center text-xs hidden sm:table-cell", confidenceColor[row.confidence] || "text-muted-foreground")}>
                            {row.confidence}
                          </td>
                        </tr>

                        {isOpen && lever && (
                          <tr key={`detail-${i}`} className="border-b border-border/50">
                            <td colSpan={4} className="px-4 pb-4 pt-1">
                              <ul className="space-y-1.5">
                                {lever.bullets.map((bullet: string, j: number) => {
                                  const isConfirm = bullet.startsWith("POR CONFIRMAR");
                                  return (
                                    <li key={j} className={cn("text-sm leading-relaxed flex items-start gap-2", isConfirm ? "text-amber-400" : "text-foreground/90")}>
                                      <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", isConfirm ? "bg-amber-400" : "bg-primary/60")} />
                                      {bullet}
                                    </li>
                                  );
                                })}
                              </ul>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ConsolidatedAnalysisSection;
