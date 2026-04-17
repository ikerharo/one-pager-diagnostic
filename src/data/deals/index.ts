// Deal registry — add new deals here
// Each key is the URL slug, value is a lazy import of the deal JSON
const dealRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  demo: () => import("./demo.json"),
  elola: () => import("./elola.json"),
  modelo: () => import("./modelo.json"),
  nadro: () => import("./nadro.json"),
  bodesa: () => import("./bodesa.json"),
  armstrong: () => import("./armstrong.json"),
  gepp: () => import("./gepp.json"),
};

export default dealRegistry;
