import { ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DataItem {
  description: string;
  date?: string;
  href?: string;
}

const items: DataItem[] = [
  { description: "Kickoff", date: "[fecha]", href: "#" },
  { description: "Discovery", date: "[fecha]", href: "#" },
  { description: "Demo", date: "[fecha]" },
  { description: "Propuesta Comercial", date: "Este sitio", href: "#" },
  { description: "Contrato" },
  { description: "NDA" },
  { description: "Caso de éxito" },
  { description: "Ficha técnica" },
];

const DataRoomSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Documentación del Proyecto
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-5xl">
            Data Room
          </h2>
          <p className="mt-4 text-muted-foreground">
            Grabaciones, documentos y recursos compartidos en un solo lugar.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-xl divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
          {items.map((item) => (
            <li key={item.description}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent"
                >
                  <ItemContent item={item} />
                </a>
              ) : (
                <div className="flex items-center gap-3 px-5 py-3.5 opacity-50">
                  <ItemContent item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const ItemContent = ({ item }: { item: DataItem }) => (
  <>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">{item.description}</p>
    </div>
    {item.date && (
      <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
    )}
    {item.href ? (
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-primary" />
    ) : (
      <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
        <Clock className="mr-1 h-2.5 w-2.5" />
        Pendiente
      </Badge>
    )}
  </>
);

export default DataRoomSection;
