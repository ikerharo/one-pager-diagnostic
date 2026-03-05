import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dealRegistry from "@/data/deals";

interface DealMeta {
  slug: string;
  clientName: string;
  subtitle: string;
  meetingDate: string;
}

const Index = () => {
  const [deals, setDeals] = useState<DealMeta[]>([]);

  useEffect(() => {
    const slugs = Object.keys(dealRegistry);
    Promise.all(
      slugs.map((slug) =>
        dealRegistry[slug]().then((mod: { default: unknown }) => {
          const d = mod.default as {
            config?: { clientName?: string; subtitle?: string; meetingDate?: string };
          };
          return {
            slug,
            clientName: d.config?.clientName ?? slug,
            subtitle: d.config?.subtitle ?? "",
            meetingDate: d.config?.meetingDate ?? "",
          };
        })
      )
    ).then(setDeals);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center gap-3 px-6 py-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-7" />
          <h1 className="font-display text-xl font-semibold tracking-tight">
            Discovery Summaries
          </h1>
        </div>
      </header>

      {/* Deal grid */}
      <main className="container mx-auto px-6 py-12">
        {deals.length === 0 ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Link
                key={deal.slug}
                to={`/${deal.slug}`}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-card/80"
              >
                <p className="text-xs text-muted-foreground">
                  {deal.meetingDate}
                </p>
                <h2 className="mt-1 font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {deal.clientName}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {deal.subtitle}
                </p>
                <span className="mt-4 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Ver resumen →
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex items-center justify-center gap-3 px-6">
          <img src="/uvicuo-icon.png" alt="Uvicuo" className="h-5 opacity-60" />
          <span className="inline-block h-1 w-1 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uvicuo
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
