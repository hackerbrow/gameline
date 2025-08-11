import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
      return;
    }

    if (data?.user) {
      toast.success("Doğrulama e-postası gönderildi. Lütfen e-postanı kontrol et.");
      navigate("/giris", { replace: true });
    }
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
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button variant="hero" type="submit" className="w-full" disabled={loading}>{loading ? "Kaydediliyor..." : "Kayıt Ol"}</Button>
              <p className="text-sm text-muted-foreground">
                Zaten hesabın var mı? <Link to="/giris" className="underline">Giriş yap</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
