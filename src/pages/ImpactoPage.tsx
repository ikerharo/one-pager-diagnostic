import Navbar from "@/components/proposal/Navbar";
import Footer from "@/components/proposal/Footer";

const savingsBreakdown = [
  { category: "Reducción de comisiones bancarias", monthly: "$[X]", annual: "$[X]", notes: "Eliminación de comisiones por retiro, consulta y mantenimiento" },
  { category: "Automatización de conciliación", monthly: "$[X]", annual: "$[X]", notes: "Reducción de [X] FTEs o horas dedicadas" },
  { category: "Reducción de gastos fuera de política", monthly: "$[X]", annual: "$[X]", notes: "Políticas automatizadas reducen [X]% de excesos" },
  { category: "Optimización de tipo de cambio", monthly: "$[X]", annual: "$[X]", notes: "Tipo de cambio preferencial en compras internacionales" },
  { category: "Cashback por volumen de gasto", monthly: "$[X]", annual: "$[X]", notes: "Programa de recompensas sobre volumen transaccional" },
];

const creditTiers = [
  { tier: "Básico", limit: "$[X] MXN", rate: "[X]%", requirements: "Evaluación crediticia estándar" },
  { tier: "Intermedio", limit: "$[X] MXN", rate: "[X]%", requirements: "[X] meses de historial con Uvicuo" },
  { tier: "Premium", limit: "$[X] MXN", rate: "[X]%", requirements: "[X] meses + volumen mínimo" },
];

const ImpactoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Caso de Negocio</p>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Impacto Financiero</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Análisis detallado del retorno de inversión para [CLIENTE].
            </p>
          </div>

          {/* Headline */}
          <div className="mx-auto mt-16 max-w-4xl grid gap-6 md:grid-cols-3">
            {[
              { label: "Ahorro Anual", value: "$[X] MXN" },
              { label: "Payback", value: "[X] meses" },
              { label: "ROI a 12 meses", value: "[X]%" },
            ].map((m, i) => (
              <div key={i} className="rounded-xl border border-primary/30 bg-card p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</p>
                <p className="mt-2 font-display text-3xl font-bold text-gradient-green">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Savings table */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="font-display text-2xl font-bold">Desglose de Ahorros</h2>
            <div className="mt-6 overflow-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Categoría</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Mensual</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Anual</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsBreakdown.map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="px-4 py-3 font-medium">{row.category}</td>
                      <td className="px-4 py-3 text-right text-primary">{row.monthly}</td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">{row.annual}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary/5">
                    <td className="px-4 py-3 font-bold">Total</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">$[X]</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">$[X]</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Assumptions */}
          <div className="mx-auto mt-16 max-w-4xl rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold">Supuestos y Proyecciones</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />Número de usuarios activos: [X]</li>
              <li className="flex items-start gap-2"><div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />Volumen mensual de transacciones: $[X] MXN</li>
              <li className="flex items-start gap-2"><div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />Porcentaje de gastos fuera de política actual: [X]%</li>
              <li className="flex items-start gap-2"><div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />Horas mensuales dedicadas a conciliación: [X]</li>
              <li className="flex items-start gap-2"><div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />Costo hora promedio del equipo financiero: $[X] MXN</li>
            </ul>
          </div>

          {/* Credit Tiers */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h2 className="font-display text-2xl font-bold">Líneas de Crédito Disponibles</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {creditTiers.map((tier, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{tier.tier}</p>
                  <p className="mt-2 font-display text-2xl font-bold text-primary">{tier.limit}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Tasa: {tier.rate}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{tier.requirements}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImpactoPage;
