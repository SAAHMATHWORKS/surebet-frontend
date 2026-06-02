"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export function FilterBar({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (f: any) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <Select onValueChange={(v) => setFilters({ ...filters, sport: v })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sport" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sports</SelectItem>
          <SelectItem value="football">Football</SelectItem>
          <SelectItem value="basketball">Basketball</SelectItem>
          <SelectItem value="baseball">Baseball</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(v) => setFilters({ ...filters, market: v })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Market" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Markets</SelectItem>
          <SelectItem value="h2h">1N2</SelectItem>
          <SelectItem value="btts">BTTS</SelectItem>
          <SelectItem value="totals">Totals</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min profit %"
          className="w-36"
          onChange={(e) =>
            setFilters({ ...filters, minProfit: e.target.value })
          }
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setFilters({ sport: "all", market: "all", minProfit: "" })
        }
      >
        <Filter className="w-4 h-4" />
      </Button>
    </div>
  );
}
