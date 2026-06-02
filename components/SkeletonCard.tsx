export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg bg-card/60 p-5 space-y-3 border border-border">
      <div className="h-5 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-4 bg-muted rounded w-16" />
        <div className="h-4 bg-muted rounded w-20" />
      </div>
      <div className="h-4 bg-muted rounded w-full" />
    </div>
  );
}
