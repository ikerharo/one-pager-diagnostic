import { createContext, useContext } from "react";
import type { DealData } from "@/data/discoveryData";

const DealContext = createContext<DealData | null>(null);

export function DealProvider({ data, children }: { data: DealData; children: React.ReactNode }) {
  return <DealContext.Provider value={data}>{children}</DealContext.Provider>;
}

export function useDeal(): DealData {
  const ctx = useContext(DealContext);
  if (!ctx) throw new Error("useDeal must be used inside <DealProvider>");
  return ctx;
}
