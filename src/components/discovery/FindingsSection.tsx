import { motion } from "framer-motion";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { findings } from "@/data/discoveryData";

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
  const [hero, ...rest] = findings;
  const HeroIcon = hero.icon;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Hallazgos <span className="text-primary">Clave</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Principales oportunidades identificadas durante la sesión de discovery.
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
                    </div>
                    <span className="text-3xl font-black font-mono text-muted-foreground/10 shrink-0 leading-none">
                      {String(i + 2).padStart(2, "0")}
                    </span>
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

export default FindingsSection;
