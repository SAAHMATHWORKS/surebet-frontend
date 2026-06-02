"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function KpiCard({
  title,
  value,
  prefix,
  suffix,
  icon: Icon,
}: {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-md bg-card/60 border-border hover:border-primary/50 transition-all">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-heading font-bold text-foreground">
              {prefix}
              {displayValue}
              {suffix}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
