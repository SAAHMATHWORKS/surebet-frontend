export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 text-sm text-muted-foreground">
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-foreground font-medium">Dieudonné Kamga</span>.
          All rights reserved.
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span>Client :</span>
          <span className="text-foreground font-medium">Pro</span>
        </div>
      </div>
    </footer>
  );
}
