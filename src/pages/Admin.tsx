import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Package, Smartphone, Users, Settings, Gift, Sliders } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import PlansManager from "@/components/admin/PlansManager";
import AppsManager from "@/components/admin/AppsManager";
import LeadsManager from "@/components/admin/LeadsManager";
import ServicesManager from "@/components/admin/ServicesManager";
import ReferralsManager from "@/components/admin/ReferralsManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-4">
            <img src={logoWhite} alt="Octorlink" className="h-8" />
            <span className="text-primary-foreground/60 text-sm hidden sm:block">Painel Administrativo</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-foreground/80 text-sm hidden md:block">{user.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciamento</h1>
          <p className="text-muted-foreground">Gerencie os planos e aplicativos do seu site.</p>
        </div>

        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="mb-8 flex-wrap">
            <TabsTrigger value="leads" className="gap-2">
              <Users className="w-4 h-4" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="referrals" className="gap-2">
              <Gift className="w-4 h-4" />
              Indicações
            </TabsTrigger>
            <TabsTrigger value="plans" className="gap-2">
              <Package className="w-4 h-4" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="apps" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Aplicativos
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Settings className="w-4 h-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="site-settings" className="gap-2">
              <Sliders className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsManager />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralsManager />
          </TabsContent>

          <TabsContent value="plans">
            <PlansManager />
          </TabsContent>

          <TabsContent value="apps">
            <AppsManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="site-settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
