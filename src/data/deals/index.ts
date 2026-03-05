// Deal registry — add new deals here
// Each key is the URL slug, value is a lazy import of the deal JSON
const dealRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  elola: () => import("./elola.json"),
};

export default dealRegistry;
