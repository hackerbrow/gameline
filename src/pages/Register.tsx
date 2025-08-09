import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Register = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Kayıt için Supabase entegrasyonu gerekli. Lütfen Supabase’i bağlayın.");
  };

  return (
    <>
      <SEO title="Gameline — Kayıt" description="Yeni hesap oluştur" canonical="/kayit" />
      <div className="max-w-sm mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Hesap Oluştur</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" type="password" required />
              </div>
              <Button variant="hero" type="submit" className="w-full">Kayıt Ol</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
