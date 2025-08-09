import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Sell = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Kayıt için Supabase entegrasyonu gerekli. Lütfen sağ üstteki Supabase düğmesiyle bağlayın.");
  };

  return (
    <>
      <SEO title="Gameline — Sat" description="Oyun hesabını güvenle sat" canonical="/sat" />
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Yeni İlan Oluştur</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" placeholder="Örn. Valorant Elmas Hesap" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Fiyat (₺)</Label>
                <Input id="price" type="number" min={0} step={1} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Açıklama</Label>
                <Textarea id="desc" placeholder="Hesap detayları" rows={6} required />
              </div>
              <div className="flex justify-end">
                <Button variant="hero" type="submit">Yayınla</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Sell;
