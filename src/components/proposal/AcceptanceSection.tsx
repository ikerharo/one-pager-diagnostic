import { useState } from "react";
import { ChevronDown, Rocket, PartyPopper, Sparkles, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProposal } from "@/hooks/useProposal";
import AnimatedSection, { itemVariants } from "./AnimatedSection";

const companyName = "[CLIENTE]";

const AcceptanceSection = () => {
  const { proposal, acceptProposal } = useProposal();
  const [accepted, setAccepted] = useState(false);
  const [conditionsExpanded, setConditionsExpanded] = useState(false);
  const [sending, setSending] = useState(false);
  const [buroExpanded, setBuroExpanded] = useState(false);
  const [signature, setSignature] = useState("");
  const [form, setForm] = useState({ role: "" });

  const isAccepted = proposal?.status === "aceptada";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      toast.error("Debes aceptar los términos y condiciones.");
      return;
    }
    if (!form.role) {
      toast.error("Por favor ingresa tu cargo.");
      return;
    }
    if (!signature.trim()) {
      toast.error("Por favor ingresa tu firma.");
      return;
    }

    setSending(true);
    const date = new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });

    try {
      // Save to DB
      await acceptProposal(signature.trim(), form.role);

      // Send email
      try {
        await supabase.functions.invoke("send-proposal-email", {
          body: { signature, role: form.role, company: companyName, date },
        });
      } catch (emailErr) {
        console.error("Error sending email:", emailErr);
      }

      toast.success("¡Propuesta aceptada exitosamente!");
    } catch (err) {
      console.error("Error accepting proposal:", err);
      toast.error("Hubo un error al registrar la aceptación. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (isAccepted) {
    const displayName = proposal?.accepted_by || signature;
    const displayRole = proposal?.accepted_role || form.role;
    const displayDate = proposal?.accepted_at
      ? new Date(proposal.accepted_at).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });

    return (
      <section id="aceptacion" className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-2xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
              
              <div className="relative px-8 py-12 text-center md:px-12 md:py-16">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                >
                  <Rocket className="h-10 w-10 text-primary" />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">¡Propuesta Aceptada!</p>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    La innovación empieza aquí
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mx-auto mt-6 max-w-md space-y-4"
                >
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">{companyName}</span> está a punto de revolucionar la gestión de sus gastos en ruta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Agradecemos profundamente que quieran ser nuestro partner. Vamos a acompañarlos en cada paso de este camino — desde la implementación hasta que cada peso esté optimizado.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5">
                    <PartyPopper className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-accent-foreground">
                      Tu Account Manager te contactará en las próximas 24 horas
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="mx-auto mt-10 max-w-sm rounded-xl border border-border bg-secondary/30 p-5 text-left"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Resumen</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firmado por</span>
                      <span className="font-medium text-foreground">{displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cargo</span>
                      <span className="font-medium text-foreground">{displayRole}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empresa</span>
                      <span className="font-medium text-foreground">{companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha</span>
                      <span className="font-medium text-foreground">{displayDate}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="aceptacion" className="py-16 md:py-24">
      <div className="container">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <motion.p variants={itemVariants} className="text-xs font-semibold uppercase tracking-widest text-primary">Siguiente Paso</motion.p>
          <motion.h2 variants={itemVariants} className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">Aceptación</motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-muted-foreground">
            Complete el siguiente formulario para aceptar la propuesta.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="mx-auto mt-12 max-w-lg space-y-6">
            {/* Bloque informativo */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-1">
              <p className="text-sm font-medium text-foreground">
                Propuesta para <span className="font-semibold text-primary">{companyName}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}, {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Condiciones Generales */}
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <button
                type="button"
                onClick={() => setConditionsExpanded(!conditionsExpanded)}
                className="flex w-full items-center justify-between p-6"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">Condiciones Generales</h3>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${conditionsExpanded ? "rotate-180" : ""}`} />
              </button>
              {conditionsExpanded && (
                <div className="border-t border-border px-6 pb-6 pt-4">
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>• Propuesta válida por 7 días a partir de la recepción de esta propuesta.</li>
                    <li>• Facturación mensual los primeros 10 días del mes vencido.</li>
                    <li>• Línea de crédito sujeta a aprobación crediticia.</li>
                    <li>• Tarifas en USD; pago en MXN al tipo de cambio FIX del Banco de México vigente a la fecha de facturación. IVA aplicable sobre todos los montos.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} className="mt-0.5" />
              <div className="space-y-1">
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  Acepto los términos y condiciones de esta propuesta comercial, incluyendo la autorización de consulta de historial crediticio.
                </Label>
                <button
                  type="button"
                  onClick={() => setBuroExpanded(!buroExpanded)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline underline-offset-2"
                >
                  Ver autorización de Buró de Crédito
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${buroExpanded ? "rotate-180" : ""}`} />
                </button>
                {buroExpanded && (
                  <div className="mt-2 rounded-lg border border-border bg-secondary/30 p-3 text-xs leading-relaxed text-muted-foreground space-y-2">
                    <p className="font-semibold text-foreground text-[11px] uppercase tracking-wide">Autorización de Consulta de Buró de Crédito</p>
                    <p>
                      El suscrito, en mi carácter de Representante Legal de [Razón social del cliente], autorizo a [Razón social de Uvicuo] a consultar el historial crediticio de la empresa, de su(s) Representante(s) Legal(es) y de su(s) Beneficiario(s) Controlador(es) ante las Sociedades de Información Crediticia (Buró de Crédito y/o Círculo de Crédito), de conformidad con la Ley para Regular las Sociedades de Información Crediticia.
                    </p>
                    <p>
                      Declaro conocer la naturaleza y alcance de la información que se solicitará y el uso que se le dará. Esta autorización tiene una vigencia de 5 años a partir de su firma o mientras exista relación comercial vigente.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Firma */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">Cargo</Label>
                <Input id="role" placeholder="Director de Finanzas" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="focus-visible:ring-primary/40 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_12px_-2px_hsl(var(--uvicuo-green)/0.25)]" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground font-display text-sm font-semibold">Firma Digital</Label>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Escribe tu nombre completo</span>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Escribe tu nombre aquí"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="border-0 border-b-2 border-border rounded-none bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:shadow-[0_2px_12px_-4px_hsl(var(--uvicuo-green)/0.3)]"
                  />
                </div>
                {signature.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-dashed border-primary/30 bg-primary/[0.02] px-6 py-5 text-center"
                  >
                    <p
                      className="text-2xl text-primary md:text-3xl"
                      style={{ fontFamily: "'Dancing Script', 'Segoe Script', 'Brush Script MT', cursive" }}
                    >
                      {signature}
                    </p>
                    <div className="mt-2 mx-auto w-48 border-t border-muted-foreground/30" />
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Firma electrónica</p>
                  </motion.div>
                )}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-display font-semibold hover-shimmer" disabled={!accepted || !signature.trim() || sending}>
              {sending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Aceptar Propuesta"}
            </Button>
          </motion.form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AcceptanceSection;
