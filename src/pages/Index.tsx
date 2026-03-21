import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dealRegistry from "@/data/deals";
import diagnosticRegistry from "@/data/diagnostics";

interface DealMeta {
  slug: string;
  clientName: string;
  subtitle: string;
  meetingDate: string;
}

interface DiagnosticMeta {
  slug: string;
  clientName: string;
  subtitle: string;
}

const Index = () => {
  const [deals, setDeals] = useState<DealMeta[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticMeta[]>([]);

  useEffect(() => {
    // Load deals
    const slugs = Object.keys(dealRegistry);
    Promise.all(
      slugs.map((slug) =>
        dealRegistry[slug]().then((mod: { default: unknown }) => {
          const d = mod.default as { config?: { clientName?: string; subtitle?: string; meetingDate?: string } };
          return { slug, clientName: d.config?.clientName ?? slug, subtitle: d.config?.subtitle ?? "", meetingDate: d.config?.meetingDate ?? "" };
        })
      )
    ).then(setDeals);

    // Load diagnostics
    const dSlugs = Object.keys(diagnosticRegistry);
    Promise.all(
      dSlugs.map((slug) =>
        diagnosticRegistry[slug]().then((mod: { default: unknown }) => {
          const d = mod.default as { config?: { clientName?: string; subtitle?: string } };
          return { slug, clientName: d.config?.clientName ?? slug, subtitle: d.config?.subtitle ?? "" };
        })
      )
    ).then(setDiagnostics);
  }, []);

  const templateDeal = deals.find((d) => d.slug === "demo");
  const clientDeals = deals.filter((d) => d.slug !== "demo");
  const templateDiag = diagnostics.find((d) => d.slug === "demo");
  const clientDiags = diagnostics.filter((d) => d.slug !== "demo");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center gap-3 px-6 py-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-7" />
          <h1 className="font-display text-xl font-semibold tracking-tight">
            Discovery Summaries
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-12">
        {deals.length === 0 ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : (
          <>
            {/* ── Templates ─────────────────────────────── */}
            <div>
              <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Plantillas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templateDeal && (
                  <Link
                    to={`/${templateDeal.slug}`}
                    className="group block rounded-xl border border-dashed border-primary/40 bg-accent/50 p-6 transition-all hover:border-primary hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                        Discovery Summary
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {templateDeal.clientName}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {templateDeal.subtitle}
                    </p>
                  </Link>
                )}
                {templateDiag && (
                  <Link
                    to={`/diagnostico/${templateDiag.slug}`}
                    className="group block rounded-xl border border-dashed border-amber-500/40 bg-amber-500/5 p-6 transition-all hover:border-amber-500 hover:bg-amber-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                        Diagnóstico Pitch
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight group-hover:text-amber-600 transition-colors">
                      {templateDiag.clientName}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {templateDiag.subtitle}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* ── Client Deals ───────────────────────────── */}
            {clientDeals.length > 0 && (
              <div>
                <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Discovery Summaries
                </h2>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
                        <th className="hidden sm:table-cell px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Descripción</th>
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDeals.map((deal, i) => (
                        <tr key={deal.slug} className={`group transition-colors hover:bg-accent/40 ${i < clientDeals.length - 1 ? "border-b border-border" : ""}`}>
                          <td className="px-5 py-4">
                            <Link to={`/${deal.slug}`} className="font-medium group-hover:text-primary transition-colors">
                              {deal.clientName}
                              <span className="ml-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </Link>
                          </td>
                          <td className="hidden sm:table-cell px-5 py-4 text-sm text-muted-foreground">{deal.subtitle}</td>
                          <td className="px-5 py-4 text-sm text-muted-foreground text-right whitespace-nowrap">{deal.meetingDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Client Diagnostics ─────────────────────── */}
            {clientDiags.length > 0 && (
              <div>
                <h2 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Diagnósticos
                </h2>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
                        <th className="hidden sm:table-cell px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDiags.map((d, i) => (
                        <tr key={d.slug} className={`group transition-colors hover:bg-accent/40 ${i < clientDiags.length - 1 ? "border-b border-border" : ""}`}>
                          <td className="px-5 py-4">
                            <Link to={`/diagnostico/${d.slug}`} className="font-medium group-hover:text-primary transition-colors">
                              {d.clientName}
                              <span className="ml-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </Link>
                          </td>
                          <td className="hidden sm:table-cell px-5 py-4 text-sm text-muted-foreground">{d.subtitle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Uvicuo</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
