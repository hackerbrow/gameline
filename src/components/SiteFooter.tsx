const SiteFooter = () => {
  return (
    <footer className="border-t bg-background/60">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Gameline. Tüm hakları saklıdır.</p>
        <div className="text-xs text-muted-foreground">Güvenli alım-satım için modern pazar yeri.</div>
      </div>
    </footer>
  );
};

export default SiteFooter;
