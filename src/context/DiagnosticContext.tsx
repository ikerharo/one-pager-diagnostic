import { createContext, useContext } from "react";
import type { DiagnosticData } from "@/data/diagnosticData";

const DiagnosticContext = createContext<DiagnosticData | null>(null);

export function DiagnosticProvider({ data, children }: { data: DiagnosticData; children: React.ReactNode }) {
  return <DiagnosticContext.Provider value={data}>{children}</DiagnosticContext.Provider>;
}

export function useDiagnostic(): DiagnosticData {
  const ctx = useContext(DiagnosticContext);
  if (!ctx) throw new Error("useDiagnostic must be used inside <DiagnosticProvider>");
  return ctx;
}
