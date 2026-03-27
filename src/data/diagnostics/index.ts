const diagnosticRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  demo: () => import("./demo.json"),
  fema: () => import("./fema.json"),
  esgari: () => import("./esgari.json"),
  armstrong: () => import("./armstrong.json"),
};

export default diagnosticRegistry;
