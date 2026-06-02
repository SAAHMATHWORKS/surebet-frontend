"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Zap, RefreshCw } from "lucide-react";
import { useScan } from "@/context/ScanContext";

export function Navbar() {
  const pathname = usePathname();
  const { scanning, triggerScan } = useScan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold"
        >
          <Zap className="h-6 w-6 text-primary" />
          SurebetPro
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              pathname === "/"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/opportunities"
            className={`text-sm font-medium transition ${
              pathname === "/opportunities"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Opportunities
          </Link>
          <Link
            href="/settings"
            className={`text-sm font-medium transition ${
              pathname === "/settings"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Settings
          </Link>
        </nav>
        <Button
          variant="outline"
          className="gap-2"
          disabled={scanning}
          onClick={triggerScan}
        >
          {scanning ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <BarChart3 className="h-4 w-4" />
          )}
          {scanning ? "Scanning..." : "Run Scan"}
        </Button>
      </div>
    </header>
  );
}
