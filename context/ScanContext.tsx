"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type ScanContextType = {
  scanning: boolean;
  lastScanTime: number | null; // timestamp
  triggerScan: () => void;
};

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export function ScanProvider({ children }: { children: ReactNode }) {
  const [scanning, setScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<number | null>(null);

  const triggerScan = useCallback(() => {
    setScanning(true);
    // Simuler un délai de 2.5 secondes
    setTimeout(() => {
      setScanning(false);
      setLastScanTime(Date.now());
    }, 2500);
  }, []);

  return (
    <ScanContext.Provider value={{ scanning, lastScanTime, triggerScan }}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const context = useContext(ScanContext);
  if (!context) throw new Error("useScan must be used within ScanProvider");
  return context;
}
