import heroImage from "@/assets/gameline-hero.jpg";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Index = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <SEO title="Gameline — Oyun ve Hesap Pazarı" description="Oyun ve oyun hesabı alım-satımı için modern pazar yeri" />
      <section ref={ref} className="relative overflow-hidden rounded-xl border bg-background p-0">
        <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_var(--px,50%)_var(--py,50%),hsl(var(--brand-start)/0.25),transparent_60%)]" aria-hidden="true" />
        <img src={heroImage} alt="Gameline oyun pazarı kahraman görseli" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="relative z-10 px-6 py-20 md:px-16 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Oyun ve Hesap Alım-Satımında Yeni Nesil Deneyim
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Gameline ile güvenli, hızlı ve modern bir pazar yerinde dilediğin oyunu ya da hesabı alıp sat.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/pazar"><Button variant="hero" size="lg">Mağazayı Keşfet</Button></Link>
              <Link to="/sat"><Button variant="outline" size="lg">Hesabını Sat</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        {[{
          icon: Sparkles,
          title: "Modern Deneyim",
          desc: "Şık arayüz, hızlı işlemler, zahmetsiz yönetim",
        },{
          icon: ShieldCheck,
          title: "Güvenli İşlemler",
          desc: "Doğru alıcı-satıcı eşleşmesi ve güvenli süreç",
        },{
          icon: Zap,
          title: "Hızlı Yayın",
          desc: "Dakikalar içinde ilan ver, hemen satmaya başla",
        }].map((f, i) => (
          <Card key={i} className="transition-all hover:shadow-[var(--shadow-soft)]">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] flex items-center justify-center text-[hsl(var(--brand-foreground))]">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
};

export default Index;
