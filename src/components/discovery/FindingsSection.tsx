import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { useDeal } from "@/context/DealContext";

const impactBorderColors = {
  alto: "border-l-destructive",
  medio: "border-l-amber-500",
  bajo: "border-l-primary",
} as const;

const impactBgColors = {
  alto: "bg-destructive/10",
  medio: "bg-amber-500/10",
  bajo: "bg-primary/10",
} as const;

const impactTextColors = {
  alto: "text-destructive",
  medio: "text-amber-600",
  bajo: "text-primary",
} as const;

const FindingsSection = () => {
  const { findings } = useDeal();
  const { slug } = useParams<{ slug: string }>();
  const [hero, ...rest] = findings;
  const HeroIcon = hero.icon;
  const showDeepDiveLink = slug === "bodesa";

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-background">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Lo que <span className="text-primary">encontramos</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Oportunidades concretas identificadas durante nuestro análisis.
          </motion.p>

          {/* Hero finding */}
          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-xl border border-border bg-card border-l-4 border-l-destructive overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            <div className="p-6 md:p-8 flex items-start gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/15 text-destructive ring-1 ring-destructive/20 shrink-0">
                <HeroIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground">{hero.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {hero.description}
                </p>
                {hero.quote && (
                  <blockquote className="mt-3 border-l-2 border-primary/30 pl-3 text-sm italic text-muted-foreground/80">
                    "{hero.quote}"
                    {hero.quoteAuthor && <span className="block mt-1 text-xs not-italic text-muted-foreground/60">— {hero.quoteAuthor}</span>}
                  </blockquote>
                )}
              </div>
              <span className="text-4xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">
                01
              </span>
            </div>
          </motion.div>

          {/* Connecting dotted line */}
          <div className="flex justify-center my-1">
            <div className="h-6 w-[2px] border-l-2 border-dashed border-primary/20" />
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rest.map((finding, i) => {
              const Icon = finding.icon;
              const borderColor = impactBorderColors[finding.impact];
              const bgColor = impactBgColors[finding.impact];
              const textColor = impactTextColors[finding.impact];
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`group relative rounded-xl border border-border bg-card border-l-4 ${borderColor} p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/30`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor} ${textColor} ring-1 ring-current/10 shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground">{finding.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {finding.description}
                      </p>
                      {finding.quote && (
                        <blockquote className="mt-2 border-l-2 border-primary/30 pl-3 text-xs italic text-muted-foreground/80">
                          "{finding.quote}"
                          {finding.quoteAuthor && <span className="block mt-0.5 not-italic text-muted-foreground/60">— {finding.quoteAuthor}</span>}
                        </blockquote>
                      )}
                    </div>
                    <span className="text-3xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {showDeepDiveLink && (
            <motion.div variants={itemVariants} className="mt-8 flex justify-center">
              <Link
                to="/bodesa/contable"
                className="group inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/[0.04] px-5 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
              >
                <FileText className="h-4 w-4" />
                Ver diagnóstico contable completo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FindingsSection;
