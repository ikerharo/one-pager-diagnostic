const diagnosticRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  demo: () => import("./demo.json"),
  fema: () => import("./fema.json"),
};

export default diagnosticRegistry;
