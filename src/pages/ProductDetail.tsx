import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ProductDetail = () => {
  return (
    <>
      <SEO title="Gameline — Ürün" description="Ürün detayları" canonical="/urun" />
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-[hsl(var(--brand-start))]/15 to-[hsl(var(--brand-end))]/15" />
        </Card>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Premium Oyun Hesabı</h1>
            <p className="text-muted-foreground mt-2">Güvenli ve hızlı teslimat.</p>
          </div>
          <div className="text-3xl font-semibold">₺599</div>
          <div className="flex gap-3">
            <Button variant="hero" onClick={() => toast.info("Satın alma için önce giriş yapmanız gerekir.")}>Satın Al</Button>
            <Button variant="outline">Favorilere Ekle</Button>
          </div>
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              • Oyun: Örnek Oyun
              <br />• Seviye: Yüksek
              <br />• Ekstra: Bağlı e-posta değiştirilebilir
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
