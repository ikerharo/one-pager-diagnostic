const diagnosticRegistry: Record<string, () => Promise<{ default: unknown }>> = {
  demo: () => import("./demo.json"),
};

export default diagnosticRegistry;
