import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Mail, Eye, EyeOff, UserPlus } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Default to login mode - user can switch to setup if needed
    setHasAdmin(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate("/admin");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Erro ao entrar",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bem-vindo!",
        description: "Login realizado com sucesso.",
      });
      navigate("/admin");
    }

    setIsLoading(false);
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        toast({
          title: "Conta já existe",
          description: "Use o formulário de login para entrar.",
          variant: "destructive",
        });
        setIsSetupMode(false);
      } else {
        toast({
          title: "Erro ao criar conta",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Conta criada!",
        description: "Você já pode fazer login.",
      });
      setIsSetupMode(false);
      // Auto login
      const { error: loginError } = await signIn(email, password);
      if (!loginError) {
        navigate("/admin");
      }
    }

    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-2xl p-8 animate-fade-in">
          <div className="text-center mb-8">
            <img src={logoWhite} alt="Octorlink" className="h-12 mx-auto mb-6 invert" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isSetupMode ? "Criar Conta Admin" : "Área Administrativa"}
            </h1>
            <p className="text-muted-foreground">
              {isSetupMode ? "Configure sua conta de administrador" : "Entre com suas credenciais"}
            </p>
          </div>

          <form onSubmit={isSetupMode ? handleSetup : handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@octorlink.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                isSetupMode ? "Criando..." : "Entrando..."
              ) : (
                <>
                  {isSetupMode && <UserPlus className="w-4 h-4 mr-2" />}
                  {isSetupMode ? "Criar Conta" : "Entrar"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => setIsSetupMode(!isSetupMode)}
              className="text-sm text-primary hover:underline"
            >
              {isSetupMode ? "Já tenho uma conta" : "Primeira vez? Criar conta admin"}
            </button>
            <div>
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Voltar ao site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
