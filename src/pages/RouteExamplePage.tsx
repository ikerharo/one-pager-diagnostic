import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Fuel, TrendingDown, Navigation } from "lucide-react";

const stats = [
  { icon: Fuel, value: "$29.99/L", label: "Precio base (red cerrada)" },
  { icon: Navigation, value: "12", label: "Opciones sin desvío" },
  { icon: TrendingDown, value: "8.34%", label: "Mejor ahorro disponible" },
];

const RouteExamplePage = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-5xl px-6 py-4 flex items-center gap-3">
        <Link
          to="/armstrong"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver
        </Link>
        <span className="text-border">|</span>
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Análisis de ruta
        </span>
      </div>
    </header>

    <main className="container mx-auto max-w-5xl px-6 py-10 md:py-16">
      {/* Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MapPin className="h-5 w-5" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Estudio de campo
        </p>
      </div>

      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
        Análisis de ruta: GDL → QRO
      </h1>
      <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
        Comparativa de precios de combustible en ruta usando red abierta vs red cerrada.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-xl font-extrabold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Map image */}
      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        <img
          src="/images/ruta-ejemplo-armstrong.png"
          alt="Mapa de ruta optimizada Guadalajara a Querétaro con estaciones de combustible más baratas"
          className="w-full"
        />
      </div>

      {/* Highlight box */}
      <div className="mt-6 rounded-xl border-2 border-primary/30 bg-primary/[0.08] p-5">
        <p className="text-sm md:text-base leading-relaxed text-foreground">
          <span className="font-bold text-primary">Mejor opción: Estación Ruta Verde</span>
          {" "}— $27.49/L con un ahorro del 8.34% y solo 0.1 km de desvío.
          En esta ruta hay 12 estaciones más baratas que la base sin salirse del camino.
        </p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground italic">
        Datos obtenidos de precios CRE en tiempo real. Los precios pueden variar según el momento de consulta.
      </p>
    </main>
  </div>
);

export default RouteExamplePage;
