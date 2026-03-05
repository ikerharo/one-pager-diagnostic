// Deal registry — add new deals here
// Each key is the URL slug, value is a lazy import of the deal JSON
// Default: / redirects to /demo (generic template)
const dealRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  demo: () => import("./demo.json"),
  elola: () => import("./elola.json"),
};

export default dealRegistry;
