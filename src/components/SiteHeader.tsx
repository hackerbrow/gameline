import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md transition-colors ${
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;

const SiteHeader = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" aria-hidden="true" />
          <span className="text-lg font-semibold">Gameline</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/pazar" className={navLinkClass} aria-label="Pazar">
            Pazar
          </NavLink>
          <NavLink to="/sat" className={navLinkClass} aria-label="Sat">
            Sat
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              Çıkış
            </Button>
          ) : (
            <>
              <NavLink to="/giris">
                <Button variant="ghost" size="sm">Giriş</Button>
              </NavLink>
              <NavLink to="/kayit">
                <Button variant="hero" size="sm">Kayıt Ol</Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
