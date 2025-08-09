import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Premium Oyun Hesabı #${i + 1}`,
  price: 499 + i * 20,
}));

const Marketplace = () => {
  return (
    <>
      <SEO title="Gameline — Pazar" description="Oyun ve hesap alım-satım pazarı" canonical="/pazar" />
      <section className="space-y-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pazar</h1>
            <p className="text-muted-foreground">Öne çıkan ilanlar</p>
          </div>
          <Link to="/sat"><Button variant="hero">Hesabını Sat</Button></Link>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all hover:shadow-[var(--shadow-soft)]">
              <div className="aspect-video bg-gradient-to-br from-[hsl(var(--brand-start))]/15 to-[hsl(var(--brand-end))]/15" />
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-lg font-semibold">₺{item.price}</div>
                <Link to={`/urun/${item.id}`}>
                  <Button size="sm">İncele</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Marketplace;
