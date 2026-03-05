import { motion } from "framer-motion";
import { Mail, Phone, CalendarCheck, Users, Building2, Handshake, CheckCircle2, MessageSquare } from "lucide-react";
import AnimatedSection, { itemVariants } from "@/components/proposal/AnimatedSection";
import { Button } from "@/components/ui/button";
import { timelineSteps, pastInteractions, contactInfo, type TimelineOwner } from "@/data/discoveryData";

const ownerConfig: Record<TimelineOwner, { label: string; icon: typeof Users; colorClass: string }> = {
  uvicuo: { label: "Uvicuo", icon: Building2, colorClass: "bg-primary/15 text-primary border-primary/30" },
  client: { label: "Tu equipo", icon: Users, colorClass: "bg-accent text-accent-foreground border-accent-foreground/20" },
  both: { label: "Conjunto", icon: Handshake, colorClass: "bg-secondary text-secondary-foreground border-border" },
};

const NextStepsSection = () => {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-20 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto max-w-4xl px-6">
        {/* === SUBSECCIÓN 1: Interacciones pasadas === */}
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Recorrido</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Interacciones <span className="text-primary">Previas</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Sesiones realizadas hasta ahora con tu equipo.
          </motion.p>

          <div className="mt-8 relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1), transparent)" }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <div className="space-y-3">
              {pastInteractions.map((interaction, i) => {
                const config = ownerConfig[interaction.owner];
                const OwnerIcon = config.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex gap-4 sm:gap-6"
                  >
                    {/* Dot */}
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="relative h-[10px] w-[10px] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary ring-4 ring-primary/10" />
                        <CheckCircle2 className="absolute -left-[3px] -top-[3px] h-4 w-4 text-primary" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-muted-foreground font-mono tracking-wider">
                          {interaction.date}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${config.colorClass}`}>
                          <OwnerIcon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">{interaction.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {interaction.participants.map((p, j) => (
                          <span key={j} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                            <Users className="h-2.5 w-2.5" />
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {interaction.topics.map((topic, j) => (
                          <span key={j} className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Separator between subsections */}
        <div className="my-12 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/40">Lo que viene</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        {/* === SUBSECCIÓN 2: Siguientes Pasos === */}
        <AnimatedSection>
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Plan de acción</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight md:text-3xl text-foreground"
          >
            Siguientes <span className="text-primary">Pasos</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-muted-foreground max-w-2xl"
          >
            Plan de acción con responsables y tiempos estimados.
          </motion.p>

          {/* Timeline */}
          <div className="mt-8 relative">
            <motion.div
              className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
              style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--primary) / 0.2), transparent)" }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="space-y-4">
              {timelineSteps.map((step, i) => {
                const config = ownerConfig[step.owner];
                const OwnerIcon = config.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex gap-4 sm:gap-6"
                  >
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="relative h-[10px] w-[10px] flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping-slow" />
                        <div className="absolute inset-0 rounded-full bg-primary ring-4 ring-primary/10" />
                      </div>
                    </div>

                    <div className="flex-1 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                          {step.week}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${config.colorClass}`}>
                          <OwnerIcon className="h-3 w-3" />
                          {config.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-10 rounded-xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{contactInfo.name}</p>
              <p className="text-xs text-muted-foreground">{contactInfo.role}</p>
              <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>{contactInfo.phone}</span>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="gap-2 shrink-0">
              <a href={`mailto:${contactInfo.email}?subject=Agendar sesión de deep-dive`}>
                <CalendarCheck className="h-4 w-4" />
                Agendar sesión
              </a>
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NextStepsSection;
